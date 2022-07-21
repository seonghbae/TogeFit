interface IError {
  message: string;
}

interface FormInputType {
  id: string;
  password: string;
}

interface IUserInfoModify {
  profile_image: any;
  name: string;
  nickname: string;
  currentPassword: string;
  password: string;
  password_check?: string;
}

interface RegisterInputType {
  name: string;
  nickname: string;
  userId: string;
  password: string;
  password_check?: string;
}
interface IRoutinesExerciseInfo {
  name: string;
  weight?: number;
  set?: number;
  count?: number;
  _id?: string;
}
interface IRoutinesInfo {
  routine_name: string;
  routine_list: IRoutinesExerciseInfo[];
  _id: string;
}

interface IRoutines {
  name: string;
  routines: [IRoutinesInfo];
  _id: string;
}

type comment = {
  content: string;
  author: string;
  _id: string;
  updatedAt: string;
};

type tagType = {
  tag: string;
  _id: string;
};

interface ICalorieProps {
  names: Array<{ name: string; value: number }>;
  carbohydrate: number;
  protein: number;
  fat: number;
  calories: number;
}

interface IFood {
  name: string;
  carbohydrate: number;
  protein: number;
  fat: number;
  quantity: number;
  calories: number;
  _id: string;
}

interface IFoodList {
  status: number;
  data: IFood[];
}

interface IMeal {
  foodName: string;
  quantity: number;
}

interface IMealList {
  meal_list: IMeal[];
  _id: string;
}

interface IDiet {
  userId: string;
  meals: IMealList[];
  createdAt: string;
  _id: string;
}

interface IDietList {
  status: number;
  data: IDiet[];
}
interface ITag {
  tag: string;
  _id: string;
}

interface IComment {
  content: string;
  author: string;
  _id: string;
  updatedAt: string;
  createdAt: string;
}
interface IBoard {
  _id: string;
  userId: string;
  contents: string;
  post_image: string[];
  is_open: boolean;
  tag_list: ITag[];
  like: number;
  meal: string;
  routine: string;
  comments: IComment[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface IBoardList {
  board: IBoard[];
}

interface PostResponse {
  _id: string;
  userId: string;
  contents: string;
  post_image: Array<string>;
  is_open: boolean;
  tag_list: Array<tagType>;
  like: number;
  comments: Array<comment>;
  meal_info: Array<IMeal[]>;
  routine_info: Array<IRoutinesInfo>;
  message: string;
  meal_createdAt: string;
}

interface ArticleErrResponse {
  reason: string;
}

export type ModalCloseEvent =
  | React.MouseEvent<HTMLDivElement, MouseEvent>
  | React.MouseEvent<SVGElement, MouseEvent>
  | React.MouseEvent<HTMLButtonElement, MouseEvent>;

export type {
  FormInputType,
  RegisterInputType,
  IRoutines,
  IRoutinesInfo,
  IRoutinesExerciseInfo,
  PostResponse,
  ArticleErrResponse,
  ICalorieProps,
  IFood,
  IFoodList,
  IMeal,
  IMealList,
  IDiet,
  IDietList,
  IBoard,
  IBoardList,
  IComment,
  ITag,
  IError,
  IUserInfoModify,
};
