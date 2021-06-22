import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'

export function Home() {
    return (
        <div>
            <aside>
                <img src={illustrationImg} alt="illustration" />
                <strong>Create live Q&amp;A rooms</strong>
                <p>Answer your audience's questions in real-time</p>
            </aside>
            <main>
                <div>
                    <img src={logoImg} alt="letmeask logo" />
                    <button>
                        Create your room with Google
                        <img src={googleIconImg} alt="Google logo" />
                    </button>
                    <div>Or, enter a room</div>
                    <input type="text" placeholder="Enter the room code" />
                    <button type="submit">Enter</button>
                </div>
            </main>
        </div>
    );
}