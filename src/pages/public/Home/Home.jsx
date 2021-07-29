import React from 'react';
import {Link} from 'react-router-dom'
import './Home.css';

function Home() {
  return (
    <div className="App">
      <header className="App-header">

        <h1>My Facebook</h1>
        <Link to="/posts">Posts</Link>
      </header>
    </div>
  );
}

export default Home;
