import { useEffect, useState } from "react";

export const API_KEY = 'd01c2df6';

/**
* Hook personalizado para obtener películas desde la API de OMDb.
* @param {string} query - Término de búsqueda ingresado por el usuario.
* @returns {Object} - Retorna un objeto con:
* - movies: Lista de películas encontradas.
* - isLoading: Estado de carga de la solicitud.
* - error: Mensaje de error en caso de fallo.
*/

export function useFetchMovies(query) {
    const [movies, setMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (query.length < 3) {
            setMovies([]);
            setError("");
            return;
        }

        async function fetchMovies() {
            try {
                setIsLoading(true); // Inicia el estado de carga
                setError(null);

                const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)

                if (!response.ok)
                    throw new Error("Error al cargar películas");

                const data = await response.json();

                if (data.Response === "False")
                    throw new Error("No se encontraron resultados");

                // Guardar las películas obtenidas en el estado
                setMovies(data.Search);
            } catch (err) {
                setError(err.message);
                setMovies([]);
            } finally {
                setIsLoading(false); // Finaliza el estado de carga
            }

        }

        fetchMovies();
    }, [query]); // Se ejecuta cada vez que cambia la consulta (query)
    // Retornar los valores necesarios para su uso en componentes
    return { movies, isLoading, error };
}