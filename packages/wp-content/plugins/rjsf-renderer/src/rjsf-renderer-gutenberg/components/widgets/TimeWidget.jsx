import { TimePicker } from '@wordpress/components';
import { useCallback } from 'react';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';
/** The `TimeWidget` component uses the `TimePicker`
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TimeWidget(props) {
    const { schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, } = props;
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;
    const handleChange = useCallback((value) => onChange(value === '' ? options.emptyValue : value.split('T')[1]));
    const date = value == '' ? undefined : '2024-01-01T' + value;
    return (<>
        {labelValue(<span>{label}</span>, hideLabel)}
        <TimePicker
            currentTime={date}
            onChange={handleChange}
            is12Hour={uiSchema.is12Hour == true}
        />
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
