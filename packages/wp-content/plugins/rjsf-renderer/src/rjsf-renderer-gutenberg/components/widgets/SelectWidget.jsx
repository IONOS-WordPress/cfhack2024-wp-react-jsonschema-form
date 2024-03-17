import { SelectControl } from '@wordpress/components';
import { labelValue } from '@rjsf/utils';


/** The `SelectWidget` is a widget for rendering dropdowns.
 *  It is typically used with string properties constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function SelectWidget({ options, value, schema, label, hideLabel, onChange, onBlur, onFocus, }) {
  const { enumOptions } = options;
  const description = options.description ?? schema.description;
  return (
    <SelectControl
      label={labelValue(<span>{label}</span>, hideLabel)}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      onFocus={onFocus}
      options={enumOptions}
      help={description}
    />
  );
}
export default SelectWidget;
