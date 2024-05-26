import CustomInput from "../../components/general/input/customInput";
import classes from './signup.module.css';

export default function SignUp() {
    return (
        <div className={classes.signUpForm}>
            <h2>Sign up</h2>
            <CustomInput placeholder="phone" required/>
            <CustomInput placeholder="name" required/>
            <CustomInput type="password" placeholder="password" required/>
            <CustomInput type="password" placeholder="repeat password" required/>
            <button>continue</button>
        </div>
    );
}