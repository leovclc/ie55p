import React from 'react';

const select = (el = '', all = false) => {
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }
  
export default select;