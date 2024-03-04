import { useCallback } from 'react';
import { ariaDescribedByIds, descriptionId, getTemplate, labelValue, schemaRequiresTrueValue, } from '@rjsf/utils';
/** The `CheckBoxWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
function CheckboxWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    // Because an unchecked checkbox will cause html5 validation to fail, only add
    // the "required" attribute if the field value must be "true", due to the
    // "const" or "enum" keywords
    const required = schemaRequiresTrueValue(schema);
    const handleChange = useCallback((event) => onChange(event.target.checked), [onChange]);
    const handleBlur = useCallback((event) => onBlur(id, event.target.checked), [onBlur, id]);
    const handleFocus = useCallback((event) => onFocus(id, event.target.checked), [onFocus, id]);
    const description = options.description ?? schema.description;
    return (<div className={`checkbox ${disabled || readonly ? 'disabled' : ''}`}>
      {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry}/>)}
      <label>
        <input type='checkbox' id={id} name={id} checked={typeof value === 'undefined' ? false : value} required={required} disabled={disabled || readonly} autoFocus={autofocus} onChange={handleChange} onBlur={handleBlur} onFocus={handleFocus} aria-describedby={ariaDescribedByIds(id)}/>
        {labelValue(<span>{label}</span>, hideLabel)}
      </label>
    </div>);
}
export default CheckboxWidget;
