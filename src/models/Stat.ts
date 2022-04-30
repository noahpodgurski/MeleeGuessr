export type PostStat = {
  userId: string;
  wasCorrect: boolean;
  score: number;
  final: boolean;
}

// data? fav character...
export type GetStat = {
  userId: string;
  correct: number;
  incorrect: number;
  highScore: number;
  games: number;
}