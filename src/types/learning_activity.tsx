export enum LearningActivityType {
    MULTIPLE_OPTION_THEORY = 'MULTIPLE_OPTION_THEORY',         // FR 19
    MULTIPLE_OPTION_INCOMPLETE_SENTENCE = 'MULTIPLE_OPTION_INCOMPLETE_SENTENCE', // FR 20
    MULTIPLE_OPTION_VOCABULARY = 'MULTIPLE_OPTION_VOCABULARY', // FR 21
    MULTIPLE_OPTION_IMAGE = 'MULTIPLE_OPTION_IMAGE',           // FR 22
    WRITTEN_RESPONSE = 'WRITTEN_RESPONSE',                     // FR 23
    SHOW_RESULTS = 'SHOW_RESULTS',                             // FR 25
}

export interface Activity {
  id: number;
  type: LearningActivityType; 
  title: string;
  instructions: string;
  difficulty: Difficulty; 
  created_at: string; 
  payload: Payload; 
}

export interface Payload {
  words?: string[]; 
  pairs?: { left: string; right: string }[]; 
  choices?: { id: number; text: string }[]; 
  is_multiple?: boolean; 
}
export enum Difficulty {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard"
}