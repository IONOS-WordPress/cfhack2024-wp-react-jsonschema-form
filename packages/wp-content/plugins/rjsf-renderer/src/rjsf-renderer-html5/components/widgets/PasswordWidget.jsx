import { getTemplate } from '@rjsf/utils';
/** The `PasswordWidget` component uses the `BaseInputTemplate` changing the type to `password`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function PasswordWidget(props) {
    const { options, registry } = props;
    const BaseInputTemplate = getTemplate('BaseInputTemplate', registry, options);
    return <BaseInputTemplate type='password' {...props}/>;
}
