import "../input.css";
import { useState, useEffect } from "react";

function NewCustomer() {
  return <div className="containerNewRegistration">
      <div className="newUser">
          REGISTER AS A STORAGE USER
          <form>
            <label>
            First Name:
            <input type="text" firstName="firstname" placeholder="Your first name" /><br></br>
            Last Name:
            <input type="text" lastName="lastname" placeholder="Your last name"/><br></br>
            Password:
            <input type="text" password="password" placeholder="Your created password"/><br></br>
            Address:
            <input type="text" address="address" placeholder="Your address"/><br></br>
            Email:
            <input type="text" email="email" placeholder="Your email"/><br></br>
            Please provide an identification proof <br></br>(e.g. driving license picture)
          <button>UPLOAD FILE</button><br></br>
          </label>
          <input type="submit" value="Submit"/>
          </form>
          </div>
      <div className="newProvider">REGISTER AS A STORAGE PROVIDER</div>  
      </div>;
}

export default NewCustomer;
