import { Button, FormControl, OutlinedInput } from '@mui/material';
import axios from 'axios';
import FormField from '../UtilComponents/FormField';
import { saveAs } from 'file-saver';
import AddIcon from '@mui/icons-material/Add';
import { pdf } from '@react-pdf/renderer';
import './index.scss';
import { useEffect, useState } from 'react';
// import PermMediaIcon from '@mui/icons-material/PermMedia';
// import Cropper from "react-easy-crop";
// import getCroppedImg from './cropImage'; // Helper function to crop the image (explained below)
// import { Area } from 'react-easy-crop';
// import axios from 'axios';
import ImageCropModal from '../UtilComponents/ImgeCropModal';
import BasicTemplate from '../BioDataTemplates/BasicTemplate';
import PrimaryButton from '../UtilComponents/Buttons/PrimaryButton';
import SecondaryButton from '../UtilComponents/Buttons/SecondaryButton';
import CustomModal from '../UtilComponents/Modals/Modal';
import { FormDataFields } from './formDataFields';
// import { relative } from "path";

interface FormDataField {
  id: number;
  label: string;
  type: string;
  value: string;
  required: boolean;
}

interface FormDataFieldGorup {
  id: number;
  title: string;
  data: FormDataField[];
}

const BioDataForm = () => {
   const [showExtraFieldForm, setShowExtraFieldForm] = useState(false);
  const BioDataFormData: FormDataFieldGorup[] = FormDataFields;

  const [formDataFieldsGroup, setFormDataFieldsGroup] =
    useState<FormDataFieldGorup[]>(BioDataFormData);
  // const [imageSrc, setImageSrc] = useState<any>(null);
  // const [imageFile, setImageFile] = useState<File | null>(null);
  // const [croppedArea, setCroppedArea] = useState<any>(null);
  // const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // const [crop, setCrop] = useState({ x: 0, y: 0 });
  // const [zoom, setZoom] = useState(1);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [extraFieldFormGroupId, setExtraFieldFormGroupId] = useState<
    number | null
  >(null);
  const [extraFieldName, setExtraFieldName] = useState<string>('');
  const [extraFieldValue, setExtraFieldValue] = useState<string>();
  const [currentCount, setCurrentCount] = useState<string>();

  const url =
    process.env.NODE_ENV === 'production' ?
     'https://api.counterapi.dev/v1/shadibiodata/prod': 
     'https://api.counterapi.dev/v1/shadibiodata/dev';

  const hideExtraFieldForm = () => {
    setShowExtraFieldForm(false);
    setExtraFieldFormGroupId(null);
    setExtraFieldName('');
    setExtraFieldValue('');
  };

  const addExtraFieldForm = (id: number) => {
    setExtraFieldFormGroupId(id);
    setShowExtraFieldForm(true);
  };

  const removeFormField = (parentDataId: number, childDataId: number) => {
    const updatedFormDataGroups = formDataFieldsGroup.map(group => {
      if (group.id === parentDataId) {
        return {
          ...group,
          data: group.data.filter(field => field.id !== childDataId),
        };
      }
      return group;
    });
    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
  };

  useEffect(() => {
    axios.get(url).then(res => {
      console.log(res.data.count);
      setCurrentCount(res.data.count);
    });
  }, [url]);

  const addFormField = () => {
    const updatedFormDataGroups = formDataFieldsGroup.map(group => {
      if (group.id === extraFieldFormGroupId) {
        const maxId = Math.max(...group.data.map(field => field.id));
        return {
          ...group,
          data: [
            ...group.data,
            {
              id: maxId + 1, // New field ID
              label: extraFieldName,
              value: extraFieldValue || '',
              type: 'string',
              required: false,
            },
          ],
        };
      }
      return group;
    });

    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
    hideExtraFieldForm();
  };

  const resetFormFields = () => {
    const updatedFormDataGroups: FormDataFieldGorup[] = formDataFieldsGroup.map(
      group => ({
        ...group,
        data: group.data.map(field => ({
          ...field,
          value: '',
        })),
      })
    );
    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
  };

  const moveTheFormField = (
    parentFiledId: number,
    childFieldId: number,
    direction: 'up' | 'down'
  ) => {
    const parentGroup = formDataFieldsGroup.find(
      group => group.id === parentFiledId
    );
    if (!parentGroup) return;
    const data = parentGroup?.data;
    const index = data.findIndex(item => item.id === childFieldId);
    if (index === -1) {
      console.error('Item not found');
      return; // Item not found, return original array
    }
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= data.length) {
      console.error('Cannot move in that direction');
      return; // New index is out of bounds
    }

    // Swap the elements
    const newData = [...data]; // Create a copy of the array
    [newData[index], newData[newIndex]] = [newData[newIndex], newData[index]];
    setFormDataFieldsGroup(
      formDataFieldsGroup.map(group => {
        if (group.id === parentFiledId) {
          return { ...group, data: newData };
        }
        return group;
      })
    );
  };

  const downloadPdf = async () => {
    const fileName = 'test.pdf';
    const blob = await pdf(
      <BasicTemplate data={formDataFieldsGroup} />
    ).toBlob();
    saveAs(blob, fileName);
    const url =
      process.env.NODE_ENV === 'production'
        ? 'https://api.counterapi.dev/v1/shadibiodata/prod/up'
        : 'https://api.counterapi.dev/v1/shadibiodata/dev/up';
    axios.get(url).then(res => {
      console.log(res);
      setCurrentCount(res.data.count);
    });
  };

  // const handleFileChange = async (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const file = event.target.files?.[0];
  //   if (!file) return;

  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setImageSrc(reader.result as string);
  //     setImageFile(file);
  //   };
  //   reader.readAsDataURL(file);
  // };

  // const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
  //   setCroppedArea(croppedAreaPixels);
  // }, []);

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     if (!imageSrc || !croppedArea) return;
  //     const croppedImageUrl = await getCroppedImg(imageSrc, croppedArea);
  //     setCroppedImage(croppedImageUrl);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [imageSrc, croppedArea]);

  // const handleUpload = async () => {
  //   if (!croppedImage || !imageFile) return;

  //   const formData = new FormData();
  //   const blob = await (await fetch(croppedImage)).blob(); // Converting cropped image to Blob

  //   formData.append('image', blob, imageFile.name);

  //   try {
  //     const response = await axios.post('/api/upload', formData, {
  //       headers: { 'Content-Type': 'multipart/form-data' },
  //     });
  //     console.log('Image uploaded successfully:', response.data);
  //   } catch (error) {
  //     console.error('Image upload failed:', error);
  //   }
  // };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // const file = e.target.files[0];
      // let imageDataUrl = await readFile(file);
      console.log('uploading files');
      // setImageSrc(imageDataUrl);
      setShowModal(true);
    }
  };

  // function readFile(file: File) {
  //   return new Promise(resolve => {
  //     const reader = new FileReader();
  //     reader.addEventListener('load', () => resolve(reader.result), false);
  //     reader.readAsDataURL(file);
  //   });
  // }

  const handleValueChange = (
    groupId: number,
    fieldId: number,
    value: string
  ) => {
    const updatedFormDataGroups = formDataFieldsGroup.map(group => {
      if (group.id === groupId) {
        group.data = group.data.map(field => {
          if (field.id === fieldId) {
            return {
              ...field,
              value,
            };
          }
          return field;
        });
      }
      return group;
    });

    setFormDataFieldsGroup(updatedFormDataGroups); // Update state with the new array
  };

  return (
    <div className='biodata-form-outer-wrapper'>
      {currentCount && (
        <p>
          <div className='blinking-dot' />
          {`  ${currentCount} biodatas created today`}
        </p>
      )}
      <div className='biodata-form-wrapper'>
        <div className='biodata-fields-wrapper'>
          {formDataFieldsGroup.map(data => (
            <>
              <p className='biodata-field-title'>{data.title}</p>
              {data.data.map(field => (
                <FormField
                  key={field.id}
                  label={field.label}
                  required={field.required}
                  onDelete={() => removeFormField(data.id, field.id)}
                  onFieldMove={(direction: 'up' | 'down') =>
                    moveTheFormField(data.id, field.id, direction)
                  }
                  value={field.value}
                  onChange={(
                    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
                  ) => {
                    handleValueChange(data.id, field.id, e.target.value);
                  }}
                />
              ))}
              <Button
                variant='text'
                className='add-field-btn'
                onClick={() => addExtraFieldForm(data.id)}
              >
                <AddIcon /> Add More Fields
              </Button>
            </>
          ))}
          <div className='biodata-form-buttons-wrpper'>
            <PrimaryButton
              onClick={e => {
                console.log(formDataFieldsGroup)
                downloadPdf();
              }}
            >
              Submit
            </PrimaryButton>
            <SecondaryButton onClick={e => resetFormFields()}>
              Reset Form
            </SecondaryButton>
          </div>
          {/* <Button variant="text" className="add-field-btn" onClick={downloadPdf}>
          Submit
        </Button> */}

          {/* <PDFDownloadLink document={<MyDocument />} fileName="example.pdf">
         {({blob, url, loading, error}) => (loading ? 'Loading document ...': 'Download now!')}
        </PDFDownloadLink> */}
        </div>

        <input
          id='fileInput'
          className='d-none'
          disabled
          type='file'
          // accept="image/*"
          style={{ display: 'none', cursor: 'not-allowed' }}
          onChange={onFileChange}
        />
        <div
          style={{ cursor: 'not-allowed' }}
          className='biodata-profile-picture-wrapper'
          onClick={() => document.getElementById('fileInput')?.click()}
        >
          <p> coming soon....</p>
          {/* {croppedImage ? (
          <img className='h-48' src={croppedImage} alt='crop' />
        ) : (
          <>
            <PermMediaIcon
              sx={{ width: '100px', fontSize: '100px', color: '#64728c' }}
            />
            <p>
              Click here to add your photo <br />
              (Up to 20MB in size)
            </p>
          </>
        )} */}

          {/* Buttons for cropping and uploading */}
          {/* <button onClick={showCroppedImage}>Crop Image</button>
        <button onClick={handleUpload} disabled={!croppedImage}>
          Upload Image
        </button> */}
        </div>
      </div>

      <ImageCropModal
        show={showModal}
        bodyContent={
          <div>
            <div />
            {/* <Cropper
              image={imageSrc}
              crop={crop}
              // rotation={rotation}
              zoom={zoom}
              aspect={3 / 3}
              onCropChange={setCrop}
              // onRotationChange={setRotation}
              onCropComplete={onCropComplete}
              onZoomChange={setZoom}
            /> */}
          </div>
        }
        // buttons={[
        //   <Button variant="contained"></Button>,
        //   <Button variant="outlined"></Button>,
        // ]}
        // onHide={() => {}}
      />
      {/* </input> */}
      <CustomModal
        show={showExtraFieldForm}
        onHide={() => {
          hideExtraFieldForm();
        }}
        header={<div>Enter Field Name and Value</div>}
        body={
          <div
            style={{ display: 'flex', flexDirection: 'column', rowGap: '16px' }}
          >
            <FormControl
              sx={{ width: '100%', display: 'flex', rowGap: '16px' }}
              variant='outlined'
            >
              <OutlinedInput
                id='extra_field_label'
                placeholder='Enter Field Name'
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#1a1e3e',
                  },
                }}
                onChange={e => setExtraFieldName(e.target.value)}
                value={extraFieldName}
              />
            </FormControl>
            <FormControl
              sx={{ width: '100%', display: 'flex', rowGap: '16px' }}
              variant='outlined'
            >
              <OutlinedInput
                id='extra_field_value'
                placeholder='Enter Field Value'
                sx={{
                  '& .MuiInputBase-input': {
                    color: '#1a1e3e',
                  },
                }}
                onChange={e => setExtraFieldValue(e.target.value)}
                value={extraFieldValue}
              />
            </FormControl>
          </div>
        }
        primaryButton={
          <PrimaryButton
            onClick={() => {
              addFormField();
            }}
          >
            Save
          </PrimaryButton>
        }
        secondaryButton={
          <SecondaryButton
            onClick={() => {
              hideExtraFieldForm();
            }}
          >
            Cancel
          </SecondaryButton>
        }
      />
    </div>
  );
};

export default BioDataForm;
