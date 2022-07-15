interface FormInputType {
  id: string;
  password: string;
}

interface RegisterInputType extends FormInputType {
  nickName: string;
  password_check?: string;
  emailAuthNumber: string;
}
interface IRoutinesExerciseInfo {
  name: string;
  weight?: string;
  set?: string;
  count?: string;
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
};

type tagType = {
  tag: string;
  _id: string;
};

interface ArticleResponse {
  userId: string;
  contents: string;
  post_image: Array<string>;
  is_open: boolean;
  tag_list: Array<tagType>;
  like: number;
  comments: Array<comment>;
  meal: string;
  routine: string;
  message: string;
}

interface ArticleErrResponse {
  reason: string;
}

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
  id: string;
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
}

interface IDiet {
  userId: string;
  meals: IMealList[];
  createdAt: string;
}

interface IDietList {
  status: number;
  data: IDiet[];
}

export type {
  FormInputType,
  RegisterInputType,
  IRoutines,
  IRoutinesInfo,
  IRoutinesExerciseInfo,
  ArticleResponse,
  ArticleErrResponse,
  ICalorieProps,
  IFood,
  IFoodList,
  IMeal,
  IMealList,
  IDiet,
  IDietList,
};
