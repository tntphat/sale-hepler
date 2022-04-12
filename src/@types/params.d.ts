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
