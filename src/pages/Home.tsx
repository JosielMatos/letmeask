import { useHistory } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

import '../styles/auth.scss'
import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import { Button } from '../components/Button';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    const [roomCode, setRoomCode] = useState('');


    async function handleCreateRoom() {
        if (!user) {
            await signInWithGoogle()
        }

        history.push('/rooms/new')
    }

    async function handleJoinRoom(event: FormEvent) {
        event.preventDefault();
        
        if (roomCode.trim() === '') {
            return;
        }

        const roomRef = await database.ref(`rooms/${roomCode}`).get()
        if (!roomRef.exists()) {
            alert('Room does not exist');
            return;
        }

        if (roomRef.val().closedAt) {
            alert('Room already closed.');
            return;
        }

        history.push(`/rooms/${roomCode}`)
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
                    <button onClick={handleCreateRoom} className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Create your room with Google
                    </button>
                    <div className="separator">Or, enter a room</div>
                    <form onSubmit={handleJoinRoom}>
                        <input 
                            type="text" 
                            placeholder="Enter the room code" 
                            onChange={event => setRoomCode(event.target.value)}
                            value={roomCode}
                            />
                        <Button type="submit">Enter</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}