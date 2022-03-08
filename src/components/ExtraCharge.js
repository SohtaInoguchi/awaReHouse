import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


export default function ExtraCharge({ user, items }) {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateString, setSelectedDateString] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const retrieveItem = (e) => {
    console.log(e.target.textContent);
  }

  const handleOnclickDate = () => {
      const selectedDateStr = `${selectedDate.getFullYear()}/${selectedDate.getMonth() + 1}/${selectedDate.getDate()}`
      console.log(selectedDateStr);
  }
  
  const handleDateSelect = (date) => {
      setStartDate(date);
      setSelectedDate(date);
      setIsSelected(true);
      const selectedDateStr = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
      setSelectedDateString(selectedDateStr);
  }

    const addDays = (newDate) => {
      const weeklater = newDate.getDate() + 7;
      newDate.setDate(weeklater);
      return newDate;
    }


  return (
    <>
      <h1>{user}</h1>
        <h1>Which items to take / store?</h1>
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
        <h2>Select the date of retrieval</h2>
        <DatePicker 
            selected={startDate} 
            onSelect={date => handleDateSelect(date)} 
            minDate={addDays(new Date)} 
            />
        <button onClick={handleOnclickDate}>Press to set retrieval date</button>
        {isSelected ? <div>You selected {selectedDateString}</div> : <div>Date not selected</div>}

        <h2>It will cost you</h2>
      <h2>JPY15000</h2>
      <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Extra retrieval" />
        <button id="checkout-and-portal-button" type="submit">
          Yes
        </button>
      </form>
      <h3>No</h3>
    </>
  );
}

