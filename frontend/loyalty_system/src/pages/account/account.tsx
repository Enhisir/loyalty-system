import { QRCodeSVG } from 'qrcode.react';
import classes from './account.module.css';


export default function Account() {
    const points = 25;

    return (
        <div className={classes.centeredItem}>
            <div className={classes.pointsBlock}>Your points: {points}</div>
            <QRCodeSVG className={classes.QRCode} size="100%" value='https://reactjs.org/' />
            <span className={classes.qrDescribe}>
                show QR-code to the stuff to gain your scores
            </span>
        </div>
    );
}