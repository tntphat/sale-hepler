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
