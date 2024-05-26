import Header from "../../components/general/header/header";
import classes from './landing.module.css';

export default function LandingPage() {
    return (
        <div className={classes.landing}>
            <Header landing />
            <div className={classes.banner}>
                <h1 className={classes.langingText}>You should count your points, NOW!</h1>
                <button>Start counting</button>
            </div>
        </div>
    );
}