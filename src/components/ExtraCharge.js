import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { Button, Badge, ListGroup } from 'react-bootstrap';
import RetrieveConfirmation from './RetrieveConfirmation';


export default function ExtraCharge({ user, items, email, setItems }) {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateString, setSelectedDateString] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItems, setSelectedItem] = useState([]);
  const [modalShow, setModalShow] = useState(false);


  const retrieveItem = (e) => {
    const temp = [...selectedItems];
    if (e.target.textContent !== "No Items added") {
      temp.push(e.target.textContent);
    }
    console.log(e.target.textContent);
    setSelectedItem(temp);
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

    const check = (e) => {
      e.preventDefault();
      console.log("items", items);
      console.log("user", user);
      console.log("email", email);
    }

    const updateItemList = () => {
      // axios.post("/allItems", { email }).then((res) => setItems(res.data));
      axios.post("/allItems", { email: localStorage.email_user }).then((res) => setItems(res.data));
    };
  
    useEffect(() => {
      updateItemList();
    }, [])

  return (
    <div>
      {/* <h1>{user}</h1> */}
      <h1 className='ml-10'>{localStorage.firstName_user}</h1>
        <h1 className='ml-10'>Which items to take / store?</h1>
        {/* <button onClick={check}>Check</button> */}
        {items.map((item) => {
          return (
            <Badge bg='light' id='user-items'>
            <section key={item.box_id} className="text-left">
              <li key={`${item.box_id}b`} className='user-items' onClick={(e) => retrieveItem(e)}>{item.declared_content_one}</li>
              <li key={`${item.box_id}c`} className='user-items' onClick={retrieveItem}>
                {item.declared_content_two
                  ? item.declared_content_two
                  : "No Items added"}
              </li>
              <li key={`${item.box_id}d`} className='user-items' onClick={retrieveItem}>
                {item.declared_content_three
                  ? item.declared_content_three
                  : "No Items added"}
              </li>
            </section>
          </Badge>
          );
        })}
        <section 
        className='flex 
        flex-wrap 
        items-center m-10 text-sky-900 font-bold'>Selected item:
        {selectedItems.map((item, idx) => {
          return (
              <ListGroup className="w-fit m-2">
                <ListGroup.Item className='text-sky-900' key={idx}>{item}</ListGroup.Item>
              </ListGroup>
            )
        })}
        </section>
        
        <h2 className='ml-10 my-8'>Select the date of retrieval</h2>
        <DatePicker 
            className='ml-10'
            selected={startDate} 
            onSelect={date => handleDateSelect(date)} 
            minDate={addDays(new Date)} 
            />
        <Button className='ml-10 my-8' onClick={handleOnclickDate}>Press to set retrieval date</Button>
        {isSelected ? <div className='ml-10'>You selected {selectedDateString}</div> : <div className='ml-10'>Date not selected</div>}

        <Button className='ml-10 my-8' onClick={() => setModalShow(true)}>Retrieve</Button>
        <RetrieveConfirmation
        show={modalShow}
        onHide={setModalShow}
        selectedItems={selectedItems}
        >
      </RetrieveConfirmation>


        {/* <h2>It will cost you</h2>
      <h2>¥15000</h2> */}
      
      {/* <form action="/create-checkout-session" method="POST">
        <input type="hidden" name="name" value="Extra retrieval" />
        <button id="checkout-and-portal-button" type="submit">
          Yes
        </button>
      </form>
      <h3>No</h3> */}
    </div>
  );
}

