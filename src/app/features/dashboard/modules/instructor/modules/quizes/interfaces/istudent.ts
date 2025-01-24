export interface IStudent {
  avg_score: number;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  status: string;
  _id: string;
  group: IGroup;
}
export interface IGroup {
  createdAt: string;
  instructor: string;
  max_students: string;
  name: string;
  status: string;
  students: string[];
  __v: number;
  _id: string;
}
