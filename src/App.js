import React from 'react';
import './App.css';

function App() {
  return (
    <div class="container App" >
  <div class="row">
    <div class="col-sm">
      <h1 class="display-1">CGuess</h1>
      <div class="row">
        <div class="col mr-4 rounded bg_yellow">
        <form>
          <div class="form-group mt-4">
            <input type="text" class="form-control" id="username" aria-describedby="usernameHelp" placeholder="Username"/>
          </div>
          <button type="submit" class="btn shadow-sm btn-lg text-dark mb-4 bg_green">Play</button>
          </form>
        </div>
        <div class="col ml-4 rounded bg_yellow" >
          How to play?
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default App;
