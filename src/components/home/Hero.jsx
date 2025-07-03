import React from 'react';
import './Hero.css';
import { FaGooglePlay, FaApple } from 'react-icons/fa';
import { Camera } from 'lucide-react';
import Image from '../../assets/mock.jpg'; // ✅ Corrected path

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>
          <Camera size={28} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
          Diagnose Crop Diseases <br /> with Just a Photo
        </h1>
        <p>Upload a photo of your plant and instantly detect diseases with treatment tips — free and easy.</p>
        <div className="download-buttons">
          <button className="google"><FaGooglePlay /> Google Play</button>
          <button className="apple"><FaApple /> App Store</button>
        </div>
      </div>

      <div className="hero-right">
        <img src={Image} alt="App Preview" />
      </div>
    </section>
  );
};

export default Hero;
