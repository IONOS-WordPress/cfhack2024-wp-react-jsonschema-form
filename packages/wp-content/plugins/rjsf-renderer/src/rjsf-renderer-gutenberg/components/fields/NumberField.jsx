import {useCallback, useState} from 'react';
import {asNumber, getUiOptions, getWidget, hasWidget, optionsList} from '@rjsf/utils';
// Matches a string that ends in a . character, optionally followed by a sequence of
// digits followed by any number of 0 characters up until the end of the line.
// Ensuring that there is at least one prefixed character is important so that
// you don't incorrectly match against "0".
const trailingCharMatcherWithPrefix = /\.([0-9]*0)*$/;
// This is used for trimming the trailing 0 and . characters without affecting
// the rest of the string. Its possible to use one RegEx with groups for this
// functionality, but it is fairly complex compared to simply defining two
// different matchers.
const trailingCharMatcher = /[0.]0*$/;

/**
 * The NumberField class has some special handling for dealing with trailing
 * decimal points and/or zeroes. This logic is designed to allow trailing values
 * to be visible in the input element, but not be represented in the
 * corresponding form data.
 *
 * The algorithm is as follows:
 *
 * 1. When the input value changes the value is cached in the component state
 *
 * 2. The value is then normalized, removing trailing decimal points and zeros,
 *    then passed to the "onChange" callback
 *
 * 3. When the component is rendered, the formData value is checked against the
 *    value cached in the state. If it matches the cached value, the cached
 *    value is passed to the input instead of the formData value
 */
function NumberField(props) {
  const {
    schema,
    name,
    uiSchema,
    idSchema,
    formData,
    required,
    disabled = false,
    readonly = false,
    autofocus = false,
    onChange,
    onBlur,
    onFocus,
    registry,
    rawErrors,
    hideError,
  } = props;
  const {title, format} = schema;
  const {widgets, formContext, schemaUtils, globalUiOptions} = registry;
  const enumOptions = schemaUtils.isSelect(schema) ? optionsList(schema) : undefined;
  let defaultWidget = 'updown';
  if (format && hasWidget(schema, format, widgets)) {
    defaultWidget = format;
  }
  const {widget = defaultWidget, placeholder = '', title: uiTitle, ...options} = getUiOptions(uiSchema, registry.globalUiOptions);
  const displayLabel = schemaUtils.getDisplayLabel(schema, uiSchema, globalUiOptions);
  const label = uiTitle ?? title ?? name;
  const Widget = getWidget(schema, widget, widgets);
  return (<Widget options={{...options, enumOptions}} schema={schema} uiSchema={uiSchema} id={idSchema.$id} name={name}
                  label={label} hideLabel={!displayLabel} hideError={hideError} value={formData} onChange={onChange}
                  onBlur={onBlur} onFocus={onFocus} required={required} disabled={disabled} readonly={readonly}
                  formContext={formContext} autofocus={autofocus} registry={registry} placeholder={placeholder}
                  rawErrors={rawErrors}/>);
}

export default NumberField;
