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
