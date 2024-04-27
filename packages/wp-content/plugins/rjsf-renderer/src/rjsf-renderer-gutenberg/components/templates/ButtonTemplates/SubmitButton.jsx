import { getSubmitButtonOptions } from '@rjsf/utils';
import { Button } from '@wordpress/components';
/** The `SubmitButton` renders a button that represent the `Submit` action on a form
 */
export default function SubmitButton({ uiSchema }) {
  const {
    submitText,
    norender,
    props: submitButtonProps = {}
  } = getSubmitButtonOptions(uiSchema);

  if (norender) {
    return null;
  }

  return (<div>
    <Button
      type="submit"
      variant="primary"
      {...submitButtonProps}
    >
      {submitText}
    </Button>
  </div>);
}
