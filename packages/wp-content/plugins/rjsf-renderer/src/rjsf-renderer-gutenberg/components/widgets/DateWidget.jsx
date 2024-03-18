import { DatePicker } from '@wordpress/components';
import { useCallback } from 'react';
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

    const handleChange = useCallback((value) => props.onChange(value === '' ? props.options.emptyValue : value.split('T')[0]));
    const date = value == '' ? undefined : value + 'T00:00:00';
    console.log(date);
    return (<>
        {labelValue(<span>{label}</span>, hideLabel)}
        <DatePicker
            currentDate={date}
            onChange={handleChange}
            startOfWeek={startOfWeek}
        />
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
