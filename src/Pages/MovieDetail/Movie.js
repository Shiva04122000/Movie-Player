import React, { useEffect, useState } from "react"
import "./Movie.css"
import { useParams } from "react-router-dom"
import Header from "../../Component/Header/Header"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState([])
    const [cast, setCast] = useState([])
    const { id } = useParams()

    useEffect(() => {
        getData()
        getCast()
    }, [])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
            .then(res => res.json())
            .then(data => {
                setMovie(data)
            })
    }

    const getCast = () => {
        console.log("cast deatils")
        fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=c45a857c193f6302f2b5061c3b85e743&language=en-US`)
            .then((res) => res.json())
            .then((data) => {
                setCast(data.cast)
                console.log(data.cast)
            })
    }

    const date = new Date(currentMovieDetail.release_date)
    const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
    let day = weekday[date.getDay()];
    const month_name = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let month = month_name[date.getMonth()];
    let date_num = date.getDate();
    let year = date.getFullYear();

    return (
        <>
            <Header />
            <div className="main">
                <div className="movie">
                    <div className="movie__intro">
                        <img className="movie__backdrop" alt="img" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
                    </div>
                    <div className="movie__detail">
                        <div className="movie_detail_inner">
                            <div className="movie__detailLeft">
                                <div className="movie__posterBox">
                                    <img className="movie__poster" alt="img" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                                </div>
                            </div>
                            <div className="movie__detailRight">
                                <div className="movie__detailRightTop">
                                    <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                                    <div className="rating">Rating :    {currentMovieDetail ? currentMovieDetail.vote_average : ""}</div>
                                    <div className="time_action" >
                                        <p className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</p>
                                        <div className="movie__genres">
                                            {
                                                currentMovieDetail && currentMovieDetail.genres
                                                    ?
                                                    currentMovieDetail.genres.map(genre => (
                                                        <><span className="movie__genre" id={genre.id}>{genre.name},</span></>
                                                    ))
                                                    :
                                                    ""
                                            }
                                        </div>
                                    </div>
                                    <div className="movie__releaseDate">{currentMovieDetail ? "Release Date: " + " " + day + " " + month + " " + date_num + " " + year : ""}</div>

                                </div>
                            </div>
                        </div>
                        <div className="movie__detailRightBottom">
                            <h1 className="synopsisText" >Overview</h1>
                            <p>{currentMovieDetail ? currentMovieDetail.overview : ""}</p>
                        </div>
                    </div>
                </div>

                <h1 className="synopsisText cast">Cast</h1>
                <div className="cast-container">

                    {cast.map((cast, index) => {
                        return (
                            <>

                                <div className="single-card mob-card" index={index}>
                                    <img alt="Cast Image" src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`} />
                                    <p className='card-info'>{cast.name}</p>
                                    <p className='card-info'>Character :{cast.character}</p>
                                </div>


                            </>
                        )

                    })}
                </div>

            </div>
        </>


    )
}

export default Movie