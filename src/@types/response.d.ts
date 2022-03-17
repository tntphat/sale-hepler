interface IResGetAllGroup {
  groups: IResGroup[];
}

interface IResGroup {
  name: string;
  id: string;
  privacy?: string;
}
