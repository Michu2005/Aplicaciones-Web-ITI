import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

// https://gateway.marvel.com:443/v1/public/characters?apikey=c06680b7c7eb22f2cdbf95b01be88583
// private key: 8ef24f9cfc843d287fb89485a0285218463fa2a0
// public key: c06680b7c7eb22f2cdbf95b01be88583
// ts: 1

// 18ef24f9cfc843d287fb89485a0285218463fa2a0

// hash: c8a260c3f7b005802bf1d479cdc853c3

function App() {

  const [characters, setCharacters] = useState([])

  useEffect(()=> {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c06680b7c7eb22f2cdbf95b01be88583&hash=c8a260c3f7b005802bf1d479cdc853c3').then(res=>{
      setCharacters(res.data)
      console.log(res.data);
    }).catch(error=>console.error(error))
  },[])

  return (
    <div className="App">
      <h1>Marvel Heroes</h1>
    </div>
  );
}

export default App;
