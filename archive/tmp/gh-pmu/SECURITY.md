# Security Policy

## Supported Versions

The following versions of gh-pmu are currently being supported with security updates:

| Version | Supported          |
| ------- | ------------------ |
| Latest minor release | ✅ Supported |
| Older releases   | ❌ Unsupported |

We recommend always using the latest version to benefit from security patches and improvements.

## Reporting a Vulnerability

We take the security of gh-pmu seriously. If you believe you have found a security vulnerability, please report it to us using **GitHub Private Vulnerability Reporting**.

### How to Report

1. Go to the [Security](../../security) tab of this repository
2. Click on "Report a vulnerability"
3. Provide a detailed description of the vulnerability including:
   - Steps to reproduce the issue
   - Potential impact
   - Any suggested fixes (if applicable)

We will acknowledge your report within **48 hours** and work with you to understand and validate the issue.

### Response Timeline

- **Acknowledgment**: Within 48 hours of your report
- **Validation**: We will confirm whether the issue is a valid vulnerability
- **Patch Development**: Target resolution within 30 days for confirmed vulnerabilities
- **Disclosure**: We will coordinate with you on public disclosure timing

## Security Measures

gh-pmu employs several security tools and practices:

### CI/CD Security Scanning

- **gosec** - Static analysis for Go code security issues
- **CodeQL** - Semantic code analysis for vulnerability detection
- **go vet** - Standard Go tool for suspicious constructs
- **golangci-lint** - Comprehensive linting including security checks

### Best Practices

- Minimal privilege principle for CLI operations
- Secure handling of GitHub tokens and credentials
- Regular dependency updates and vulnerability scanning

## Vulnerability Scope

### In Scope

The following types of issues are considered security vulnerabilities for gh-pmu:

- **Command injection** via crafted input or arguments
- **Token or credential leakage** in logs, errors, or output
- **Config file permission issues** that expose sensitive data
- **Dependency vulnerabilities** in direct or transitive dependencies
- **Path traversal** vulnerabilities in file operations

### Out of Scope

The following are generally considered out of scope:

- Issues requiring local access beyond normal CLI usage
- Vulnerabilities in upstream tools (Git, GitHub API, etc.)
- Denial of service through resource exhaustion (CLI is user-invoked)
- Issues only affecting unsupported versions

## Security Updates

Security updates will be released as patch versions (e.g., 1.2.3 → 1.2.4) and announced via:
- GitHub Releases
- Repository security advisories (for significant vulnerabilities)

## Credits

We appreciate responsible disclosure and will acknowledge reporters in our security advisories (unless they prefer to remain anonymous).

---

*Last updated: 2026-03-25*
