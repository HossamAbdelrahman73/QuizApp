export interface IProfile {
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  status?: string;
  _id?: string;
}

export interface IUpdateProfile {
  last_name: string;
}

