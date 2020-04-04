import React from 'react';
const alias = 'MAA_Movie-';

const img_url = 'https://image.tmdb.org/t/p/w1280';

const MyList = () => {

  const currentMovies = JSON.parse(localStorage.getItem("maa_movies") || "[]");

  const buildMyList = () => {
    return currentMovies.filter(item => item.img_path).map((item, index) => { 
      return <div key={index} className={`${alias}item-list`}>
        <img src={img_url + item.img_path} alt={item.title} style={{transform: 'none', cursor: 'default'}}/>
        <div><p style={{fontSize: '14px'}}>{ item.title }</p></div>
      </div>
    });
  }
  
  return (
    <div className={`${alias}content ${alias}content-my-list`}>
      <h2 className={`${alias}my-list-title`}>My List</h2>
      { currentMovies.length > 0 ? <div className={`${alias}items-list ${alias}fade-in`}> { buildMyList() }</div> : <p>There are no items in your list at this moment</p>}
    </div>
  )
}

export default MyList
