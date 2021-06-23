import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../App';

import '../styles/auth.scss'
import logoImg from '../assets/images/logo.svg'
import illustrationImg from '../assets/images/illustration.svg'
import { Button } from '../components/Button';

export function NewRoom() {
    const { user } = useContext(AuthContext);

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
                    <h1>{ user?.name }</h1>
                    <h2>Create a new room</h2>
                    <form>
                        <input type="text" placeholder="Name your room" />
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