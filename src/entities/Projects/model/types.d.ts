export interface IProjectsModel {
  projects: IProject[]
  treeModel: ITreeItem[],
  employees: IEmployee[],
  selectedProjectItem: any | null
}

export interface IProject {
  "id": string,
  "title": string,
  "parentId": string | null,
  "employeesIds": string[]
}

export type IProjectWithoutId = Omit<Partial<IProject>, 'id'>;

export interface ITreeItem {
  id: string
  title: string
  "employeesIds": string[]
  children?: ITreeItem[]
}

export interface IEmployee {
  "id": string,
  "firstName": string,
  "middleName": string,
  "lastName": string,
  "inProjectsIds": string[],
  "days": number
}

export type IEmployeeWithoutId = Omit<Partial<IEmployee>, 'id'>;
