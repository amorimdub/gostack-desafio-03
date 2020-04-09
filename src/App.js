import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories,setRepositories] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[])

  async function handleAddRepository() {

    const newRepository = {
      url: "https://github.com/amorimdub/gostack-desafio-03",
      title: `Desafio 03 - ${Date.now()}`,
      techs: ["React", "ReactJS"]
    }

    const {data} = await api.post('repositories', newRepository);

    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories([...repositories.filter(repository => repository.id !== id)])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({id, title}) => (
          <li key={id}>
            {title}

            <button onClick={() => handleRemoveRepository(id)}>
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
