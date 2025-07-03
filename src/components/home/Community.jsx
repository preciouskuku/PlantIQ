import React from 'react';
import './community.css';
import comvid from '../../assets/vids/coms.mp4'

const Community  = () => {
  return (
    <section className="boost-section">
      
      <h1 className="boost-heading">Be Part of the Vibrant Community</h1>
      <div className="boost-content">   <div className="boost-video">
          <video controls autoPlay loop>
          <source src={comvid} type="video/mp4" />
            
          </video>
        </div>
        <div className="boost-text">
          <h3>AI-powered diagnosis</h3>
          <p>
            Our app helps you detect diseases early, get advice from experts, and improve your yields with smart solutions tailored for your crops.
          </p>
          <button className='button'>join NOW</button>
        </div>
       
      </div>
    </section>
  );
};

export default Community;
