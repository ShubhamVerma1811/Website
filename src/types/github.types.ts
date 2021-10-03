export interface IPullRequests {
  error: unknown;
  data: IData;
}

export interface IData {
  user: IGHUser;
}

export interface IGHUser {
  pullRequests: IPullRequests;
}

export interface IPullRequests {
  nodes: INode[];
  totalCount: number;
}

export interface INode {
  title: string;
  authorAssociation: IAuthorAssociation;
  state: IState;
  url: string;
  body: string;
  id: string;
  repository: IRepository;
}

export interface IRepository {
  name: string;
  url: string;
}

export enum IAuthorAssociation {
  Contributor = 'CONTRIBUTOR',
  None = 'NONE',
  Owner = 'OWNER',
}

export enum IState {
  Closed = 'CLOSED',
  Merged = 'MERGED',
  Open = 'OPEN',
}
