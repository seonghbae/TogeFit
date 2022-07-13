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
  _id: string;
}
interface IRoutinesInfo {
  routine_name: string;
  routine_list: [IRoutinesExerciseInfo];
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

export type {
  FormInputType,
  RegisterInputType,
  IRoutines,
  IRoutinesInfo,
  IRoutinesExerciseInfo,
  ArticleResponse,
  ArticleErrResponse,
};
