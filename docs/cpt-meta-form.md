# Custom post type meta form

Create custom post type, register custom meta fields and REST fields from JSON schema files. Build a form from these fields which will be rendered as a custom block on new and edit post screen. Values submitted in the form are saved as post meta.

## Example

Plugin structure:
```
.
├── build/
├── plugin.php
├── schemas
│   ├── store
│   │   ├── schema.json
│   │   └── ui.json
│   └── team-member
│       ├── schema.json
│       └── ui.json
├── src
│   ├── block.json
│   ├── edit.js
│   └── index.js
```

### `plugin.php`

- register custom post type (`register_post_type()`)
- register post meta for each item in schema.json `properties` (`register_post_meta()`), hooked in `registered_post_type` action
- register REST field for each schema (`register_rest_field()`), hooked in `registered_post_type` action
- register block and block category
- enqueue renderer script on new and edit post screen

See [example](../packages/wp-content/plugins/site-builder-demo/plugin.php).

### `index.js`

- register block type

See [example](../packages/wp-content/plugins/site-builder-demo/src/index.js)

### `edit.js`

- create form and pass post type meta fields (and values, if any) from JSON schema

See [example](../packages/wp-content/plugins/site-builder-demo/src/edit.js)

### `block.json` example

```JSON
{
  "$schema": "https://schemas.wp.org/trunk/block.json",
  "apiVersion": 3,
  "name": "cfhack2024-wp-react-jsonschema-form/schema-block",
  "version": "1.0.0",
  "title": "schema-block",
  "category": "cfhack2024-wp-react-jsonschema-form",
  "icon": "smiley",
  "description": "WordPress block rendering post meta data in the editor but is saving as post meta data",
  "example": {},
  "supports": {
    "html": false,
    "multiple": false
  },
  "attributes": {
    "name": {
      "type": "string"
    }
  },
  "textdomain": "schema-block",
  "editorScript": ["file:./index.js"],
  "editorStyle": "file:./index.css"
}
```

See [example](../packages/wp-content/plugins/site-builder-demo/src/block.json)

### `schema.json` example

```JSON
{
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "title": "This form lets you edit the team member.",
    "description": "The form can have a description here.",
    "type": "object",
    "required": [
        "first_name",
        "last_name"
    ],
    "properties": {
        "first_name": {
            "type": "string",
            "title": "First name"
        },
        "last_name": {
            "type": "string",
            "title": "Last name"
        }
    }
}
```

See [example](../packages/wp-content/plugins/site-builder-demo/schemas/team-member/schema.json)

### `ui.json` example

```JSON
{
    "first_name": {
        "ui:autofocus": true,
        "ui:emptyValue": "",
        "ui:placeholder": "ui:emptyValue causes this field to always be valid despite being required",
        "ui:autocomplete": "family-name",
        "ui:enableMarkdownInDescription": true,
        "ui:description": "Make text **bold** or *italic*. Take a look at other options [here](https://markdown-to-jsx.quantizor.dev/)."
    },
    "last_name": {
        "ui:autocomplete": "given-name",
        "ui:enableMarkdownInDescription": true,
        "ui:description": "Make things **bold** or *italic*. Embed snippets of `code`. <small>And this is a small texts.</small> "
    }
}
```

See [example](../packages/wp-content/plugins/site-builder-demo/schemas/team-member/ui.json)
