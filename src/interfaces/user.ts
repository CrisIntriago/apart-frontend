export enum UserRole {
  STUDENT = 'student',
  TEACHER = 'teacher',
}

export interface UserInformation {
  user_id: string;
  name: string;
  roles: UserRole[];
}