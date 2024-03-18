# Components

- [Alternative date](#alternative-date)
- [Alternative date and time](#alternative-date-and-time)
- [Checkbox](#checkbox)
- [Checkboxes](#checkboxes)
- [Color](#color)
- [Date](#date)
- [Date and time](#date-and-time)
- [Email](#email)
- [File](#file)
- [Select](#select)

## Alternative date

- Widget name: `AltDateWidget`
- Type: `string`

schema.json

```jSON
"alt-date": {
  "type": "string",
  "format": "date"
}
```

uischema.json

```JSON
"alt-date": {
  "ui:widget": "alt-date",
  "ui:options": {
    "yearsRange": [
      1980,
      2030
    ],
    "format": "DMY"
  }
}
```

Returns:

```
{"alt-date":"2024-03-17"}
```

## Alternative date and time

- Widget name: `AltDateTimeWidget`
- Type: `string`

schema.json

```jSON
"alt-datetime": {
  "type": "string",
  "format": "date-time"
}
```

uischema.json

```JSON
"alt-datetime": {
  "ui:widget": "alt-datetime",
  "ui:options": {
    "yearsRange": [
      1980,
      2030
    ],
    "format": "DMY"
  }
}
```

Returns:

```
{"alt-datetime":"2024-03-17T21:59:38.000Z"}
```

## Checkbox

- Widget name: `CheckboxWidget`
- Type: `boolean`

schema.json

```jSON
"checkbox": {
  "title": "Checkbox",
  "description": "Default boolean type doesn't need uischema.",
  "type": "boolean"
}
```

Returns:

```
{"checkbox":true}
```

## Checkboxes

- Widget name: `CheckboxesWidget`
- Type: `array`

schema.json

```jSON
"multipleChoicesList": {
  "type": "array",
  "title": "A multiple choices list",
  "items": {
    "type": "string",
    "enum": [
      "foo",
      "bar",
      "fuzz",
      "qux"
    ]
  },
  "uniqueItems": true
}
```

uischema.json

```JSON
{
  "multipleChoicesList": {
    "ui:widget": "checkboxes"
  }
}
```

Returns:

```
{"multipleChoicesList":["bar","fuzz"]}
```

## Color

- Widget name: `ColorWidget`
- Type: `string`

schema.json

```jSON
"color": {
  "type": "string",
  "title": "Color",
  "default": "#151ce6"
}
```

uischema.json

```JSON
{
  "color": {
    "ui:widget": "color"
  }
}
```

Returns:

```
{"color":"#151ce6"}
```

## Date

May not work on some browsers, notably Firefox Desktop and IE.

- Widget name: `DateWidget`
- Type: `string`

schema.json

```jSON
"datetime": {
  "type": "string",
  "format": "date-time"
}
```

Returns:

```
{"datetime":"2024-03-17T13:29:00.000Z"}
```

## Date and time

May not work on some browsers, notably Firefox Desktop and IE.

- Widget name: `DateTimeWidget`
- Type: `string`

schema.json

```jSON
"date": {
  "type": "string",
  "format": "date"
},
"time": {
  "type": "string",
  "format": "time"
}
```

Returns:

```
{"date":"2024-03-17","time":"23:33:00"}
```

## Email

- Widget name: `EmailWidget`
- Type: `string`

schema.json

```JSON
"email": {
  "type": "string",
  "format": "email"
}
```

Returns:

```
{"email":"chuck.noris@syntax-errors.org"}
```

## Select

- Widget name: `SelectWidget`
- Type: `string`

schema.json

```jSON
"select": {
  "type": "string",
  "title": "Select",
  "enum": [
    "Option 1",
    "Option 2",
    "Option 3"
  ]
}
```

uischema.json

```JSON
{
  "select": {
    "ui:widget": "select"
  }
}
```

Returns:

```
{"select":"Option 2"}
```

## File

- Widget name: `FileWidget`
- Type: `string`

schema.json
```JSON
"file": {
  "type": "string",
  "format": "data-url",
  "title": "Single file"
}
```

uischema.json (optional)
```JSON
{
  "file": {
    "ui:options": {
      "accept": ".pdf"
    }
  }
}
```

Returns (for optional accept criteria `data:application/pdf;`):

```
{"file":"data:image/png;name=syntax-error.png;base64,<EXTREMELY-LONG-STRING>"}
```

