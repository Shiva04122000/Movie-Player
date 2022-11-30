import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Header from './Component/Header/Header';
import Home from "./Pages/Home"
import Movie from './Pages/MovieDetail/Movie';
import MovieList from './Component/MovieList/MovieList';

function App() {
  return (
    <div className="App">
        <Router>
          {/* <Header /> */}
            <Routes>
                <Route index element={<Home/>}></Route>
                <Route path="movie/:id" element={<Movie/>}></Route>
                <Route path="movies/:type" element={<MovieList/>}></Route>
                <Route path="/*" element={<h1>Error Page</h1>}></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
