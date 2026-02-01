# GitHub Agents

This directory contains agent configurations for automated repository management tasks.

## Dependabot PR Review Agent

The Dependabot PR Review Agent (`dependabot-reviewer.md`) provides guidelines for reviewing and managing Dependabot pull requests automatically.

### How It Works

1. **Automatic Review Workflow**: The `.github/workflows/dependabot-auto-merge.yml` workflow automatically runs when Dependabot creates a pull request.

2. **Safe Auto-Merge**: Patch and minor version updates are automatically approved and enabled for auto-merge after CI checks pass.

3. **Manual Review for Major Updates**: Major version updates and other risky changes are flagged for manual review.

### Update Types

- **Patch Updates** (e.g., 1.2.3 → 1.2.4): Auto-approved and auto-merged ✅
- **Minor Updates** (e.g., 1.2.3 → 1.3.0): Auto-approved and auto-merged ✅
- **Major Updates** (e.g., 1.2.3 → 2.0.0): Requires manual review ⚠️

### Manual Review Process

For PRs that require manual review:

1. Check the PR comment from the Dependabot Auto-Review workflow
2. Review the changelog for breaking changes
3. Verify all CI checks are passing
4. Test locally if needed:
   ```bash
   gh pr checkout <PR_NUMBER>
   yarn install
   yarn verify
   ```
5. Manually approve and merge when ready

### Disabling Auto-Merge

If you need to prevent auto-merge on a specific PR:

```bash
gh pr merge --disable-auto <PR_NUMBER>
```

### Security

The workflow includes:
- Verification that the PR author is `dependabot[bot]`
- Required CI checks must pass before merge
- Dependency metadata validation
- Update type classification

### Customization

To modify the auto-merge behavior:

1. Edit `.github/workflows/dependabot-auto-merge.yml` to change which update types are auto-merged
2. Edit `.github/agents/dependabot-reviewer.md` to update review guidelines
3. Configure Dependabot settings in `.github/dependabot.yml`

### Agent Usage

The `dependabot-reviewer.md` agent configuration can be used by AI coding assistants (like GitHub Copilot) to:
- Understand project-specific dependency management policies
- Make informed decisions about dependency updates
- Follow consistent review criteria across all Dependabot PRs

## Adding New Agents

To add a new agent:

1. Create a new Markdown file in this directory (e.g., `my-agent.md`)
2. Define the agent's purpose, responsibilities, and guidelines
3. Create corresponding GitHub Actions workflows if needed
4. Document the agent in this README

## References

- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Dependabot Fetch Metadata Action](https://github.com/dependabot/fetch-metadata)
