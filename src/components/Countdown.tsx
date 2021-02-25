import { useContext } from 'react';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){

    const {
        hasFinished,
        minutes,
        seconds,
        isActive,
        resetCountdown,
        startCountdown
    } = useContext(CountdownContext)

    const [ minuteLeft, minuteRight ] = String(minutes).padStart(2, '0').split('')
    const [ secondLeft, secondRight ] = String(seconds).padStart(2, '0').split('')

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