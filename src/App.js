import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Sidebar from './components/Sidebar';
import Discover from './components/Discover';
import List from './components/List';
import MyList from './components/MyList';
// design: https://dribbble.com/shots/4226077-Telly-Movie-Detail?fbclid=IwAR3PFmuoLJ_0gpE5_yuDUovZDedhTkio1xFsFSdOO6ANbnHSD6gCvYpgLaI
const alias = 'MAA_Movie-';
const api_url = 'https://api.themoviedb.org/3/';
const api_key =  '04c35731a5ee918f014970082a0088b1';

const App = () => {

  const [ currentTab, setCurrentTab ] = useState(0);
  const [ items, setItems ] = useState([]);
  const [ currentItem, setCurrentItem ] = useState({});

  return (
    <div className={`${alias}wrapper`}>
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab == 0 && <Discover items={ items } />}
      {currentTab == 1 && <List items={ items } />}
      {currentTab == 2 && <MyList items={ items } />}
      
    </div>
  );
}

export default App;
