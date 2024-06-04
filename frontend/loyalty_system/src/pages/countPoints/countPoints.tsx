import classes from './countPoints.module.css';
import { SendUserPoints, UserPointsInfo } from '../../types';
import CustomInput from '../../components/general/input/customInput';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CustomBeatLoader from '../../components/general/beatLoader';
import api from '../../config/axios';


export default function CountPoints() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userCode } = location.state;

    const [upi, setUpi] = useState<UserPointsInfo | null | undefined>(undefined);
    const [aimPoints, setAimPoints] = useState<number | null>(null);

    useEffect(() => {
        setTimeout(() => {
            setUpi({
                name: 'Matvey',
                points: 25,
            } as UserPointsInfo);
            setAimPoints(25);
        }, 3000);
    }, []);

    const trySubstractPoints = () => {
        if (aimPoints == null || aimPoints >= upi!.points) {
            alert("error!");
        }
        else {
            const newPoints = upi!.points - aimPoints!;
            setUpi({
                ...upi!,
                points: newPoints,
            });
            api.post(
                `/user/${userCode}/balance`,
                { points: newPoints } as SendUserPoints);
            // navigate(-1);
        }
    };

    const addPoints = () => {
        if (aimPoints == null) {
            alert("error!");
        }
        else {
            const newPoints = upi!.points + aimPoints!;
            const newUpi = {
                ...upi!,
                points: newPoints,
            };
            setUpi(newUpi);
            api.post(
                `/user/${userCode}/balance`,
                { points: newPoints } as SendUserPoints);
            // navigate(-1);
        }
    };

    if (upi === undefined)
        return <CustomBeatLoader />;

    return (
        <main>
            <div className={classes.centeredItem}>
                <div className={classes.scanCodeTitle}></div>
                <div className={classes.userInfo}><p>User: {upi?.name}</p></div>
                <span className={classes.describe}>Avaliable points: {upi?.points}</span>
                <CustomInput
                    placeholder="Points"
                    type='number'
                    value={aimPoints}
                    onChange={(e) => setAimPoints(Number(e.target.value))}
                    required />
                <button onClick={addPoints}>add</button>
                <button onClick={trySubstractPoints}>subtract</button>
            </div>
        </main>
    );
}