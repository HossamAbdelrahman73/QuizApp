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
