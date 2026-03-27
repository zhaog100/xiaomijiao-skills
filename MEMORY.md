# 🧠 长期记忆

_精心维护的记忆，提炼后的精华_

**版本**: v6.5  
**最后更新**: 2026-03-27 18:59  
**维护**: 小米辣 (PM + Dev) 🌶️

---

## 🎯 当前状态

**时间**: 2026-03-27 18:59

| 项目 | 状态 | 详情 |
|------|------|------|
| **OpenClaw** | ✅ 2026.3.23-2 | 小米辣18789, 小米椒18790 |
| **模型** | ✅ 双独立 | 小米辣:glm-4.7-flashx, 小米椒:glm-5 |
| **微信/飞书插件** | ❌ 已移除 | TypeScript编译失败 |
| **workspace结构** | ✅ 已整理 | 散落文件132→54 |
| **docs/知识库** | ✅ 已整理 | guides/下3个子目录 |
| **Git Secret Scanning** | ✅ 已解决 | 5个告警全部resolved |
| **QMD向量** | ✅ 已安装 | llama_cpp/numpy已安装，23,118文档 |

| 项目 | 状态 | 详情 |
|------|------|------|
| **OpenClaw** | ⏳ 待升级 | 2026.3.24 可用，升级后需重启 Gateway |
| pygal #579 | 🔍 PR 等审核 | OHLC K线图，维护者无Python能力，已请推荐reviewer |
| vllm-omni #2080 | 🔍 待确认 | 仓库权限问题，gh无法查询 |
| GeneralsGameCode #2485 | 🔍 待确认 | 仓库权限问题，gh无法查询 |
| coolify #7528 | ❌ 被屏蔽 | zhaog100被屏蔽 |
| **总计待审核 PR** | **3 个** | **~$800-1,000** |
| ClawHub 发布 | 25+ 个 | 技能 |
| Git 仓库 | origin + xiaomili | 双仓库 |
| GitHub | zhaog100 | 用户名 |

---

## 📚 核心教训

### 质量第一（2026-03-17 官家指令）⭐⭐⭐⭐⭐

> "保证质量这点刻在你的记忆里、血液里"

- 宁可慢，绝不凑合。一次做对比返工快 10 倍
- 提交前自测 3 遍，PR 描述完整
- 每次发版检查版权信息和敏感信息
- ClawHub 发布 = MIT 级别

### 开发规范

- **不产生幻觉** — 实际完成所有步骤，不能假设结果
- **Git rebase 禁令** — 禁止 `--strategy=ours`，改用 `--skip`
- **零依赖优先** — ast 替代 tree-sitter
- **子代理交付 8 项清单** — SKILL.md/package.json/版权注释/pytest/接口验证/全链路测试/边界测试/不修改无关文件

### Bounty 自动开发策略（2026-03-24 官家指令）⭐⭐⭐⭐⭐

> "认领后自动完成全部开发，不用询问"

- 认领成功后自动按顺序开发，不再逐个请示
- 先评估可行性（能编译/能测试），不可行立即跳过并通知
- 完成后汇报结果（成功/失败/跳过+原因）
- 多个任务并行派子代理，提高效率

### Bounty 狩猎教训（持续迭代）⭐⭐⭐⭐⭐

1. **先评估再开发** — 流程：发现→research评估→确认可行→开发
2. **验证 issue 时效性** — 先看创建时间和最后活动
3. **验证付款可靠性** — 优先选 Algora 标签确认的项目，`seeking funding` 标签=资金未到位
4. **工作量与金额匹配** — 市场价与金额差距大=不靠谱
5. **防刷 bounty 识别**（2026-03-24 新增）:
   - 同一用户反复刷"我来认领"= 刷存在感
   - 无 Algora 标签 + 无人被 assign = 纸面数字
   - 自报自修刷 bounty（如 nutshell #922）= 骗局
   - 金额 >$100 但竞争 <3人 + Algora确认 = 好目标

### Bounty 黑名单（详见 skills/github-bounty-hunter）

| 仓库 | 原因 |
|------|------|
| ComfyUI | bounty 已停超过 1 年 |
| coollabsio/coolify | 账号被屏蔽 |
| illbnm/homelab-stack | 刷 bounty，无实际开发 |

### 实战经验（2026-03-21 迭代）⭐⭐⭐⭐⭐

- **主代理直接开发** > 子代理共享目录
- **独立 branch** — 每个 bounty 从 main 创建独立 branch
- **Fork 必须用 Classic Token**
- **默认分支先查** — `git symbolic-ref refs/remotes/origin/HEAD`
- **PR 标题** — `[BOUNTY #N] 描述`，body 必须 `Closes #N`
- **Label 检查** — 有 "Core Team Only" 的直接跳过

### 自动流水线教训

