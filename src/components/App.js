import React from 'react';
import Display from './Display';
import ButtonPanel from './ButtonPanel';

function App() {
  return (
    <div id="whole-calc">
      <div>
        <Display />
        <ButtonPanel />
      </div>
    </div>
  );
}

export default App;
