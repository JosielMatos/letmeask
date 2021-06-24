import logoImg from '../assets/images/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode';
import { useParams } from 'react-router-dom'

import '../styles/room.scss'

type RoomParams = {
    id: string;
}

export function Room() {
    const params = useParams<RoomParams>();

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="logo" />
                    <RoomCode code={params.id} />
                </div>
            </header>

            <main className="content">
                <div className="room-title">
                    <h1>Room React</h1>
                    <span>4 Questions</span>
                </div>

                <form>
                    <textarea 
                    placeholder="What do you want to ask?"
                    />
                    <div className="form-footer">
                        <span><button>Login</button> to ask a question</span>
                        <Button type="submit">Send</Button>
                    </div>
                </form>
            </main>
        </div>
    );
}