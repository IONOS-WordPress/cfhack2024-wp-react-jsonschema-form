import { TextControl } from '@wordpress/components';

/** The `TextWidget` component uses the `TextControl`.
 *
 * @param props - The `WidgetProps` for this component
 */

export default function TextWidget(props) {
    console.log(props)
    return (
        <TextControl
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
