import React from "react";
import '../assets/vendor/animate.css/animate.min.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css'
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';

export default function HomeHero() {

    return (
      <section
        id="hero-no-slider"
        className="d-flex justify-cntent-center align-items-center"
      >
        <div
          className="container position-relative"
          data-aos="fade-up"
          data-aos-delay={100}
        >
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <h2>GreenJourney</h2>
              <p>
                Our website is dedicated to providing you with practical advice on energy conservation and emission reduction, the latest
                developments in environmental technology and information related to green lifestyles. Join us and let us care about the health of the earth and leave a better and greener home for future generations. Because
                every small change will become a powerful force, and together push us towards a sustainable future.
              </p>
              <a href="" className="btn-get-started ">
                Read More
              </a>
            </div>
          </div>
        </div>
      </section>
    );

}