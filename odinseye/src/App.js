import React from 'react';
import './App.css';

import { graphics } from './graphics/mainGraphics';

import Header from './components/sections/Header';

function App() {
  graphics();

  return (
    <React.Fragment>
      <main>
        <Header />
      </main>
    </React.Fragment>
  );
}

export default App;
