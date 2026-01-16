export type FormDataFieldGorup = {
  id: number;
  title: string;
  data: FormDataField[];
};

export type FormDataField = {
  id: number;
  label: string;
  type: string;
  value: string;
  required: boolean;
  error?: boolean;
  errorText?: string;
};

export const FormDataFields: FormDataFieldGorup[] = [
  {
    id: 1,
    title: 'Personal Details',
    data: [
      {
        id: 1,
        label: 'Full Name',
        type: 'text',
        value: '',
        required: true,
        error: false,
        errorText: 'Full Name is Required Field',
      },
      {
        id: 2,
        label: 'Date Of Birth',
        type: 'date',
        value: '',
        required: true,
        error: false,
        errorText: 'Date Of Birth is Required Field',
      },
      {
        id: 3,
        label: 'Place Of Birth',
        type: 'text',
        value: '',
        required: true,
        error: false,
        errorText: 'Place Of Birth is Required Field',
      },
      {
        id: 4,
        label: 'Time Of Birth',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 5,
        label: 'Rashi',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 6,
        label: 'Nakshatra',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 7,
        label: 'Complexion',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 8,
        label: 'Height',
        type: 'height',
        value: '',
        required: false,
      },
      {
        id: 9,
        label: 'Gotra',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 10,
        label: 'Bachelors',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 11,
        label: 'Work',
        type: 'text',
        value: '',
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Family Details',
    data: [
      {
        id: 1,
        label: "Father's Name",
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 2,
        label: "Father's Occupation",
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 3,
        label: "Mother's Name",
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 5,
        label: "Mother's Occupation",
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 6,
        label: 'Siblings',
        type: 'text',
        value: '',
        required: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Contact Details',
    data: [
      {
        id: 1,
        label: 'Contact Person',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 2,
        label: 'Contact Number',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 3,
        label: 'Email Id',
        type: 'text',
        value: '',
        required: false,
      },
      {
        id: 4,
        label: 'Residential Address',
        type: 'text',
        value: '',
        required: false,
      },
    ],
  },
];

export const FormDataPreFilledFields: FormDataFieldGorup[] = [
  {
    id: 1,
    title: 'Personal Details',
    data: [
      {
        id: 1,
        label: 'Full Name',
        type: 'text',
        value: 'Ramesh Ganeshrao Padale',
        required: true,
        error: false,
        errorText: 'Full Name is Required Field',
      },
      {
        id: 2,
        label: 'Date Of Birth',
        type: 'date',
        value: '18-09-1993',
        required: true,
        error: false,
        errorText: 'Date Of Birth is Required Field',
      },
      {
        id: 3,
        label: 'Place Of Birth',
        type: 'text',
        value: 'Majalgaon, SambajiNagar, Maharashtra',
        required: true,
        error: false,
        errorText: 'Place Of Birth is Required Field',
      },
      {
        id: 4,
        label: 'Time Of Birth',
        type: 'time',
        value: '11:10 AM',
        required: false,
      },
      {
        id: 5,
        label: 'Rashi',
        type: 'text',
        value: 'Taurus',
        required: false,
      },
      {
        id: 6,
        label: 'Nakshatra',
        type: 'text',
        value: 'Ashlesha',
        required: false,
      },
      {
        id: 7,
        label: 'Complexion',
        type: 'text',
        value: 'Very Fair',
        required: false,
      },
      {
        id: 8,
        label: 'Height',
        type: 'height',
        value: '5`9',
        required: false,
      },
      {
        id: 9,
        label: 'Gotra',
        type: 'text',
        value: 'Gautama',
        required: false,
      },
      {
        id: 10,
        label: 'Bachelors',
        type: 'text',
        value: 'Mechanical Engineering',
        required: false,
      },
      {
        id: 11,
        label: 'Work',
        type: 'text',
        value: 'Automation Tester',
        required: false,
      },
    ],
  },
  {
    id: 2,
    title: 'Family Details',
    data: [
      {
        id: 1,
        label: "Father's Name",
        type: 'text',
        value: 'Ganeshrao Ganpat Padale',
        required: false,
      },
      {
        id: 2,
        label: "Father's Occupation",
        type: 'text',
        value: 'Vegetable Seller',
        required: false,
      },
      {
        id: 3,
        label: "Mother's Name",
        type: 'text',
        value: 'Ramabai Ganeshrao Padale',
        required: false,
      },
      {
        id: 5,
        label: "Mother's Occupation",
        type: 'text',
        value: 'Bidi Maker',
        required: false,
      },
      {
        id: 6,
        label: 'Siblings',
        type: 'text',
        value: 'Mahesh Padale',
        required: false,
      },
    ],
  },
  {
    id: 3,
    title: 'Contact Details',
    data: [
      {
        id: 1,
        label: 'Contact Person',
        type: 'text',
        value: 'RamaBai Padale',
        required: false,
      },
      {
        id: 2,
        label: 'Contact Number',
        type: 'text',
        value: '8628954575',
        required: false,
      },
      {
        id: 3,
        label: 'Email Id',
        type: 'text',
        value: 'ramabaii.padale@gmail.com',
        required: false,
      },
      {
        id: 4,
        label: 'Residential Address',
        type: 'text',
        value: 'Majalgaon, ShambajiNagar, Mahrashtra',
        required: false,
      },
    ],
  },
];
