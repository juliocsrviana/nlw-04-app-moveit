import {useContext} from 'react';
import { ChagellendContext } from '../contexts/ChagellendContext';
import styles from '../styles/components/ChagellendBox.module.css';

export function ChagellendBox(){

    const {actChallengs, resetChallenge} = useContext(ChagellendContext)

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
                                    onClick={resetChallenge}
                                    type="button"
                                    className={styles.chagellendFaliedButton}
                                >Falhei</button>
                                <button
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
                            Inicie um ciclo para receber o primeiro desafio.
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