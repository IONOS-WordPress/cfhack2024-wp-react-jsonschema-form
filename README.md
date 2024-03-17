# About

This project started as a CloudFest Hackathon 2024 project. It aims to elevate the possibilities JSON schema offers and utilize it for easier web form and meta fields development.

Project page: https://hackathon.cloudfest.com/project/json-schema-field-form-renderer/

## The team

Project leads:
- Lars Gersmann
- Daniel Bachhuber

## Demo

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

  _@IMPROVEMENT: Tools could be prepackaged into a [vscode dev container](https://code.visualstudio.com/docs/devcontainers/containers)._

## Setup Development Environment

- Get developer access to the repository by contacting the owner of the repository.

- Clone the repository : `git clone git@github.com:IONOS-WordPress/workspace/cfhack2024-wp-react-jsonschema-form`

> the provided .npmrc assumes that the `bash` shell is already available at `/bin/bash`. Ensure that this is the case or adjust the `.npmrc` file accordingly (you can get the path to your `bash` executable using `which bash`).

- Run `pnpm install` to install the required dependencies.

  > At first start `pnpm` will take a few seconds to download also the configured NodeJS version. Please be patient - it will be much more faster on subsequent runs.

- Run `pnpm build` to build the project.

- Run `pnpm start` to start the development environment.

  This will start a local WordPress using a preconfigured [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) environment.

  The start script will also generate the vscode settings file (`.vscode/settings.json`) for [PHP Intelephense](https://marketplace.visualstudio.com/items?itemName=bmewburn.vscode-intelephense-client) support and appropriate launch configuration file (`.vscode/launch.json`) for instant PHP debugging.

  > see [`.wp-env-afterStart.sh`](.wp-env-afterStart.sh) for the script that generates the vscode settings and launch configuration files.

- Open the WordPress admin dashboard by visiting [http://localhost:8888/wp-admin](http://localhost:8888/wp-admin)

  Use the following credentials to log in:

    - Username: `admin`
    - Password: `password`

## Folder Structure

Each of the use cases is located in a separate folder in `packages/wp-content/plugins/*` / `packages/wp-content/themes/*` directory as a separate sub project. This Monorepo structure allows us to work on multiple use cases in parallel.

Each sub project contains a `README.md` file with further instructions.

## Conventions

### No Typescript

I have participated in coding sessions with people doing Typescript since a year or longer. It took them half an hour to develop a type definition for an event handler (at the extreme).

My opinion : We have limited time to develop the project and we do not need to spend time on this issue. I would tend to use the time to develop functionality and not type definitions. Personally I really like how [Rich Harris, maintainer of Svelte thinks about Typescript](https://devclass.com/2023/05/11/typescript-is-not-worth-it-for-developing-libraries-says-svelte-author-as-team-switches-to-javascript-and-jsdoc/).

I know there is a lot of discussion going on about this topic.

We should getting things done fast and concentrate on the most important thing : hacking the functionality. Understanding Typescript syntax can be challenging and I would want to avoid locking people out just because they don't-know/have-limited-knowledge about Typescript.

### No Linting

This project has no linting / formatting configured to keep the amount of configuration low.

Be nice to each other and don't use extravagant formatting.

### No CSS-in-JS

Same reason as for Typescript - not anybody knows about CSS-in-JS.

But anybody is free to use PostCSS since it is **everywhere** used in the Gutenberg ecosystem.

### GIT

I used to work with [Gitflow](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow) for a long time. But I have to admit that it is a bit too complex for small projects. I would prefer to use a [trunk based workflow](https://www.atlassian.com/continuous-delivery/continuous-integration/trunk-based-development) for this project.

I would encourage participants to write commit message according to [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) to ensure a consistent commit message format.

_I am a big fan of [changesets](https://github.com/changesets/changesets) for creating human readable changelogs but I would skip it for this project since we do not plan to release anything._

## Development Workflow

Since the project is a monorepo, we can work on multiple use cases in parallel. These isolated sub packages free us (mostly) from the need to coordinate changes across the whole project.

Anyway, we should follow some best practices to ensure that we don't break the whole project :

- Don't work directly on the `trunk` branch if possible.

- Create a new branch for each change (feature, bug fix, etc) and merge it back whenever you think it _will not break the whole project_ and _is working_.

- I would propose that we don't need to use a pull requests for this project - it costs too much time.

  - If you are really unsure if your branch is ready to merge back, you can ask a team mate for a review.

### Debugging

#### WordPress

The project is set up to use [VS Code](https://code.visualstudio.com/) as the development environment. It comes with preconfigured launch configurations for debugging, required extensions and settings, among other features.

[wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) is even already preconfigured to support debugging of PHP code.

#### JS/CSS/Gutenberg

Plugin/Theme sources are also compiled with debug informations. So you can easily debug into your own sources using the browser.

Gutenberg is compiled with debug informations when `wp-env` is starting up. This means you can even debug from your own JS/CSS into the Gutenberg sources.

_The project setup will always build code including debugging information. Everything is compiled for easy debugging since **we are here for hacking :-)**_

### Commands

- `pnpm install` will install the required dependencies for the project.

- Have a look at the scripts section of the root package.json for more available scripts

  Examples:

  - build all sub packages : `pnpm build`

  - start [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) : `pnpm run start`

  - stop [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) : `pnpm run stop`

  - destroy [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) : `pnpm run destroy`

  - clean build artifacts : `pnpm run clean`

    This interactive script will only remove the build artifacts. It will not remove the `node_modules` directory.

  - clean every generated / downloaded artifact : `pnpm run distclean`

    This interactive  script will remove the `node_modules`/`.pnpm-store` directories and all build artifacts.

    _Directory `wp-env-home` is managed by `wp-env`. Execute `pnpm destroy` before executing `pnpm run distclean`_

  - watch and build js/css : `pnpm run dev`

    This command will watch the js/css sources and rebuild them on changes. Perfect when you working on just JS/CSS sources.

    The only thing to do is reloading your wordpress tab in the browser.

    > Why not using [HMR](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#start) ? Because multiple parallel watching [wp-scripts start](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#start) instances are not supported yet by [HMR via `wp-scripts`](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-scripts/#start)

  - stop [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) : `pnpm run stop`

  - execute individual [wp-env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) commands : `pnpm run wp-env <command>`

    Example : `pnpm run wp-env run cli wp plugin list`

- individual package scripts can be executed

  - from the Monorepo root directory using `pnpm --filter "<sub-package-name>" run <sub-package-script>` in the package directory

    Example: `pnpm --filter "@cfhack2024-wp-react-jsonschema-form/form-block" run build`

  - by changing to the package directory and running `pnpm run <sub-package-script>`

    Example: `cd packages/form-block && pnpm run build`

## Tips

### Always execute `pnpm build` after `git pull/checkout/switch`

Remember - you only see the last compiles js/css sources.

So whenever you pull or checkout a branch, execute `pnpm build` to ensure that you are working with the latest sources.

**Even if you changed any JS/CSS source locally - you need to built it before seeing any changes**

### Gutenberg

#### Know the available the Gutenberg components and their options

[@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/) is a huge library providing a lot of components.

Checkout the [Gutenberg Storybook](https://wordpress.github.io/gutenberg/?path=/docs/docs-introduction--page) to see all the available components and their options.

#### Debugging a WordPress plugin/theme : Digging into Gutenberg components

By default WordPress provides production ready code which is minified and hard to read. Gutenberg is part of WordPress and is no exception. And so [@wordpress/components](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/).

That's why this project is set up with the latest Gutenberg including debug information. This means you can easily debug into the Gutenberg components.

To debug into React you can use the browser's developer tools. You can set breakpoints and debug into JS code.

It's highly recommended to install [React Developer Tools](https://react.dev/learn/react-developer-tools) in your browser. It will ease React debugging a lot.

# The most important tip

**Ask your team members if you are stuck !**

**They are here to help you and you are not alone.**

Happy coding !
