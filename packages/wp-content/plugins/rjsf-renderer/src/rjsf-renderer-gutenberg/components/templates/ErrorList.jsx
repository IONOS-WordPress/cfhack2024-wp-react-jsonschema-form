import {Notice} from '@wordpress/components';
import {TranslatableString,} from '@rjsf/utils';


/** The `ErrorList` component is the template that renders the all the errors associated with the fields in the `Form`
 *
 * @param props - The `ErrorListProps` for this component
 */
export default function ErrorList({errors, registry,}) {
  const {translateString} = registry;
  return (<Notice className={"error-heading"}
    onDismiss={function noRefCheck() {
    }}
    onRemove={function noRefCheck() {
    }}
    isDismissible={false}
    status="error"
  >
    <h3 className='panel-title'>{translateString(TranslatableString.ErrorsLabel)}</h3>
    <ul className='list-group'>
      {errors.map((error, i) => {
        return (<li key={i} className='list-group-item text-danger'>
          {error.stack}
        </li>);
      })}
    </ul>
  </Notice>);
}
