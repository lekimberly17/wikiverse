import React, { useState, useEffect } from 'react';
import apiURL from '../api';

export const Page = ({ page, onBack, pages, setPages }) => {
  const { title, content, createdAt, authorId, tags } = page;
  const [user, setUser] = useState({});

  async function fetchUser() {
    try {
      const response = await fetch(`${apiURL}/users/${authorId}`);
      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.log("Error! ", err);
    }
  }

  const { name } = user;

  useEffect(() => {
    fetchUser();
  }, []);

  const deletePage = async () => {
    const response = await fetch(`${apiURL}/wiki/${title}`, {
      method: 'DELETE',
    });
    const data = await response.json();
    console.log(data);

    const updatedPages = pages.filter((p) => p.title !== title);
    setPages(updatedPages);

    onBack();
  };

  return (
    <div>
      <h2>{title}</h2>
      <p>
        <strong>Author</strong>: {name}
      </p>
      <p>
        <strong>Published</strong>: {new Date(createdAt).toLocaleDateString()}
      </p>
      <p>
        <strong>Article Content</strong>: {content}
      </p>
      <p>
        <strong>Tags</strong>: {tags && tags.join(", ")}
      </p>
      <button onClick={deletePage}>DELETE</button>
      <button onClick={onBack}>Back to Wiki List</button>
    </div>
  );
};
