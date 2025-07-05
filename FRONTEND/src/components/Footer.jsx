import React, { useState } from 'react';
import leetcode from '/leetcode.svg';
import '../App.css'


const Footer = () => {
  const [liked, setLiked] = useState(false);

  const handleOnClick = () => {
    setLiked(prev => !prev);
  };

  return (
    <div className='footer-main'>
      <div className="footer-links">
        <span className='footer-link'>
          <a href="https://www.linkedin.com/in/aditya-kumar-maurya-5a6954234/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-linkedin"></i>&nbsp;LinkedIn
          </a>
        </span>
        <span className='footer-link'>
          <a href="https://github.com/Devill0104/" target="_blank" rel="noreferrer">
            <i className="fa-brands fa-github"></i>&nbsp;Github
          </a>
        </span>
        <span className='footer-link'>
          <a href="https://leetcode.com/u/Aditya_Maurya_01/" target="_blank" rel="noreferrer">
            <img src={leetcode} className="f-img" alt="leetcode" />&nbsp;Leetcode
          </a>
        </span>
      </div>

      <div className="footer-p">
        <p>
          Made with&nbsp;
          <i
            onClick={handleOnClick}
            className={liked ? 'fas fa-heart heart-icon filled' : 'far fa-heart heart-icon'}
          ></i>
          &nbsp;by Aditya
        </p>
      </div>
    </div>
  );
};

export default Footer;
