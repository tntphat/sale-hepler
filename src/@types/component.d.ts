interface Test {
  a: string;
  b: number;
}

interface IBox extends React.CSSProperties {
  classname?: string;
  title?: string;
  onClick?: any;
}

interface ISelect {
  svg1?: React.ComponentElement;
  onClickSelect1?: () => void;
}

interface IProgressBar {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
  isDisabled?: boolean;
  data?: string[];
}

interface IModal {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  isSmall?: boolean;
  isBlue?: boolean;
  className?: string;
}

interface IModalForm {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit?: () => void;
  isSmall?: boolean;
  isBlue?: boolean;
  agreeText?: string;
}
interface IAvatar {
  className?: string;
  width?: number;
  borderRadius?: number;
  border?: string;
  image?: string;
  onClick?: (e: React.MouseEvent) => void;
  isOval?: boolean;
}

interface IItem extends IAvatar {
  icon?: React.ComponentElement;
  subName?: string;
  name?: string;
  isSecondType?: boolean;
}

interface IButton extends React.CSSProperties {
  size?: 's' | 'm' | 'l';
  color?: string;
  onClick?: (e?: React.MouseEvent) => void;
  className?: string;
  isDisabled?: boolean;
  isSecondary?: boolean;
}

interface ISearchText {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  placeholder?: string;
  onKeyPress?: any;
}

interface IDivider {
  className?: string;
  backgroundColor?: string;
  margin?: string;
  height?: string;
}

interface ILoader {
  className?: string;
  isLoadMore?: string;
}

interface IInput {
  classNameInput?: string;
  name?: string;
  placeholder?: string;
  type?: string;
  value?: string | number;
  id?: string;
  classNameLabel?: string;
  isLabel?: boolean;
  label?: string;
  HTMLFor?: string;
  autoComplete?: string;
  onChange?: ((event: React.ChangeEvent<HTMLInputElement, React.ChangeEvent>) => void) | undefined;
  onkeypress?: React.KeyboardEventHandler<HTMLInputElement> | undefined;
  onFocus?: any | undefined;
  autoFocus?: boolean;
  subLabel?: string;
  className?: string;
  error?: string;
  marginTop?: number;
  disabled?: boolean;
}

interface IDropdownSelect {
  titleProp?: string;
  data: Array<{ id: number } & any>;
  label?: string;
  placeholder: string;
  onChange?: any;
  value?: any;
  error?: string;
  className?: string;
  classNameInput?: string;
  classNamePlaceholder?: string;
  isNotAllowedEdit?: boolean;
}

interface IHorizontalMedias {
  className?: string;
  setImages: React.Dispatch<React.SetStateAction<any>>;
  images: Array<any>;
  isSmallSize?: boolean;
}

interface IFileDropzone {
  setImages: React.Dispatch<React.SetStateAction<any>>;
  onClick?: (e: React.MouseEvent) => void;
  images: Array<any>;
}

interface ICheckBox {
  isActive?: boolean;
  handleClick?: (e: React.MouseEvent) => void;
}

interface ITextArea {
  onChange?: ((event: React.ChangeEvent<HTMLInputElement, React.ChangeEvent>) => void) | undefined;
  value?: string;
  className?: string;
  placeholder?: string;
  id?: string;
  readonly?: boolean;
  error?: string;
  onKeyPress?: any;
  onKeyDown?: any;
}

interface ISvg {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  color?: string;
}

interface IProductInfo {
  id: number;
  image: string;
  name: string;
  quantity: number;
  price: number;
}

interface IProduct {
  item: IProductInfo;
  onUpdateQuantity: (qty: number) => void;
}

interface ICustomTextArea {
  id?: string;
  placeholder?: string;
  className?: string;
  value?: string;
  error?: any;
  onChange?: ((event: any) => void) | undefined;
}

interface IDropdownSelectMultipleLevel {
  options?: Array<IResOptionCategory>;
  isFirstLevel?: boolean;
  isLoading?: boolean;
  onSelect: (opt: IResOptionCategory) => void;
  apiGetSpecificCategory: any;
  error?: any;
}

interface ITableHeaderCol {
  title?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
}

interface ITable {
  dataHeader: ITableHeaderCol[];
  dataTable: any[];
  className?: string;
  minWidth?: any;
  maxWidth?: any;
}
