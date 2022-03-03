import "../input.css";
import { useState, useEffect } from "react";

function NewCustomer() {
  return <div className="containerNewRegistration">
      <div className="newUser">
          REGISTER AS A STORAGE USER
          <button>UPLOAD FILE</button>
          </div>
      <div className="newProvider">REGISTER AS A STORAGE PROVIDER</div>  
      </div>;
}

export default NewCustomer;
