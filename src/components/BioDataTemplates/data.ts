export interface FormFieldData {
  id: number;
  label: string;
  type: string;
  value: string;
  required: boolean;
}

export interface FormDataGroup {
  id: number;
  title: string;
  data: FormFieldData[];
}

const Data: FormDataGroup[] = [
  {
    id: 1,
    title: 'Personal Details',
    data: [
      {
        id: 1,
        label: 'Full Name',
        type: 'text',
        value: 'Dilip Hemraj Joshi',
        required: true,
      },
      {
        id: 2,
        label: 'Date Of Birth',
        type: 'date',
        value: '14-10-1997',
        required: true,
      },
      {
        id: 3,
        label: 'Place Of Birth',
        type: 'text',
        value: 'Salumbar, Rajasthan',
        required: true,
      },
      {
        id: 4,
        label: 'Time Of Birth',
        type: 'time',
        value: '11:59 AM',
        required: false,
      },
      {
        id: 5,
        label: 'Rashi',
        type: 'text',
        value: 'Meen',
        required: false,
      },
      {
        id: 7,
        label: 'Complexion',
        type: 'text',
        value: 'Fair',
        required: false,
      },
      {
        id: 8,
        label: 'Height',
        type: 'height',
        value: '5`6',
        required: false,
      },
      {
        id: 9,
        label: 'Gotra',
        type: 'text',
        value: 'Kashyap',
        required: false,
      },
      {
        id: 10,
        label: 'Bachelors',
        type: 'text',
        value: 'Computer Science and Engineering',
        required: false,
      },
      {
        id: 12,
        label: 'College',
        value:
          'Shri Guru Gobind Shingji Institute of Engineering and Technology, Nanded',
        type: 'string',
        required: false,
      },
      {
        id: 11,
        label: 'Work',
        type: 'text',
        value: 'Software Engineer',
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
        value: 'Hemraj Joshi',
        required: false,
      },
      {
        id: 2,
        label: "Father's Occupation",
        type: 'text',
        value: 'Business',
        required: false,
      },
      {
        id: 3,
        label: "Mother's Name",
        type: 'text',
        value: 'Kaushalya Joshi',
        required: false,
      },
      {
        id: 5,
        label: "Mother's Occupation",
        type: 'text',
        value: 'Housewife',
        required: false,
      },
      {
        id: 6,
        label: 'Siblings',
        type: 'text',
        value: 'Vikas joshi',
        required: false,
      },
      {
        id: 7,
        label: 'Sibling Education',
        value: 'B.tech(CSE)',
        type: 'string',
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
        value: 'Dilip Hemraj Joshi',
        required: false,
      },
      {
        id: 2,
        label: 'Contact Number',
        type: 'text',
        value: '+91 8975427620',
        required: false,
      },
      {
        id: 3,
        label: 'Email Id',
        type: 'text',
        value: 'dilipjoshis98@gmail.com',
        required: false,
      },
      {
        id: 4,
        label: 'Residential Address',
        type: 'text',
        value: 'Baner, Pune',
        required: false,
      },
    ],
  },
];

export default Data;
