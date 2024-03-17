import { RadioControl } from '@wordpress/components';
import { labelValue, enumOptionsSelectValue, } from '@rjsf/utils';

/** The `RadioWidget` is a widget for rendering a radio group.
 *  It is typically used with a string property constrained with enum options.
 *
 * @param props - The `WidgetProps` for this component
 */
function RadioWidget({ options, value, description, label, hideLabel, onBlur, onFocus, onChange,}) {
  const { enumOptions } = options;

  return (
    <RadioControl
      label= { labelValue(<span>{label}</span>, hideLabel) }
      help= { description }
      selected={ enumOptionsSelectValue( enumOptions?.[0]?.value, value, enumOptions ) }
      options={ enumOptions }
      onBlur={ onBlur }
      onFocus={ onFocus }
      onChange={ (value) => onChange( value ) }
    />
  );
}
export default RadioWidget;
