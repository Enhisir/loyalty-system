import { Link } from "react-router-dom";
import { useAuth } from "../../../../auth";
import classes from './index.module.css';

export default function AccountSection() {
    const { userLoading, user, logout } = useAuth();

    return <>
        {(!userLoading && user  && (
            <>
                <Link to={`/profile`} className={classes.headerItem}>
                    {user.name}
                </Link>
                <span className={classes.headerItem} onClick={logout}>
                    sign out
                </span>
            </>
        )) || (
                <>
                    <Link to="/signin" className={classes.headerItem}>
                        sign in
                    </Link>
                    <Link to="/signup" className={classes.headerItem}>
                        sign up
                    </Link>
                </>
            )}
    </>
}