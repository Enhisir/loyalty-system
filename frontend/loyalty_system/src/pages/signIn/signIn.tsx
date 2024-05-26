import CustomInput from "../../components/general/input/customInput";
import classes from './signin.module.css';

export default function SignIn() {
    return (
        <div className={classes.signInForm}>
            <h2>Sign in</h2>
            <CustomInput placeholder="phone" required/>
            <CustomInput type="password" placeholder="password" required/>
            <button>continue</button>
        </div>
    );
}