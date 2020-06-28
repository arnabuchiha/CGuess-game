import React from 'react';
import './App.css';

function App() {
  return (
    <div className="container App" >
  <div className="row">
    <div className="col-sm">
      <h1 className="display-1">CGuess</h1>
      <div className="row h-100">
        <div className="col mr-4 rounded bg_yellow">
        <form>
          <div className="form-group mt-4 d-flex justify-content-center">
            <input type="text" className="form-control w-50" id="username" aria-describedby="usernameHelp" placeholder="Username"/>
          </div>
          <button type="submit" className="btn shadow-sm btn-lg text-dark mb-4 bg_green">Play</button>
          </form>
        </div>
        <div className="col ml-4 rounded bg_yellow" >
          How to play?
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default App;
