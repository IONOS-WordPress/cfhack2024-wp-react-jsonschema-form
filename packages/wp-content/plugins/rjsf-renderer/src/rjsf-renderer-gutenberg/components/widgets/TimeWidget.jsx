import { TimePicker } from '@wordpress/components';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';
/** The `TimeWidget` component uses the `TimePicker`
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TimeWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;
    return (<>
        {labelValue(<span>{label}</span>, hideLabel)}
        <TimePicker
            onChange={onChange}
            is12Hour={uiSchema.is12Hour == true}
        />
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
