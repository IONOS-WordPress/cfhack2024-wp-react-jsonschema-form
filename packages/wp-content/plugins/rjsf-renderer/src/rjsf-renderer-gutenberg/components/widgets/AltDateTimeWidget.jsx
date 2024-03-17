import { TextControl } from '@wordpress/components';
import { labelValue } from '@rjsf/utils';
/** The `AltDateTimeWidget` is an alternative widget for rendering datetime properties.
 *  It uses the TextareaControl for rendering, with the `type` prop set to datetime-local.
 *
 * @param props - The `WidgetProps` for this component
 */
function AltDateTimeWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const description = options.description ?? schema.description;
    return (<>
        <TextControl
            label={labelValue(<span>{label}</span>, hideLabel)}
            value={value}
            type={'datetime-local'}
            help={description}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={readonly}
            disabled={disabled || readonly}
        />
    </>
    );
}
export default AltDateTimeWidget;
