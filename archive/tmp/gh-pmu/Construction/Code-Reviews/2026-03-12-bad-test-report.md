# Bad Test Review Report — 2026-03-12

**Mode:** Full review (`--full`)
**Test Files Reviewed:** 59
**Test Functions Reviewed:** ~1,000+
**Charter:** GitHub Praxis Management Utility (Go 1.22 / Cobra / GitHub GraphQL)

## Summary

| Severity | Count |
|----------|-------|
| High     | 0     |
| Medium   | 4     |
| Low      | 20    |
| **Total** | **24** |
| **Clean** | **~976+ tests** |

## Findings

### Medium Severity (4)

| # | File | Test | Concern | Evidence |
|---|------|------|---------|----------|
| F1 | `cmd/field_test.go` | `TestRunFieldCreate_SingleSelectRequiresOptions` | Tautological test | Manually checks `opts.fieldType` and `len(opts.options)` locally instead of calling implementation |
| F2 | `cmd/field_test.go` | `TestRunFieldCreate_InvalidFieldType` | Tautological test | Manually switches on type string instead of invoking the implementation — tests nothing about actual code |
| F3 | `cmd/create_integration_test.go` | `TestRunCreate_Integration_Labels` | Missing assertion | Creates issue with `--label bug`, fetches JSON output, but never asserts label is present. `env` var unused |
| F4 | `cmd/wrapper_test.go` | All `TestRun*` wrappers | Structural-only coverage | httptest server returns minimal GraphQL responses — validates wiring but not business logic end-to-end |

### Low Severity (20)

| # | File | Test | Concern |
|---|------|------|---------|
| L1 | `cmd/field_test.go` | `TestFieldCreateOptions_AllTypes` | Tautological — duplicates implementation switch locally |
| L2 | `cmd/close_test.go` | `TestRunClose_InvalidIssueNumber` | Doesn't assert specific error message |
| L3 | `cmd/create_test.go` | `TestCreateCommand_RequiresTitleInNonInteractiveMode` | Assertion passes for wrong reason (config error, not title validation) |
| L4 | `cmd/edit_test.go` | Custom `contains` helper | Reimplements `strings.Contains` unnecessarily |
| L5-L11 | `cmd/filter_test.go`, `intake_test.go`, `list_test.go`, `move_test.go`, `split_test.go`, `sub_test.go`, `view_test.go` | Various non-JSON output tests | **Systematic:** stdout output not captured — `fmt.Printf` writes to `os.Stdout` instead of `cmd.OutOrStdout()`, assertions limited to `err == nil` |
| L12 | `cmd/move_test.go` | `TestRunMoveWithDeps/recursive` | Does not verify parent-before-child update ordering |
| L13 | `cmd/triage_test.go` | `TestMatchesTriageQuery` | No tests with 3+ compound conditions |
| L14 | `cmd/wrapper_test.go` | `TestRunMove` | Mock response doesn't validate GraphQL mutation variables |
| L15 | `cmd/init_integration_test.go` | `TestRunInit_Integration_ProjectValidation` | Accepts either success or graceful failure |
| L16 | `cmd/sub_create_integration_test.go` | `TestRunSubCreate_Integration_NoInheritLabels` | Doesn't verify label absence on child |
| L17 | `cmd/triage_integration_test.go` | `TestRunTriage_Integration_NoQueryOrConfig` | Accepts any non-empty output |
| L18 | `cmd/uat_epic1_test.go` | `TestUAT_SplitIssue_Workflow` | Output extraction pattern may not match actual format |
| L19 | `internal/ui/ui_test.go` | `TestOpenInBrowser` | No-op test — never calls the function |
| L20 | `internal/version/version_test.go` | `TestVersion_IsValidSemver` | Only checks for dot character presence |

## Cross-Cutting Themes

### 1. Systematic Stdout Capture Gap (L5-L11)
~15 tests across 7 files share this pattern: non-JSON output goes to `os.Stdout` via `fmt.Printf` rather than `cmd.OutOrStdout()`. Tests can only assert `err == nil`, not output content.

**Root cause:** Implementation functions use `fmt.Printf` instead of `cmd.OutOrStdout()`.
**Fix:** Single architectural change — route all output through `cmd.OutOrStdout()` in `run*WithDeps` functions.

