import React, { useState, useEffect } from 'react';
import { PagesList } from './PagesList';
import { AddPage } from './AddPage';

// import and prepend the api url to any fetch calls
import apiURL from '../api';

export const App = () => {

  const [pages, setPages] = useState([]);
  const [showPage, setShowPage] = useState(false);

  async function fetchPages(){
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err)
    }
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>  
      <h1>WikiVerse</h1>
      
      {showPage ? (
        <AddPage onArticleAdded={fetchPages} onClose={() => setShowPage(false)} />
      ) : (
        <PagesList pages={pages} setPages={setPages} setShowPage={setShowPage} />
      )}
    </main>
  )
}
