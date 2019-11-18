import React from 'react';
import './component/Navbar/Navbar'
import './App.scss';
import Navbar from './component/Navbar/Navbar';

import TourList from './component/TourList'

function App() {
  return (
    <main>
      <Navbar/>
      <TourList/>
      </main>
  );
}

export default App;
