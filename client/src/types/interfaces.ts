interface FormInputType {
  id: string;
  password: string;
}

interface RegisterInputType extends FormInputType {
  nickName: string;
  password_check?: string;
  emailAuthNumber: string;
}

export type { FormInputType, RegisterInputType };
