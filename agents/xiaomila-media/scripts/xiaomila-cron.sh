#!/bin/bash
# =============================================================================
# 小米椒 🌶️‍🔥 运营定时任务统一入口
# =============================================================================
# 用法: xiaomila-cron.sh <command>
# 命令:
#   qmd-update     - 更新 QMD 知识库索引（对应 crontab 06:00）
#   morning-review - 午间运营回顾（对应 crontab 12:00）
#   daily-review   - 每日运营回顾+Git推送（对应 crontab 23:30）
#   weekly-report  - 每周运营总结（对应 crontab 周五 18:00）
#   error-stats    - 错误统计（对应 crontab 每小时）
#   cleanup        - 日志清理（对应 crontab 02:00）
# 版权：MIT License | Copyright (c) 2026 思捷娅科技 (SJYKJ)
# =============================================================================

set -euo pipefail

WORKSPACE="/home/zhaog/.openclaw/workspace"
MEDIA_DIR="$WORKSPACE/agents/xiaomila-media"
MEMORY_DIR="$MEDIA_DIR/memory"
INTEL_DIR="$MEDIA_DIR/intel"
LOG_DIR="$MEDIA_DIR/logs"
TODAY=$(date +%Y-%m-%d)
COMMAND="${1:-help}"

mkdir -p "$LOG_DIR" "$MEMORY_DIR" "$INTEL_DIR"

log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] [$COMMAND] $1" | tee -a "$LOG_DIR/xiaomila-cron.log"
}

# ============ QMD 知识库更新 ============
cmd_qmd_update() {
    log "开始更新 QMD 知识库索引..."
    cd "$WORKSPACE"
    export QMD_FORCE_CPU=1
    if command -v qmd &>/dev/null; then
        qmd update >> "$LOG_DIR/qmd-update.log" 2>&1
        log "✅ QMD 索引更新完成"
    else
        # 尝试从 npm global 找
        QMD_BIN="/home/zhaog/.npm-global/bin/qmd"
        if [ -x "$QMD_BIN" ]; then
            $QMD_BIN update >> "$LOG_DIR/qmd-update.log" 2>&1
            log "✅ QMD 索引更新完成"
        else
            log "⚠️ qmd 命令未找到，跳过"
        fi
    fi
}

# ============ 午间运营回顾 ============
cmd_morning_review() {
    log "===== 午间运营回顾开始 ====="
    
    MEMORY_FILE="$MEMORY_DIR/$TODAY.md"
    
    # 检查今日记忆文件
    if [ -f "$MEMORY_FILE" ]; then
        LINES=$(wc -l < "$MEMORY_FILE")
        log "今日记忆文件: ${LINES}行"
    else
        log "创建今日记忆文件模板..."
        cat > "$MEMORY_FILE" << EOF
# 📝 $TODAY 运营日志

## 热点选题
_待记录_

## 内容创作
_待记录_

## 选品调研
_待记录_

## 数据复盘
_待记录_

## 教训与收获
_待记录_
EOF
    fi
    
    # 统计上午工作
    log "上午 intel/ 文件变更:"
    cd "$WORKSPACE"
    git diff --name-only HEAD -- agents/xiaomila-media/intel/ 2>/dev/null | while read f; do log "  📄 $f"; done
    
    # 检查待办完成度
    if [ -f "$INTEL_DIR/运营待办.md" ]; then
        DONE=$(grep -c "\[x\]" "$INTEL_DIR/运营待办.md" 2>/dev/null || echo 0)
        TODO=$(grep -c "\[ \]" "$INTEL_DIR/运营待办.md" 2>/dev/null || echo 0)
        log "待办进度: ✅${DONE} 完成 / ⏳${TODO} 待做"
    fi
    
    log "===== 午间运营回顾完成 ====="
}

