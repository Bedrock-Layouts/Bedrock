# Contributing to Bedrock Layout

Thank you for taking the time to contribute! 🎉

There are many ways to contribute to the Bedrock Layout Primitives. The most common is to fork the repository and make your own changes. You can also contribute directly to the discussions at the [GitHub repository](https://github.com/Bedrock-Layouts/Bedrock/discussions/categories/general) or you can create an [issue](https://github.com/Bedrock-Layouts/Bedrock/issues) to discuss the changes or problems you find.

## Contributing Code

When contributing code to Bedrock Layout Primitives, please first create an [issue](https://github.com/Bedrock-Layouts/Bedrock/issues) to discuss the changes.

Bedrock Layout Primitives is a monorepo of packages that are currently versioned independently of each other. It also utilizes Storybook as a documentation website.

To manage all of these things, Bedrock uses Lerna to manage all the repositories into one monorepo. Lerna is used to publish to NPM, tag releases to Github, and process change logs under each package. To make the above possible in CI, Bedrock has adopted conventional commits and uses commitizen and husky to enforce it.

To make a pull request, do the following:

1. Fork the repository.
1. Clone the repository from your GitHub.
1. Set up your environment with `yarn`
1. Check out a new branch and add your modification.
1. Add test cases for all your changes.
1. Update any README.md and documentation in Storybook under the examples folder in the corresponding package.
1. Use commitizen to do git commit by running `yarn cz` (be sure to stage your changes first). Doing this will automatically run `yarn verify` as a pre-commit hook when you do this. If anything fails, fix and follow this step again.
1. **DO NOT BUMP ANY VERSION NUMBERS OR UPDATE CHANGELOG.**
1. Send a pull request 🙏
