import React from 'react';
import './App.css';

import { graphics } from './graphics/mainGraphics';

import Header from './components/sections/Header';
import StarText from './components/sections/StarText';
import WallText from './components/sections/WallText';


function App() {
  graphics();

  return (
    <React.Fragment>
      <main>
        <Header />
        <StarText />
        <WallText 
          id="wallOne" 
          header="Wall"
          text="fringilla. Suspendisse ex neque, fermentum ornare viverra sed, aliquam dictum metus. Nullam eget lobortis ligula. Integer volutpat, arcu eu placerat interdum, diam diam luctus metus, nec gravida urna nunc eu leo. Nullam diam dui, dapibus eget nunc in, aliquet suscipit quam. Nam nec arcu semper purus finibus porttitor. Sed semper metus lorem, nec fringilla lectus hendrerit placerat."
        />
      </main>
    </React.Fragment>
  );
}

export default App;
