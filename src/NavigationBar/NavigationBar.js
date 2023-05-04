import React from "react";
import '../assets/vendor/animate.css/animate.min.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css'
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';



import { useState } from 'react';

function NavigationBar() {

    function select(element) {
        return document.querySelector(element);
      }
    const [isNavbarMobile, setIsNavbarMobile] = useState(false);

    const handleDropdownClick = (e) => {
      if (isNavbarMobile) {
        e.preventDefault();
        const dropdown = e.currentTarget.nextElementSibling;
        dropdown.classList.toggle('dropdown-active');
      }
    };

    function handleMClick(e) {
        setIsNavbarMobile(!isNavbarMobile);
        const navbar = document.querySelector('#navbar');
        navbar.classList.toggle('navbar-mobile');
        e.target.classList.toggle('bi-list');
        e.target.classList.toggle('bi-x');
    }
    
      
    const [currentUrl, setCurrentUrl] = useState(window.location.pathname);

    function handleClick(e) {
        setCurrentUrl(e.target.pathname);
    }

    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
      }
  
      const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight
  
        if (!header.classList.contains('header-scrolled')) {
          offset -= 20
        }
  
        let elementPos = select(el).offsetTop
        window.scrollTo({
          top: elementPos - offset,
          behavior: 'smooth'
        })
      }
  
      let selectHeader = select('#header')
      if (selectHeader) {
        const headerScrolled = () => {
          if (window.scrollY > 100) {
            selectHeader.classList.add('header-scrolled')
          } else {
            selectHeader.classList.remove('header-scrolled')
          }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
      }

    return(
        <header
        id="header"
        className="fixed-top d-flex align-items-center header-transparent"
      >
        <div className="container d-flex justify-content-between align-items-center">
          <div className="logo">
            <h1 className="text-light">
              <a href="/">
                <span>Moderna</span>
              </a>
            </h1>
            {/* Uncomment below if you prefer to use an image logo */}
            {/* <a href="index.html"><img src="assets/img/logo.png" alt="" class="img-fluid"></a>*/}
          </div>
          <nav id="navbar" className="navbar">
            <ul>
              <li>
                <a onClick={handleClick} className={currentUrl === "/" ? "active" : ""} href="/">
                  Home
                </a>
              </li>
              <li>
                <a onClick={handleClick} className={currentUrl === "/footprint" ? "active" : ""} href="/footprint">Footprint</a>
              </li>
              <li>
                <a onClick={handleClick} className={currentUrl === "/travel" ? "active" : ""} href="/travel">Travel</a>
              </li>
              <li>
                <a onClick={handleClick} className={currentUrl === "/test" ? "active" : ""} href="/test">Test</a>
              </li>
              <li>
                <a onClick={handleClick} className={currentUrl === "/educaiton" ? "active" : ""} href="/educaiton">Education</a>
              </li>
              
              <li className="dropdown">
                <a href="#" onClick={handleDropdownClick}>
                  <span>Information</span> <i className="bi bi-chevron-down" />
                </a>
                <ul>
                  <li>
                    <a className={currentUrl === "/" ? "active" : ""} href="/information/state">State Information</a>
                  </li>
                  <li>
                    <a className={currentUrl === "/" ? "active" : ""} href="/information/transport">Transport Information</a>
                  </li>
                </ul>
              </li>
              
            </ul>
            <i className="bi bi-list mobile-nav-toggle" onClick={handleMClick}/>
          </nav>
          {/* .navbar */}
        </div>
      </header>
      


    );
}

export default NavigationBar;