import { TranslatableString } from '@rjsf/utils';
import { Button } from '@wordpress/components';

/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton({ className, onClick, disabled, registry, }) {
    const { translateString } = registry;
    return (<div className='row'>
      <p className={`add-button ${className}`}>
        <Button  icon='plus' title={translateString(TranslatableString.AddButton)} onClick={onClick} disabled={disabled} registry={registry}>Add</Button>
      </p>
    </div>);
}
