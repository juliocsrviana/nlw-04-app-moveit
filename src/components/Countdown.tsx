import { useState, useEffect, useContext } from 'react'
import { ChagellendContext } from '../contexts/ChagellendContext';
import styles from '../styles/components/Countdown.module.css'

let countDownTimeout: NodeJS.Timeout;

export function Countdown(){

    const {startNewChagellend} = useContext(ChagellendContext);

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('')
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('')

    function startCountdown(){
        setIsActive(true)
    }

    function resetCountdown(){
        clearTimeout(countDownTimeout);
        setIsActive(false);
        setTime(0.1 * 60);
    }

    useEffect(() => {
        if(isActive && time > 0){
            countDownTimeout = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        }else if(isActive && time === 0){
            setHasFinished(true)
            setIsActive(false)
            startNewChagellend()
        }
    }, [isActive, time])

    return(
        <div>
            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                    <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>
            <div>
                {hasFinished ? (
                <button
                    disabled
                    className={styles.countDownButton}
                >
                    Ciclo finalizado
                </button>                    
                ) : (
                    <>
                        {isActive ? (
                        <button
                            onClick={resetCountdown}
                            className={`${styles.countDownButton} ${styles.countDownButtonActive}`}
                        >
                            Abandonar ciclo
                        </button>
                        ) : (
                        <button
                            onClick={startCountdown}
                            className={styles.countDownButton}
                        >
                            Iniciar ciclo
                        </button>
                        )}
                    </>
                )}
           </div>
        </div>
    )
}