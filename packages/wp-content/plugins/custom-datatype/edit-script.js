
setTimeout(
	() => (function (wp) {
		const createHigherOrderComponent = wp.compose.createHigherOrderComponent;
		const {Fragment} = wp.element;
		const {InspectorControls} = wp.blockEditor;
		const {TextControl} = wp.components;
		const PanelBody = wp.components.PanelBody;

		const loadedPagePostType = wp.data.select('core/editor').getCurrentPostType();
		if ('wp_data_type' !== loadedPagePostType) {
			return;
		}

		const withCustomInspectorControl = createHigherOrderComponent((BlockEdit) => {
			return (props) => {
				const {attributes, setAttributes} = props;
				const {selectedBlockType} = wp.data.useSelect((select) => {
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
					return wp.element.createElement(BlockEdit, props);
				}

				return (
					wp.element.createElement(Fragment, null, [
						wp.element.createElement(BlockEdit, props),
						wp.element.createElement(InspectorControls, null, [
							wp.element.createElement(PanelBody, {title: "Custom Fields Names", initialOpen: true}, [
								...blockAttributesNames.map((attributeKey) => {
									return wp.element.createElement(TextControl, {
										key: attributeKey,
										label: attributeKey,
										value: attrsFieldNames[attributeKey],
										onChange: (value) => {
											setFieldNames({
												...attrsFieldNames,
												[attributeKey]: value
											});
										}
									});
								})
							])
						])
					])
				);
			};
		}, 'withCustomInspectorControl');

		wp.hooks.addFilter(
			'editor.BlockEdit',
			'my-plugin/with-custom-inspector-control',
			withCustomInspectorControl
		);
	})(window.wp)
	, 800
);

setTimeout(
	() => {
		wp.data.dispatch('core/blocks')
			.addBlockTypes(
				wp.data.select('core/blocks')
					.getBlockTypes()
					.map(t => ({
							...t,
							attributes: Object
								.keys(t.attributes)
								.reduce(
									(as, a) => {
										const {source, selector, attribute, ...rest} = t.attributes[a];
										as[a] = rest;
										return as
									},
									{}
								)
						})
					)
			)
	},
	800
);
