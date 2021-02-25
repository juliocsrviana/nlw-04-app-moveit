import { createContext, useState, ReactNode, useEffect } from 'react';
import challengesJson from '../../challenges.json';

interface Challenges{
    type: 'body' | 'eye';
    description: string;
    amount: number;
}

interface ChagellendContextDate{
    level: number;
    currentExperience: number;
    chagellendCompleted: number;
    experienceToNextLevel:number;
    actChallengs: Challenges;
    levelUp: () => void;
    startNewChagellend: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChagellendProps{
    children: ReactNode;
}

export const ChagellendContext = createContext({} as ChagellendContextDate);

export function ChagellendProvider({children}: ChagellendProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(0)
    const [chagellendCompleted, setChagellendCumpleted] = useState(0)

    const [actChallengs, setActChallengs] = useState(null)

    const experienceToNextLevel = Math.pow((level + 2) * 4, 2)

    function levelUp(){
      setLevel(level + 1);
    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])  

    function startNewChagellend(){
        const challegensRandomIndex = Math.floor(Math.random() * challengesJson.length)
        const challenge = challengesJson[challegensRandomIndex];

        setActChallengs(challenge)

        new Audio('/notification.mp3').play();

        if(Notification.permission === 'granted'){
            new Notification('Novo desafio 🎉', {
                body: `Valendo ${challenge.amount}xp`
            })
        }

    }

    function resetChallenge(){
        setActChallengs(null)
    } 

    function completeChallenge(){
        if(!actChallengs){
            return; // funcao vazia, estilo void
        }

        const { amount } = actChallengs;

        // let é let is change - deixe isso mudar

        let finalExperienc = currentExperience + amount;

        if(finalExperienc >= experienceToNextLevel){
            finalExperienc = finalExperienc - experienceToNextLevel;
            levelUp()
        }

        setCurrentExperience(finalExperienc);
        setActChallengs(null);
        setChagellendCumpleted(chagellendCompleted + 1)

    }

    return(
        <ChagellendContext.Provider
            value={{
                level,
                currentExperience,
                chagellendCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChagellend,
                actChallengs,
                resetChallenge,
                completeChallenge
            }}
        >
            {children}
        </ChagellendContext.Provider>
    );

    
}