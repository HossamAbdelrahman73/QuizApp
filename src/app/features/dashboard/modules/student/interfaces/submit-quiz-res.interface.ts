export interface ISubmitQuizRes {
  data: {
    finished_at: string
    participant: string
    questions: IQuestion[]
    quiz: string;
    score: number;
    started_at: string;
    _id: string;
  },
  message: string;
}

interface IQuestion {
  answer: string;
  options: { A: string; B: string; C: string; D: string; _id: string; }
  title: string;
  _id: string;
}
