
import React from "react";
import '../assets/css/style.css';

export default function SubHeader(props) {

    return(
        
        <section class="breadcrumbs">
        <div class="container">
  
          <div class="d-flex justify-content-between align-items-center">
            <h2>{props.name}</h2>
            <ol>
              <li><a href="/">Home</a></li>
              <li>{props.name}</li>
            </ol>
          </div>
  
        </div>
      </section>
     
    );

}
