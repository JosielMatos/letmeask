import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type QuestionType = {
    id: string,
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

export function useRoom(RoomId: string) {
    const [title, setTitle] = useState('');
    const [questions, setQuestions] = useState<QuestionType[]>([])

    useEffect(() => {
        const roomsRef = database.ref(`rooms/${RoomId}`);

        roomsRef.on('value', room => {
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })

            setTitle(databaseRoom.title)
            setQuestions(parsedQuestions)
        })
    }, [RoomId])

    return { questions, title }
}