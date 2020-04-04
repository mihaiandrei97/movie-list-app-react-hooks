import React, { useState } from 'react';

const alias = 'MAA_Movie-';
const img_url = 'https://image.tmdb.org/t/p/w1280';

const Slider = ({ title, items, callback }) => {
  const [ currentItemId, setCurrentItemId ] = useState(0);

  const buildItems = () => {
    return items.filter(item => item.poster_path).map((item, index) => { 
      return <div key={index} className={`${alias}item`} style={{
        left: `${index * 200}px`,
        position: 'absolute',
        transform: `translateX(-${currentItemId * 200}px)`
      }} onClick={() => callback(item)}>
        <img src={img_url + item.poster_path} alt={item.title}/>
        <div><p style={{fontSize: '14px'}}>{ item.title }</p></div>
      </div>
    });
  }

  return (
    <div className={`${alias}fade-in`}>
      <h2>{title}</h2>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: '0px 50px'
      }}>
        <div className={`${alias}arrow ${alias}arrow-left`} onClick={() => {
          if( currentItemId > 0 ) setCurrentItemId(currentItemId - 1);
        }}><i className="fas fa-arrow-left"></i></div>
        <div className={`${alias}items`}>
          { items.length > 0 && buildItems() }
        </div>
        <div className={`${alias}arrow ${alias}arrow-right`} onClick={() => {
          if( currentItemId < items.length - 1 ) setCurrentItemId(currentItemId + 1);
          else setCurrentItemId(0);
        }}><i className="fas fa-arrow-right"></i></div>
      </div>
    </div>
  )
}

export default Slider
