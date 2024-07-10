import { getUiOptions, } from '@rjsf/utils';
import Markdown from 'markdown-to-jsx';

export default function RichDescription (schema, uiSchema, options, registry) {
  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const description = (options.description || schema.description || '');

  return (
    uiOptions.enableMarkdownInDescription ?
    <Markdown options={{
      overrides: {
        p : ({ children, ...props }) => <div {...props}>{children}</div>,
      },
    }}>{description}</Markdown> :
    description
  );
}
