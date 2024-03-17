import { TextareaControl } from '@wordpress/components';
import { labelValue, schemaRequiresTrueValue, } from '@rjsf/utils';

/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget(props) {
  const required = schemaRequiresTrueValue(props.schema);
  const description = props.options.description ?? props.description;

  return (
      <TextareaControl
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

