import React from 'react'

export default function ExtraCharge({ user, items }) {

    const test = () => {
        console.log(items);
    }

    const retrieveItem = (e) => {
      console.log(e.target.textContent);
    }


  return (
      <>
      <h1>{user}</h1>
        <h1>Which items to take / store?</h1>
        {/* <button onClick={test}>Check items</button> */}
        {items.map((item) => {
          return (
            <ul key={item.box_id}>
              <li onClick={(e) => retrieveItem(e)}>{item.declared_content_one}</li>
              <li onClick={retrieveItem}>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "No Items added"}
              </li>
              <li onClick={retrieveItem}>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "No Items added"}
              </li>
            </ul>
          );
        })}

        <h2>It will cost you</h2>
        <h2>¥5000</h2>
        <form action="/create-checkout-session" method="POST">  
          <button id="checkout-and-portal-button" type="submit">Yes</button>
        </form>
        <h3>No</h3>
      </>
    )
}
