import React, { useState, useRef } from 'react';
import './HomePage.css';
import homeVideo from '../videos/homeVideoEdited.mp4';

import NewsPage from '../news/NewsPage';

function HomePage() {
  const [scrollToTop, setScrollToTop] = useState(false);
  const videoRef = useRef(null);
  const newsRef = useRef(null);

  const scrollToNews = () => {
    if (newsRef.current) {
      newsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      <header className="hero-box">
        <section className="hero-image-box">
          <video ref={videoRef} className="hero-video" src={homeVideo} muted loop playsInline></video>
        </section>
        <section className="hero-text-box">
          <h1 className="hero-heading">GreenJourney</h1>
          <p className="hero-text">
            Our website is dedicated to providing you with practical advice on energy conservation and emission reduction, the latest
            developments in environmental technology and information related to green lifestyles.
          </p>
          <p className="hero-text">
            Join us and let us care about the health of the earth and leave a better and greener home for future generations. Because
            every small change will become a powerful force, and together push us towards a sustainable future.
          </p>
          <div className="arrows" onClick={scrollToNews}>
            <i className={`fas ${scrollToTop ? 'fa-chevron-up' : 'fa-chevron-down'} icon`}></i>
          </div>
        </section>
      </header>
      <div className="news-page-container" ref={newsRef}>
        <NewsPage />     
      </div>
      
    </div>
  );
}

export default HomePage;
