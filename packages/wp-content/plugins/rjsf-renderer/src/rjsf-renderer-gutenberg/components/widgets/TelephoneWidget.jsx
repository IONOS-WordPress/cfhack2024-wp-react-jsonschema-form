import { TextControl } from '@wordpress/components';
import { useCallback } from 'react';
import { labelValue, schemaRequiresTrueValue, } from '@rjsf/utils';

/** The `Telephone` component uses the `TextControl`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextWidget(props) {
  const required = schemaRequiresTrueValue(props.schema);
  const description = props.options.description ?? props.description;

  const handleChange = useCallback((value) => props.onChange(value === '' ? props.options.emptyValue : value));
  return (
    <TextControl
      label={labelValue(<span>{props.label}</span>, props.hideLabel)}
      value={props.value}
      onChange={handleChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      readOnly={props.readOnly}
      default={props.default}
      help={description}
      required={required}
      type='tel'
    />
  );
}
