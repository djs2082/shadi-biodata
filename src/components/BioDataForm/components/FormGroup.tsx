import AddIcon from '@mui/icons-material/Add';
import TranslateIcon from '@mui/icons-material/Translate';
import { Button, IconButton, Tooltip, InputAdornment } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import { useFormData } from '../../../hooks/useFormData';
import { useLanguage } from '../../../contexts/LanguageContext';
import {
  SUPPORTED_LANGUAGES,
  LanguageCode,
} from '../../../services/translationService';
import FormField from '../../molecules/FormField';
import CustomDatePicker from '../../molecules/CustomDatePicker';
import CustomTimePicker from '../../molecules/CustomTimePicker';
import CustomDropdown from '../../molecules/CustomDropdown';
import CustomHeightPicker from '../../molecules/CustomHeightPicker';
import LanguageInputInstruction from './LanguageInputInstruction';

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
  Rashi: 'fields.rashi',
  Nakshatra: 'fields.nakshatra',
  Complexion: 'fields.complexion',
  Height: 'fields.height',
  Gotra: 'fields.gotra',
  Bachelors: 'fields.bachelors',
  Work: 'fields.work',
  "Father's Name": 'fields.fathersName',
  "Father's Occupation": 'fields.fathersOccupation',
  "Mother's Name": 'fields.mothersName',
  "Mother's Occupation": 'fields.mothersOccupation',
  Siblings: 'fields.siblings',
  'Contact Person': 'fields.contactPerson',
  'Contact Number': 'fields.contactNumber',
  'Email Id': 'fields.emailId',
  'Residential Address': 'fields.residentialAddress',
};

// Map dropdown options to i18n keys
const dropdownOptionsMap: { [key: string]: { [key: string]: string } } = {
  'Mesh (Aries)': {
    key: 'dropdownOptions.rashi.mesh',
    original: 'Mesh (Aries)',
  },
  'Vrishabh (Taurus)': {
    key: 'dropdownOptions.rashi.vrishabh',
    original: 'Vrishabh (Taurus)',
  },
  'Mithun (Gemini)': {
    key: 'dropdownOptions.rashi.mithun',
    original: 'Mithun (Gemini)',
  },
  'Kark (Cancer)': {
    key: 'dropdownOptions.rashi.kark',
    original: 'Kark (Cancer)',
  },
  'Simha (Leo)': {
    key: 'dropdownOptions.rashi.simha',
    original: 'Simha (Leo)',
  },
  'Kanya (Virgo)': {
    key: 'dropdownOptions.rashi.kanya',
    original: 'Kanya (Virgo)',
  },
  'Tula (Libra)': {
    key: 'dropdownOptions.rashi.tula',
    original: 'Tula (Libra)',
  },
  'Vrishchik (Scorpio)': {
    key: 'dropdownOptions.rashi.vrishchik',
    original: 'Vrishchik (Scorpio)',
  },
  'Dhanur (Sagittarius)': {
    key: 'dropdownOptions.rashi.dhanur',
    original: 'Dhanur (Sagittarius)',
  },
  'Makar (Capricorn)': {
    key: 'dropdownOptions.rashi.makar',
    original: 'Makar (Capricorn)',
  },
  'Kumbh (Aquarius)': {
    key: 'dropdownOptions.rashi.kumbh',
    original: 'Kumbh (Aquarius)',
  },
  'Meen (Pisces)': {
    key: 'dropdownOptions.rashi.meen',
    original: 'Meen (Pisces)',
  },
  Ashlesha: { key: 'dropdownOptions.nakshatra.ashlesha', original: 'Ashlesha' },
  Bharani: { key: 'dropdownOptions.nakshatra.bharani', original: 'Bharani' },
  Krittika: { key: 'dropdownOptions.nakshatra.krittika', original: 'Krittika' },
  Rohini: { key: 'dropdownOptions.nakshatra.rohini', original: 'Rohini' },
  Mrigashira: {
    key: 'dropdownOptions.nakshatra.mrigashira',
    original: 'Mrigashira',
  },
  'Vert Fair': {
    key: 'dropdownOptions.complexion.veryFair',
    original: 'Very Fair',
  },
  Fair: { key: 'dropdownOptions.complexion.fair', original: 'Fair' },
  Medium: { key: 'dropdownOptions.complexion.medium', original: 'Medium' },
  Brown: { key: 'dropdownOptions.complexion.brown', original: 'Brown' },
  Dark: { key: 'dropdownOptions.complexion.dark', original: 'Dark' },
};

