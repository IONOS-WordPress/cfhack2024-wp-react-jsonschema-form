import { Dropdown, ColorPicker, BaseControl, useBaseControlProps } from "@wordpress/components";
import { useCallback } from "react";
import { labelValue, schemaRequiresTrueValue, getUiOptions, description } from "@rjsf/utils";
import RichDescription from "../../RichDescription.jsx";
/** The `ColorWidget` component uses the `ColorPicker`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function ColorWidget(props) {
  const {
    schema,
    uiSchema,
    options,
    id,
    value,
    disabled,
    readonly,
    label,
    hideLabel,
    autofocus = false,
    onBlur,
    onFocus,
    onChange,
    registry,
  } = props;
  const required = schemaRequiresTrueValue(schema);
  const _onChange = useCallback((value) => onChange(value === "" ? options.emptyValue : value), [onChange]);
  const _onBlur = useCallback((value) => onBlur(id, value), [onBlur, id]);
  const _onFocus = useCallback((value) => onFocus(id, value), [onFocus, id]);

  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const _description = RichDescription(schema, uiSchema, options, registry);

  // `useBaseControlProps` is a convenience hook to get the props for the `BaseControl`
  // and the inner control itself. Namely, it takes care of generating a unique `id`,
  // properly associating it with the `label` and `help` elements.
  const { baseControlProps, controlProps } = useBaseControlProps({
    label: labelValue(<span>{label}</span>, hideLabel),
    value,
    className: uiOptions.className,
    onChange: _onChange,
    onBlur: _onBlur,
    onFocus: _onFocus,
    readOnly: readonly,
    default: props.default,
    disabled: uiOptions.disabled,
    help: _description,
    style: uiOptions.style,
  });

  return (
    <BaseControl {...baseControlProps} __nextHasNoMarginBottom>
      <div>
        <Dropdown
          className="rjsf-gutenberg-colorpicker"
          renderToggle={({ isOpen, onToggle }) =>
            !(disabled || readonly) && (
              <div
                aria-expanded={isOpen}
                aria-haspopup="true"
                onClick={onToggle}
                className=""
                style={{ backgroundColor: value }}
                title={value}
              >
                &nbsp;
              </div>
            )
          }
          renderContent={() => (
            <ColorPicker
              color={value}
              onChangeComplete={(val) => onChange(`rgba(${val.rgb.r},${val.rgb.g}, ${val.rgb.b}, ${val.rgb.a})`)}
              disableAlpha={uiOptions.disableAlpha}
            />
          )}
          popoverProps = {{
            placement: 'left-start',
            offset: 36,
            shift: true,
          }}
        />
      </div>
    </BaseControl>
    /*
    <div className={"color-widget"}>
      {labelValue(<span>{label}</span>, hideLabel)}
      <Dropdown
        className="dropdown-colorpicker"
        renderToggle={({isOpen, onToggle}) =>
          !(disabled || readonly) && (
            <div
              aria-expanded={isOpen}
              aria-haspopup="true"
              onClick={onToggle}
              className="field-color-wrapper"
              style={{backgroundColor: value}}
              title={value}
            >
              <span>{value}</span>
            </div>
          )
        }
        renderContent={() => (
          <ColorPicker
            color={value}
            onChangeComplete={(val) =>
              onChange(
                `rgba(${val.rgb.r},${val.rgb.g}, ${val.rgb.b}, ${val.rgb.a})`
              )
            }
            disableAlpha={false}
          />
        )}
      />
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </div>
    */
    /*
    <div className={"color-widget"}>
      {labelValue(<span>{label}</span>, hideLabel)}
      <ColorPicker
        enableAlpha={uiSchema.enableAlpha === true}
        onChange={onChange}
        color={value}
        defaultValue={props.default}
      />
      {!hideLabel && !!description && (
        <DescriptionFieldTemplate
          id={descriptionId(id)}
          description={description}
          schema={schema}
          uiSchema={uiSchema}
          registry={registry}
        />
      )}
    </div>
    */
  );
}
