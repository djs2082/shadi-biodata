import BasicTemplate from '../BioDataTemplates/BasicTemplate';
import FreeTemplate from '../BioDataTemplates/FreeTemplate';
import GoldenBorderTemplate from '../BioDataTemplates/GoldenBorderTemplate';
import NavyFloralTemplate from '../BioDataTemplates/NavyFloralTemplate';
import NavyGoldRoyalTemplate from '../BioDataTemplates/NavyGoldRoyalTemplate';
import OrnateGoldTemplate from '../BioDataTemplates/OrnateGoldTemplate';
import TraditionalTemplate from '../BioDataTemplates/TraditionalTemplate';
import FreeTemplatePreview from '../BioDataTemplates/images/templatePreviews/free_template.jpg';
import BasicTemplatePreview from '../BioDataTemplates/images/templatePreviews/basic_template.jpg';
import TraditionalTemplatePreview from '../BioDataTemplates/images/templatePreviews/traditional_template.jpg';
import GoldenBorderTemplatePreview from '../BioDataTemplates/images/templatePreviews/golden_border_template.jpg';
import TemplateTwentyFive from '../BioDataTemplates/TemplateTwentyFive';
import TemplateTwentyFivePreview from '../BioDataTemplates/images/templatePreviews/template_twenty_five.jpg';
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
    id: 'template_twenty_five',
    name: 'Template Twenty Five',
    price: '₹39',
    isFree: false,
    component: TemplateTwentyFive,
    previewImage: TemplateTwentyFivePreview,
  },
  {
    id: 'free_template',
    name: 'Free Template',
    price: 'Free',
    isFree: true,
    component: FreeTemplate,
    previewImage: FreeTemplatePreview,
  },
  {
    id: 'basic_template',
    name: 'Basic Template',
    price: '₹88',
    isFree: false,
    component: BasicTemplate,
    previewImage: BasicTemplatePreview,
  },
  {
    id: 'traditional',
    name: 'Traditional Template',
    price: '₹88',
    isFree: false,
    component: TraditionalTemplate,
    previewImage: TraditionalTemplatePreview,
  },
  {
    id: 'golden_border',
    name: 'Golden Border',
    price: '₹88',
    isFree: false,
    component: GoldenBorderTemplate,
    previewImage: GoldenBorderTemplatePreview,
  },
  {
    id: 'navy_floral',
    name: 'Navy Floral',
    price: '₹88',
    isFree: false,
    component: NavyFloralTemplate,
    previewImage:
      'https://your-s3-bucket.s3.amazonaws.com/templates/navy_floral.png',
  },
  {
    id: 'ornate_gold',
    name: 'Ornate Gold',
    price: '₹88',
    isFree: false,
    component: OrnateGoldTemplate,
    previewImage:
      'https://your-s3-bucket.s3.amazonaws.com/templates/ornate_gold.png',
  },
  {
    id: 'navy_gold_royal',
    name: 'Navy Gold Royal',
    price: '₹88',
    isFree: false,
    component: NavyGoldRoyalTemplate,
    previewImage:
      'https://your-s3-bucket.s3.amazonaws.com/templates/navy_gold_royal.png',
  },
];
