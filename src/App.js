import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// https://gateway.marvel.com:443/v1/public/characters?apikey=c06680b7c7eb22f2cdbf95b01be88583
// private key: 8ef24f9cfc843d287fb89485a0285218463fa2a0
// public key: c06680b7c7eb22f2cdbf95b01be88583
// ts: 1

// 18ef24f9cfc843d287fb89485a0285218463fa2a0

// hash: c8a260c3f7b005802bf1d479cdc853c3

function App() {
  const [characters, setCharacters] = useState([]);
  const [newHeroName, setNewHeroName] = useState('');
  const [newHeroDescription, setNewHeroDescription] = useState('');
  const [updatedDescriptions, setUpdatedDescriptions] = useState({});

  useEffect(() => {
    axios.get('https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=c06680b7c7eb22f2cdbf95b01be88583&hash=3941852e095dccd4db468752751129e3')
      .then(res => {
        const limitedCharacters = res.data.data.results.slice(0, 10).map((char, index) => ({
          ...char,
          id: index + 1,
          description: '' // Inicialmente, la descripción está vacía
        }));
        setCharacters(limitedCharacters);
      })
      .catch(error => console.error(error));
  }, []);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newCharacter = {
      id: characters.length + 1,
      name: newHeroName,
      description: newHeroDescription // Guardar la descripción en el estado del cliente
    };

    setCharacters([...characters, newCharacter]);
    setNewHeroName('');
    setNewHeroDescription('');
  };

  const handleUpdateHero = (id) => {
    const updatedDescription = updatedDescriptions[id] || '';

    // Actualizar la descripción en el estado del cliente
    const updatedCharacters = characters.map(char => {
      if (char.id === id) {
        return { ...char, description: updatedDescription };
      }
      return char;
    });
    setCharacters(updatedCharacters);
  };

  const handleDescriptionChange = (id, value) => {
    setUpdatedDescriptions({ ...updatedDescriptions, [id]: value });
  };

  return (
    <div className="App">
      <h1 className='titulo'>Marvel Heroes</h1>
        <div className="row row-cols-1 row-cols-md-2 g-4">
          {characters.map(char => (
            <div className="col mt-5" key={char.id}>
              <div className="card">
                <img src={char.thumbnail ? `${char.thumbnail.path}.${char.thumbnail.extension}` : ''} className="card-img-top" alt={char.name} />
                <div className="card-body">
                  <h5 className="card-title">{char.name}</h5>
                  <p className="card-text">{char.description || 'No description available'}</p>
                  <div className="input-group mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Nueva descripción" 
                      aria-label="Nueva descripción" 
                      value={updatedDescriptions[char.id] || ''} 
                      onChange={(e) => handleDescriptionChange(char.id, e.target.value)}
                    />
                    <button 
                      className="btn btn-outline-secondary" 
                      type="button" 
                      onClick={() => handleUpdateHero(char.id)}
                    >
                      Actualizar descripción
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      {/* Formulario para crear un nuevo héroe */}
      <form onSubmit={handleFormSubmit} className="mt-4">
        <h2 className='title'>Agregar nuevo héroe</h2>
        <div className="mb-3 newHeroe">
          <label htmlFor="newHeroName" className="form-label">Nombre:</label>
          <input type="text" className="form-control" id="newHeroName" value={newHeroName} onChange={(e) => setNewHeroName(e.target.value)} required />
        </div>
        <div className="mb-3 newHeroe">
          <label htmlFor="newHeroDescription" className="form-label">Descripción:</label>
          <textarea className="form-control" id="newHeroDescription" value={newHeroDescription} onChange={(e) => setNewHeroDescription(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary">Agregar héroe</button>
      </form>
    </div>
  );
}

export default App;
