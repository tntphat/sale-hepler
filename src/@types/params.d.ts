interface IParamPost {
  postReq: IParamsPostReq;
}

interface IParamsPostReq {
  groupId: number;
  content: string;
}

interface IParamsPostMultiple {
  groupsId: number[];
  images: File[];
  content: string;
}

interface IParamsSignIn {
  email: string;
  password: string;
}

interface IParamsSignUp extends IParamsSignIn {
  name?: string;
  confirm_password?: string;
}

interface IParamsPaganation {
  page: number;
  limit: number;
  keyWord: string;
}

interface IVariant {
  sku: string;
  min_code: number;
  price: number;
  inventory_type: string;
  seller_warehouse: string;
  warehouse_stocks: any;
}
interface IParamsProductRequest {
  category_id: number;
  name: string;
  description: string;
  market_price: number;
  image?: any;
  images?: any;
  options_attributes?: any;
  variants: any;
  certificate_files?: any;
  meta_data: { is_auto_turn_on: boolean };
}

interface IParamsCreateProduct {
  name: string;
  sku: string;
  weight: number;
  weightUnit: string;
  importPrice: number;
  exportPrice: number;
  type: string;
  description: string;
  branch: string;
  inventoryNumber: number;
  images: string[];
  isAllowSell: boolean;
}

interface IParamsGetProduct {
  page: number;
  name?: string;
}

interface IParamCreateTemplatePost {
  title: string;
  content: string;
}

interface IParamConnectionSendo {
  secret_key: string;
  shop_key: string;
}
