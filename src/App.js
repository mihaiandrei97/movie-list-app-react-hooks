import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Discover from './components/Discover';
import List from './components/List';
import MyList from './components/MyList';

const alias = 'MAA_Movie-';

const App = () => {

  const [ currentTab, setCurrentTab ] = useState(0);

  return (
    <div className={`${alias}wrapper`}>
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      {currentTab === 0 && <Discover />}
      {currentTab === 1 && <List />}
      {currentTab === 2 && <MyList />}
      
    </div>
  );
}

export default App;
