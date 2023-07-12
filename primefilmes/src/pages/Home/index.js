import { useEffect, useState } from "react";
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css';

// /movie/now_playing?api_key=6172ba6f682c0d70e49805e68878245e&language=pt-BR

function Home() {
  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilmes() {
      const response = await api.get("movie/now_playing", {
        params: {
          api_key: "6172ba6f682c0d70e49805e68878245e",
          language: "pt-BR",
          page: 1,
        }
      })

      setFilmes(response.data.results.slice(0, 10))
      setLoading(false);
    }

    loadFilmes();
  }, [])


  if (loading) {
    return (
      <div className="loading">
        <h1>Carregando Filmes...</h1>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Filmes em Cartaz</h1>
      <div className="lista-filmes">
        {filmes.map((filme) => {
          return (
            <article key={filme.id}>
              <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt="filme.title" />
              <p>{filme.title}</p>
              <Link to={`/filme/${filme.id}`}> Ver Detalhes </Link>
            </article>
          )
        })}
      </div>
    </div>
  );
}

export default Home;