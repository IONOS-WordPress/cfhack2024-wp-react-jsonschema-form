import Markdown from 'markdown-to-jsx';
import { getUiOptions, } from '@rjsf/utils';
/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField(props) {
    const { id, description, schema, uiSchema } = props;
    if (!description) {
        return null;
    }
    if (typeof description === 'string') {
        const uiOptions = getUiOptions(uiSchema, props.registry.globalUiOptions);
        const richDescription = uiOptions.enableMarkdownInDescription ? <Markdown>{description}</Markdown> : description;

        return (<p id={id} className='field-description'>
        {richDescription}
      </p>);
    }
    else {
        return (<div id={id} className='field-description'>
        {description}
      </div>);
    }
}
