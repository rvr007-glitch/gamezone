import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { Context } from '../context/Context'
import randomCodeGenerator from '../utils/randomCodeGenerator'

const Homepage = () => {
    const [roomCode, setRoomCode] = useState('')
    const { user, dispatch } = useContext(Context);
    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    };

    return (
        <div className='Homepage'>
            <div className='homepage-menu'>
                <img src={require('../assets/logo.png').default} width='140vw' />
                <div className='homepage-form'>
                    <div className='homepage-join'>
                        <input type='text' placeholder='Game Code' onChange={(event) => setRoomCode(event.target.value)} />
                        <Link to={`/play?roomCode=${roomCode}`}><button className="game-button green">JOIN GAME</button></Link>
                    </div>
                    <h1>OR</h1>
                    <div className='homepage-create'>
                        <Link to={`/play?roomCode=${randomCodeGenerator(5)}`}><button className="game-button orange">CREATE GAME</button></Link>
                    </div>

                </div>
                <Link to={`/Login`}><button className="game-button red " onClick={handleLogout} style={{ marginTop: "8%" }}>{user && "LOGOUT"}</button></Link>
                <Link to={`/profile`}><button className="game-button green "  style={{ marginTop: "8%" }}>Profile</button></Link>

            </div>
        </div>
    )
}

export default Homepage
