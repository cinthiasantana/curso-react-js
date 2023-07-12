import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import './favoritos.css';
import {toast} from 'react-toastify';

function Favoritos() {
    const [filmes, setFilmes] = useState([]);

    useEffect(() => {

        const minhaLista = localStorage.getItem("@primefilmes");
        setFilmes(JSON.parse(minhaLista) || [])

    }, [])

    function excluirFilme(id) {
        let filtroFilmes = filmes.filter((item) => {
            return (item.id !== id)
        })

        setFilmes(filtroFilmes);
        localStorage.setItem("@primefilmes", JSON.stringify(filtroFilmes));
        toast.success("Filme excluido com sucesso!")
    }

    return (
        <div className="meusFilmes">
            <h1>Meus Filmes</h1>
            {filmes.length === 0 && <span>Voce não possui filmes salvos.</span>}
            <ul>
                {filmes.map((item) => {
                    return (
                        <li key={item.id}>
                            <span>{item.title}</span>
                            <div>
                                <Link to={`/filme/${item.id}`}><button className="detalhes">Detalhes</button></Link>
                                <button className="excluir" onClick={() => excluirFilme(item.id)}>Excluir</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default Favoritos;