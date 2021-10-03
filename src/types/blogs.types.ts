export interface IBlogs {
  error: any;
  data: Data;
}

export interface Data {
  user: IUser;
}

export interface IUser {
  publication: IPublication;
}

export interface IPublication {
  posts: IPost[];
}

export interface IPost {
  _id: string;
  title: string;
  brief: string;
  slug: string;
  totalReactions: number;
  replyCount: number;
  coverImage: string;
}
