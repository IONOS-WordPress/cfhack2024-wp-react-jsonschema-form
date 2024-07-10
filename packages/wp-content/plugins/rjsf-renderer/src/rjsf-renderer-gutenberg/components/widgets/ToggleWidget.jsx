import { ToggleControl } from '@wordpress/components';
import { labelValue, getUiOptions, description, } from '@rjsf/utils';
import RichDescription from '../../RichDescription.jsx';

/** The `ToggleWidget` is a widget for rendering boolean properties.
 *  It is typically used to represent a boolean.
 *
 * @param props - The `WidgetProps` for this component
 */
function ToggleWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {

  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const _description = RichDescription(schema, uiSchema, options, registry);

  const checked = typeof value === 'undefined' ? false : value;
  return (
    <>
      <ToggleControl
        checked={checked}
        label={labelValue(<span>{label}</span>, hideLabel)}
        help={_description}
        onChange={() => onChange(!checked)}
      />
    </>
  );
}
export default ToggleWidget;
