import {TextControl} from '@wordpress/components';
import {labelValue, schemaRequiresTrueValue} from "@rjsf/utils";

/** The `URLWidget` component uses the `BaseInputTemplate` changing the type to `url`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function URLWidget(props) {
  const {options, schema, onBlur, onChange} = props;

  const required = schemaRequiresTrueValue(props.schema);
  const description = props.options.description ?? props.description;
  return (
    <TextControl
      type={'uri'}
      className={"url-widget"}
      label= {labelValue(<span>{props.label}</span>, props.hideLabel)}
      value={ props.value }
      onChange={props.onChange }
      onBlur={props.onBlur}
      onFocus={props.onFocus}
      readOnly={props.readOnly}
      default={props.default}
      help={description}
      required={required}
    />
  );
}
