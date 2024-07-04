import { getTemplate, getUiOptions, } from '@rjsf/utils';
import TabWidget from '../widgets/TabWidget';
/** The `TabFieldTemplate` component is the template used to render all items as tabs
 *
 * @param props - The `ArrayFieldTemplateItemType` props for the component
 */
export default function TabFieldTemplate(props) {
    const {className, idSchema, uiSchema, items, registry, required, schema, title, } = props;
    const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);
    const ArrayFieldDescriptionTemplate = getTemplate('ArrayFieldDescriptionTemplate', registry, uiOptions);
    const ArrayFieldTitleTemplate = getTemplate('ArrayFieldTitleTemplate', registry, uiOptions);
    return (<fieldset className={className} id={idSchema.$id}>
      <ArrayFieldTitleTemplate idSchema={idSchema} title={uiOptions.title || title} required={required} schema={schema} uiSchema={uiSchema} registry={registry}/>
      <ArrayFieldDescriptionTemplate idSchema={idSchema} description={uiOptions.description || schema.description} schema={schema} uiSchema={uiSchema} registry={registry}/>
      <div className='row array-item-list'>
        {items && (<TabWidget  {...props}/>)}
      </div>
    </fieldset>);
}
