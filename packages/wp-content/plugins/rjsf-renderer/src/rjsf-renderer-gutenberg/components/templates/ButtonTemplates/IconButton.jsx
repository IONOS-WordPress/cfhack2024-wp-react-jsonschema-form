import { TranslatableString } from '@rjsf/utils';
import { Button } from '@wordpress/components';

export function CopyButton(props) {
    const { registry: { translateString }, } = props;
    return (<Button title={translateString(TranslatableString.CopyButton)} className='array-item-copy' {...props} icon='copy'/>);
}
export function MoveDownButton(props) {
    const { registry: { translateString }, } = props;
    return (<Button title={translateString(TranslatableString.MoveDownButton)} className='array-item-move-down' {...props} icon='arrow-down'/>);
}
export function MoveUpButton(props) {
    const { registry: { translateString }, } = props;
    return (<Button title={translateString(TranslatableString.MoveUpButton)} className='array-item-move-up' {...props} icon='arrow-up'/>);
}
export function RemoveButton(props) {
    const { registry: { translateString }, uiSchema, ...buttonProps} = props;
    return (<Button title={translateString(TranslatableString.RemoveButton)} className='array-item-remove' {...buttonProps} icon='remove'/>);
}
