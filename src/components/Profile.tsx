import { useContext } from 'react'
import { ChagellendContext } from '../contexts/ChagellendContext'
import styles from '../styles/components/Profile.module.css'

export function Profile(){

    const {level} = useContext(ChagellendContext);

    return(
        <div className={styles.profileContainer}>
            <img src="https://avatars.githubusercontent.com/u/79230413?v=4" alt="Julio Viana"/>
            <div>
                <strong>Julio Viana</strong>
                <p>
                    <img src="icons/level.svg" alt=""/>
                    Level {level}
                </p>
            </div>
        </div>
    )
}