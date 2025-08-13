const PATHS = {
  HOME: "/",
  LOGOUT: "/logout",
  LOGIN: "/login",
  REGISTER: {
    STEP_ONE: "/register/step-one",
    STEP_TWO: "/register/step-two",
    VERIFY_USER: "/register/verify-user",
  },
  INCOMPLETE_REGISTRATION: "/incomplete-registration",
  NOT_COURSE_ASIGNED: "/not-course-asigned",
  USER_COURSES: {
    ROOT: "/dashboard",
    COMMUNITY: "/community",
    PROFILE: "/profile",
    MODULE: "/module/",
    EXAM: "/exam/",
    LEARNING_TYPE: {
      ROOT: "/learning_type",
      LEARNING_ACTIVITY: "/learning_type/learning_activity",
      MODULE: "/learning_type/module",
      ASSESSMENT: "/learning_type/assessment",
      ONBOARDING: "/learning_type/onboarding",
    },
    LEARNING_ACTIVITY: {
      ROOT: "/learning_activity",
      TOPIC_CONTENT: "/learning_activity/topic-activity",
      SECOND_LAYER: "/learning_activity/second-layer",
      TOPIC: "/learning_activity/topic",
      TOPICS_RESUME: "/learning_activity/topics-resume",
    },
  },
};
const PROTECTED_ROUTES = [
  PATHS.USER_COURSES.LEARNING_TYPE.ONBOARDING,
  PATHS.USER_COURSES.LEARNING_TYPE.ASSESSMENT,
  PATHS.USER_COURSES.LEARNING_TYPE.MODULE,
  PATHS.USER_COURSES.ROOT,
  PATHS.USER_COURSES.COMMUNITY,
  PATHS.USER_COURSES.PROFILE,
  PATHS.USER_COURSES.LEARNING_ACTIVITY.ROOT,
  PATHS.USER_COURSES.LEARNING_ACTIVITY.TOPIC_CONTENT,
  PATHS.USER_COURSES.LEARNING_ACTIVITY.SECOND_LAYER,
  PATHS.USER_COURSES.LEARNING_ACTIVITY.TOPIC,
  PATHS.USER_COURSES.LEARNING_ACTIVITY.TOPICS_RESUME,
  PATHS.USER_COURSES.MODULE,
  PATHS.USER_COURSES.EXAM,
];

const DYNAMIC_ROUTE_PREFIXES = [
  PATHS.USER_COURSES.MODULE,
  PATHS.USER_COURSES.EXAM,
];

const PUBLIC_ROUTES = [
  PATHS.HOME,
  PATHS.LOGIN,
  PATHS.REGISTER.STEP_ONE,
  PATHS.REGISTER.STEP_TWO,
  PATHS.REGISTER.VERIFY_USER,
];

export { PATHS, PROTECTED_ROUTES, PUBLIC_ROUTES, DYNAMIC_ROUTE_PREFIXES };
