# Contributing

## Contributing to Bedrock Layout

Thank you for taking the time to contribute! 🎉

When contributing to commitizen, please first create an [issue](https://github.com/Bedrock-Layouts/Bedrock/issues) to discuss the change you wish to make before making a change.

Bedrock Layout Primitives is a monorepo of packages that currently are versioned independantly of eachother as well as a documentation website at the root. To manage this Bedrock utilizes 3 important tools. First it uses Lerna to manage all the repos into one monorepo. This includes publishing to NPM, taging releases to Github, and processing change logs under each repo. To make automating the above possible in CI, Bedrock has adopted conventional commits and uses commitizen and husky to enforce it.

Before making a pull request

1. Fork the repository.
2. Clone the repository from your GitHub.
3. Set up your environment with `npm install` (not yarn at this time)
4. Check out a new branch and add your modification.
5. Add test cases for all your changes.
6. Use commitizen to do git commit by running `npm run cz` (be sure to stage your changes first).
7. This will run `npm run verify` automatically as a pre-commit hook. If anything fails, fix and follow step 6 again.
8. Update README.md and/or Doc site under `src/` in the root.
9. **DO NOT BUMP ANY VERSION NUMBERS OR UPDATE CHANGELOG**.
10. Send a pull request 🙏
