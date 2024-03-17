import { DatePicker } from '@wordpress/components';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';
/** The `DateWidget` component uses the `DatePicker`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function DateWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;
    let startOfWeek = uiSchema.startOfWeek ?? 0;
    startOfWeek = startOfWeek < 0 ? 0 : startOfWeek > 6 ? 6 : startOfWeek;
    return (<>
        {labelValue(<span>{label}</span>, hideLabel)}
        <DatePicker
            onChange={onChange}
            startOfWeek={startOfWeek}
        />
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
