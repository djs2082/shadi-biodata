import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import { useFormData } from '../../../hooks/useFormData';
import FormField from '../../molecules/FormField';

import AddExtraFieldForm from './AddExtraFieldForm';

const FormGroup: React.FC = () => {
  // eslint-disable-next-line prettier/prettier
  const {
    data,
    removeFormField,
    moveFormField,
    updateFieldValue,
    showAddFieldForm,
  } = useFormData();

  return (
    <div className="biodata-fields-wrapper biodata-group-wrapper">
      {data.map((group) => (
        <>
          <div className="biodata-field-title-wrapper">
            <p className="biodata-field-title">{group.title}</p>
          </div>
          {group.data.map((field) => (
            <FormField
              key={field.id}
              label={field.label}
              required={field.required}
              onDelete={() => removeFormField(group.id, field.id)}
              onFieldMove={(direction: 'up' | 'down') =>
                moveFormField(group.id, field.id, direction)
              }
              value={field.value}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                updateFieldValue(group.id, field.id, e.target.value);
              }}
              error={field.error}
              errorText={field.errorText}
            />
          ))}
          <Button
            variant="text"
            className="add-field-btn"
            onClick={() => showAddFieldForm(group.id)}
          >
            <AddIcon /> Add More Fields
          </Button>
          <AddExtraFieldForm />
        </>
      ))}
    </div>
  );
};
export default FormGroup;
