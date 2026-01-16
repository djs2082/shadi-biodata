import BasicTemplate from '../BioDataTemplates/BasicTemplate';
import FreeTemplate from '../BioDataTemplates/FreeTemplate';
import GoldenBorderTemplate from '../BioDataTemplates/GoldenBorderTemplate';
import NavyFloralTemplate from '../BioDataTemplates/NavyFloralTemplate';
import NavyGoldRoyalTemplate from '../BioDataTemplates/NavyGoldRoyalTemplate';
import OrnateGoldTemplate from '../BioDataTemplates/OrnateGoldTemplate';
import TraditionalTemplate from '../BioDataTemplates/TraditionalTemplate';

export interface Template {
  id: string;
  name: string;
  price: string;
  isFree: boolean;
  component: any;
  previewImage: string;
}

// Ultimate source of truth for all templates
export const templates: Template[] = [
  {
    id: 'free_template',
    name: 'Free Template',
    price: 'Free',
    isFree: true,
    component: FreeTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/free_template.png',
  },
  {
    id: 'basic_template',
    name: 'Basic Template',
    price: '₹88',
    isFree: false,
    component: BasicTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/basic_template.png',
  },
  {
    id: 'traditional',
    name: 'Traditional Template',
    price: '₹88',
    isFree: false,
    component: TraditionalTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/traditional.png',
  },
  {
    id: 'golden_border',
    name: 'Golden Border',
    price: '₹88',
    isFree: false,
    component: GoldenBorderTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/golden_border.png',
  },
  {
    id: 'navy_floral',
    name: 'Navy Floral',
    price: '₹88',
    isFree: false,
    component: NavyFloralTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/navy_floral.png',
  },
  {
    id: 'ornate_gold',
    name: 'Ornate Gold',
    price: '₹88',
    isFree: false,
    component: OrnateGoldTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/ornate_gold.png',
  },
  {
    id: 'navy_gold_royal',
    name: 'Navy Gold Royal',
    price: '₹88',
    isFree: false,
    component: NavyGoldRoyalTemplate,
    previewImage: 'https://your-s3-bucket.s3.amazonaws.com/templates/navy_gold_royal.png',
  },
];
