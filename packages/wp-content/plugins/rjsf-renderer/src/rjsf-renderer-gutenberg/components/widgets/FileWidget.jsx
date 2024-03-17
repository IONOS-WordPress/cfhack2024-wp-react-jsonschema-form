import { useCallback } from 'react';
import { FormFileUpload } from '@wordpress/components';
import { descriptionId, getTemplate, labelValue } from '@rjsf/utils';

function addNameToDataURL(dataURL, name) {
    if (dataURL === null) {
        return null;
    }
    return dataURL.replace(';base64', `;name=${encodeURIComponent(name)};base64`);
}
function processFile(file) {
    const { name, size, type } = file;
    return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.onerror = reject;
        reader.onload = (event) => {
            if (typeof event.target?.result === 'string') {
                resolve({
                    dataURL: addNameToDataURL(event.target.result, name),
                    name,
                    size,
                    type,
                });
            }
            else {
                resolve({
                    dataURL: null,
                    name,
                    size,
                    type,
                });
            }
        };
        reader.readAsDataURL(file);
    });
}
function processFiles(files) {
    return Promise.all(Array.from(files).map(processFile));
}

/** The `FileWidget` uses FormFileUpload to pick files.
 *
 * @param props - The `WidgetProps` for this component
 */
function FileWidget({ schema, uiSchema, options, id, value, disabled, readonly, label, hideLabel, autofocus = false, onBlur, onFocus, onChange, registry, }) {
    const DescriptionFieldTemplate = getTemplate('DescriptionFieldTemplate', registry, options);
    const description = options.description ?? schema.description;

    const handleChange = useCallback((event) => {
        if (!event.target.files) {
            return;
        }
        processFiles(event.target.files).then((filesInfoEvent) => {
            const newValue = filesInfoEvent.map((fileInfo) => fileInfo.dataURL);
            onChange(newValue[0]);
        });
    }, [value, onChange]);
    return (<>
        <FormFileUpload
            onChange={handleChange}
            accept={options.accept}
            multiple={schema.multiple}
            onBlur={onBlur}
            onFocus={onFocus}
            readOnly={readonly}
            disabled={disabled || readonly}>
            {labelValue(<span>{label}</span>, hideLabel)}
        </FormFileUpload>
        {!hideLabel && !!description && (<DescriptionFieldTemplate id={descriptionId(id)} description={description} schema={schema} uiSchema={uiSchema} registry={registry} />)}
    </>
    );
}
export default FileWidget;
