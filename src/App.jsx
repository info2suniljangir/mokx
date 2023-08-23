// import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Splash from './component/Splash';
import { Outlet } from 'react-router-dom';


function App() {

  return (
   <div className='App'>
      <Splash />
    <div id='detail'>
      <Outlet />
    </div>
   </div>
  )
}

export default App
