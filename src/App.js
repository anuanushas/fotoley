import './App.css';
import React from 'react';
import CatalogViewer from './CatalogViewer';
import images from "./data";

function App() {

  return (
    <div >
      <CatalogViewer images={images} />
    </div>
  );
}

export default App;
