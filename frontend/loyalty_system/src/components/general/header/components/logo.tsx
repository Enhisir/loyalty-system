import { Link } from "react-router-dom";
import classes from './index.module.css';
import giftLogo from "../../../../assets/giftLogo.svg";

export default function Logo() {
    return (
        <Link to="/" className={classes.logoContainer}>
            <div className={classes.logoImage}>
                <img src={giftLogo}></img>
            </div>
            <h3>
                Loyalty
                <br />&emsp;System
            </h3>
        </Link>
    );
}