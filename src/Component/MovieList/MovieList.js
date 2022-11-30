import React, { useEffect, useState } from "react"
import "./MovieList.css"

import { useParams } from "react-router-dom"
import Card from "../Card/Card"
import Header from "../Header/Header"
import Pagination from "../Pagination/Pagination"

const MovieList = () => {

    const [movieList, setMovieList] = useState([])
    const [pageNumber, setPageNumber] = useState(1);
    const { type } = useParams()
    const [search, setSearch] = useState("");
    const [pageMovies, setPageMovies] = useState([]);

    var filteredMovie = movieList.filter((item) => {
        if (
            item.original_title.toLowerCase().includes(search.toLowerCase())
        ) {
            return item;
        }
    });


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => {
                setMovieList(data.results)
                setPageMovies(data.results.slice(0, 10));
            })
    }

    const handleChange = (event, value) => {
        setPageNumber(value);
        setPageMovies(movieList.slice((value - 1) * 10, (value - 1) * 10 + 10));
      };

    return (
        <>
            <Header search={search} setSearch={setSearch} />
            <div className="movie__list">

            {search ? <div className="list__cards">
                    {
                        filteredMovie.map((movie, index) => (
                            <Card movie={movie} index={index} />
                        ))
                    }
                </div> :<div className="list__cards">
                    {
                        pageMovies.map((movie, index) => (
                            <Card movie={movie} index={index} />
                        ))
                    }
                </div> }               
            </div>
            {!search && (
            <Pagination
              pageNumber={pageNumber}
              handleChange={handleChange}
            />
          )}
        </>

    )
}

export default MovieList