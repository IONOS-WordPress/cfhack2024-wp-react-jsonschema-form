# Schema files

[react-jsonschema-form](https://github.com/rjsf-team/react-jsonschema-form) uses two json files:
- schema.json
- ui-schema.json

## schema.json

Basic JSON schema consists a few properties:
```JSON
{
    "$schema": "https://json-schema.org/draft/2019-09/schema",
    "title": "The title for the form",
    "type": "object",
    "properties": {}
}
```

Fields and their properties are stored under `properties` keyword.

### Optional properties

`definitions` - define a thing and reuse it by reference.

```JSON
{
  "definitions": {
    "countries": {
      "type": "string",
      "enum": ["Germany", "Portugal", "Serbia"]
    }
  },
  "properties": {
    "woocommerce_default_country": {
      "$ref": "#/definitions/countries",
      "title": "Country"
    }
  }
}
```

`dependencies` - set undirectional, bidirectional, conditional, and dynamic dependencies. Read more in [official documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/json-schema/dependencies).

## ui-schema.json

Read more in [official documentation](https://rjsf-team.github.io/react-jsonschema-form/docs/api-reference/uiSchema).
