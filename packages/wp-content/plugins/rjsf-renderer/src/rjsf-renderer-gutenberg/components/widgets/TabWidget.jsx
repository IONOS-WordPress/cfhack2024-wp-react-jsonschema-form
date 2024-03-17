import { TabPanel } from '@wordpress/components';

/** The `URLWidget` component uses the `BaseInputTemplate` changing the type to `url`.
 *
 * @param props - The `WidgetProps` for this component
 */
export default function TabWidget({ items, schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, children }) {
  return (
    <TabPanel
      tabs={schema.items.map((p, i) => Object.assign({}, {}, { "title": p.title, "name": p.title, "children": items[i].children }))}>
      {
        (tab) => tab.children
      }
    </TabPanel>
  );
}
