import { TextControl } from '@wordpress/components';
import { useCallback } from 'react';
import { labelValue, schemaRequiresTrueValue } from "@rjsf/utils";

/** The `URLWidget` component uses the `BaseInputTemplate` changing the type to `url`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function URLWidget(props) {
  const required = schemaRequiresTrueValue(props.schema);
  const description = props.options.description ?? props.description;
  const handleChange = useCallback((value) => props.onChange(value === '' ? props.options.emptyValue : value));
  return (
    <TextControl
      type={'uri'}
      className={"url-widget"}
      label={labelValue(<span>{props.label}</span>, props.hideLabel)}
      value={props.value}
      onChange={handleChange}
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      readOnly={props.readOnly}
      default={props.default}
      help={description}
      required={required}
    />
  );
}
