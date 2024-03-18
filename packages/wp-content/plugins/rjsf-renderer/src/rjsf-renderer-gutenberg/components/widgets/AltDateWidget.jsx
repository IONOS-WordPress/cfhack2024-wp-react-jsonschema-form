import { TextControl } from '@wordpress/components';
import { useCallback } from 'react';
import { labelValue } from '@rjsf/utils';
/** The `AltDateWidget` is an alternative widget for rendering date properties.
 *  It uses the TextareaControl for rendering, with the `type` prop set to date.
 *
 * @param props - The `WidgetProps` for this component
 */
function AltDateWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const description = options.description ?? schema.description;
    const handleChange = useCallback((value) => onChange(value === '' ? options.emptyValue : value));
    return (<>
        <TextControl
            label={labelValue(<span>{label}</span>, hideLabel)}
            value={value}
            type={'date'}
            help={description}
            onChange={handleChange}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={readonly}
            disabled={disabled || readonly}
        />
    </>
    );
}
export default AltDateWidget;
