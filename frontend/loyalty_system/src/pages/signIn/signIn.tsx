import { useState } from "react";
import CustomInput from "../../components/general/input/customInput";
import classes from './signin.module.css';
import { AuthInfo, Role, SignInForm, UserInfo } from "../../types";
import api from "../../config/axios";
import CustomBeatLoader from "../../components/general/beatLoader";
import { validate as validateSignIn, ValidationParameter } from "../../services/validate";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth";

export default function SignIn() {
  const navigate = useNavigate();
  const { userLoading, setUserLoading, storeAuthInfo } = useAuth();

  const extractPhoneRegex = /\+?[1-9][0-9]{7,14}/g;

  const [phone, setPhone] = useState<string>();
  const [password, setPassword] = useState<string>();

  const [errorMessage, setErrorMessage] = useState<string>('');

  const signIn = () => {
    const form = {
      phone: phone,
      password: password,
    } as SignInForm;
    const problems = validateSignIn(validationParameters, form);

    const user: UserInfo = phone == '79177502404'
      ? {
        name: 'Matvey',
        role: Role.Manager,
      }
      : {
        name: 'Ibrahim',
        role: Role.User,
      };

    setUserLoading(true);
    setErrorMessage('');

    if (problems.length > 0) {
      setErrorMessage(problems[0].errorMessage);
      setUserLoading(false);
    }
    else {
      setTimeout(() => {
        storeAuthInfo({
          user: user,
        } as AuthInfo)
        if (user.role == Role.Manager)
          navigate('/scan');
        else
          navigate('/account');
      }, 750);

      // api
      //   .post('/signin', form)
      //   .then(() => navigate('/'))
      //   .finally(() => setSignInLoading(false));
    }
  }

  const validationParameters: ValidationParameter[] = [
    {
      field: "phone",
      predicate: (phone: string | null) => phone!.match(extractPhoneRegex) != null,
      errorMessage: 'Phone number has invalid format',
    },
  ];

  if (userLoading) return <CustomBeatLoader />;

  return (
    <div className={classes.signInForm}>
      <h2>Sign in</h2>
      <span className={classes.error}>{errorMessage}</span>
      <CustomInput
        placeholder="phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required />
      <CustomInput
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required />
      <button onClick={signIn}>continue</button>
    </div>
  );
}