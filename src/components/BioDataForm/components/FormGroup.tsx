import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';

import FormField from '../../UtilComponents/FormField';
import useBioDataFormViewModel from '../viewModel';

import AddExtraFieldForm from './AddExtraFieldForm';

const FormGroup: React.FC = () => {
  const viewModel = useBioDataFormViewModel();
  const data = viewModel.getData();

  return (
    <div className="biodata-fields-wrapper biodata-group-wrapper">
      {data.map((data) => (
        <>
          <div className="biodata-field-title-wrapper">
            <p className="biodata-field-title">{data.title}</p>
          </div>
          {data.data.map((field) => (
            <FormField
              key={field.id}
              label={field.label}
              required={field.required}
              onDelete={() => viewModel.removeFormField(data.id, field.id)}
              onFieldMove={(direction: 'up' | 'down') =>
                viewModel.moveTheFormField(data.id, field.id, direction)
              }
              value={field.value}
              onChange={(
                e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
              ) => {
                viewModel.handleValueChange(data.id, field.id, e.target.value);
              }}
              error={field.error}
              errorText={field.errorText}
            />
          ))}
          <Button
            variant="text"
            className="add-field-btn"
            onClick={() => viewModel.setShowExtraFieldForm(data.id)}
          >
            <AddIcon /> Add More Fields
          </Button>
          <AddExtraFieldForm />
        </>
      ))}

      {/* <Button variant="text" className="add-field-btn" onClick={downloadPdf}>
    Submit
    </Button> */}

      {/* <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
   {({blob, url, loading, error}) => (loading ? 'Loading document ...': 'Download now!')}
    </PDFDownloadLink> */}
    </div>
  );
};
export default FormGroup;
