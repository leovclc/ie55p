import React from "react";
import '../assets/vendor/animate.css/animate.min.css';
import '../assets/vendor/bootstrap/css/bootstrap.min.css';
import '../assets/vendor/bootstrap-icons/bootstrap-icons.css';
import '../assets/vendor/boxicons/css/boxicons.min.css'
import '../assets/vendor/glightbox/css/glightbox.min.css';
import '../assets/vendor/swiper/swiper-bundle.min.css';
import '../assets/css/style.css';
import pic1 from'../assets/img/features-1.svg'

export default function HomeFeatures() {

    return(
        <>
  <section id="123" className="features">
    <div className="container">
      <div className="section-title">
        <h2>Features</h2>
        <p>
          Magnam dolores commodi suscipit. Necessitatibus eius consequatur ex
          aliquid fuga eum quidem. Sit sint consectetur velit. Quisquam quos
          quisquam cupiditate. Et nemo qui impedit suscipit alias ea. Quia
          fugiat sit in iste officiis commodi quidem hic quas.
        </p>
      </div>
      <div className="row" data-aos="fade-up">
        <div className="col-md-5">
          <img src={pic1} className="img-fluid" alt="" />
        </div>
        <div className="col-md-7 pt-4">
          <h3>
            Footprint Calculator
          </h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <ul>
            <li>
              <i className="bi bi-check" /> Ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </li>
            <li>
              <i className="bi bi-check" /> Duis aute irure dolor in
              reprehenderit in voluptate velit.
            </li>
          </ul>
        </div>
      </div>
      <div className="row" data-aos="fade-up">
        <div className="col-md-5 order-1 order-md-2">
          <img src="assets/img/features-2.svg" className="img-fluid" alt="" />
        </div>
        <div className="col-md-7 pt-5 order-2 order-md-1">
          <h3>Carbon Emission Information</h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum
          </p>
        </div>
      </div>
      <div className="row" data-aos="fade-up">
        <div className="col-md-5">
          <img src="assets/img/features-3.svg" className="img-fluid" alt="" />
        </div>
        <div className="col-md-7 pt-5">
          <h3>
            Travel Recommendation
          </h3>
          <p>
            Cupiditate placeat cupiditate placeat est ipsam culpa. Delectus quia
            minima quod. Sunt saepe odit aut quia voluptatem hic voluptas dolor
            doloremque.
          </p>
          <ul>
            <li>
              <i className="bi bi-check" /> Ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </li>
            <li>
              <i className="bi bi-check" /> Duis aute irure dolor in
              reprehenderit in voluptate velit.
            </li>
            <li>
              <i className="bi bi-check" /> Facilis ut et voluptatem aperiam.
              Autem soluta ad fugiat.
            </li>
          </ul>
        </div>
      </div>
      <div className="row" data-aos="fade-up">
        <div className="col-md-5 order-1 order-md-2">
          <img src="assets/img/features-4.svg" className="img-fluid" alt="" />
        </div>
        <div className="col-md-7 pt-5 order-2 order-md-1">
          <h3>
            Learning About Carbon Emission
          </h3>
          <p className="fst-italic">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <p>
            Ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
            irure dolor in reprehenderit in voluptate velit esse cillum dolore
            eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
            proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum
          </p>
        </div>
      </div>
    </div>
  </section>
  {/* End Features Section */}
  {/* End #main */}
</>

    );
}