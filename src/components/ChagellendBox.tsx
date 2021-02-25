import {useContext} from 'react';
import { ChagellendContext } from '../contexts/ChagellendContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/ChagellendBox.module.css';

export function ChagellendBox(){

    const {actChallengs, completeChallenge, resetChallenge} = useContext(ChagellendContext)
    const {resetCountdown} = useContext(CountdownContext)

    function handleChallengeDone(){
        completeChallenge();
        resetCountdown();
    }

    function handleChallengeFail(){
        resetChallenge();
        resetCountdown();
    }

    return(
        <div className={styles.chagellendBoxContainer}>
            {actChallengs ? (
                <>
                    <div className={styles.chagellendActive}>
                        <header>Ganhe {actChallengs.amount} xp</header>
                        <main>
                            <img src={`icons/${actChallengs.type}.svg`} alt=""/>
                            <strong>Exercite-se!</strong>
                            <p>{actChallengs.description}</p>
                            <footer>
                                <button
                                    onClick={handleChallengeFail}
                                    type="button"
                                    className={styles.chagellendFaliedButton}
                                >Falhei</button>
                                <button
                                    onClick={handleChallengeDone}
                                    type="button"
                                    className={styles.chagellendDoneButton}
                                >Completei</button>
                            </footer>
                        </main>
                    </div>
                </>
            ) : (
                <>
                  <div className={styles.chagellendNotActive}>
                        <strong>
                            Inicie um ciclo para receber um desafio.
                        </strong>
                        <p>
                            <img src="icons/level-up.svg" alt="Level UP"/>
                            Avance de nível completando desafios.
                        </p>
                    </div>  
                </>
            )}
        </div>
    );
}