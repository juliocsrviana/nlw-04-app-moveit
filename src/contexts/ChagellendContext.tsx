import { createContext, useState, ReactNode } from 'react';
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
}

interface ChagellendProps{
    children: ReactNode;
}

export const ChagellendContext = createContext({} as ChagellendContextDate);

export function ChagellendProvider({children}: ChagellendProps){
    const [level, setLevel] = useState(1);
    const [currentExperience, setCurrentExperience] = useState(35)
    const [chagellendCompleted, setChagellendCumpleted] = useState(2)

    const [actChallengs, setActChallengs] = useState(null)

    const experienceToNextLevel = Math.pow((level + 2) * 4, 2)

    function levelUp(){
      setLevel(level + 1);
    }

    function startNewChagellend(){
        const challegensRandomIndex = Math.floor(Math.random() * challengesJson.length)
        const challenge = challengesJson[challegensRandomIndex];

        setActChallengs(challenge)
    }

    function resetChallenge(){
        setActChallengs(null)
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
                resetChallenge
            }}
        >
            {children}
        </ChagellendContext.Provider>
    );

    
}