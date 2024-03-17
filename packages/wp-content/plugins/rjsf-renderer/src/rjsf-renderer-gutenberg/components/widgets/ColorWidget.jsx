import {ColorPicker} from '@wordpress/components';
/** The `ColorWidget` component uses the `BaseInputTemplate` changing the type to `color` and disables it when it is
 * either disabled or readonly.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function ColorWidget(props) {
return <div className={"color-widget"}>
  <label>{props.label}</label>
  <ColorPicker enableAlpha={props.uiSchema.enableAlpha === true} onChange={props.onChange}/>
</div> }
