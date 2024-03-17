import { TextControl } from '@wordpress/components';
import { useCallback } from 'react';

/** The `PasswordWidget` component uses the `TextControl`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function PasswordWidget(props) {
  const { options, registry, schema, onBlur } = props;
  const handleChange = useCallback((value) => props.onChange(value === '' ? props.options.emptyValue : value));
  return <TextControl type={'password'} className={"password-widget"} label={schema.title} placeholder={options.help} onChange={handleChange} />;
}
