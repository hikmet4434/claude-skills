---
name: Secure Development Skill
description: A comprehensive skill for senior developers, DevOps engineers, and software engineers to write secure code by integrating CVE checking, vulnerability detection, bug fixing, and testing into the development workflow.
author: MiniMax Agent
version: 1.0
created: 2026-05-24
target_audience:
  - Senior Developers
  - DevOps Engineers
  - Software Engineers
  - Backend Engineers
  - Frontend Engineers
tags:
  - security
  - cve
  - vulnerability
  - secure-coding
  - devops
  - development-workflow
  - bug-fixing
  - testing
---

# SECURE CODING SKILL: CVE-Aware Development Workflow

---

## 1. Skill Overview

This skill enables software developers and engineers to write secure, bug-free code by integrating vulnerability checking, CVE analysis, and comprehensive testing into every development cycle.

### 1.1 Core Objectives

- Check for known CVEs and vulnerabilities before writing code
- Write secure code following best practices
- Check for bugs, vulnerabilities, and security issues
- Fix identified issues promptly
- Test thoroughly to ensure reliability

### 1.2 Applicable Technologies

This skill applies to all programming languages and frameworks including but not limited to:

- Web applications (React, Angular, Vue, Django, Flask, Spring)
- Backend services (Node.js, Python, Java, Go, Rust, C#)
- Mobile applications (iOS, Android, React Native, Flutter)
- DevOps tools and scripts (Bash, PowerShell, Python)
- Infrastructure as Code (Terraform, Ansible, CloudFormation)

---

## 2. Development Workflow

### 2.1 Pre-Development Phase: Intelligence Gathering

Before writing any code, perform the following checks:

#### Technology Stack Analysis

```
1. Identify all technologies in the project:
   - Programming language(s) and version(s)
   - Frameworks and their versions
   - Libraries and dependencies
   - Database systems
   - Infrastructure components

2. For each technology, search for:
   - Recent CVEs (past 2 years)
   - Known exploit chains
   - Security patches and updates
   - Common vulnerability patterns
```

#### CVE Search Queries

- Search for CVEs related to your programming language
- Search for CVEs related to your frameworks and libraries
- Search for CVEs related to your dependencies
- Check security advisories for your technology stack

### 2.2 Development Phase: Secure Coding

Follow these secure coding practices:

#### Input Validation

- Validate all user inputs on the server side
- Use allowlist validation when possible
- Sanitize and escape output based on context
- Never trust user-supplied data

#### Authentication and Authorization

- Implement proper authentication mechanisms
- Use industry-standard protocols (OAuth 2.0, JWT with proper validation)
- Apply principle of least privilege
- Verify permissions at every trust boundary

#### Secure Data Handling

- Encrypt sensitive data at rest and in transit
- Use secure session management
- Implement proper secret management (never hardcode secrets)
- Follow PCI-DSS or similar standards for payment data

#### Secure Dependencies

- Use official packages from trusted sources
- Verify package integrity with checksums
- Pin dependency versions for reproducibility
- Remove unused dependencies

### 2.3 Post-Development Phase: Security Verification

After writing code, perform these checks:

#### Static Analysis Security Testing (SAST)

- Run linters with security plugins
- Use SAST tools (Semgrep, Bandit, ESLint security plugins, CodeQL)
- Check for common vulnerability patterns
- Review code for OWASP Top 10 issues

#### Dependency Vulnerability Scanning

- Run dependency scanners (npm audit, pip-audit, Snyk, Dependabot)
- Check for known CVEs in dependencies
- Review license compliance
- Update vulnerable dependencies

#### Manual Security Review

- Review access control implementation
- Check data validation and sanitization
- Verify error handling and logging
- Review cryptographic operations
- Check third-party service integrations

### 2.4 Bug and Vulnerability Remediation

If vulnerabilities or bugs are found:

```
1. Classify severity using CVSS scoring:
   - Critical (9.0-10.0): Immediate action required
   - High (7.0-8.9): Urgent attention needed
   - Medium (4.0-6.9): Schedule remediation
   - Low (0.1-3.9): Address when convenient

2. Prioritize fixes based on:
   - Severity and exploitability
   - Impact on confidentiality, integrity, availability
   - User exposure and attack surface

3. Implement fixes following secure coding practices

4. Verify fixes eliminate vulnerability without introducing new issues

5. Document remediation steps and lessons learned
```

### 2.5 Testing Phase: Comprehensive Validation

#### Unit Testing

- Test individual functions and components
- Cover edge cases and boundary conditions
- Test error handling paths

#### Security Testing

- Test input validation and sanitization
- Test authentication and authorization flows
- Test for injection attacks (SQL, XSS, Command Injection)
- Test for CSRF, CORS, and other web vulnerabilities

#### Integration Testing

- Test component interactions
- Verify updated dependencies work correctly
- Test API contracts and data flows

#### Regression Testing

- Ensure existing functionality unaffected
- Verify performance within acceptable bounds
- Confirm no new vulnerabilities introduced

---

## 3. CVE Checking Process

### 3.1 Pre-Code CVE Check

Before starting development on any component:

```
1. List all technologies you will use
2. For each technology:
   a. Check NVD (National Vulnerability Database)
   b. Check MITRE CVE database
   c. Check vendor security advisories
   d. Check GitHub Security Advisories
3. Document known vulnerabilities
4. Choose technologies with minimal known risks
5. Plan for dependency updates in maintenance phase
```

### 3.2 During Development CVE Monitoring

```
1. Subscribe to security advisories for your stack
2. Use automated dependency scanning
3. Check for updates before adding new dependencies
4. Review CVE reports during code reviews
5. Track vulnerability disclosures in your industry
```

### 3.3 Post-Development CVE Verification

```
1. Run comprehensive vulnerability scan
2. Review all findings with security team
3. Create remediation plan for any issues
4. Test fixes thoroughly
5. Document CVE status in project artifacts
```

---

## 4. Bug Detection and Fixing Process

### 4.1 Automated Bug Detection

```
1. Static Code Analysis:
   - Run linters and type checkers
   - Use IDE warnings and suggestions
   - Run SAST tools

2. Dynamic Analysis:
   - Run unit and integration tests
   - Use memory analysis tools (Valgrind, AddressSanitizer)
   - Run fuzz testing

3. Dependency Analysis:
   - Check for known vulnerable dependencies
   - Review dependency changes
   - Monitor for supply chain attacks
```

### 4.2 Manual Bug Detection

```
1. Code Review:
   - Peer review all changes
   - Focus on edge cases and error handling
   - Check for race conditions and concurrency issues

2. Security Review:
   - Review authentication and authorization logic
   - Check for injection vulnerabilities
   - Verify data sanitization

3. Architecture Review:
   - Verify trust boundaries
   - Check data flow security
   - Review error handling patterns
```

### 4.3 Bug Fixing Process

```
1. Reproduce the bug:
   - Write a test that fails with the bug
   - Document steps to reproduce

2. Analyze root cause:
   - Identify the source of the bug
   - Check for similar issues in codebase
   - Determine impact scope

3. Implement fix:
   - Write secure, maintainable code
   - Follow coding standards
   - Consider performance implications

4. Verify fix:
   - Run failing test to confirm it passes
   - Run all related tests
   - Perform security review of the fix

5. Prevent regression:
   - Add tests for the bug scenario
   - Update documentation if needed
   - Share lessons learned with team
```

---

## 5. Vulnerability Detection and Remediation

### 5.1 Vulnerability Categories

```
1. OWASP Top 10:
   - A01: Broken Access Control
   - A02: Cryptographic Failures
   - A03: Injection
   - A04: Insecure Design
   - A05: Security Misconfiguration
   - A06: Vulnerable Components
   - A07: Authentication Failures
   - A08: Data Integrity Failures
   - A09: Logging Failures
   - A10: SSRF

2. SANS Top 25:
   - Focus on most dangerous software errors
   - Includes CWE entries for common issues

3. Language-Specific Vulnerabilities:
   - Buffer overflows (C/C++)
   - Type confusion (Python, JavaScript)
   - Memory safety issues (Rust, Go)
```

### 5.2 Vulnerability Detection Tools

| Tool | Type | Languages | Purpose |
|------|------|-----------|---------|
| Semgrep | SAST | Multiple | Pattern-based security analysis |
| Bandit | SAST | Python | Python security linter |
| ESLint Security | SAST | JavaScript | JavaScript security analysis |
| Snyk | SCA | Multiple | Dependency vulnerability scanning |
| Dependabot | SCA | Multiple | Automated dependency updates |
| Trivy | Container | Multiple | Container vulnerability scanning |

### 5.3 Vulnerability Remediation Process

```
1. Identify:
   - Use automated and manual scanning
   - Document all findings with evidence

2. Classify:
   - Assess severity using CVSS
   - Determine exploitability
   - Evaluate business impact

3. Remediate:
   - Apply security patches
   - Implement compensating controls
   - Refactor vulnerable code

4. Verify:
   - Confirm vulnerability is fixed
   - Ensure no regression introduced
   - Validate with penetration testing

5. Monitor:
   - Track for new vulnerabilities
   - Update monitoring rules
   - Review lessons learned
```

---

## 6. Testing Strategy

### 6.1 Security Testing Checklist

#### Pre-Commit Security Checklist

```
[ ] All dependencies scanned and updated
[ ] Code passes static analysis without high/critical findings
[ ] Input validation implemented on all entry points
[ ] Authentication and authorization verified
[ ] Secure configuration reviewed
[ ] Secrets not hardcoded in source
[ ] Security documentation updated
[ ] Security tests written and passing
```

#### Pre-Merge Security Checklist

```
[ ] All security findings remediated or formally accepted
[ ] Security tests pass in CI pipeline
[ ] Penetration testing completed (if applicable)
[ ] Security review approved by security team
[ ] Dependencies updated to secure versions
[ ] No new vulnerabilities introduced
[ ] Security documentation complete
```

### 6.2 Testing Types

#### Unit Tests

- Test individual functions in isolation
- Cover happy path and error cases
- Use mocking for external dependencies
- Aim for high code coverage

#### Integration Tests

- Test component interactions
- Verify data flows between modules
- Test API contracts
- Validate database operations

#### Security Tests

- Test input validation boundaries
- Test authentication flows
- Test authorization at each role level
- Test for common attack vectors

#### Performance Tests

- Test under normal load
- Test under peak load
- Identify bottlenecks
- Ensure security controls don't impact performance significantly

---

## 7. CI/CD Security Integration

### 7.1 Security Pipeline Stages

```
1. Pre-Build:
   - Secret scanning (GitLeaks, TruffleHog)
   - Dependency vulnerability check
   - License compliance check

2. Build:
   - SAST scanning (Semgrep, CodeQL)
   - Container image scanning (Trivy)
   - Build artifact signing

3. Test:
   - Security unit tests
   - Dynamic analysis (DAST)
   - Fuzz testing
   - Penetration testing (automated)

4. Deploy:
   - Infrastructure security validation
   - Configuration compliance check
   - Runtime vulnerability scanning
   - Security monitoring enabled
```

### 7.2 Security Metrics

| Metric | Target | Measurement |
|--------|--------|-------------|
| Vulnerabilities Found in Dev | >80% | Percentage caught before production |
| Mean Time to Remediate (MTTR) | <7 days | Average time to fix vulnerabilities |
| Critical Vulnerability Age | <24 hours | Time critical issues remain unfixed |
| Security Test Coverage | >90% | Percentage of code with security tests |
| Dependency Currency | >95% | Percentage of dependencies up-to-date |

---

## 8. Documentation Requirements

### 8.1 Security Documentation

```
1. Threat Model:
   - Describe system architecture
   - Identify trust boundaries
   - Document data flows
   - List potential threats

2. Security Design:
   - Authentication mechanisms
   - Authorization model
   - Data protection measures
   - Encryption approach

3. Vulnerability Reports:
   - List all identified vulnerabilities
   - Include severity assessment
   - Document remediation steps

4. Security Testing Results:
   - Summary of test coverage
   - Identified issues and resolution
   - Penetration testing results
```

### 8.2 Code Documentation

```
1. Inline Security Comments:
   - Document security assumptions
   - Explain input validation logic
   - Note permission requirements

2. README Security Section:
   - Security requirements
   - Configuration instructions
   - Known security considerations

3. API Security Documentation:
   - Authentication requirements
   - Rate limiting policies
   - Expected security headers
```

---

## 9. Continuous Improvement

### 9.1 Post-Incident Reviews

After any security incident:

```
1. Document what happened
2. Identify root causes
3. Review response effectiveness
4. Update skill and processes
5. Share lessons learned with team
```

### 9.2 Regular Updates

```
1. Monthly: Review CVE feeds for your stack
2. Quarterly: Update security tools and plugins
3. Annually: Comprehensive security architecture review
4. Continuous: Update dependencies and patch systems
```

### 9.3 Skill Evolution

- Stay current with new vulnerability types
- Update tools and techniques
- Incorporate lessons learned
- Share knowledge with team
- Contribute to security community

---

## 10. Quick Reference

### 10.1 Common CVE Sources

| Source | URL | Coverage |
|--------|-----|----------|
| NVD | nvd.nist.gov | US government CVE database |
| MITRE | cve.mitre.org | CVE list and references |
| GitHub | github.com/advisories | Security advisories |
| Snyk | snyk.io/vuln | Vulnerability database |
| OpenSource | osv.dev | Open source vulnerability database |

### 10.2 Security Tools Quick Reference

| Language | SAST Tool | SCA Tool | Secret Scanner |
|----------|----------|----------|----------------|
| Python | Bandit, Semgrep | pip-audit, Snyk | GitLeaks |
| JavaScript | ESLint Security | npm audit, Snyk | GitLeaks |
| Java | Semgrep, CodeQL | OWASP Dependency-Check | GitLeaks |
| Go | Semgrep, Gosec | govulncheck | GitLeaks |
| Rust | Semgrep, Clippy | cargo-audit | GitLeaks |
| All | Semgrep | Snyk, Dependabot | GitLeaks |

### 10.3 Severity Classification

| CVSS Score | Severity | Response Time |
|------------|----------|---------------|
| 9.0-10.0 | Critical | Immediate (hours) |
| 7.0-8.9 | High | Within 24-48 hours |
| 4.0-6.9 | Medium | Within 1-2 weeks |
| 0.1-3.9 | Low | Next scheduled update |

---

## 11. Summary

This skill ensures that whenever you write code:

1. **Before Coding**: Check for known CVEs and vulnerabilities in your technology stack
2. **During Coding**: Follow secure coding practices and implement proper validation
3. **After Coding**: Perform security scanning and manual review
4. **If Issues Found**: Classify severity, prioritize fixes, implement secure solutions
5. **Testing**: Run comprehensive tests including security-specific tests
6. **Document**: Maintain security documentation and update it as needed
7. **Monitor**: Continuously monitor for new vulnerabilities and update dependencies

By following this skill, you will produce more secure, reliable, and maintainable code while reducing the risk of vulnerabilities reaching production.