import classes from './scanCode.module.css';
import { UserPointsInfo } from '../../types';
import CustomInput from '../../components/general/input/customInput';
import { useState } from 'react';


export default function CountPoints() {
    const [userPointsInfo, setUserPointsInfo] = useState<UserPointsInfo | null>(null);

    return (
        <main>
            <div className={classes.centeredItem}>
                <div className={classes.scanCodeTitle}></div>
                <h2>Sign in</h2>
                <CustomInput placeholder="" required/>
                <button>continue</button>
            </div>
        </main>
    );
}