import { ColorPicker } from '@wordpress/components';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';
/** The `ColorWidget` component uses the `ColorPicker`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function ColorWidget(props) {
  const { schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, } = props;
  const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
  const description = options.description ?? schema.description;

  return <div className={"color-widget"}>
    {labelValue(<span>{label}</span>, hideLabel)}
    <ColorPicker enableAlpha={uiSchema.enableAlpha === true} onChange={onChange} color={value} defaultValue={props.default} />
    {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
  </div>
}