### 2. Tautological Tests in field_test.go (F1, F2, L1)
3 of 7 tests duplicate implementation logic locally rather than exercising the actual code path. These tests pass regardless of implementation correctness.

### 3. Integration Test Weak Assertions (L15-L18)
Several integration tests accept overly broad success criteria, reducing their defect-detection value.

## Per-File Status

| File | Status | Findings |
|------|--------|----------|
| `cmd/accept_test.go` | approved | 0 |
| `cmd/acceptance_gate_test.go` | approved | 0 |
| `cmd/board_test.go` | approved | 0 |
| `cmd/branch_test.go` | approved | 0 |
| `cmd/close_test.go` | flagged | 1 |
| `cmd/comment_test.go` | approved | 0 |
| `cmd/create_test.go` | flagged | 1 |
| `cmd/create_integration_test.go` | flagged | 1 |
| `cmd/edit_test.go` | flagged | 1 |
| `cmd/edit_integration_test.go` | approved | 0 |
| `cmd/field_test.go` | flagged | 3 |
| `cmd/filter_test.go` | flagged | 1 |
| `cmd/history_test.go` | approved | 0 |
| `cmd/init_test.go` | approved | 0 |
| `cmd/init_integration_test.go` | flagged | 1 |
| `cmd/intake_test.go` | flagged | 1 |
| `cmd/intake_integration_test.go` | approved | 0 |
| `cmd/list_test.go` | flagged | 1 |
| `cmd/list_integration_test.go` | approved | 0 |
| `cmd/move_test.go` | flagged | 2 |
| `cmd/move_integration_test.go` | approved | 0 |
| `cmd/root_test.go` | approved | 0 |
| `cmd/split_test.go` | flagged | 1 |
| `cmd/split_integration_test.go` | approved | 0 |
| `cmd/sub_test.go` | flagged | 1 |
| `cmd/sub_add_integration_test.go` | approved | 0 |
| `cmd/sub_create_integration_test.go` | flagged | 1 |
| `cmd/sub_list_integration_test.go` | approved | 0 |
| `cmd/sub_remove_integration_test.go` | approved | 0 |
| `cmd/triage_test.go` | flagged | 1 |
| `cmd/triage_integration_test.go` | flagged | 1 |
| `cmd/uat_epic1_test.go` | flagged | 1 |
| `cmd/uat_epic3_test.go` | approved | 0 |
| `cmd/validation_test.go` | approved | 0 |
| `cmd/view_test.go` | flagged | 1 |
| `cmd/view_integration_test.go` | approved | 0 |
| `cmd/wrapper_test.go` | flagged | 2 |
| `internal/api/client_test.go` | approved | 0 |
| `internal/api/errors_test.go` | approved | 0 |
| `internal/api/integration_test.go` | approved | 0 |
| `internal/api/mutations_test.go` | approved | 0 |
| `internal/api/queries_test.go` | approved | 0 |
| `internal/api/retry_test.go` | approved | 0 |
| `internal/config/acceptance_test.go` | approved | 0 |
| `internal/config/config_test.go` | approved | 0 |
| `internal/defaults/embed_test.go` | approved | 0 |
| `internal/framework/detect_test.go` | approved | 0 |
| `internal/ui/ui_test.go` | flagged | 1 |
| `internal/version/version_test.go` | flagged | 1 |
| `test/e2e/board_test.go` | approved | 0 |
| `test/e2e/branch_test.go` | approved | 0 |
| `test/e2e/cleanup_test.go` | approved | 0 |
| `test/e2e/config_test.go` | approved | 0 |
| `test/e2e/e2e_test.go` | approved | 0 |
| `test/e2e/filter_test.go` | approved | 0 |
| `test/e2e/helpers_test.go` | approved | 0 |
| `test/e2e/init_test.go` | approved | 0 |
| `test/e2e/view_test.go` | approved | 0 |
| `test/e2e/workflow_test.go` | approved | 0 |

## Overall Assessment

The test suite is **strong**. The `runXWithDeps` pattern with interface-based dependency injection is well-executed across the codebase. ~976+ of ~1,000+ test functions are clean with genuine functional coverage. The 4 medium-severity findings are isolated to `field_test.go` (tautological tests), `create_integration_test.go` (missing assertion), and `wrapper_test.go` (structural-only coverage). The systematic stdout capture gap (L5-L11) is a known architectural limitation, not an oversight.
