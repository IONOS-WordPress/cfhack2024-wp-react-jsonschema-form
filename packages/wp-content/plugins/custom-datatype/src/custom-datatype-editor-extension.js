import { createHigherOrderComponent } from '@wordpress/compose';
import { InspectorControls } from '@wordpress/block-editor';
import { TextControl, PanelBody } from '@wordpress/components';
import { useSelect } from '@wordpress/data';
import { addFilter } from '@wordpress/hooks';

const withCustomInspectorControl = createHigherOrderComponent((BlockEdit) => {
  return (props) => {
    const {attributes, setAttributes} = props;
    const {selectedBlockType} = useSelect((select) => {
      const {getSelectedBlock} = select('core/block-editor');
      const {getBlockType} = select('core/blocks');
      const block = getSelectedBlock();
      return {
        selectedBlock: block,
        selectedBlockType: block ? getBlockType(block.name) : null
      };
    }, []);

    function setFieldNames(next) {
      const formFieldNames = Object.fromEntries(Object.entries(next).filter(([name, value]) => value !== '' && value !== undefined && value !== null));
      setAttributes({
        ...attributes,
        metadata: {
          ...(attributes.metadata || {}),
          formFieldNames
        }
      })
    }

    const blockAttributesNames = Object.keys(selectedBlockType?.attributes || {})
      .filter((attributeName) => attributeName !== 'metadata');

      const attrsFieldNames = Object.fromEntries(blockAttributesNames.map((name) => ([
      name,
      attributes.metadata?.formFieldNames?.[name] || ''
    ])));

    if (!selectedBlockType?.attributes) {
      return <BlockEdit {...props}/>;
    }

    return (
      <>
        <BlockEdit {...props}/>
        <InspectorControls>
          <PanelBody title={"Custom Fields Names"} initialOpen={ true }>
            {
              blockAttributesNames.map((attributeKey) =>
                <TextControl
                  key={attributeKey}
                  label={attributeKey}
                  value={attrsFieldNames[attributeKey]}
                  onChange={(value) => {
                    setFieldNames({
                      ...attrsFieldNames,
                      [attributeKey]: value
                    });
                  }}
                />
              )
            }
          </PanelBody>
        </InspectorControls>
      </>
    );
  };
}, 'withCustomInspectorControl');

addFilter(
  'editor.BlockEdit',
  'my-plugin/with-custom-inspector-control',
  withCustomInspectorControl
);
