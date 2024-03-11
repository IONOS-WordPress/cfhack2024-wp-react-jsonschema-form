It might be useful to duplicate one of the plugins as a personal playground for testing and learning. This is a step by step guide to duplicate a plugin.

Let's take the `jsonschema-plugin-settings-page` plugin as example :

- Duplicate the `jsonschema-plugin-settings-page` plugin beside the existing plugin into `packages/wp-content/plugins/`

- Rename the folder to ... let's say `jsonschema-plugin-settings-page-duplicate`

- Go into the new plugin folder `packages/wp-content/plugins/jsonschema-plugin-settings-page-duplicate` and replace all occurrences of  `jsonschema_plugin_settings_page_duplicate` in all files.

  - `jsonschema-plugin-settings-page` with `jsonschema-plugin-settings-page-duplicate`

  - `jsonschema_plugin_settings_page` with `jsonschema_plugin_settings_page_duplicate`

- Rebuild the js/css sources : `pnpm run build`

- Add the new plugin to the `wp-env` configuration `.wp-env.json` :

  ```json
  ...
  "plugins": [
    ...
    "./packages/wp-content/plugins/jsonschema-plugin-settings-page-duplicate/",
    ...
  ],
  ...
  ```

- Restart `wp-env` : `pnpm run start`

- (Optional) To prevent accidental commiting of your new plugin, add the new plugin to your individual git-local `exclude` file `.git/info/exclude`:

  ```
  ...
  /packages/wp-content/plugins/jsonschema-plugin-settings-page-duplicate/
  # optional: add your modified .wp-env.json to the exclude list as well
  /.wp-env.json
  ...
  ```

  _(Editing `.git/info/exclude` instead of the project file `.gitignore` leaves all Git owned files untouched.)_

_Duplicating the `rjsf-renderer` plugin and `theme-extending-global-styles-jsonschema` theme needs a little bit more attention. Please consult me (Lars) if you are planning to do this._
