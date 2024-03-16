import { TextControl } from '@wordpress/components';

/**
 *
 * @param props - The `WidgetProps` for this component
 */
export default function PasswordWidget(props) {
  const {options, registry, schema, onBlur} = props;
  return <TextControl type={'password'} className={"password-widget"} label={schema.title} placeholder={options.help} onChange={props.onChange} />;
}
