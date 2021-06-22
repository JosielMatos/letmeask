import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

import '../styles/auth.scss'
import { Button } from '../components/Button';

export function Home() {
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
                    <button className="create-room">
                        <img src={googleIconImg} alt="Google logo" />
                        Create your room with Google
                    </button>
                    <div className="separator">Or, enter a room</div>
                    <form>
                        <input type="text" placeholder="Enter the room code" />
                        <Button type="submit">Enter</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}