import axios from 'axios';
import _ from 'lodash';
import { useCallback } from 'react';

import {
  FormDataFields,
  FormDataPreFilledFields,
} from '../components/BioDataForm/formDataFields';
import { useFormDataStore } from '../stores/formDataStore';
import { useUIStore } from '../stores/uiStore';
import { logger } from '../utils/logger';

/**
 * Custom hook for managing biodata form data
 * Replaces the ViewModel pattern with clean React hooks
 */
export const useFormData = () => {
  // Store selectors
  const data = useFormDataStore((state) => state.data);
  const setData = useFormDataStore((state) => state.setData);
  const downloadFileName = useFormDataStore((state) => state.downloadFileName);
  const setDownloadFileName = useFormDataStore(
    (state) => state.setDownloadFileName
  );

  const showAddNewFieldForm = useUIStore((state) => state.showAddNewFieldForm);
  const setShowAddNewFieldForm = useUIStore(
    (state) => state.setShowAddNewFieldForm
  );
  const extraFieldAddGroupId = useUIStore(
    (state) => state.extraFieldAddGroupId
  );
  const setExtraFieldAddGroupId = useUIStore(
    (state) => state.setExtraFieldAddGroupId
  );
  const todaysBiodataCount = useUIStore((state) => state.todaysBiodataCount);
  const setTodaysBiodataCount = useUIStore(
    (state) => state.setTodaysBiodataCount
  );

  // API URL for counter
  const getCounterUrl = useCallback(() => {
    const baseUrl =
      process.env.REACT_APP_COUNTER_API_URL || 'https://api.counterapi.dev/v1';
    const environment = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';
    return `${baseUrl}/shadibiodata/${environment}`;
  }, []);

  /**
   * Initialize form data from localStorage or use defaults
   */
  const initializeData = useCallback(
    (isDev?: string | null) => {
      const savedData = localStorage.getItem('biodataData');

      if (isDev) {
        setData(FormDataPreFilledFields);
      } else if (savedData) {
        try {
          setData(JSON.parse(savedData));
        } catch (error) {
          logger.error('Failed to parse saved data', error);
          setData(FormDataFields);
        }
      } else {
        setData(FormDataFields);
      }
    },
    [setData]
  );

  /**
   * Fetch and set today's biodata count from API
   */
  const fetchTodaysBioDataCount = useCallback(async () => {
    try {
      const response = await axios.get(getCounterUrl());
      setTodaysBiodataCount(response.data.count);
    } catch (error) {
      logger.error('Failed to fetch biodata count', error);
    }
  }, [getCounterUrl, setTodaysBiodataCount]);

  /**
   * Update a field value in the form data
   */
  const updateFieldValue = useCallback(
    (groupId: number, fieldId: number, value: string) => {
      const updatedData = data.map((group) => {
        if (group.id === groupId) {
          return {
            ...group,
            data: group.data.map((field) => {
              if (field.id === fieldId) {
                // Update download filename if this is the Full Name field
                if (field.label === 'Full Name') {
                  setDownloadFileName(`${_.snakeCase(value)}_biodata`);
                }
                return {
                  ...field,
                  error: false,
                  value,
                };
              }
              return field;
            }),
          };
        }
        return group;
      });

      setData(updatedData);
    },
    [data, setData, setDownloadFileName]
  );

  /**
   * Remove a form field
   */
  const removeFormField = useCallback(
    (parentDataId: number, childDataId: number) => {
      const updatedData = data.map((group) => {
        if (group.id === parentDataId) {
          return {
            ...group,
            data: group.data.filter((field) => field.id !== childDataId),
          };
        }
        return group;
      });

      setData(updatedData);
    },
    [data, setData]
  );

  /**
   * Add a new custom field to a group
   */
  const addFormField = useCallback(
    (label: string, value: string) => {
      const updatedData = data.map((group) => {
        if (group.id === extraFieldAddGroupId) {
          const maxId = Math.max(...group.data.map((field) => field.id));
          return {
            ...group,
            data: [
              ...group.data,
              {
                id: maxId + 1,
                label,
                value: value || '',
                type: 'string',
                required: false,
              },
            ],
          };
        }
        return group;
      });

      setData(updatedData);
      setShowAddNewFieldForm(false);
      setExtraFieldAddGroupId(null);
    },
    [
      data,
      extraFieldAddGroupId,
      setData,
      setShowAddNewFieldForm,
      setExtraFieldAddGroupId,
    ]
  );

  /**
   * Move a field up or down within its group
   */
  const moveFormField = useCallback(
    (parentFieldId: number, childFieldId: number, direction: 'up' | 'down') => {
      const parentGroup = data.find((group) => group.id === parentFieldId);
      if (!parentGroup) return;

      const fields = parentGroup.data;
      const index = fields.findIndex((item) => item.id === childFieldId);

      if (index === -1) {
        logger.error('Field not found');
        return;
      }

      const newIndex = direction === 'up' ? index - 1 : index + 1;

      if (newIndex < 0 || newIndex >= fields.length) {
        logger.error('Cannot move in that direction');
        return;
      }

      // Swap elements
      const newFields = [...fields];
      [newFields[index], newFields[newIndex]] = [
        newFields[newIndex],
        newFields[index],
      ];

      const updatedData = data.map((group) => {
        if (group.id === parentFieldId) {
          return { ...group, data: newFields };
        }
        return group;
      });

      setData(updatedData);
    },
    [data, setData]
  );

  /**
   * Validate all required fields
   * @returns true if there are errors, false otherwise
   */
  const validateData = useCallback(() => {
    let hasError = false;

    const updatedData = data.map((group) => {
      return {
        ...group,
        data: group.data.map((field) => {
          if (field.required && field.value === '') {
            hasError = true;
            return { ...field, error: true };
          }
          return { ...field, error: false };
        }),
      };
    });

    if (hasError) {
      setData(updatedData);
    }

    return hasError;
  }, [data, setData]);

  /**
   * Reset form to default values
   */
  const resetFormFields = useCallback(() => {
    localStorage.setItem('biodataData', '');
    setData(FormDataFields);
  }, [setData]);

  /**
   * Show the add field form for a specific group
   */
  const showAddFieldForm = useCallback(
    (groupId: number) => {
      setExtraFieldAddGroupId(groupId);
      setShowAddNewFieldForm(true);
    },
    [setExtraFieldAddGroupId, setShowAddNewFieldForm]
  );

  /**
   * Hide the add field form
   */
  const hideAddFieldForm = useCallback(() => {
    setShowAddNewFieldForm(false);
    setExtraFieldAddGroupId(null);
  }, [setShowAddNewFieldForm, setExtraFieldAddGroupId]);

  return {
    // State
    data,
    downloadFileName,
    showAddNewFieldForm,
    extraFieldAddGroupId,
    todaysBiodataCount,

    // Actions
    initializeData,
    fetchTodaysBioDataCount,
    updateFieldValue,
    removeFormField,
    addFormField,
    moveFormField,
    validateData,
    resetFormFields,
    showAddFieldForm,
    hideAddFieldForm,
  };
};
