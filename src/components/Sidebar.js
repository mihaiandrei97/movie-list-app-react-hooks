import React from 'react';

const alias = 'MAA_Movie-';
// list genres: http://api.themoviedb.org/3/genre/movie/list?api_key=04c35731a5ee918f014970082a0088b1


const side = ['Discover', 'TV & Movies', 'Movie List'];

const Sidebar = ({currentTab, setCurrentTab}) => {
  return (
    <div className={`${alias}sidebar`}>
      <h1>Metflix</h1>
      <ul>
        {
          side.map((item, index) => <li key={index} onClick={() => setCurrentTab(index)} className={currentTab === index ? 'curentTab':''}>{item}</li>)
        }
      </ul>
    </div>
  )
}

export default Sidebar;
