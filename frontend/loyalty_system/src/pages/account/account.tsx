import { QRCodeSVG } from 'qrcode.react';
import classes from './account.module.css';
import { useEffect, useState } from 'react';
import { UserPointsInfo } from '../../types';
import CustomBeatLoader from '../../components/general/beatLoader';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';


export default function Account() {
    const navigate = useNavigate();
    const [upi, setUpi] = useState<UserPointsInfo | null | undefined>(undefined);

    useEffect(() => {
        setTimeout(() => {
            setUpi({
                code: uuid(), 
                name: 'Matvey',
                points: 25,
            } as UserPointsInfo);
        }, 3000);
    }, []);

    if (upi === undefined)
        return <CustomBeatLoader />;
    else if (upi === null)
        return navigate('/signin');

    return (
        <div className={classes.centeredItem}>
            <div className={classes.pointsBlock}>Your points: {upi!.points}</div>
            <QRCodeSVG className={classes.QRCode} size="100%" value={upi!.code} />
            <span className={classes.qrDescribe}>
                show QR-code to the stuff to gain your scores
            </span>
        </div>
    );
}