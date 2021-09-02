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
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nec auctor massa. Curabitur maximus orci a purus feugiat, at euismod purus dictum. Nunc luctus quam ut lacus pulvinar, sit amet blandit risus tempus. Nulla pretium, risus id mattis varius, ex est faucibus leo, sit amet fermentum eros leo in sapien. Duis lobortis sapien id mauris sollicitudin imperdiet. Fusce volutpat dui non ipsum consequat vulputate. Nam posuere leo id congue pulvinar. Suspendisse at neque ut arcu tincidunt pretium. Sed et sagittis massa, nec mattis magna. Fusce eget libero bibendum, commodo velit ac, interdum nisl. Cras vitae euismod nulla. Donec id ipsum purus. Sed id massa cursus, iaculis turpis vitae, imperdiet mi. Morbi id nibh vitae lorem sollicitudin malesuada ac ut sapien. Sed elementum ligula ut arcu pellentesque, vitae pharetra dui volutpat. Fusce rutrum sagittis pharetra. Vivamus sodales dictum mauris, vel tempor ante. Nunc libero quam, imperdiet et condimentum in, sagittis a purus. Morbi ut sodales velit, vitae aliquet tellus. Donec imperdiet commodo mollis. Etiam auctor tincidunt fringilla. Proin quis facilisis magna. Phasellus condimentum varius mauris, vel elementum odio rhoncus a. Aenean quis scelerisque ex. Nunc venenatis at nunc in tempor. Etiam porttitor elit sed nibh gravida fringilla. Suspendisse ex neque, fermentum ornare viverra sed, aliquam dictum metus. Nullam eget lobortis ligula. Integer volutpat, arcu eu placerat interdum, diam diam luctus metus, nec gravida urna nunc eu leo. Nullam diam dui, dapibus eget nunc in, aliquet suscipit quam. Nam nec arcu semper purus finibus porttitor. Sed semper metus lorem, nec fringilla lectus hendrerit placerat."
        />
      </main>
    </React.Fragment>
  );
}

export default App;
