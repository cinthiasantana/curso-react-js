import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';
import './filmeDetalhes.css'
import { toast } from 'react-toastify';

function Filme() {
  const { id } = useParams();
  const navigation = useNavigate();
  const [filme, setFilme] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadFilme() {
      await api.get(`/movie/${id}`, {
        params: {
          api_key: "6172ba6f682c0d70e49805e68878245e",
          language: "pt-BR",
        }
      })
        .then((response) => {
          setFilme(response.data);
          setLoading(false);
        })
        .catch(() => {
          navigation("/", { replace: true });
          return
        })
    }

    loadFilme();

    return () => {
      console.log('componente desmontado')
    }
  }, [navigation, id])

  function salvarFilme() {
    const minhaLista = localStorage.getItem("@primefilmes");

    let filmesSalvos = JSON.parse(minhaLista) || [];

    const hasFilme = filmesSalvos.some((filmesSalvo) => filmesSalvo.id === filme.id);

    if (hasFilme) {
      toast.warn("Esse filme já está na sua lista!")
      return;
    }

    filmesSalvos.push(filme);
    localStorage.setItem("@primefilmes", JSON.stringify(filmesSalvos));
    toast.success("Filme salvo com succeso!")

  }

  if (loading) {
    return (
      <div className="filme-detalhes">
        <h1>Carregando Detalhes do Filme...</h1>
      </div>
    )
  }

  return (
    <div className="filme-detalhes">
      <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt="filme.title" />

      <div className='descricao'>
        <h1>{filme.title}</h1>
        <span>Avaliação {filme.vote_average}</span>
        <p>{filme.overview}</p>

        <div className='areaBtn'>
          <button onClick={salvarFilme}>Adicionar aos Favoritos</button>
          <button><a target='blank' rel='external' href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Ver Trailer</a></button>
        </div>
      </div>
    </div>
  );
}

export default Filme;