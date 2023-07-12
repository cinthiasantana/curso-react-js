import axios from 'axios';

// Base: https://api.themoviedb.org/3/
// Url da api: /movie/now_playing?api_key=6172ba6f682c0d70e49805e68878245e&language=pt-BR

const api = axios.create({
    baseURL:'https://api.themoviedb.org/3/'
});

export default api