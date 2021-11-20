import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from './components/Homepage'
import Game from './components/Game';
import Home from './Home';
import Register from './register/Register';
import Login from './login/login';
import { useContext } from 'react';
import { Context } from './context/Context';
import Profile from './pages/Profile';
import Rowpoint from './pages/pointtable/rowpoint';
import Info from './pages/info';

import DeviceOrientation, { Orientation } from 'react-screen-orientation'



const App = () => {
  const { user } = useContext(Context);
  const errod = () => {
    alert("Change your screen Orientation to get Acess and REFRESH THE PAGE!!!!")

  }
  return (
    <div className="App">
      {window.innerHeight < window.innerWidth ? (
        <DeviceOrientation lockOrientation={'landscape'}>
          {/* Will only be in DOM in landscape */}
          <Orientation orientation='landscape' alwaysRender={false}>
            <BrowserRouter>
              <Routes>
                <Route path='/register' element={user ? <Homepage /> : <Register />} />
                <Route exact path='/' element={<Homepage />} />
                <Route path='/play' element={<Game />} />
                <Route path='/login' element={user ? <Homepage /> : <Login />} />
                <Route path='/profile' element={user ? <Profile /> : <Login />} />
                <Route path='/points' element={user ? <Rowpoint /> : <Login />} />

              </Routes>


            </BrowserRouter>
          </Orientation>
        </DeviceOrientation>

      ) : ((errod())) }
    </div>
  )
}

export default App
