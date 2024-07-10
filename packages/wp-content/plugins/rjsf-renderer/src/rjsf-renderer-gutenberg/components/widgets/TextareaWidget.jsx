import { TextareaControl } from '@wordpress/components';
import { useCallback } from 'react';
import { labelValue, schemaRequiresTrueValue, getUiOptions, description, } from '@rjsf/utils';
import RichDescription from '../../RichDescription.jsx';

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget(props) {
  const required = schemaRequiresTrueValue(props.schema);

  const uiOptions = getUiOptions(props.uiSchema);

  const _description = RichDescription(props.schema, props.uiSchema, props.options, props.registry);

  const handleChange = useCallback((value) => props.onChange(value === '' ? props.options.emptyValue : value));
  return (
    <TextareaControl
      label={labelValue(<span>{props.label}</span>, props.hideLabel)}
      value={props.value}
      rows={uiOptions?.rows}
      onChange={handleChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      readOnly={props.readOnly}
      default={props.default}
      help={_description}
      required={required}
    />
  );
}

