import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { useState, useEffect } from 'react';

import { useFormData } from '../../../hooks/useFormData';
import { useLanguage } from '../../../contexts/LanguageContext';
import FormField from '../../molecules/FormField';
import CustomDatePicker from '../../molecules/CustomDatePicker';
import CustomTimePicker from '../../molecules/CustomTimePicker';
import CustomDropdown from '../../molecules/CustomDropdown';
import CustomHeightPicker from '../../molecules/CustomHeightPicker';

import AddExtraFieldForm from './AddExtraFieldForm';

// Map English labels to i18n translation keys
const labelToKeyMap: { [key: string]: string } = {
  'Personal Details': 'groups.personalDetails',
  'Family Details': 'groups.familyDetails',
  'Contact Details': 'groups.contactDetails',
  'Full Name': 'fields.fullName',
  'Date Of Birth': 'fields.dateOfBirth',
  'Place Of Birth': 'fields.placeOfBirth',
  'Time Of Birth': 'fields.timeOfBirth',
  'Rashi': 'fields.rashi',
  'Nakshatra': 'fields.nakshatra',
  'Complexion': 'fields.complexion',
  'Height': 'fields.height',
  'Gotra': 'fields.gotra',
  'Bachelors': 'fields.bachelors',
  'Work': 'fields.work',
  "Father's Name": 'fields.fathersName',
  "Father's Occupation": 'fields.fathersOccupation',
  "Mother's Name": 'fields.mothersName',
  "Mother's Occupation": 'fields.mothersOccupation',
  'Siblings': 'fields.siblings',
  'Contact Person': 'fields.contactPerson',
  'Contact Number': 'fields.contactNumber',
  'Email Id': 'fields.emailId',
  'Residential Address': 'fields.residentialAddress',
};

// Map dropdown options to i18n keys
const dropdownOptionsMap: { [key: string]: { [key: string]: string } } = {
  'Mesh (Aries)': { key: 'dropdownOptions.rashi.mesh', original: 'Mesh (Aries)' },
  'Vrishabh (Taurus)': { key: 'dropdownOptions.rashi.vrishabh', original: 'Vrishabh (Taurus)' },
  'Mithun (Gemini)': { key: 'dropdownOptions.rashi.mithun', original: 'Mithun (Gemini)' },
  'Kark (Cancer)': { key: 'dropdownOptions.rashi.kark', original: 'Kark (Cancer)' },
  'Simha (Leo)': { key: 'dropdownOptions.rashi.simha', original: 'Simha (Leo)' },
  'Kanya (Virgo)': { key: 'dropdownOptions.rashi.kanya', original: 'Kanya (Virgo)' },
  'Tula (Libra)': { key: 'dropdownOptions.rashi.tula', original: 'Tula (Libra)' },
  'Vrishchik (Scorpio)': { key: 'dropdownOptions.rashi.vrishchik', original: 'Vrishchik (Scorpio)' },
  'Dhanur (Sagittarius)': { key: 'dropdownOptions.rashi.dhanur', original: 'Dhanur (Sagittarius)' },
  'Makar (Capricorn)': { key: 'dropdownOptions.rashi.makar', original: 'Makar (Capricorn)' },
  'Kumbh (Aquarius)': { key: 'dropdownOptions.rashi.kumbh', original: 'Kumbh (Aquarius)' },
  'Meen (Pisces)': { key: 'dropdownOptions.rashi.meen', original: 'Meen (Pisces)' },
  'Ashlesha': { key: 'dropdownOptions.nakshatra.ashlesha', original: 'Ashlesha' },
  'Bharani': { key: 'dropdownOptions.nakshatra.bharani', original: 'Bharani' },
  'Krittika': { key: 'dropdownOptions.nakshatra.krittika', original: 'Krittika' },
  'Rohini': { key: 'dropdownOptions.nakshatra.rohini', original: 'Rohini' },
  'Mrigashira': { key: 'dropdownOptions.nakshatra.mrigashira', original: 'Mrigashira' },
  'Vert Fair': { key: 'dropdownOptions.complexion.veryFair', original: 'Very Fair' },
  'Fair': { key: 'dropdownOptions.complexion.fair', original: 'Fair' },
  'Medium': { key: 'dropdownOptions.complexion.medium', original: 'Medium' },
  'Brown': { key: 'dropdownOptions.complexion.brown', original: 'Brown' },
  'Dark': { key: 'dropdownOptions.complexion.dark', original: 'Dark' },
};

interface TranslatedValues {
  [key: string]: string;
}

