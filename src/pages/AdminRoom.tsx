import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom'
// import { useAuth } from '../hooks/useAuth';
// import { FormEvent, useState } from 'react';

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
// import { database } from '../services/firebase';
import { Question } from '../components/Question';
import { useRoom } from '../hooks/useRoom';

type RoomParams = {
    id: string;
}

export function AdminRoom() {
    // const { user, signInWithGoogle } = useAuth();
    // const [newQuestion, setNewQuestion] = useState('');
    const params = useParams<RoomParams>();
    const RoomId = params.id;
    const { title, questions } = useRoom(RoomId);

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <div>
                        <RoomCode code={RoomId} />
                        <Button isOutlined>Close Room</Button>
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
                            />
                        );
                    }) }
                </div>
            </main>
        </div>
    );
}