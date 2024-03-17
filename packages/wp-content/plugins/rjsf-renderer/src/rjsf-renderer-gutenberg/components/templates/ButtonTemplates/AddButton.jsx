import { TranslatableString } from '@rjsf/utils';
import { Button } from '@wordpress/components';

import IconButton from './IconButton';
/** The `AddButton` renders a button that represent the `Add` action on a form
 */
export default function AddButton({ className, onClick, disabled, registry, }) {
    const { translateString } = registry;
    return (<div className='row'>
      <p className={`add-button ${className}`}>
        <Button iconType='info' icon='plus' className='btn-add col-xs-12' title={translateString(TranslatableString.AddButton)} onClick={onClick} disabled={disabled} registry={registry}>Add</Button>
      </p>
    </div>);
}
