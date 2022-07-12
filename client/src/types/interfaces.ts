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

export type {
  FormInputType,
  RegisterInputType,
  IRoutines,
  IRoutinesInfo,
  IRoutinesExerciseInfo,
};
