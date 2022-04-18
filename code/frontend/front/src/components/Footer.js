import React from 'react';
import '../style/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer-container'>
      <section className='footer-subscription'>
      </section>
      <div class='footer-links'>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>About Us</h2>
            <a href={'https://cs421sp22.github.io/'}>OOSE 2022 Spring</a>
            <a href={'https://docs.google.com/document/d/1ETNIUtfBC506FS00uXnfnk-7b1eCrsGPecZe2KY8Onk/edit?usp=sharing'}>Team 01 AI For Fun</a>
          </div>
          <div class='footer-link-items'>
            <h2>Contact</h2>
            <a href={'https://www.jhu.edu/maps-directions/'}>JHU Homewood, Hodson 210</a>
            <a href={'https://www.jhu.edu/maps-directions/'}>MWF 4:30-5:20 PM</a>
          </div>
        </div>
        <div className='footer-link-wrapper'>
          <div class='footer-link-items'>
            <h2>Github</h2>
            <a href={'https://cs421sp22-homework.github.io/project-team-01-ai_for_fun/'}>Github Page</a>
            <a href={'https://github.com/cs421sp22-homework/project-team-01-ai_for_fun'}>Github Repo</a>
          </div>
          <div class='footer-link-items'>
            <h2>Other</h2>
            <a href={'https://app.slack.com/client/T02V2Q2GCGJ/C0327K6NDGU'}>Slack</a>
            <a href={'https://www.instagram.com/1111taoyiyi/'}>Instagram</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
