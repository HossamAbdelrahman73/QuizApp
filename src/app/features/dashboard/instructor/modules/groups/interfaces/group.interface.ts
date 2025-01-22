export interface IGroup {
  _id: string;
  instructor: string;
  max_students: number;
  name: string;
  status: string;
  students: string[];
}

export interface IGroupById {
  _id: string;
  name: string;
  status: string;
  instructor: string;
  students: IStudentInGroup[];
  max_students: number;
}

export interface IStudentInGroup {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
}
