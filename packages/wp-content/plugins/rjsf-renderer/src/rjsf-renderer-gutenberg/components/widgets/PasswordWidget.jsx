import {__experimentalInputControl as InputControl} from '@wordpress/components';

/**
 *
 * @param props - The `WidgetProps` for this component
 */
export default function PasswordWidget(props) {
  const {options, registry, schema, onBlur} = props;
  return <InputControl type='password' label={schema.title} placeholder={options.help} {...props} />;
}
