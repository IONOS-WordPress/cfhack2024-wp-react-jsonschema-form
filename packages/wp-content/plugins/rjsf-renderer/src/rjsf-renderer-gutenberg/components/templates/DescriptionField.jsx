import { getUiOptions, description, } from '@rjsf/utils';
import RichDescription from '../../RichDescription';
/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField(props) {
  const { id, schema, uiSchema, registry } = props;
  if (!props.description) {
      return null;
  }

  const _description = RichDescription(schema, uiSchema, { description }, registry);

  return (<div id={id} className='field-description'>
      {description}
    </div>);
}
