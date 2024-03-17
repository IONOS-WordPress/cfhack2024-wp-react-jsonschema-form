import { TranslatableString } from '@rjsf/utils';
import { Button } from '@wordpress/components';

export default function IconButton(props) {
    const { iconType = 'default', icon, className, uiSchema, registry, ...otherProps } = props;
    return (<button type='button' className={`btn btn-${iconType} ${className}`} {...otherProps}>
      <i className={`glyphicon glyphicon-${icon}`}/>
    </button>);
}
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
    const { registry: { translateString }, } = props;
    return (<Button title={translateString(TranslatableString.RemoveButton)} className='array-item-remove' {...props} iconType='danger' icon='remove'/>);
}
