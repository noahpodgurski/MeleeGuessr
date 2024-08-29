export type PostStat = {
  userId: string;
  username: string;
  wasCorrect: boolean;
  score: number;
  final: boolean;
}

// data? fav character...
export type GetStat = {
  userId: string;
  username: string;
  correct: number;
  incorrect: number;
  highScore: number;
  games: number;
}