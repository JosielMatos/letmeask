import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState, useEffect } from 'react';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

type Question = {
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

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const RoomId = params.id;
    const [questions, setQuestions] = useState<Question[]>([])
    const [title, setTitle] = useState('');

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

    async function handleSendQuestion(event: FormEvent) {
        event.preventDefault();
        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            throw new Error('You must be logged in')
        }

        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar,
            },
            isHighlighted: false,
            isAnswered: false,
        };
        await database.ref(`rooms/${RoomId}/questions`).push(question);

        setNewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <RoomCode code={RoomId} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    { questions.length > 0 && <span>{questions.length} Question(s)</span> }
                </div>

                <form onSubmit={handleSendQuestion}>
                    <textarea 
                    placeholder="What do you want to ask?"
                    onChange={event => setNewQuestion(event.target.value)}
                    value={newQuestion}
                    />
                    <div className="form-footer">

                        { user ? (
                            <div className="user-info">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span><button>Login</button> to ask a question</span>
                        ) }

                        <Button type="submit" disabled={!user}>Send</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}