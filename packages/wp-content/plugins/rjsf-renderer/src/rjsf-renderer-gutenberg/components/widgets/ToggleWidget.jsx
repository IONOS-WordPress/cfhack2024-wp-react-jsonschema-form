import { FormToggle } from '@wordpress/components';
import { descriptionId, getTemplate } from '@rjsf/utils';

function ToggleWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
  const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
  const description = options.description ?? schema.description;

  const checked = typeof value === 'undefined' ? false : value;

  return (
    <>
      {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry}/>)}
      <FormToggle
        checked={checked}
        onChange={() => onChange(!checked)}
      />
    </>
  );
}
export default ToggleWidget;
