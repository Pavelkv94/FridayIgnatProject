import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Preloader from './Common/Preloader/Preloader';
import Header from "./Components/Header/Header";
import { AppStateType } from './Redux/store';
import Routes from "./Routes";

function App() {
  const status = useSelector<AppStateType, string>((state) => state.app.status)
  const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
  return (

    <div className="App">
       {status !== 'idle' ? <Preloader /> : null}
      {isAuth && <Header />}
      <Routes />
    </div>
  );
}

export default App;
