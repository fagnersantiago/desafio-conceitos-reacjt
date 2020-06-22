import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {

    api.get('repository').then(response => {

      setRepositories(response.data)

    });

  }, []);

  async function handleAddRepository() {

    const response = await api.post('repository', {

      title: `New Repository ${Date.now()}`,
      url: `http://localhost/repository/${Date.now()}`,
      techs: ["ReactJs"]


    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {

    await api.delete(`repository/${id}`).then(response => {

      if (response.status === 204) {

        setRepositories(repositories.filter(repository => repository !== id))

      }


    })
      .catch(err => {

        console.log(err)
      });
  };

  return (
    <div>
      <ul data-testid="repository-list">


        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
