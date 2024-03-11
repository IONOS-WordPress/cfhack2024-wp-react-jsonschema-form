import { errorId } from '@rjsf/utils';
/** The `FieldErrorTemplate` component renders the errors local to the particular field
 *
 * @param props - The `FieldErrorProps` for the errors being rendered
 */
export default function FieldErrorTemplate(props) {
    const { errors = [], idSchema } = props;
    if (errors.length === 0) {
        return null;
    }
    const id = errorId(idSchema);
    return (<div>
      <ul id={id} className='error-detail bs-callout bs-callout-info'>
        {errors
            .filter((elem) => !!elem)
            .map((error, index) => {
            return (<li className='text-danger' key={index}>
                {error}
              </li>);
        })}
      </ul>
    </div>);
}
