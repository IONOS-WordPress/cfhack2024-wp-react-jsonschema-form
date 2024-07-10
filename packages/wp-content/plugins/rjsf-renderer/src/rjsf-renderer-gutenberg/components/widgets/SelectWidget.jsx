import { useCallback } from 'react';
import { enumOptionsIndexForValue, enumOptionsValueForIndex, getUiOptions, labelValue, description, } from '@rjsf/utils';
import { SelectControl } from '@wordpress/components';
import RichDescription from '../../RichDescription.jsx';

function getValue(event, multiple) {
    if (multiple) {
        return Array.from(event.target.options)
            .slice()
            .filter((o) => o.selected)
            .map((o) => o.value);
    }
    return event.target.value;
}

function SelectWidget(props) {
  const { schema, id, label, hideLabel, options, value, required, disabled, readonly, multiple = false, autofocus = false, onChange, uiSchema, onBlur, onFocus, placeholder, registry, } = props;
  const { enumOptions, enumDisabled, emptyValue: optEmptyVal } = options;
  const emptyValue = multiple ? [] : '';
  const handleFocus = useCallback((event) => {
      const newValue = getValue(event, multiple);
      return onFocus(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal));
  }, [onFocus, id, schema, multiple, options]);
  const handleBlur = useCallback((event) => {
      const newValue = getValue(event, multiple);
      return onBlur(id, enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal));
  }, [onBlur, id, schema, multiple, options]);
  const handleChange = useCallback((newValue, event) => {
      // const newValue = getValue(event, multiple);
      newValue = enumOptionsValueForIndex(newValue, enumOptions, optEmptyVal);
      return onChange(newValue);
  }, [onChange, schema, multiple, options]);
  const selectedIndexes = enumOptionsIndexForValue(value, enumOptions, multiple);

  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const _description = RichDescription(schema, uiSchema, options, registry);

  return(
    <SelectControl
      label={labelValue(label, hideLabel)}
      hideLabelFromVision={hideLabel}
      value={typeof selectedIndexes === 'undefined' ? emptyValue : selectedIndexes}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={handleFocus}
      help={_description}
      required={required}
      disabled={disabled || readonly}
      multiple={multiple}
      prefix={uiOptions.prefix}
      suffix={uiOptions.suffix}
      size={uiOptions.size ?? 'default'}
      labelPosition={uiOptions.labelPosition ?? 'top'}
    >
      {!multiple && schema.default === undefined && <option value=''>{placeholder}</option>}
      {Array.isArray(enumOptions) &&
        enumOptions.map(({ value, label }, i) => {
            const disabled = enumDisabled && enumDisabled.indexOf(value) !== -1;
            return (<option key={i} value={String(i)} disabled={disabled}>
          {label}
        </option>);
        })
      }
    </SelectControl>
  )
}

export default SelectWidget;
