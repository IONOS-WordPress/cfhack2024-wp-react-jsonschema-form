/** The `DescriptionField` is the template to use to render the description of a field
 *
 * @param props - The `DescriptionFieldProps` for this component
 */
export default function DescriptionField(props) {
    const { id, description } = props;
    if (!description) {
        return null;
    }
    if (typeof description === 'string') {
        return (<p id={id} className='field-description'>
        {description}
      </p>);
    }
    else {
        return (<div id={id} className='field-description'>
        {description}
      </div>);
    }
}