# ============ 每日运营回顾 + Git 推送 ============
cmd_daily_review() {
    log "===== 每日运营回顾开始 ====="
    
    MEMORY_FILE="$MEMORY_DIR/$TODAY.md"
    
    # 确保记忆文件存在
    if [ ! -f "$MEMORY_FILE" ]; then
        log "⚠️ 今日记忆文件不存在，创建中..."
        cat > "$MEMORY_FILE" << EOF
# 📝 $TODAY 运营日志
_自动创建 - 今日无手动记录_
EOF
    fi
    
    # 统计今日运营文件变更
    cd "$WORKSPACE"
    INTEL_CHANGES=$(git diff --name-only HEAD -- agents/xiaomila-media/intel/ 2>/dev/null | wc -l)
    MEMORY_CHANGES=$(git diff --name-only HEAD -- agents/xiaomila-media/memory/ 2>/dev/null | wc -l)
    log "今日变更: intel/${INTEL_CHANGES}个文件, memory/${MEMORY_CHANGES}个文件"
    
    # Git 提交
    git add agents/xiaomila-media/ >> "$LOG_DIR/git.log" 2>&1 || true
    
    if git diff --cached --quiet -- agents/xiaomila-media/ 2>/dev/null; then
        log "ℹ️ 没有新变更需要提交"
    else
        git commit -m "docs(xiaomila-media): 每日运营回顾 - $TODAY" >> "$LOG_DIR/git.log" 2>&1
        log "✅ Git 已提交"
    fi
    
    # 推送到个人仓库
    CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "master")
    if git push xiaomila "$CURRENT_BRANCH:main" >> "$LOG_DIR/git.log" 2>&1; then
        log "✅ 已推送到 xiaomila-skills.git"
    else
        log "⚠️ 推送失败（网络问题？），下次重试"
    fi
    
    log "===== 每日运营回顾完成 ====="
}

# ============ 每周运营总结 ============
cmd_weekly_report() {
    log "===== 每周运营总结开始 ====="
    
    WEEK_END=$(date '+%Y-%m-%d')
    WEEK_START=$(date -d '7 days ago' '+%Y-%m-%d' 2>/dev/null || echo "$WEEK_END")
    REPORT_FILE="$MEMORY_DIR/weekly-${WEEK_END}.md"
    
    cd "$WORKSPACE"
    
    cat > "$REPORT_FILE" << EOF
# 📈 小米椒周报: $WEEK_START ~ $WEEK_END

## 本周内容产出
$(find "$INTEL_DIR" -name "*.md" -newer "$MEMORY_DIR" -mtime -7 2>/dev/null | wc -l) 篇内容/文档更新

## 本周 Git 活动
\`\`\`
$(git log --since="$WEEK_START" --oneline -- agents/xiaomila-media/ 2>/dev/null | head -20)
\`\`\`

## 本周记忆文件
$(ls -1 "$MEMORY_DIR"/${WEEK_START}* "$MEMORY_DIR"/*-weekly-*.md 2>/dev/null | head -10)

## 下周计划
_待填写_

---
*自动生成 by xiaomila-cron.sh weekly-report*
EOF
    
    log "✅ 周报已生成: $REPORT_FILE"
    log "===== 每周运营总结完成 ====="
}

# ============ 错误统计 ============
cmd_error_stats() {
    ERROR_LOG="$LOG_DIR/xiaomila-cron.log"
    if [ ! -f "$ERROR_LOG" ]; then
        return 0
    fi
    
    TOTAL_ERRORS=$(grep -c "⚠️\|❌\|ERROR\|失败" "$ERROR_LOG" 2>/dev/null || echo "0")
    TODAY_ERRORS=$(grep "$TODAY" "$ERROR_LOG" 2>/dev/null | grep -c "⚠️\|❌\|ERROR\|失败" 2>/dev/null || echo "0")
    
    if [ "$TODAY_ERRORS" -gt 0 ]; then
        log "📊 今日错误: $TODAY_ERRORS / 总计: $TOTAL_ERRORS"
    fi
}

# ============ 日志清理 ============
cmd_cleanup() {
    log "开始清理旧日志..."
    find "$LOG_DIR" -name "*.log" -mtime +7 -delete 2>/dev/null || true
    # 清理30天前的每日记忆文件（保留月度备份）
    # 暂不自动删除记忆文件，只清理日志
    log "✅ 日志清理完成"
}

# ============ 帮助 ============
cmd_help() {
    echo "小米椒 🌶️‍🔥 运营定时任务"
    echo ""
    echo "用法: $0 <command>"
    echo ""
    echo "命令:"
    echo "  qmd-update      更新 QMD 知识库索引"
    echo "  morning-review   午间运营回顾"
    echo "  daily-review     每日运营回顾 + Git 推送"
    echo "  weekly-report    每周运营总结"
    echo "  error-stats      错误统计"
    echo "  cleanup          日志清理"
    echo "  help             显示帮助"
}

# ============ 路由 ============
case "$COMMAND" in
    qmd-update)      cmd_qmd_update ;;
    morning-review)  cmd_morning_review ;;
    daily-review)    cmd_daily_review ;;
    weekly-report)   cmd_weekly_report ;;
    error-stats)     cmd_error_stats ;;
    cleanup)         cmd_cleanup ;;
    help|*)          cmd_help ;;
esac