const FormGroup: React.FC = () => {
  const {
    data,
    removeFormField,
    moveFormField,
    updateFieldValue,
    showAddFieldForm,
  } = useFormData();

  const { translateDynamicBatch, currentLanguage, t } = useLanguage();
  const [translatedValues, setTranslatedValues] = useState<TranslatedValues>({});
  const [isTranslating, setIsTranslating] = useState(false);

  // Function to translate all user values (called on language change or blur)
  const translateUserValues = async () => {
    if (currentLanguage === 'en') {
      setTranslatedValues({});
      return;
    }

    if (isTranslating) return; // Prevent concurrent translations

    // Collect all non-empty user values
    const valuesToTranslate: string[] = [];
    const valueKeys: string[] = [];

    for (const group of data) {
      for (const field of group.data) {
        if (field.value && field.value.trim() !== '') {
          valuesToTranslate.push(field.value);
          valueKeys.push(`${group.id}_${field.id}`);
        }
      }
    }

    if (valuesToTranslate.length === 0) {
      setTranslatedValues({});
      return;
    }

    // ONE batch API call for all values
    setIsTranslating(true);
    try {
      const translated = await translateDynamicBatch(valuesToTranslate);
      const valueMap: TranslatedValues = {};

      translated.forEach((translatedText, index) => {
        valueMap[valueKeys[index]] = translatedText;
      });

      setTranslatedValues(valueMap);
    } catch (error) {
      console.error('Batch translation failed:', error);
      setTranslatedValues({});
    } finally {
      setIsTranslating(false);
    }
  };

  // Translate when language changes only
  useEffect(() => {
    if (data.length > 0) {
      translateUserValues();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]); // Only depend on language change, NOT on data

  /**
   * Get translated label using i18n (NO API call)
   */
  const getTranslatedLabel = (originalLabel: string): string => {
    const key = labelToKeyMap[originalLabel];
    if (key) {
      return t(key);
    }
    return originalLabel;
  };

  /**
   * Get translated dropdown options using i18n (NO API call)
   */
  const getTranslatedOptions = (options: string[]): string[] => {
    return options.map(option => {
      const mapping = dropdownOptionsMap[option];
      if (mapping) {
        return t(mapping.key);
      }
      return option;
    });
  };

  /**
   * Get translated user value (from API batch call)
   */
  const getTranslatedValue = (groupId: number, fieldId: number, originalValue: string): string => {
    if (currentLanguage === 'en' || !originalValue) {
      return originalValue;
    }
    const key = `${groupId}_${fieldId}`;
    return translatedValues[key] || originalValue;
  };

  /**
   * Handle blur - translate when user finishes editing
   */
  const handleFieldBlur = () => {
    if (currentLanguage !== 'en') {
      translateUserValues();
    }
  };

  /**
   * Render field based on type
   */
  const renderField = (field: any, groupId: number) => {
    const translatedLabel = getTranslatedLabel(field.label);
    // Always show actual field value in input (not translation)
    // Translation is only for display/viewing, not for editing

    const commonProps = {
      key: field.id,
      label: translatedLabel,
      required: field.required,
      onDelete: () => removeFormField(groupId, field.id),
      onFieldMove: (direction: 'up' | 'down') =>
        moveFormField(groupId, field.id, direction),
      value: field.value, // Always show actual value, not translation
      error: field.error,
      errorText: field.errorText,
    };

    console.log(field.type);

    // Render CustomDatePicker for date type
    if (field.type === 'date') {
      return (
        <CustomDatePicker
          {...commonProps}
          onChange={(value: string) => {
            updateFieldValue(groupId, field.id, value);
          }}
        />
      );
    }

    // Render CustomTimePicker for time type
    if (field.type === 'time') {
      return (
        <CustomTimePicker
          {...commonProps}
          onChange={(value: string) => {
            updateFieldValue(groupId, field.id, value);
          }}
        />
      );
    }

    // Render CustomDropdown for dropdown type
    if (field.type === 'dropdown') {
      const translatedOptions = getTranslatedOptions(field.options || []);

      return (
        <CustomDropdown
          {...commonProps}
          options={translatedOptions}
          placeholder={field.placeholder}
          onChange={(value: string) => {
            updateFieldValue(groupId, field.id, value);
          }}
        />
      );
    }

    // Render CustomHeightPicker for height type
    if (field.type === 'height') {
      return (
        <CustomHeightPicker
          {...commonProps}
          onChange={(value: string) => {
            updateFieldValue(groupId, field.id, value);
          }}
        />
      );
    }

    // Default: render regular FormField
    return (
      <FormField
        {...commonProps}
        onChange={(
          e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
        ) => {
          updateFieldValue(groupId, field.id, e.target.value);
        }}
        onBlur={handleFieldBlur}
      />
    );
  };

  return (
    <div className="biodata-fields-wrapper biodata-group-wrapper">
      {data.map((group) => {
        const translatedTitle = getTranslatedLabel(group.title);

        return (
          <div key={group.id}>
            <div className="biodata-field-title-wrapper">
              <p className="biodata-field-title">{translatedTitle}</p>
            </div>
            {group.data.map((field) => renderField(field, group.id))}
            <Button
              variant="text"
              className="add-field-btn"
              onClick={() => showAddFieldForm(group.id)}
            >
              <AddIcon /> {t('form.addMoreFields')}
            </Button>
            <AddExtraFieldForm />
          </div>
        );
      })}
    </div>
  );
};
export default FormGroup;
