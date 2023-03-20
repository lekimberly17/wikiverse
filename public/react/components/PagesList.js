import React, { useState } from 'react';
import { Page } from './Page';
import { AddPage } from './AddPage';

export const PagesList = ({ pages, setPages }) => {
  const [selectedPage, setSelectedPage] = useState(null);
  const [showPage, setShowPage] = useState(false);

  const handlePageClick = (page) => {
    setSelectedPage(page);
  };

  const handleBackClick = () => {
    setSelectedPage(null);
  };

  const handleCreatePageClick = () => {
    setShowPage(true);
  };

  if (selectedPage) {
    return (
      <Page page={selectedPage} onBack={handleBackClick} pages={pages} setPages={setPages} />
    );
  }

  return (
    <div>
      <h2>An interesting 📚</h2>
      {pages.map((page) => (
		<div key={page.title} onClick={() => handlePageClick(page)}>
          		<h4>{page.title}</h4>
				
		</div>
      ))}
      {showPage ? (
        <AddPage onArticleAdded={() => {setShowPage(false); setPages(pages)}} onClose={() => setShowPage(false)} />
      ) : (
        <button onClick={handleCreatePageClick}>Create a Page</button>
      )}
    </div>
  );
};