const FormGroup: React.FC = () => {
  const {
    data,
    removeFormField,
    moveFormField,
    updateFieldValue,
    showAddFieldForm,
  } = useFormData();

  const { currentLanguage, t, translateDynamic } = useLanguage();

  // Store original English values to prevent translation degradation
  // Key format: "groupId-fieldId"
  const originalValuesRef = useRef<Record<string, string>>({});

  // Track previous language to detect changes
  const previousLanguageRef = useRef(currentLanguage);

  // Track which fields should remain in English (not auto-translated)
  // Key format: "groupId-fieldId", value: true means keep in English
  const [keepInEnglish, setKeepInEnglish] = useState<Record<string, boolean>>(
    {}
  );

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
    return options.map((option) => {
      const mapping = dropdownOptionsMap[option];
      if (mapping) {
        return t(mapping.key);
      }
      return option;
    });
  };

  /**
   * Toggle translation for a specific field
   */
  const handleToggleTranslation = async (
    groupId: number,
    fieldId: number,
    currentValue: string
  ) => {
    console.log(groupId, fieldId, currentValue);
    const fieldKey = `${groupId}-${fieldId}`;
    const isCurrentlyInEnglish = keepInEnglish[fieldKey];
    console.log('isCurrentlyInEnglish:', isCurrentlyInEnglish);
    if (isCurrentlyInEnglish) {
      // Field is in English, translate to selected language
      if (currentLanguage !== 'en' && currentValue) {
        // Store as original English value before translating
        if (!originalValuesRef.current[fieldKey]) {
          originalValuesRef.current[fieldKey] = currentValue;
        }

        try {
          const translatedText = await translateDynamic(currentValue);
          if (translatedText && translatedText !== currentValue) {
            updateFieldValue(groupId, fieldId, translatedText);
          }
        } catch (error) {
          console.error('Translation failed:', error);
        }
      }
      // Mark as translated (not in English anymore)
      setKeepInEnglish((prev) => ({ ...prev, [fieldKey]: false }));
    } else {
      // Field is translated, restore English version
      const originalValue = originalValuesRef.current[fieldKey];
      if (originalValue && originalValue !== currentValue) {
        updateFieldValue(groupId, fieldId, originalValue);
      } else if (currentValue) {
        // If no original stored, current value becomes the English version
        originalValuesRef.current[fieldKey] = currentValue;
      }
      // Mark as English
      setKeepInEnglish((prev) => ({ ...prev, [fieldKey]: true }));
    }
  };

  /**
   * Handle input change - store original English value
   */
  const handleFieldChange = (
    groupId: number,
    fieldId: number,
    value: string
  ) => {
    const fieldKey = `${groupId}-${fieldId}`;

    // Store original English value if we're in English mode
    if (currentLanguage === 'en' && value) {
      originalValuesRef.current[fieldKey] = value;
    }

    // Update the field value
    updateFieldValue(groupId, fieldId, value);
  };

  /**
   * Translate all field values when language changes
   */
  useEffect(() => {
    const translateAllFields = async () => {
      // Skip if language hasn't changed or if we're switching to English
      if (previousLanguageRef.current === currentLanguage) {
        return;
      }

      // Update previous language
      previousLanguageRef.current = currentLanguage;

      // If switching to English, restore original values
      if (currentLanguage === 'en') {
        data.forEach((group) => {
          group.data.forEach((field) => {
            const fieldKey = `${group.id}-${field.id}`;
            const originalValue = originalValuesRef.current[fieldKey];

            // Only update if we have an original value and it's different
            if (originalValue && originalValue !== field.value && field.value) {
              updateFieldValue(group.id, field.id, originalValue);
            }
          });
        });
        return;
      }

      // Translate all non-empty fields to the new language
      for (const group of data) {
        for (const field of group.data) {
          // Skip fields that don't have text values (date, time, height, dropdown)
          if (
            field.type === 'date' ||
            field.type === 'time' ||
            field.type === 'height' ||
            field.type === 'dropdown'
          ) {
            continue;
          }

          // Skip empty fields
          if (!field.value) {
            continue;
          }

          const fieldKey = `${group.id}-${field.id}`;

          // Skip fields that should remain in English
          if (keepInEnglish[fieldKey]) {
            continue;
          }

          try {
            // Get original English value or use current value as original
            let originalValue = originalValuesRef.current[fieldKey];

            if (!originalValue) {
              // If we don't have original value, assume current value is in English
              originalValue = field.value;
              originalValuesRef.current[fieldKey] = field.value;
            }

            // Translate from English to target language
            const translatedText = await translateDynamic(originalValue);

            // Update field with translated value
            if (translatedText && translatedText !== field.value) {
              updateFieldValue(group.id, field.id, translatedText);
            }
          } catch (error) {
            console.error(
              `Translation failed for field ${field.label}:`,
              error
            );
            // Continue with next field even if one fails
          }
        }
      }
    };

    translateAllFields();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  /**
   * Get language name from supported languages
   */
  const getLanguageName = (code: LanguageCode): string => {
    return SUPPORTED_LANGUAGES[code] || code;
  };

  /**
   * Create translate icon button for field
   */
  const createTranslateAdornment = (groupId: number, fieldId: number) => {
    const fieldKey = `${groupId}-${fieldId}`;
    const isInEnglish = keepInEnglish[fieldKey];
    const field = data
      .find((g) => g.id === groupId)
      ?.data.find((f) => f.id === fieldId);

    // Don't show translate button if in English mode or if field is empty
    if (currentLanguage === 'en' || !field?.value) {
      return undefined;
    }

    const tooltipText = isInEnglish
      ? `Translate to ${getLanguageName(currentLanguage)}`
      : 'Translate to English';

    return (
      <InputAdornment position="end">
        <Tooltip title={tooltipText} arrow>
          <IconButton
            onClick={() =>
              handleToggleTranslation(groupId, fieldId, field.value)
            }
            edge="end"
            size="small"
            sx={{
              color: isInEnglish ? '#800000' : '#DAA520',
              '&:hover': {
                backgroundColor: 'rgba(128, 0, 0, 0.1)',
              },
            }}
          >
            <TranslateIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </InputAdornment>
    );
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
          handleFieldChange(groupId, field.id, e.target.value);
        }}
        endAdornment={createTranslateAdornment(groupId, field.id)}
      />
    );
  };

  return (
    <div className="biodata-fields-wrapper biodata-group-wrapper">
      <LanguageInputInstruction currentLanguage={currentLanguage} />
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
