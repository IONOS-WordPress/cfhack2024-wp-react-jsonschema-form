# About

This Monorepo contains example uses cases of [JSON Schema](https://json-schema.org/) in WordPress. 

It demo's the use of [JSON Schema](https://json-schema.org/) as abstraction for user interfaces in WordPress utilizing [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). 

  - see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  - see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

See [What is the idea behind this project?](https://github.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/discussions/2) for more explanations.

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
    
      - **exponential** faster than npm/yarn & Co. If you once use it, you will never miss it again - i swear 🤞

      - features [automatic provisioning of the configured NodeJS version](https://pnpm.io/npmrc#nodejs-settings) - you don't need to install a specific NodeJS version manually. Say Goodbye to `nvm`, `volta` and friends ❤️ - you will never need it anymore.

      - [pnpm](https://pnpm.io) is [Lerna](https://lerna.js.org/) on steroids. 
      
        It is tailored for **monorepos first** with it's exceptional workspace features.
    
  - [Bash](https://www.gnu.org/software/bash/)

    It is the default shell on most Linux distributions and macOS. On Windows, we use the Windows Subsystem for Linux (WSL) to run bash.

    _There are myriads of different other scripting options but we ideally need to pick one where we all together feel comfortable with._

  _@IMPROVEMENT: Tools could be prepackaged into a [vscode dev container](https://code.visualstudio.com/docs/devcontainers/containers)._

## Setup Development Environment

- Get developer access to the repository by contacting the owner of the repository.

- Clone the repository : `git clone git@github.com:IONOS-WordPress/workspace/cfhack2024-wp-react-jsonschema-form`

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

@TODO: explain why not Typescript 

@TODO: Add coding conventions (linting, formatting, etc.)

@TODO: Add Git branching|pull-requests|git-flow vs trunk based?, commitizen, changeset, etc.

## Development Workflow

@TODO: Add development workflow

### Debugging

@TODO: Add debugging instructions

## Commands

@TODO: explain available package scripts

## Tips

### Gutenberg

#### Know the available the Gutenberg components and their options

[@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/) is a huge library providing a lot of components.

The easiest way to get an overview about all the components and their options is to have a look at them.

Fortunately, the Gutenberg team provides a [Storybook](https://storybook.js.org/) showcasing all the components and their options.

There is a online version of the Storybook available at https://wordpress.github.io/gutenberg, but I would always recommend you to use the local version available in the Gutenberg repository to ensure you _see the right storybook version_...

Steps to get the local version of the Storybook:

1. checkout the latest stable version of [Gutenberg](https://github.com/WordPress/gutenberg) 


2. Build and run the Storybook : `npm run build && npm run storybook`

It's even possible to run the Storybook in a watch mode to see the changes in the components in real time. Try it out - it's a whole new world of possibilities ;-)

#### Debugging a WordPress plugin/theme : Digging into Gutenberg components

By default WordPress provides production ready code which is minified and hard to read. Gutenberg is part of WordPress and is no exception. And so [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).

To make debugging as cushy as possible, use the unminified version of the Gutenberg : 

1. checkout the latest stable version of [Gutenberg](https://github.com/WordPress/gutenberg) 

1. Build the unminified version of Gutenberg 

1. add the unminified version of the Gutenberg plugin to your [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) configuration andd - Profit! - can can now debug into the Gutenberg components in a breeze.

# The most important tip

**Ask your team members if you are stuck !**

**They are here to help you and you are not alone.**

Happy coding !