// pages/index.js
import { useEffect, useState } from 'react';

const MemeGallery = ({ memes }) => {
  return (
    <div>
      <h1>Meme Gallery</h1>
      <div className="gallery">
        {memes.map((meme, index) => (
          <div key={index} className="meme-card">
            <img src={meme.url} alt={`Meme ${index}`} />
            <p>{meme.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  // Fetch memes from Reddit API
  const response = await fetch('https://www.reddit.com/r/memes.json');
  const data = await response.json();
  const memes = data.data.children.map((child) => ({
    title: child.data.title,
    url: child.data.url,
  }));

  return {
    props: {
      memes,
    },
  };
}

export default MemeGallery;
