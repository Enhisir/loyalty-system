import QrScanner from 'qr-scanner';
import classes from './scanCode.module.css';
import cameraLogo from '../../assets/camera.svg';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate as validateCode } from 'uuid';

export default function ScanCode() {
    const navigate = useNavigate();

    const [onStreamReady, setOnStreamReady] = useState<boolean>(false);
    const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
    const [qrScanner, setQrScanner] = useState<QrScanner | null>(null);
    const [errorMessage, setErrorMessage] = useState<string>();
    const mediaStreamRef = useRef();

    const trySendCode = (code: string) => {
        if (validateCode(code)) {
            tryStopCamera();
            navigate('/count', { state: { userCode: code } });
        }
        else {
            setErrorMessage('Invalid QR-Code, try again.');
        }
    }

    const tryOpenCamera = () => {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({
                    video: {
                        facingMode: "environment",
                        width: { max: 720 },
                        height: { max: 720 },
                        frameRate: { ideal: 24 }
                    }
                })
                .then(stream => {
                    setMediaStream(stream);
                    setOnStreamReady(true);
                })
                .catch(err => {
                    alert(err);
                    console.error(err);
                });
        }
    };

    const tryStopCamera = () => {
        mediaStream?.getTracks().forEach((track) => track.stop());
        qrScanner?.stop();
        qrScanner?.destroy();
    };

    document
        .querySelectorAll('a')
        .forEach(
            element => element.addEventListener(
                'click', () => tryStopCamera()));

    useEffect(() => {
        navigator.permissions
            .query({ name: "camera" })
            .then((result) => {
                const isGranted = result.state == 'granted';
                setOnStreamReady(isGranted);
                if (isGranted) tryOpenCamera();
            });
    }, []);

    useEffect(() => {
        if (mediaStreamRef.current && mediaStream) {
            mediaStreamRef.current.srcObject = mediaStream;
            const scanner = new QrScanner(
                mediaStreamRef.current,
                result => {
                    console.log(`decoded qr code: ${result}`);
                    trySendCode(result);
                },
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
                        ? <>
                            <video
                                className={classes.scanCodeVideo}
                                ref={mediaStreamRef}
                                autoPlay playsInline />
                            <span className={classes.describe}>{errorMessage}</span>
                        </>
                        : <>
                            <div className={classes.scanCode}><img src={cameraLogo} /></div>
                            <span className={classes.describe}>Grant camera permissions to continue</span>
                            <button onClick={tryOpenCamera}>GRANT PERMISSION</button>
                        </>

                }
            </div>
        </main>
    );
}