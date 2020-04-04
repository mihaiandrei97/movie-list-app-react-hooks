import React, { useState, useEffect } from 'react';
import Pagination from '@material-ui/lab/Pagination';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

const alias = 'MAA_Movie-';
const img_url = 'https://image.tmdb.org/t/p/w1280';
const api_url = 'https://api.themoviedb.org/3/';
const api_key =  '04c35731a5ee918f014970082a0088b1';

const List = () => {
  const [ items, setItems ] = useState([]);
  const [ page, setPage ] = useState(1);
  const [ totalPages, setTotalPages ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ currentItem, setCurrentItem ] = useState(null);
  const [ search, setSearch ] = useState('');
  const [ inputValue, setInputValue ] = useState('');

  useEffect(() => {
    setIsLoading(true);
    if( search == '') {
      axios.get(`${api_url}discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=${page}`)
      .then(res => {
        const movies = res.data.results;
        //console.log(res.data);
        setTotalPages(res.data.total_pages);
        setIsLoading(false);
        setPage(res.data.page);
        setItems(movies);
        //setCurrentItem(res.data.results[0]);
      })
    } else {
      //https://api.themoviedb.org/3/search/movie?api_key=04c35731a5ee918f014970082a0088b1&query=Jack+Reacher
      axios.get(`${api_url}search/movie?&api_key=${api_key}&query=${search}&page=${page}`)
      .then(res => {
        const movies = res.data.results;
        console.log(res.data);
        setTotalPages(res.data.total_pages);
        setIsLoading(false);
        //setPage(res.data.page);
        setItems(movies);
        //setCurrentItem(res.data.results[0]);
      })
    }
    
  }, [page, search])

  const buildItemInfo = (item) => {
    axios.get(`${api_url}movie/${item.id}?api_key=${api_key}`)
    .then(res => {
      const movies = res.data.results;
      setCurrentItem(res.data)
    })
  }

  const buildItems = () => {
    return items.filter(item => item.poster_path).map((item, index) => { 
      return <div key={index} className={`${alias}item-list`} onClick={() => buildItemInfo(item)}>
        <img src={img_url + item.poster_path} alt={item.title}/>
        <div><p style={{fontSize: '14px'}}>{ item.title }</p></div>
      </div>
    });
  }
  const paginationChange = (e, value) => {
    if( page != value) {
      setItems([]);
      setPage(value);
    }
  }

  const buildCurrentItem = () => {
    console.log(currentItem);
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
      {!currentItem ? <div className={`${alias}header`}>
        <form onSubmit={(e) => {
          e.preventDefault();
          setPage(1);
          setSearch(inputValue);
        }}>
          <input value={inputValue} onChange={(e) => setInputValue(e.target.value)}/>
          <button type="submit">Search</button>
        </form>
      </div> : "" }
      { currentItem ? buildCurrentItem() : "" }
      {isLoading && <CircularProgress />}
      {!isLoading && !currentItem && <div className={`${alias}items-list ${alias}fade-in`}>
        { items.length > 0 && buildItems() }
      </div> }
      { !currentItem && <Pagination count={totalPages} variant="outlined" color="primary" shape="rounded" onChange={paginationChange}/> }
    </div>
  )
}

export default List
