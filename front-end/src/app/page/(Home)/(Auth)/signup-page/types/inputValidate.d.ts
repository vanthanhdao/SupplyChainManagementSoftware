interface IInputValidate {
  nameLable: string;
  idLable: string;
  placeholder: string;
  type?: "text" | "email" | "password" | "file";
  multiple?: boolean;
  onSendData?: any;
}
