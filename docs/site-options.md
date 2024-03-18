# Site options

Plugin authors can use JSON schema to create settings pages.

## Example

WooCommerce store address and working hours settings page plugin.

Plugin structure:

```
.
├── assets/
├── build/
├── plugin.php
├── src
│   ├── components
│   │   └── settings.js
│   ├── index.js
├── wocommerce-settings-example.json
└── wocommerce-settings-example-ui.json
```

### `plugin.php`

- Add admin menu with `add_menu_page()`
- Enqueue `index.js` to admin page and add JSON schemas with `wp_add_inline_script()`

See [example](../packages/wp-content/plugins/settings-page/plugin.php).

### `index.js`

- create a root to display `<Settings />` component inside a browser DOM node

See [example](../packages/wp-content/plugins/settings-page/src/index.js)

### `settings.js`

- create settings form and pass config from JSON schema

See [example](../packages/wp-content/plugins/settings-page/src/components/settings.js)

### `settings.json` example

```JSON
{
  "title": "Store Address",
  "description": "This is where your business is located. Tax rates and shipping rates will use this address.",
  "type": "object",
  "required": [],
  "definitions": {
    "countries": {
      "type": "string",
      "enum": ["Germany", "Portugal"]
    }
  },
  "properties": {
    "woocommerce_store_address_1": {
      "type": "string",
      "title": "Address Line 1"
    },
    "woocommerce_store_address_2": {
      "type": "string",
      "title": "Address Line 2"
    },
    "woocommerce_store_city": {
      "type": "string",
      "title": "City"
    },
    "woocommerce_default_country": {
      "$ref": "#/definitions/countries",
      "title": "Country"
    },
    "woocommerce_store_postcode": {
      "type": "string",
      "title": "Postcode / ZIP"
    },
    "woocommerce_enable_coupons": {
      "type": "boolean",
      "title": "Enable taxes",
      "description": "Rates will be configurable and taxes will be calculated during checkout."
    },
    "woocommerce_calc_discounts_sequentially": {
      "type": "boolean",
      "title": "Calculate coupon discounts sequentially",
      "description": "When applying multiple coupons, apply the first coupon to the full price and the second coupon to the discounted price and so on."
    }
  }
}
```

### `ui-settings.json` example

```JSON
{
  "ui:submitButtonOptions": {
    "props": {
      "disabled": false
    },
    "norender": false,
    "submitText": "Save"
  }
}
```

## Saved settings

Settings are saved in site options.

Dump from `wp_load_alloptions()`:
```PHP
[settings_page] => {
  "woocommerce_store_address_1":"my street name",
  "woocommerce_store_address_2":"25364",
  "woocommerce_store_city":"The most beautiful city",
  "woocommerce_store_postcode":"21000",
  "woocommerce_enable_coupons":true
}
```
