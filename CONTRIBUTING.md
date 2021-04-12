# Contributing

## Contributing to Bedrock Layout

Thank you for taking the time to contribute! 🎉

When contributing to Bedrock Layout Primitives, please first create an [issue](https://github.com/Bedrock-Layouts/Bedrock/issues) to discuss the change you wish to make before making a change.

Bedrock Layout Primitives is a monorepo of packages that currently are versioned independently of each other. It also includes a documentation website at the root. To manage all of these things, Bedrock utilizes three important tools. First, it uses Lerna to manage all the repos into one monorepo. Lerna is used to publish to NPM, tag releases to Github, and process change logs under each package. To make the above possible in CI, Bedrock has adopted conventional commits and uses commitizen and husky to enforce it.

Before making a pull request

1. Fork the repository.
2. Clone the repository from your GitHub.
3. Set up your environment with `npm install` (not yarn at this time)
4. Check out a new branch and add your modification.
5. Add test cases for all your changes.
6. Use commitizen to do git commit by running `npm run cz` (be sure to stage your changes first).
7. This will run `npm run verify` automatically as a pre-commit hook. If anything fails, fix and follow step 6 again.
8. Update README.md and Doc site under `src/` in the root.
9. **DO NOT BUMP ANY VERSION NUMBERS OR UPDATE CHANGELOG**.
10. Send a pull request 🙏
