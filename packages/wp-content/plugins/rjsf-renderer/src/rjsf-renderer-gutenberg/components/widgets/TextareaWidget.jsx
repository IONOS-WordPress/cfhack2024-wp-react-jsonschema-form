import { TextareaControl } from '@wordpress/components';


/** The `TextareaWidget` is a widget for rendering input fields as textarea.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextareaWidget(props) {
    console.log(props)
    return (
        <TextareaControl
          label= {props.label}
          value={ props.value }
          onChange={props.onChange }
          onBlur={props.onBlur}
          onFocus={props.onFocus}
          readOnly={props.readOnly}
          default={props.default}
        />
      );
    }

