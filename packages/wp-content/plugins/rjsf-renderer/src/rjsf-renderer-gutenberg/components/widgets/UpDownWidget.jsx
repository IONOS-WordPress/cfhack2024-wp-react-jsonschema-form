import { TextControl } from '@wordpress/components';
import { useCallback, useEffect, useRef } from 'react';
import { labelValue, schemaRequiresTrueValue, getUiOptions, getInputProps, examplesId, rangeSpec, description, } from '@rjsf/utils';
import RichDescription from '../../RichDescription.jsx';

/** The `UpDownWidget` component uses the `TextControl`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function UpDownWidget(props) {
  const { id, name, // remove this from ...rest
    value, readonly, disabled, autofocus, className, onBlur, onFocus, onChange, onChangeOverride, options, schema, uiSchema, formContext, registry, rawErrors, type, hideLabel, // remove this from ...rest
    hideError, // remove this from ...rest
    ...rest } = props;

  // Note: since React 15.2.0 we can't forward unknown element attributes, so we
  // exclude the "options" and "schema" ones here.
  if (!id) {
      console.log('No id for', props);
      throw new Error(`no id for props ${JSON.stringify(props)}`);
  }
  const inputProps = {
      ...rest,
      ...getInputProps(schema, type, options),
  };
  let inputValue = value || value === 0 ? value : '';

  const _onChange = useCallback(( value) => onChange(value === '' ? options.emptyValue : Number.parseFloat(value)), [onChange, options]);
  const _onBlur = useCallback(( value) => onBlur(id, value), [onBlur, id]);
  const _onFocus = useCallback((value) => onFocus(id, value), [onFocus, id]);

  const required = schemaRequiresTrueValue(schema);

  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const range = rangeSpec(schema);

  const listId = options.enumOptions || schema.examples ? examplesId(id) : undefined;

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.setAttribute('autocomplete', uiOptions.autocomplete ?? 'off');
    if( listId ) {
      inputRef.current?.setAttribute('list', listId);
    }
  }, [inputRef]);

  const _description = RichDescription(schema, uiSchema, options, registry);

  return (
    <>
      <TextControl
        label={labelValue(<span>{props.label}</span>, props.hideLabel)}
        value={inputValue}
        className={className}
        onChange={_onChange}
        size={schema.maxLength}
        maxLength={schema.maxLength}
        onBlur={_onBlur}
        onFocus={_onFocus}
        readOnly={readonly}
        default={props.default}
        help={_description}
        required={required}
        ref={inputRef}
        type='number'
        step={range.multipleOf ?? (schema.type==='integer' ? 1 : 0.1)}
        min={range.min}
        max={range.max}
      />

      {
        Array.isArray(options.enumOptions) ?
          (<datalist key={`datalist_${id}`} id={listId}>
            {options.enumOptions.map(({label, value}) => <option key={label} value={value}/>)}
          </datalist>)
        :
          Array.isArray(schema.examples) && (<datalist key={`datalist_${id}`} id={listId}>
            {schema.examples
                  .concat(schema.default && !schema.examples.includes(schema.default) ? [schema.default] : [])
                  .map((example) => <option key={example} value={example}/>
              )}
          </datalist>)
      }
    </>
  );
}
