import classes from './countPoints.module.css';
import { SendUserPoints, UserPointsInfo } from '../../types';
import CustomInput from '../../components/general/input/customInput';
import { FormEvent, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CustomBeatLoader from '../../components/general/beatLoader';
import api from '../../config/axios';
import Error from '../../components/general/error';


export default function CountPoints() {
    const location = useLocation();
    const { userCode } = location.state ?? { userCode: null };

    const [upi, setUpi] = useState<UserPointsInfo | null | undefined>(undefined);
    const [aimPoints, setAimPoints] = useState<number | null>(null);

    useEffect(() => {
        if (userCode === null) {
            setUpi(null);
        }
        else {
            setTimeout(() => {
                setUpi({
                    code: userCode,
                    name: 'Ibrahim',
                    points: 125,
                } as UserPointsInfo);
            }, 1000);
        }
    }, [userCode]);

    const trySubstractPoints = (event: FormEvent) => {
        event.preventDefault();
        if (aimPoints == null || aimPoints >= upi!.points) {
            alert("It's not possible to subtract more points than the user has");
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

    const addPoints = (event: FormEvent) => {
        event.preventDefault();
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
    };

    if (upi === undefined)
        return <CustomBeatLoader />;
    else if (upi === null)
        return <Error>Account not found</Error>;

    return (
        <main>
            <form>
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
            </form>
        </main>
    );
}