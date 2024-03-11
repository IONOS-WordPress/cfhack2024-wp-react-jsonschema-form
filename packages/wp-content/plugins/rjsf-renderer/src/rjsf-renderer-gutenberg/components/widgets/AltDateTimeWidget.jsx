/** The `AltDateTimeWidget` is an alternative widget for rendering datetime properties.
 *  It uses the AltDateWidget for rendering, with the `time` prop set to true by default.
 *
 * @param props - The `WidgetProps` for this component
 */
function AltDateTimeWidget({ time = true, ...props }) {
    const { AltDateWidget } = props.registry.widgets;
    return <AltDateWidget time={time} {...props}/>;
}
export default AltDateTimeWidget;
