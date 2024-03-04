import { helpId } from '@rjsf/utils';
/** The `FieldHelpTemplate` component renders any help desired for a field
 *
 * @param props - The `FieldHelpProps` to be rendered
 */
export default function FieldHelpTemplate(props) {
    const { idSchema, help } = props;
    if (!help) {
        return null;
    }
    const id = helpId(idSchema);
    if (typeof help === 'string') {
        return (<p id={id} className='help-block'>
        {help}
      </p>);
    }
    return (<div id={id} className='help-block'>
      {help}
    </div>);
}
