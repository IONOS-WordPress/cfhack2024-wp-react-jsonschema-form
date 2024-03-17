import {ADDITIONAL_PROPERTY_FLAG, TranslatableString,} from '@rjsf/utils';
import {TextControl} from '@wordpress/components';

import Label from './FieldTemplate/Label';

/** The `WrapIfAdditional` component is used by the `FieldTemplate` to rename, or remove properties that are
 * part of an `additionalProperties` part of a schema.
 *
 * @param props - The `WrapIfAdditionalProps` for this component
 */
export default function WrapIfAdditionalTemplate(props) {
  const {
    id,
    classNames,
    style,
    disabled,
    label,
    onKeyChange,
    onDropPropertyClick,
    readonly,
    required,
    schema,
    children,
    uiSchema,
    registry,
  } = props;
  const {templates, translateString} = registry;
  // Button templates are not overridden in the uiSchema
  const {RemoveButton} = templates.ButtonTemplates;
  const keyLabel = translateString(TranslatableString.KeyLabel, [label]);
  const additional = ADDITIONAL_PROPERTY_FLAG in schema;
  if (!additional) {
    return (<div className={classNames} style={style}>
      {children}
    </div>);
  }
  console.log("Additional Template", additional)
  return (<div className={classNames} style={style}>
    <div className='additional-template__row'>

      <div className={"additional-template__key-container"}><TextControl label={keyLabel} required={required} id={`${id}-key`} className='form-control' type='text'
                        onBlur={(event) => onKeyChange(event.target.value)} defaultValue={label}/></div>
      <div className={"additional-template__value-container"}>{children}</div>
      <div className='additional-template__delete-container'>
        <RemoveButton className='array-item-remove btn-block' style={{border: '0'}} disabled={disabled || readonly}
                      onClick={onDropPropertyClick(label)} uiSchema={uiSchema} registry={registry}/>
      </div>
    </div>
  </div>);
}
