import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function Room() {
    const { user, signInWithGoogle } = useAuth();
    const [newQuestion, setNewQuestion] = useState('');
    const params = useParams<RoomParams>();
    const RoomId = params.id;
    const { title, questions } = useRoom(RoomId);


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
                            <span><button onClick={signInWithGoogle} >Login</button> to ask a question</span>
                        ) }

                        <Button type="submit" disabled={!user}>Send</Button>
                    </div>
                </form>

                <div className="questions-list">
                    { questions.map(question => {
                        return(
                            <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            />
                        );
                    }) }
                </div>
            </main>
        </div>
    );
}