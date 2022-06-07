interface IResGetAllGroup {
  groups: IResGroup[];
}

interface IResGroup {
  name: string;
  id: string;
  privacy?: string;
}

interface IResOptionCategory {
  description: string;
  id: number;
  is_primary: boolean;
  is_product_listing_enabled: boolean;
  name: string;
  no_license_seller_enabled: boolean;
  parent_id: number;
}

interface IAttributeCategory {
  id: number;
  code: string;
  description: string;
  display_name: string;
  display_name_en: string;
  is_required: boolean;
  default_value: string;
  input_type:
    | 'multiselect'
    | 'boolean'
    | 'date'
    | 'media_image'
    | 'price'
    | 'select'
    | 'text'
    | 'textarea'
    | 'gallery';
  data_type: string;
  description_en: string;
}

interface IOptionAttributeInputTypeSelect {
  id: number;
  value: string;
  position: number;
  attribute_code: string;
}

interface IProduct {
  name: string;
  sku: string;
  weight: string;
  weightUnit: string;
  importPrice: string;
  exportPrice: string;
  description: string;
  type: string;
  branch: string;
  isAllowSell: boolean;
  id?: string;
  createdAt?: string;
}
