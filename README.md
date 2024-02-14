# About

This Monorepo contains example uses cases of [JSON Schema](https://json-schema.org/) in WordPress. 

It demo's the use of [JSON Schema](https://json-schema.org/) as abstraction for user interfaces in WordPress utilizing [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form). 

  - see [react-jsonschema-form Documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/) introducing the concept and usage  [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form).

  - see [react-jsonschema-form Playground](https://rjsf-team.github.io/react-jsonschema-form/) showcasing the capabilities of [react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) by man examples.

See [What is the idea behind this project?](https://github.com/IONOS-WordPress/cfhack2024-wp-react-jsonschema-form/discussions/2) for more explanations.

> The sub packages propose just ideas - they are not meant to be implemented as is.
> I am not going to believe that we can implement all of them. I think it would better better to focus on the most important ones and do them well.
> If you have any suggestions/improvements/ideas please feel free to start discussing it.

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

  - [make](https://www.gnu.org/software/make/)

    This stone age old gem is a simple and powerful tool to automate tasks. It is available on all platforms and is a good choice for automating tasks.

    Trust me, t's much better than just npm script targets and shell scripts.

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

### (To discuss) No Typescript

I have participated in coding sessions with people doing Typescript since a year or longer. It took them half an hour to develop a type definition for an event handler (at the extreme).

My opinion : We have limited time to develop the project and we do not need to spend time on this issue. I would prefer to use the time to develop the project and not to develop type definitions. Personally I really like how [Rich Harris, maintainer of Svelte thinks about Typescript](https://devclass.com/2023/05/11/typescript-is-not-worth-it-for-developing-libraries-says-svelte-author-as-team-switches-to-javascript-and-jsdoc/) 

I know there is a lot of discussion going on about this topic.

We should getting things done fast and concentrate on the most important thing : hacking the functionality. Understanding Typescript syntax can be challenging and I would hate to exclude participants just because they don't-know/have-limited-knowledge about Typescript.  

### Linting

We should use a linter to ensure a consistent code style across the project.

I would suggest

- use [eslint](https://eslint.org/) for linting

- use [prettier](https://prettier.io/) for formatting

@TODO: Add lint tooling, usage notes, and configuration. see [You Probably Don't Need eslint-config-prettier or eslint-plugin-prettier](https://www.joshuakgoldberg.com/blog/you-probably-dont-need-eslint-config-prettier-or-eslint-plugin-prettier/)

### GIT

I used to work with [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for a long time. But I have to admit that it is a bit too complex for small projects. I would prefer to use a [trunk based workflow](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) for this project.

The project is already set up to use [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure that the commit messages are consistent.

@TODO: Add conventional commits tools/usage notes/configuration

_I am a big fan of [changesets](https://github.com/changesets/changesets) for creating human readable changelogs but I would skip it for this project since we do not plan to release anything._

## Development Workflow

Since the project is a monorepo, we can work on multiple use cases in parallel. These isolated sub packages free us (mostly) from the need to coordinate changes across the whole project.

Anyway, we should follow some best practices to ensure that we don't break the whole project : 

- Don't work directly on the `trunk` branch if possible.

- Create a new branch for each change (feature, bug fix, etc) and merge it back whenever you think it is working/will-not-break-the-whole-project.

- I would propose that we don't need to use a pull requests for this project - it costs too much time.

  - If you are really unsure if your branch is ready to merge back, you can ask a team mate for a review 

### Debugging

The project is set up to use [VS Code](https://code.visualstudio.com/) as the development environment. It comes with preconfigured launch configurations for debugging, required extensions and settings, among other features.

[wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is even already preconfigured to support debugging of PHP code.

@TODO: Add debugging instructions/launch configurations

### Building

I would propose to use [make](https://www.gnu.org/software/make/) for building the project. It is a simple and powerful tool to automate tasks.

Using [make](https://www.gnu.org/software/make/) frees us from the need to remember the commands to build the projects and even sub projects.

The project already contains a `Makefile` with some targets to build the project.

You don't need to take care about the build process - just run `make` and it will do the rest for you.

The main `Makefile` contains targets to build the whole project and to build the sub projects.

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