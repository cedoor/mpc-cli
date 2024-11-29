<p align="center">
    <h1 align="center">
        MPC CLI
    </h1>
    <p align="center">A streamlined tool for creating Multi-Party Computation (MPC) projects with ease.</p>
</p>

<p align="center">
    <a href="https://github.com/cedoor/mpc-cli" target="_blank">
        <img src="https://img.shields.io/badge/project-MPC-CLI-blue.svg?style=flat-square">
    </a>
    <a href="/LICENSE">
        <img alt="Github license" src="https://img.shields.io/github/license/cedoor/mpc-cli.svg?style=flat-square">
    </a>
    <a href="https://github.com/cedoor/mpc-cli/actions?query=workflow%3Amain">
        <img alt="GitHub Workflow" src="https://img.shields.io/github/actions/workflow/status/cedoor/mpc-cli/main.yml?branch=main&label=test&style=flat-square&logo=github">
    </a>
    <a href="https://eslint.org/">
        <img alt="Linter eslint" src="https://img.shields.io/badge/linter-eslint-8080f2?style=flat-square&logo=eslint">
    </a>
    <a href="https://prettier.io/">
        <img alt="Code style prettier" src="https://img.shields.io/badge/code%20style-prettier-f8bc45?style=flat-square&logo=prettier">
    </a>
    <a href="http://commitizen.github.io/cz-cli/">
        <img alt="Commitizen friendly" src="https://img.shields.io/badge/commitizen-friendly-586D76?style=flat-square">
    </a>
</p>

<div align="center">
    <h4>
        <a href="/CONTRIBUTING.md">
            👥 Contributing
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="/CODE_OF_CONDUCT.md">
            🤝 Code of conduct
        </a>
        <span>&nbsp;&nbsp;|&nbsp;&nbsp;</span>
        <a href="https://github.com/cedoor/mpc-cli/contribute">
            🔎 Issues
        </a>
    </h4>
</div>

Visit [create-mpc-app](https://github.com/cedoor/mpc-cli/tree/main/packages/cli) for detailed instructions on how to create your MPC project.

## 🛠 Install

Clone this repository:

```bash
git clone https://github.com/cedoor/mpc-cli.git
```

And install the dependencies:

```bash
cd mpc-cli && yarn
```

### Code quality and formatting

Run [ESLint](https://eslint.org/) to analyze the code and catch bugs:

```bash
yarn lint
```

Run [Prettier](https://prettier.io/) to check formatting rules:

```bash
yarn format
```

Or to automatically format the code:

```bash
yarn format:write
```

### Conventional commits

MPC-CLI uses [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/). A [command line utility](https://github.com/commitizen/cz-cli) to commit using the correct syntax can be used by running:

```bash
git commit
```

It will also automatically check that the modified files comply with ESLint and Prettier rules.

### Testing

Run [Jest](https://jestjs.io/) to test the JS libraries:

```bash
yarn test
```

### Build libraries

Run [Rollup](https://www.rollupjs.org) to build all the packages:

```bash
yarn build
```

### Releases

Bump a new version with:

```bash
yarn version:bump <version>
# e.g. yarn version:bump 2.0.0
```

It will create a commit and a git tag that will need to be pushed on the main branch. A workflow will be triggered and will
publish the MPC-CLI packages on [npm](https://www.npmjs.com/) and release a new version on Github with its changelogs automatically.
