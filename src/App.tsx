import React from 'react';
import { useSelector } from 'react-redux';
import './App.css';
import Header from "./Components/Header/Header";
import { AppStateType } from './Redux/store';
import Routes from "./Routes";

function App() {
  const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
  return (

    <div className="App">
      {isAuth && <Header />}
      <Routes />
    </div>
  );
}

export default App;
