import { DateTimePicker } from '@wordpress/components';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';
/** The `DateTimeWidget` component uses the `DateTimePicker`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function DateTimeWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;
    let startOfWeek = uiSchema.startOfWeek ?? 0;
    startOfWeek = startOfWeek < 0 ? 0 : startOfWeek > 6 ? 6 : startOfWeek;
    return (<>
        {labelValue(<span>{label}</span>, hideLabel)}
        <DateTimePicker
            onChange={onChange}
            is12Hour={uiSchema.is12Hour == true}
            startOfWeek={startOfWeek}
        />
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
