import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { database } from '../services/firebase';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user } = useAuth();
    const params = useParams<RoomParams>();
    const [newQuestion, setNewQuestion] = useState('');
    const RoomId = params.id;

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
                    <h1>Room React</h1>
                    <span>4 Questions</span>
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