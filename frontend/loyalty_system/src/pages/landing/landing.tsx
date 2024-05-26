import Header from "../../components/general/header/header";
import classes from './landing.module.css';

export default function LandingPage() {
    return (
        <div className={classes.landing}>
            <Header landing />
            <div className={classes.banner}>
                <h2>Just count your scores, NOW!</h2>
                <button>Start counting</button>
            </div>
        </div>
    );
}