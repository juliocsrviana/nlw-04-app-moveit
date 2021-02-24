import { useContext } from 'react'
import { ChagellendContext } from '../contexts/ChagellendContext'
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallenges(){
    const {chagellendCompleted} = useContext(ChagellendContext)
    return(
        <div className={styles.completedChallenges}>
            <span>Desafios completos</span>
            <span>{chagellendCompleted}</span>
        </div>
    )
}