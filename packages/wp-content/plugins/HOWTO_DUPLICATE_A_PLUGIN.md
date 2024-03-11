It might be useful to duplicate one of the plugins as a personal playground for testing and learning. This is a step by step guide to duplicate a plugin.

Let's take the `settings-page` plugin as example :

- Duplicate the `settings-page` plugin beside the existing plugin into `packages/wp-content/plugins/`

- Rename the folder to ... let's say `settings-page-duplicate`

- Go into the new plugin folder `packages/wp-content/plugins/settings-page-duplicate` and replace all occurrences of  `settings-page_duplicate` in all files.

  - `settings-page` with `settings-page-duplicate`

  - `settings_page` with `settings_page_duplicate`

- Rebuild the js/css sources : `pnpm run build`

- Add the new plugin to the `wp-env` configuration `.wp-env.json` :

  ```json
  ...
  "plugins": [
    ...
    "./packages/wp-content/plugins/settings-page-duplicate/",
    ...
  ],
  ...
  ```

- Restart `wp-env` : `pnpm run start`

- (Optional) To prevent accidental commiting of your new plugin, add the new plugin to your individual git-local `exclude` file `.git/info/exclude`:

  ```
  ...
  /packages/wp-content/plugins/settings-page-duplicate/
  # optional: add your modified .wp-env.json to the exclude list as well
  /.wp-env.json
  ...
  ```

  _(Editing `.git/info/exclude` instead of the project file `.gitignore` leaves all Git owned files untouched.)_

_Duplicating the `rjsf-renderer` plugin and `extended-global-styles` theme needs a little bit more attention. Please consult me (Lars) if you are planning to do this._
