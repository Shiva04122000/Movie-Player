import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../Header/Header'
import "./Card.css"

const Card = ({movie},index) => {
    return (
    <>
        
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: "none", color: "white"}}>
                <div className="single-card" index={index}>
                    <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} />
                    <p className='card-info'>{movie.original_title}</p>
                    <p className='card-info'>Rating {movie.vote_average}</p>
                </div>
            </Link>
    </>
        
       
    )
}

export default Card