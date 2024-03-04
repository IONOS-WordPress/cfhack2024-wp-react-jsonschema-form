const REQUIRED_FIELD_SYMBOL = '*';
/** Renders a label for a field
 *
 * @param props - The `LabelProps` for this component
 */
export default function Label(props) {
    const { label, required, id } = props;
    if (!label) {
        return null;
    }
    return (<label className='control-label' htmlFor={id}>
      {label}
      {required && <span className='required'>{REQUIRED_FIELD_SYMBOL}</span>}
    </label>);
}
