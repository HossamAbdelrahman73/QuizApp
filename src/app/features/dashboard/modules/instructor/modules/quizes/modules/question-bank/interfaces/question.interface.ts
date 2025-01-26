export interface ICreateQuestion {
  title: string;
  description: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  answer: string;
  type: string;
  difficulty: string;
}

export interface IGetQuestion {
  _id: string;
  answer: string;
  description: string;
  difficulty: string;
  instructor: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
    _id: string;
  }
  points: number;
  status: string;
  title: string;
  type: string;
}
