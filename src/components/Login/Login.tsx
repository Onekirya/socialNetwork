import React, { FC } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { InjectedFormProps, reduxForm } from "redux-form";
import { login } from "../../redux/authReducer";
import { required } from "../../utils/validators/validators";
import { Input, createField } from "../common/FormsControls/FormsControls";
// @ts-ignore
import s from "./../common/FormsControls/FormsControls.module.css";
import { AppStateType } from "../../redux/reduxStore";

type LoginFormOwnProps = {
  captchaUrl: string | null
}

const LoginForm: FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = ({ handleSubmit, error, captchaUrl }) => {
  return (
    <form onSubmit={handleSubmit}>
      {createField<LoginFormValuesTypeKeys>("Email", "email", [required], Input)}
      {createField<LoginFormValuesTypeKeys>("Password", "password", [required], Input, {type:"password"})}
      {createField<LoginFormValuesTypeKeys>(undefined, "rememberMe", [], Input, {type:"checkbox"}, "remember me")}
      {captchaUrl && <img src={captchaUrl}/>}
      {captchaUrl && createField<LoginFormValuesTypeKeys>('symbols from image', "captcha", [required], Input)}
      {error && <div className={s.formSumaryError}>{error}</div>}
      <button>Login</button>
    </form>
  );
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({
  form: "login",
})(LoginForm);

type MapStatePropsType = {
  captchaUrl: string | null
  isAuth: boolean
}

type MapDispatchPropsType = {
  login: (email:string, password:string, rememberMe:boolean, captcha:any)=>void
}

type LoginFormValuesType = {
  email: string, 
  password:string, 
  rememberMe: boolean, 
  captcha:string
}

type LoginFormValuesTypeKeys = Extract <keyof LoginFormValuesType, string>

const Login: FC<MapStatePropsType & MapDispatchPropsType> = (props) => {
  const onSubmit = (formData: LoginFormValuesType) => {
    props.login(formData.email, formData.password, formData.rememberMe, formData.captcha);
  };
  if (props.isAuth) {
    return <Navigate to={"/profile"} />;
  }
  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={onSubmit} captchaUrl={props.captchaUrl} />
    </div>
  );
};

const mapStateToProps = (state: AppStateType):MapStatePropsType => ({
  captchaUrl: state.auth.captchaUrl,
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { login })(Login);
