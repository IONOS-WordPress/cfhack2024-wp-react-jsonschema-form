import { TranslatableString } from '@rjsf/utils';
import Markdown from 'markdown-to-jsx';
/** The `UnsupportedField` component is used to render a field in the schema is one that is not supported by
 * react-jsonschema-form.
 *
 * @param props - The `FieldProps` for this template
 */
function UnsupportedField(props) {
    const { schema, idSchema, reason, registry } = props;
    const { translateString } = registry;
    let translateEnum = TranslatableString.UnsupportedField;
    const translateParams = [];
    if (idSchema && idSchema.$id) {
        translateEnum = TranslatableString.UnsupportedFieldWithId;
        translateParams.push(idSchema.$id);
    }
    if (reason) {
        translateEnum =
            translateEnum === TranslatableString.UnsupportedField
                ? TranslatableString.UnsupportedFieldWithReason
                : TranslatableString.UnsupportedFieldWithIdAndReason;
        translateParams.push(reason);
    }
    return (<div className='unsupported-field'>
      <div>
        <Markdown>{translateString(translateEnum, translateParams)}</Markdown>
      </div>
      {schema && <pre>{JSON.stringify(schema, null, 2)}</pre>}
    </div>);
}
export default UnsupportedField;
