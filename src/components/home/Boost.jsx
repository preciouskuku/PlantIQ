import React from 'react';
import './Boost.css';
import boostvid from '../../assets/vids/boost.mp4'

const Boost = () => {
  return (
    <section className="boost-section">
      <h1 className="boost-heading">Boost your crop production today</h1>
      <div className="boost-content">
        <div className="boost-text">
          <h3>AI-powered diagnosis</h3>
          <p>
            Our app helps you detect diseases early, get advice from experts, and improve your yields with smart solutions tailored for your crops.
          </p>
        </div>
        <div className="boost-video">
          <video controls autoPlay loop>
          <source src={boostvid} type="video/mp4" />
            
          </video>
        </div>
      </div>
    </section>
  );
};

export default Boost;
