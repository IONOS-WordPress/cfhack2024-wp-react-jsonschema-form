# About

This Monorepo contains example uses cases of [JSON Schema](https://json-schema.org/) in WordPress. 

It demo's the use of [JSON Schema](https://json-schema.org/) as abstraction for user interfaces in WordPress utilizing [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). 

  - see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  - see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

See [What is the idea behind this project?](https://github.com/IONOS-WordPress/cloudfest-hackathon-2024/discussions/2) for more explanations.

# Development

  We will use [VS Code](https://code.visualstudio.com/) as our development environment. VS Code is widely used in Web Development due to its sleek developer experience. It comes with preconfigured launch configurations for debugging, required extensions and settings, among other features.

## Prerequisites

- Development Tools

  - [Git](https://git-scm.com/)

    You will need Git to clone the repository and to push your changes.

  - [Docker](https://docs.docker.com/engine/install/)

    Docker is a prerequisite of [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/), a tool for managing WordPress development environments. It is also used to build and run the Docker containers that power the development environment.

    _I would prefer to use the [WordPress Playground](https://wordpress.org/playground/) over [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) but it currently lacks a mandatory development feature - PHP debugging support._

  - [pnpm](https://pnpm.io/installation) is a drop-in replacement for npm. It is fully compatible with the npm registry and can be used with any NodeJS project.
    
    [You may ask why not npm ?](https://pnpm.io/feature-comparison) :
    
      - **exponential** faster than npm. If you once use it, you will never miss it again - i swear 🤞

      - features [automatic provisioning of the configured NodeJS version](https://pnpm.io/npmrc#nodejs-settings) - you don't need to install a specific NodeJS version manually.
      
        Say Goodbye to `nvm`, `volta` and friends ❤️ - you will never need it again.

    - [pnpm](https://pnpm.io) is tailored for **monorepos first**. It supports a monorepo workflow out of the box.

  - [Bash](https://www.gnu.org/software/bash/)

    It is the default shell on most Linux distributions and macOS. On Windows, we use the Windows Subsystem for Linux (WSL) to run bash.

    _There are myriads of different other scripting options but we ideally need to pick one where we all together feel comfortable with._

  _@IMPROVEMENT: Tools could be prepackaged into a [vscode dev container](https://code.visualstudio.com/docs/devcontainers/containers)._

## Setup Development Environment

- Get developer access to the repository by contacting the owner of the repository.

- Clone the repository : `git clone git@github.com:IONOS-WordPress/cloudfest-hackathon-2024.git`

- Run `pnpm install` to install the required dependencies.

- Run `pnpm run build` to build the project.

- Run `pnpm run dev` to start the development environment.

  This will start a local WordPress using a preconfigured [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) environment

- Open the WordPress admin dashboard by visiting [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin)

  Use the following credentials to log in:

    - Username: `admin`
    - Password: `password`

## Folder Structure

Each of the use cases is located in a separate folder in the `packages` directory as a separate sub project. This Monorepo structure allows us to work on multiple use cases in parallel.

Each sub project contains a `README.md` file with further instructions.

## Conventions

@TODO: Add coding conventions (linting, formatting, etc.)

@TODO: Add Git branching|pull requests, commitzen, changeset etc.

## Development Workflow

@TODO: Add development workflow

### Debugging

@TODO: Add debugging instructions

## Commands

@TODO: explain available package scripts

---

@TODO: import existing information's

