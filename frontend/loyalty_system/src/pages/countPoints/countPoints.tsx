import classes from './countPoints.module.css';
import { UserPointsInfo } from '../../types';
import CustomInput from '../../components/general/input/customInput';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomBeatLoader from '../../components/general/beatLoader';


export default function CountPoints() {
    const location = useLocation();
    const { userCode } = location.state;
    
    const [upi, setUpi] = useState<UserPointsInfo | null | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => setUpi({
            name: 'Matvey',
            points: 0,
        } as UserPointsInfo), 3000);
    }, []);

    if (upi === undefined)
        return <CustomBeatLoader />;

    return (
        <main>
            <div className={classes.centeredItem}>
                <div className={classes.scanCodeTitle}></div>
                <div className={classes.userInfo}><p>User: {upi?.name}</p></div>
                <span className={classes.describe}>Avaliable points: {upi?.points}</span>
                <CustomInput placeholder="Points" type='number' required />
                <button>add</button>
                <button>subtract</button>
            </div>
        </main>
    );
}