import { TextControl } from '@wordpress/components';
import { useCallback, useEffect, useRef } from 'react';
import { labelValue, schemaRequiresTrueValue, getUiOptions, getInputProps, examplesId} from '@rjsf/utils';
import Markdown from 'markdown-to-jsx';

/** The `TextWidget` component uses the `TextControl`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TextWidget(props) {
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
  let inputValue;
  if (inputProps.type === 'number' || inputProps.type === 'integer') {
      inputValue = value || value === 0 ? value : '';
  }
  else {
      inputValue = value == null ? '' : value;
  }
  const _onChange = useCallback(( value) => onChange(value === '' ? options.emptyValue : value), [onChange, options]);
  const _onBlur = useCallback(( value) => onBlur(id, value), [onBlur, id]);
  const _onFocus = useCallback((value) => onFocus(id, value), [onFocus, id]);

  const required = schemaRequiresTrueValue(props.schema);

  const uiOptions = getUiOptions(props.uiSchema, props.registry.globalUiOptions);

  const description = props.options.description || props.schema.description || '';
  const richDescription = uiOptions.enableMarkdownInDescription ? <Markdown>{description}</Markdown> : description;

  const listId = schema.examples ? examplesId(id) : undefined;

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current?.setAttribute('autocomplete', uiOptions.autocomplete ?? 'off');
    if( examplesId ) {
      inputRef.current?.setAttribute('list', listId);
    }
  }, [inputRef]);

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
        type={uiSchema.inputType ?? 'text'}
        help={richDescription}
        required={required}
        ref={inputRef}
        style={{ maxWidth : schema.maxLength!==undefined ? `${schema.maxLength + 1}em` : 'inherit'}}/>

        {
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
