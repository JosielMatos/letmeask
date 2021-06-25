import { RoomCode } from '../components/RoomCode';
import { useHistory, useParams } from 'react-router-dom'
import { database } from '../services/firebase';
// import { useAuth } from '../hooks/useAuth';
// import { FormEvent, useState } from 'react';
import { useRoom } from '../hooks/useRoom';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import { Question } from '../components/Question';
import { Button } from '../components/Button'

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user, signInWithGoogle } = useAuth();
    // const [newQuestion, setNewQuestion] = useState('');
    const history = useHistory()
    const params = useParams<RoomParams>();
    const roomId = params.id;
    const { title, questions } = useRoom(roomId);

    async function handleDeleteQuestion(questionId: string) {
        if (window.confirm('Are you sure you want to delete this question?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
        }
    }

    async function handleCloseRoom() {
        await database.ref(`rooms/${roomId}`).update({
            closedAt: new Date(),
        })
        history.push('/')
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <div>
                        <RoomCode code={roomId} />
                        <Button isOutlined onClick={handleCloseRoom}>Close Room</Button>
                    </div>
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>{title}</h1>
                    { questions.length > 0 && <span>{questions.length} Question(s)</span> }
                </div>

                <div className="questions-list">
                    { questions.map(question => {
                        return(
                            <Question 
                            key={question.id}
                            content={question.content}
                            author={question.author}
                            >
                                <button
                                    type="button"
                                    onClick={() => handleDeleteQuestion(question.id)}
                                >
                                    <img src={deleteImg} alt="delete question" />
                                </button>
                            </Question>
                        );
                    }) }
                </div>
            </main>
        </div>
    );
}