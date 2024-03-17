# Components

- [Alternative date](#alternative-date)
- [Alternative date and time](#alternative-date-and-time)
- [Color](#color)
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
