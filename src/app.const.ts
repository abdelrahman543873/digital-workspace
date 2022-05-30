export enum ENV_VARIABLE_NAMES {
  LOCAL_MONGO_DB = 'LOCAL_MONGO_DB',
  WEATHER_API = 'WEATHER_API',
  WEATHER_API_KEY = 'WEATHER_API_KEY',
  PRAYER_API = 'PRAYER_API',
  CURRENCY_API = 'CURRENCY_API',
  JWT_SECRET = 'JWT_SECRET',
  JWT_EXPIRY_TIME = 'JWT_EXPIRY_TIME',
  MONGO_DB = 'MONGO_DB',
  NODE_ENV = 'NODE_ENV',
}

export enum LangEnum {
  EN = 'EN',
  AR = 'AR',
}

export const GENDER = ['M', 'F'];
export const DAY_NAMES = ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'];
export const WIDGETS = [
  'PRAYER',
  'CURRENCY',
  'TEMPERATURE',
  'MEETINGS',
  'TASKS',
];
export enum LookupSchemasEnum {
  users = 'users',
  posts = 'posts',
  comments = 'comments',
  groups = 'groups',
  pages = 'pages',
  tasks = 'tasks',
  departments = 'departments',
  leaveTypes = 'leavetypes',
  titles = 'titles',
  teams = 'teams',
  roles = 'roles',
  leaveUsers = 'leaveusers',
  rejectionReasons = 'rejectionreasons',
}

export const PRIORITIES = ['low', 'medium', 'high'];

export const TASK_STATUS = ['approved', 'pending', 'rejected', 'returned'];
