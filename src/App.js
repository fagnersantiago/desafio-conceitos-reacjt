import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {



  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    
    async function getRepositoryApi(){

    const response = await api.get('repositories')

    setRepositories(response.data);

    };

    getRepositoryApi()

  },[]);

  async function handleAddRepository() {
    

    const response = await api.post('repositories', {

      title: 'Desafio ReactJS',
      url: `https://github.com/fagnersantiago/desafio-conceitos-reactjs ${Date.now()}`,
      techs: ["ReactJs",  "Node.js"]


    });

    setRepositories([ ...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {

   await api.delete(`repositories/${id}`)

      setRepositories(repositories.filter(repository => repository.id !== id))
    
  };

  return (
    <div>
      <ul data-testid="repository-list">


        {repositories.map(repository => (
          <li   key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;