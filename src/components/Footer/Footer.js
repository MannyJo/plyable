import React from 'react';
import './Footer.css'

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const Footer = () => (
  <footer>
    <img src="https://static.wixstatic.com/media/55a6fa_8df7f1de12e241aca43953e67e0e2ca7~mv2.png/v1/fill/w_491,h_460,al_c,q_80,usm_0.66_1.00_0.01/Web_1920_%E2%80%93_34.webp" height="150px" />
    <br />
    &copy; pontyf
  </footer>

);

export default Footer;
