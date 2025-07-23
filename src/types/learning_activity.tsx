export enum LearningActivityType {
    // MULTIPLE_OPTION_THEORY = 'MULTIPLE_OPTION_THEORY',         // FR 19
    // MULTIPLE_OPTION_INCOMPLETE_SENTENCE = 'MULTIPLE_OPTION_INCOMPLETE_SENTENCE', // FR 20
    // MULTIPLE_OPTION_VOCABULARY = 'MULTIPLE_OPTION_VOCABULARY', // FR 21
    // MULTIPLE_OPTION_IMAGE = 'MULTIPLE_OPTION_IMAGE',           // FR 22
    // WRITTEN_RESPONSE = 'WRITTEN_RESPONSE',                     // FR 23
    // SHOW_RESULTS = 'SHOW_RESULTS',                             // FR 25


    CHOICE = "choice",
    FILL = "fill_in",
    MATCH = "matching",
    ORDER = "order",
}
export type Activity =
  | {
      id: number;
      type: LearningActivityType.FILL;
      payload: { text: string };
      title: string;
      instructions: string;
      difficulty: string;
      created_at: string;
    }
  | {
      id: number;
      type: LearningActivityType.CHOICE;
      payload: { choices: { id: number; text: string }[]; is_multiple: boolean };
      title: string;
      instructions: string;
      difficulty: string;
      created_at: string;
    }
  | {
      id: number;
      type: LearningActivityType.MATCH;
      payload: { pairs: { left: string; right: string }[] };
      title: string;
      instructions: string;
      difficulty: string;
      created_at: string;
    }
  | {
      id: number;
      type: LearningActivityType.ORDER;
      payload: { words: string[] };
      title: string;
      instructions: string;
      difficulty: string;
      created_at: string;
    };


export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}