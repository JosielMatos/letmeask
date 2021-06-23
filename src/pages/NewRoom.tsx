import { FormEvent, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { Link, useHistory } from 'react-router-dom';
import { database } from '../services/firebase';

import '../styles/auth.scss'
import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import { Button } from '../components/Button';


export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('')
    const history = useHistory()

    async function handleCreateRoom(event: FormEvent) {
        //prevent html default refresh behavior
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms')
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="illustration" />
                <strong>Create live Q&amp;A rooms</strong>
                <p>Answer your audience's questions in real-time</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="letmeask logo" />
                    <h2>Create a new room</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Name your room" 
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Create room</Button>
                    </form>
                    <p>
                        Want to enter an existing room? <Link to="/">Click here</Link>
                    </p>
                </div>
            </main>
        </div>
    );
}