import './App.css';
import React, { useEffect, useState } from 'react';

function App() {
const [data,setData] = useState([]);
const [search,setSearch] = useState('');
const [filter,setFilter] = useState('');
const [id,setId] = useState('');

useEffect(()=>{
  fetch('https://www.googleapis.com/books/v1/volumes?q=%7BbookTitle')
  .then(res=>res.json()).then((resp)=>setData(resp.items))
},[])
  return (
    <div className='main'>
      {console.log(data)}
      <div className='searchDiv'>
        <h1>Book Search</h1>
        <input type='text' onChange={(e)=>setSearch(e.target.value)} className="inputBox" placeholder='search for a book'/>
        <button onClick={()=>setFilter(search)}>&#128269;</button>
      </div>
      <div className="bookImages">
        {filter && data.filter(value=>{
          if(value.volumeInfo.title.toLowerCase().includes(filter.toLowerCase())){
            return value;
          }
        }).map((item)=>(
          <div key={item.id} className="items">
            <img src={item.volumeInfo.imageLinks.thumbnail} alt='' className="image" onMouseEnter={()=>setId(item.id)} onMouseLeave={()=>setId('')} onClick={()=>window.open(`${item.volumeInfo.infoLink}`)}/>
            {id === item.id && 
                <div className='bookInfo'>
                  <p>{item.volumeInfo.title}</p>
                  <p>{item.volumeInfo.authors[0]}</p>
                  <p>Page Count : {item.volumeInfo.pageCount}</p>
                  <p>Rating : {item.volumeInfo.ratingsCount}</p>
                </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
}
export default App;
