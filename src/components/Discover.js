import React, { useState, useEffect } from 'react';
import Slider from './Slider';
import axios from 'axios';
const alias = 'MAA_Movie-';
const img_url = 'https://image.tmdb.org/t/p/w1280';
const api_url = 'https://api.themoviedb.org/3/';
const api_key =  '04c35731a5ee918f014970082a0088b1';

const Discover = () => {
  const [ popularityItems, setPopularityItems ] = useState([]);
  const [ revenueItems, setRevenueItems ] = useState([]);
  const [ currentItem, setCurrentItem ] = useState(null);

  useEffect(() => {
    axios.get(`${api_url}discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=1`)
    .then(res => {
      const movies = res.data.results;
      setPopularityItems(movies);
    })

    axios.get(`${api_url}discover/movie?sort_by=revenue.desc&api_key=${api_key}&page=1`)
    .then(res => {
      const movies = res.data.results;
      setRevenueItems(movies);
      //setCurrentItem(res.data.results[0]);
    })
  }, [])
 
  const buildItemInfo = (item) => {
    axios.get(`${api_url}movie/${item.id}?api_key=${api_key}`)
    .then(res => {
      //const movies = res.data.results;
      setCurrentItem(res.data)
    })
  }

  const buildCurrentItem = () => {
    return <div className={`${alias}current-item ${alias}fade-in`}>
      <div style={{
      backgroundImage: `url(${img_url + currentItem.backdrop_path})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      opacity: '0.2'
    }}>
      </div>
        <div className={`${alias}current-item-header`} >
          <span onClick={() => setCurrentItem(null)}><i className="fas fa-arrow-left"></i></span>
        </div>
        <div className={`${alias}current-item-content`}>
            <h1>{currentItem.title}</h1>
            <p>{currentItem.overview}</p>
            <div className={`${alias}current-item-release ${alias}current-item-data`}>
              <span>Release Date: </span>
              <span>{currentItem.release_date}</span>
            </div>
            <div className={`${alias}current-item-budget ${alias}current-item-data`}>
              <span>Budget: </span>
              <span>{currentItem.budget}$</span>
            </div>
            <div className={`${alias}current-item-vote ${alias}current-item-data`}>
              <span>Vote Average: </span>
              <span>{currentItem.vote_average}</span>
            </div>
            <div className={`${alias}current-item-genres`}>
              { currentItem.genres[0] ? <span> { currentItem.genres[0].name }</span> : "" }
              { currentItem.genres[1] ? <span> { currentItem.genres[1].name }</span> : "" }
            </div>
            <div className={`${alias}current-item-homepage`}>
              <a href={currentItem.homepage}>Check Homepage</a>
            </div>
            <div className={`${alias}current-item-add-mylist`}>
              <button onClick={() => {
                let itemToStore = {
                  img_path: currentItem.poster_path,
                  title: currentItem.title
                }
                let currentMovies = JSON.parse(localStorage.getItem("maa_movies") || "[]");
                
                if(!(currentMovies.filter(item => item.title === itemToStore.title).length > 0)){
                  currentMovies.push(itemToStore);
                  console.log(`Added movie: ${itemToStore.title}`);
                  localStorage.setItem("maa_movies", JSON.stringify(currentMovies));
                }
                
              }}>Add to MyList</button>
            </div>
          </div>
    </div>
  }

  return (
    <div className={`${alias}content`}>
      {/* <div className={`${alias}header`}>
        Header
      </div> */}
      { currentItem ? buildCurrentItem() : "" }
      { !currentItem && <Slider title="Most Popular Movies" items={popularityItems} callback={(item) => buildItemInfo(item)}/> }
      { !currentItem && <Slider title="Movies Based On Revenue" items={revenueItems} callback={(item) => buildItemInfo(item)}/> }
    </div>
  )
}

export default Discover;
