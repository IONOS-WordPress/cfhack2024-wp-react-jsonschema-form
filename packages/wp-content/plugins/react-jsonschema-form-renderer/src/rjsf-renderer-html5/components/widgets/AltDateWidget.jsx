import { useCallback, useEffect, useReducer, useState } from 'react';
import { ariaDescribedByIds, parseDateString, toDateString, pad, TranslatableString, getDateElementProps, } from '@rjsf/utils';
function rangeOptions(start, stop) {
    const options = [];
    for (let i = start; i <= stop; i++) {
        options.push({ value: i, label: pad(i, 2) });
    }
    return options;
}
function readyForChange(state) {
    return Object.values(state).every((value) => value !== -1);
}
function DateElement({ type, range, value, select, rootId, name, disabled, readonly, autofocus, registry, onBlur, onFocus, }) {
    const id = rootId + '_' + type;
    const { SelectWidget } = registry.widgets;
    return (<SelectWidget schema={{ type: 'integer' }} id={id} name={name} className='form-control' options={{ enumOptions: rangeOptions(range[0], range[1]) }} placeholder={type} value={value} disabled={disabled} readonly={readonly} autofocus={autofocus} onChange={(value) => select(type, value)} onBlur={onBlur} onFocus={onFocus} registry={registry} label='' aria-describedby={ariaDescribedByIds(rootId)}/>);
}
/** The `AltDateWidget` is an alternative widget for rendering date properties.
 * @param props - The `WidgetProps` for this component
 */
function AltDateWidget({ time = false, disabled = false, readonly = false, autofocus = false, options, id, name, registry, onBlur, onFocus, onChange, value, }) {
    const { translateString } = registry;
    const [lastValue, setLastValue] = useState(value);
    const [state, setState] = useReducer((state, action) => {
        return { ...state, ...action };
    }, parseDateString(value, time));
    useEffect(() => {
        const stateValue = toDateString(state, time);
        if (readyForChange(state) && stateValue !== value) {
            // The user changed the date to a new valid data via the comboboxes, so call onChange
            onChange(stateValue);
        }
        else if (lastValue !== value) {
            // We got a new value in the props
            setLastValue(value);
            setState(parseDateString(value, time));
        }
    }, [time, value, onChange, state, lastValue]);
    const handleChange = useCallback((property, value) => {
        setState({ [property]: value });
    }, []);
    const handleSetNow = useCallback((event) => {
        event.preventDefault();
        if (disabled || readonly) {
            return;
        }
        const nextState = parseDateString(new Date().toJSON(), time);
        onChange(toDateString(nextState, time));
    }, [disabled, readonly, time]);
    const handleClear = useCallback((event) => {
        event.preventDefault();
        if (disabled || readonly) {
            return;
        }
        onChange(undefined);
    }, [disabled, readonly, onChange]);
    return (<ul className='list-inline'>
      {getDateElementProps(state, time, options.yearsRange, options.format).map((elemProps, i) => (<li className='list-inline-item' key={i}>
          <DateElement rootId={id} name={name} select={handleChange} {...elemProps} disabled={disabled} readonly={readonly} registry={registry} onBlur={onBlur} onFocus={onFocus} autofocus={autofocus && i === 0}/>
        </li>))}
      {(options.hideNowButton !== 'undefined' ? !options.hideNowButton : true) && (<li className='list-inline-item'>
          <a href='#' className='btn btn-info btn-now' onClick={handleSetNow}>
            {translateString(TranslatableString.NowLabel)}
          </a>
        </li>)}
      {(options.hideClearButton !== 'undefined' ? !options.hideClearButton : true) && (<li className='list-inline-item'>
          <a href='#' className='btn btn-warning btn-clear' onClick={handleClear}>
            {translateString(TranslatableString.ClearLabel)}
          </a>
        </li>)}
    </ul>);
}
export default AltDateWidget;
