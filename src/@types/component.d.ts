interface Test {
  a: string;
  b: number;
}

interface IBox extends React.CSSProperties {
  classname?: string;
  title?: string;
}

interface ISelect {
  svg1?: React.ComponentElement;
  onClickSelect1?: () => void;
}

interface IProgressBar {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  className?: string;
}

interface IModal {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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

interface IButton {
  width?: string | number;
  height?: string | number;
  size?: 's' | 'm' | 'l';
  color?: string;
  backgroundColor?: string;
  borderRadius?: string;
  fontSize?: string | number;
  onClick?: (e?: React.MouseEvent) => void;
}

interface ISearchText {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  className?: string;
  placeholder?: string;
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
}