- **代码质量门禁** — validate_code 检查长度/有效行数
- **AI 多模型 fallback** — glm-5-turbo → glm-5 → deepseek-chat
- **读源码再生成** — GitHub API 读取实际源码

### Git & ClawHub

- **双仓库推送规则**（2026-03-26 官家指令）⭐⭐⭐⭐⭐:
  | Remote | URL | 提交内容 |
  |--------|-----|----------|
  | **origin** | `https://github.com/zhaog100/openclaw-skills.git` | 仅技能相关 (`skills/` 目录、`SKILL.md`、技能脚本) |
  | **xiaomijiao** | `git@github.com:zhaog100/xiaomijiao-skills.git` | 其他所有 (memory/docs/intel/配置/日志/数据) |
  - **口诀**: 技能推 origin，其他推 xiaomijiao
  - **原则**: 同一文件不同时提交到两个仓库
  - **小米椒工作区**: `agents/xiaomijiao/` + `intel/` + `memory/` + 运营相关文件
  - **操作示例**:
    ```bash
    # 技能更新 → origin
    git add skills/xxx/ && git commit -m "feat: xxx" && git push origin main
    # 个人工作区 → xiaomijiao
    git add intel/ memory/ *.md && git commit -m "chore: xxx" && git push xiaomijiao main
    ```
- **ClawHub slug** — 被占用时用 sjykj-前缀
- **ClawHub 限流** — 每小时 5 个新 slug

### 系统运维教训（2026-03-24 新增，2026-03-27 补充）⭐⭐⭐⭐

- **OpenClaw 升级后必须重启 Gateway** — 否则插件文件与内存不一致
- **QMD bun 全局安装** — OpenClaw 升级可能破坏 better-sqlite3，用 `bun install -g @tobilu/qmd` 修复
- **定期 openclaw doctor --repair** — 清理孤立 session 和旧状态目录
- **磁盘告警线 70%** — 超过立即清理（今日从80%降至60%）
- **Git push 前先 pull** — 避免 rebase 冲突，`git pull --rebase` + `GIT_EDITOR=true`
- **WeChat 投递依赖活跃会话**（2026-03-27 新增）— 微信投递必须接收者最近有消息交互，否则报错"无法确定使用哪个账号"。解决方案：让任一微信账号给机器人发消息激活会话

### 2026-03-23 新进展

- **赚钱方向拓展** — Bug Bounty 新方向，HackerOne 注册（ByteWyrmSec），待学习 PortSwigger → Hacker101
- **京东青龙面板** — jd_faker2 Cookie 过期问题，根因：容器内 JD_COOKIE 环境变量未设置

---

## 📋 定时任务

| 时间 | 任务 | 用途 |
|------|------|------|
| */5 * * * * | seamless-switch.sh | Context 自动切换 |
| */30 * * * * | bounty_scanner_lite.py | Bounty 轻量扫描 |
| */30 * * * * | github-bounty-hunter.sh auto | Bounty 全自动收割 |
| 0 * * * * | monitor.py | PR 监控 |
| 0 6 * * * | qmd update | QMD 知识库更新 |
| 0 12 * * * | daily-review.sh | 早间回顾 |
| 50 23 * * * | daily_review.sh | 晚间回顾 |
| 0 18 * * 5 | weekly_report.sh | 周五周报 |

---

## 📚 知识库

### 外贸知识库 (2026-03-22 创建)
- **位置**: knowledge/trade/
- **文件**: 4 个 (README, Incoterms, 出口流程，邮件模板)
- **QMD 索引**: ✅ 已索引

### 未来规划赛道 (2026-03-22 创建)
- **位置**: shared-context/FUTURE-TRACKS.md
- **赛道**: 5 个 (外贸/Bounty/homelab/AI Agent/知识付费)
- **2026 目标**: $106,000 (月均$8,800+)
- **2027 目标**: $310,000 (月均$25,000+)

## 🔑 核心配置

| 类别 | 配置 | 位置 |
|------|------|------|
| GitHub Token | ghp_*** | ~/.openclaw/secrets/github-bounty-hunter.env |
| 收款地址 | USDT/BTC | ~/.openclaw/secrets/wallet.env |
| 定时任务 | crontab | 用户 crontab |
| 核心技能 | github-bounty-hunter | skills/github-bounty-hunter/ |

---

## 📝 协作规则

- **PRD**: `docs/products/YYYY-MM-DD_[名]_PRD.md`
- **提交**: `feat|fix|security|docs|chore([范围]): 描述`
- **流程**: PRD → 确认 → 技术设计 → 开发 → 测试 → Review → 发布 → 验收

---

## 💡 高价值锚点词

