import React, { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Search.css'

const Search = () => {
  let history = useNavigate()
  const [keyword, setKeyword] = useState("");

  const searchSubmit = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history(`/products/${keyword}`)
    } else{
      history(`/products`)
    }
  }

  return (
    <Fragment>
      <form className='searchBox' onSubmit={searchSubmit}>
        <input 
          type="text"
          placeholder="Search Here..."
          onChange={(e) => setKeyword(e.target.value)}
        />
      <input type="submit" value="Search"/>
      </form>
    </Fragment>
  )
}

export default Search