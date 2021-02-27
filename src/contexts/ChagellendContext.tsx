import { createContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import challengesJson from '../../challenges.json';
import { LevelUpModal } from '../components/LevelUpModal';

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
    closeLevelUpModal: () => void;
}

interface ChagellendProps{
    children: ReactNode;
    level: number;
    currentExperience: number;
    chagellendCompleted: number
}

export const ChagellendContext = createContext({} as ChagellendContextDate);

export function ChagellendProvider({
        children, ...rest
    }: ChagellendProps){
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0)
    const [chagellendCompleted, setChagellendCumpleted] = useState(rest.chagellendCompleted ?? 0)
    const [actChallengs, setActChallengs] = useState(null)
    const [isLevelUpModalOpen, setIsLevelModalOpen] = useState(false)
    const experienceToNextLevel = Math.pow((level + 2) * 4, 2)

    function levelUp(){
      setLevel(level + 1);
      setIsLevelModalOpen(true)
    }

    function closeLevelUpModal(){
        setIsLevelModalOpen(false)
    }

    useEffect(() => {
        Notification.requestPermission();
    }, [])

    useEffect(() => {
        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('chagellendCompleted', String(chagellendCompleted));

    }, [level, currentExperience, chagellendCompleted])

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
                completeChallenge,
                closeLevelUpModal
            }}
        >
            {children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChagellendContext.Provider>
    );

    
}