| 类别 | 关键词 |
|------|--------|
| 核心技能 | github-bounty-hunter, smart-model-switch, context-manager, projectmind, agentlens |
| 核心配置 | agents.json, mcporter.json, crontab, ~/.openclaw/secrets/ |
| 核心概念 | 三库联动 (MEMORY+QMD+Git), MCP 集成，全自动流水线 |

---

## 📄 版权声明

**MIT License | Copyright (c) 2026 思捷娅科技 (SJYKJ)**

免费使用、修改和重新分发时需注明出处：
- GitHub: https://github.com/zhaog100/openclaw-skills
- ClawHub: https://clawhub.com

---

*持续进化 · 定期清理 · 保留精华*

## Bounty 自动开发策略（2026-03-25 官家指令，2026-03-26 强化）⭐⭐⭐⭐⭐

> "以后有新认领的任务，你自己按顺序全部完成剩余任务的开发，不用询问我，把剩余任务全部完成。把这条加入到你的策略里"
> "要保证分数在 50 以上的任务"

- ✅ **认领成功后自动按顺序开发，不再逐个请示**
- ✅ **优先开发 score ≥ 50 的高价值任务**
- ✅ **先评估可行性（能编译/能测试），不可行立即跳过并通知**
- ✅ **完成后统一汇报结果（成功/失败/跳过 + 原因）**
- ✅ **多个任务并行派子代理，提高效率**
- ✅ **此策略为最高优先级，覆盖所有 bounty 开发流程**
- ✅ **持续开发直到所有高价值任务完成，无需中途请示**


---

## 🔧 双 Gateway 架构配置（2026-03-26 官家指令）⭐⭐⭐⭐⭐

> "双 Gateway 是唯一正确的选择，单 Gateway 会经常搞混角色"

### 架构设计
| 实例 | 工作区 | QQ Bot AppID | 微信 Bot | Gateway 端口 | 用途 |
|------|--------|-------------|---------|-------------|------|
| **小米辣** | `/home/zhaog/.openclaw-xiaomila/workspace` | 102911630 | 无 | 18789 | PM+Dev 双代理 |
| **小米椒** | `/home/zhaog/.openclaw-xiaomijiao/workspace` | 1903665913 | b2ed46104463-im-bot | 18790 | 新媒体运营 |

### 启动命令
```bash
# 启动小米辣 Gateway
cd /home/zhaog/.openclaw-xiaomila && nohup openclaw gateway > /tmp/xiaomila-gw.log 2>&1 &

# 启动小米椒 Gateway
cd /home/zhaog/.openclaw-xiaomijiao && nohup openclaw gateway > /tmp/xiaomijiao-gw.log 2>&1 &
```

### 配置原则
1. **工作区隔离** - 各自独立，互不干扰
2. **配置隔离** - 各自 openclaw.json，不共享
3. **记忆隔离** - 各自 MEMORY.md，不混淆
4. **身份隔离** - 各自 SOUL.md，角色清晰
5. **插件独立** - 各自 extensions 目录

### 教训总结
- 单 Gateway + 多 Agent 会导致角色混淆、配置混乱
- 双 Gateway 资源占用多一倍，但长期稳定
- 一次配置，不再折腾

_版本：v6.1 | 2026-03-26 18:19 | 双 Gateway 架构确认_

---

## 📌 今日重要状态（2026-03-27 晚间）⭐⭐⭐

### 系统状态
- OpenClaw：2026.3.23-2（**待升级**到2026.3.24，需手动重启Gateway）
- 磁盘：34%使用，188G可用 ✅
- Git：bounty-1501分支，**工作区干净**，全部已提交

### WeChat 投递问题（持续）
- 根因：2个微信账号均无活跃会话
- 状态：cron任务报错"无法确定使用哪个账号"
- 解决：官家发微信消息给机器人激活会话后自动恢复
- 影响的cron：healthcheck:security-audit-weixin、healthcheck:update-check-weixin、daily-review:night-weixin

### Bounty 队列状态（2026-03-27）
- 总任务：119个
- 高优先级(score≥50)：**46个**
- top任务：[90] GraciasAi #12, [105] #14, [85] S.P.L.U.T-tg #872, [80] InkkSlinger #3

### QMD 状态
- QMD CLI：`/home/zhaog/.local/bin/qmd`（可用，版本命令失败）
- 向量索引：未生成（需执行qmd embed）
- 待执行：`bun install -g @tobilu/qmd`

---

## 📌 Git 仓库清理与 .gitignore（2026-03-27）⭐⭐⭐⭐

### 问题
- `data/bounty-tasks/` 下 500+ 个历史扫描 JSON 文件被 git 跟踪
- `node_modules/` 被 git 跟踪
- `.mili_comm/`、`.learnings/`、`.session-processed/` 等旧目录需清理

### 解决方案
- 创建 `.gitignore` 文件，包含：node_modules/、data/bounty-tasks/、*.log、*.sqlite、sessions/
- 所有历史扫描数据不再纳入版本控制

