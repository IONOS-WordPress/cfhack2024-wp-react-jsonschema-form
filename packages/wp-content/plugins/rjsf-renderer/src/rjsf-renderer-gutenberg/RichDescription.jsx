import { getUiOptions, } from '@rjsf/utils';
import Markdown from 'markdown-to-jsx';

export default function RichDescription (schema, uiSchema, options, registry) {
  const uiOptions = getUiOptions(uiSchema, registry.globalUiOptions);

  const description = (options.description || schema.description || '');

  return (
    uiOptions.enableMarkdownInDescription ?
    <Markdown options={{
      wrapper: ({ children, ...props }) => <span {...props} className='markdown-description'>{children}</span>,
      overrides: {
        p : ({ children, ...props }) => <span {...props} className='markdown-description-line'>{children}</span>,
      },
    }}>{description}</Markdown> :
    description
  );
}
