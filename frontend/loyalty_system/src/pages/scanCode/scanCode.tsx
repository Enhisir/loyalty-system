import QrScanner from 'qr-scanner';
import classes from './scanCode.module.css';
import cameraLogo from '../../assets/camera.svg';
import { useEffect, useRef, useState } from 'react';


export default function ScanCode() {
    const [onStreamReady, setOnStreamReady] = useState<boolean>(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
    const mediaStreamRef = useRef();



    const tryGetVideoPermission = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    setMediaStream(stream);
                    setOnStreamReady(true);
                })
                .catch(err => console.error(err));
        }
    };

    useEffect(() => {
        navigator.permissions.query({
            name: 'geolocation'
        }).then((result) => {
            setOnStreamReady(result.state == 'granted')
        });
    }, []);

    useEffect(() => {
        if (mediaStreamRef.current && mediaStream) {
            mediaStreamRef.current.srcObject = mediaStream;
            const scanner = new QrScanner(
                mediaStreamRef.current,
                result => console.log('decoded qr code:', result),
            );
            scanner.start();
            setQrScanner(scanner);
            
        }
    }, [mediaStream]);

    return (
        <main>
            <div className={classes.centeredItem}>
                <div className={classes.scanCodeTitle}>Scan QR-code</div>

                {
                    onStreamReady
                        ? <video
                            className={classes.scanCodeVideo}
                            ref={mediaStreamRef}
                            autoPlay playsInline />
                        : (
                            <>
                                <div className={classes.scanCode}>
                                    <img src={cameraLogo} />
                                </div>
                                <span className={classes.describe}>Grant camera permissions to continue</span>
                                <button onClick={tryGetVideoPermission}>GRANT PERMISSION</button>
                            </>
                        )
                }
            </div>
        </main>
    );
}