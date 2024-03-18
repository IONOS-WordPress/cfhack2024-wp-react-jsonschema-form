import {RangeControl} from '@wordpress/components';
import {labelValue} from "@rjsf/utils";

/** The `RangeWidget` component uses the `BaseInputTemplate` changing the type to `range` and wrapping the result
 * in a div, with the value along side it.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function RangeWidget(props) {
  // The following is a bit over over engineered but now the Range Control always has the perfekt initialPosition
  let max = props.schema.max;
  let min = props.schema.min;

  if (!max) {
    max = 100;
  }
  if (!min) {
    max = 0;
  }

  const initialPosition =
    max < min
      ? min
      : min + (max - min) / 2;
  return <RangeControl
    help={props.description}
    initialPosition={props.schema.initialPosition ?? initialPosition}
    label={labelValue(<span>{props.label}</span>, props.hideLabel)}
    max={props.schema.max}
    min={props.schema.min}
    onChange={props.onChange}
    onBlur={props.onBlur}
    onFocus={props.onFocus}
    onMouseLeave={props.onMouseLeave}
    onMouseMove={props.onMouseMove}

  />
}