### Git 推送规则（2026-03-27 确认）
- **origin**（公共技能）：skills/ 目录 + SKILL.md + 技能脚本
- **xiaomila**（个人工作区）：memory/ + docs/ + intel/ + 配置 + .gitignore + MEMORY.md + SOUL.md + AGENTS.md
- **口诀**：技能推 origin，个人推 xiaomila；同一文件不同时推两仓库

_版本：v6.4 | 2026-03-27 | Git 清理与推送规则确认_

---

## 🧹 目录合并清理（2026-03-26 18:21）⭐⭐⭐⭐⭐

### 清理目标
- ❌ 删除 `/home/zhaog/.openclaw-media/` (旧小米椒数据目录)
- ✅ 合并到 `/home/zhaog/.openclaw-xiaomijiao/`

### 合并内容
| 数据类型 | 源路径 | 目标路径 | 状态 |
|----------|--------|---------|------|
| 微信 Bot 账号 | `.openclaw-media/.openclaw/openclaw-weixin/accounts/` | `.openclaw-xiaomijiao/.openclaw/openclaw-weixin/accounts/` | ✅ |
| QQ Bot 会话 | `.openclaw-media/.openclaw/qqbot/sessions/` | `.openclaw-xiaomijiao/.openclaw/qqbot/sessions/` | ✅ |
| QMD 配置 | `.openclaw-media/.config/qmd/` | `.openclaw-xiaomijiao/.config/qmd/` | ✅ |
| 会话文件 | `.openclaw-media/.openclaw/agents/main/sessions/` | `/tmp/xiaomijiao-sessions-backup/` | ✅ 备份 |
| 记忆数据库 | `.openclaw-media/.openclaw/memory/main.sqlite` | `/tmp/xiaomijiao-memory-backup.sqlite` | ✅ 备份 |

### 清理后目录结构
```
/home/zhaog/.openclaw/           # 主实例 (全局配置)
/home/zhaog/.openclaw-xiaomila/  # 小米辣 (PM+Dev)
/home/zhaog/.openclaw-xiaomijiao/ # 小米椒 (新媒体运营)
```

### 教训
- 旧目录 `.openclaw-media` 是历史遗留，应及时清理
- 合并前先备份重要数据 (会话/记忆数据库)
- 双 Gateway 架构下，每个实例独立管理自己的 `.openclaw/` 目录

_版本：v6.2 | 2026-03-26 18:22 | 目录合并清理完成_

---

## 📌 /home/zhaog/.openclaw/ 目录处理决定（2026-03-26 18:26）⭐⭐⭐⭐

### 目录状态
- **位置**: `/home/zhaog/.openclaw/`
- **用途**: 历史主实例目录
- **当前使用者**: 无（已被双 Gateway 替代）
- **包含内容**: 旧会话数据、全局插件、secrets、skills

### 处理决定
> "先保留，等完全没有问题了，再清理" - 官家指令

### 保留原因
1. **全局资源** - secrets/、skills/ 可能被引用
2. **观察期** - 确认双 Gateway 长期稳定
3. **回滚保障** - 如有问题可快速恢复

### 清理条件（需全部满足）
- [ ] 双 Gateway 稳定运行 7 天以上
- [ ] 确认无进程引用该目录
- [ ] 备份所有 secrets 和全局配置
- [ ] 官家明确同意清理

### 观察清单
| 检查项 | 频率 | 状态 |
|--------|------|------|
| Gateway 进程 | 每日 | ⏳ 观察中 |
| 会话文件更新 | 每日 | ⏳ 观察中 |
| 插件加载 | 每日 | ⏳ 观察中 |

_版本：v6.3 | 2026-03-26 18:26 | 主实例目录保留决定_

---

## 📌 今日重大变化（2026-03-27）⭐⭐⭐

### 系统架构重置
- 双Gateway独立运行：小米辣18789, 小米椒18790
- 微信/飞书插件已从配置中移除（TypeScript编译失败）
- 模型各自独立：小米辣glm-4.7-flashx, 小米椒glm-5

### Workspace大整理
- 散落文件：132 → 54个（减少60%）
- 目录结构：skills/, memory/, docs/, intel/, projects/, archive/, config/, logs/, scripts/, tools/, qmd/, tests/, tmp/
- docs/新建guides/：clawhub/, bounty/, system/ 子目录
- memory/清理重复文件，更新INDEX.md

### Git推送规则确认
- origin → openclaw-skills（公共技能）
- xiaomijiao → xiaomijiao-skills（个人工作区）

### 待解决问题
- QMD向量索引：缺llama_cpp/numpy模块，需安装依赖
- Git Secret #5：GitHub PAT泄露告警仍开放
