import "../input.css";
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
  const [localItems, setLocalItems] = useState([]);


  const retrieveItem = (e) => {
    const temp = [...selectedItems];
    const tempForLocal = [...localItems];
    tempForLocal.forEach(item => {
      for (let key in item) {
        if (item[key] === e.target.textContent) {
          item[key] = "No Items added";
          return null;
        }
      }
    })
    if (e.target.textContent !== "No Items added") {
      temp.push(e.target.textContent);
    }
    setSelectedItem(temp);
    setLocalItems(tempForLocal);
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

    useEffect(() => {
      setLocalItems(items);
    }, [items])

  return (
    <div>
        <h1 id="next-period">{localStorage.firstName_user}, please select the box you want to retrieve</h1>
        <div className="containerItemsRetrieval">
        {localItems.map((item) => {
          return (
            <Badge >
            <section key={item.box_id} className="text-left">
              <li key={`${item.box_id}b`}  onClick={retrieveItem}>
                {item.declared_content_one}
              {console.log(item.pending)}
                </li>
              {item.declared_content_two !== "" ? <li
              key={`${item.box_id}c`}>  
              {item.declared_content_two}
              </li> : <></> }
              {item.declared_content_three !== "" ? <li
              key={`${item.box_id}d`}>  
              {item.declared_content_three}
              </li> : <></> }
            </section>
          </Badge>
          );
        })}
        </div>

        <section 
        className='flex 
        flex-wrap 
        items-center m-10 text-sky-900 font-bold'>Selected item:
        {selectedItems.map((item, idx) => {
          return (
              <section className="w-fit m-2 text-cyan-800 bg-white rounded-full py-2 px-4">
                <li className='selected-items' key={idx}>{item}</li>
              </section>
            )
        })}
        </section>
        
        <h2 id="next-period">Please also select a retrieval date<p className="detailsRetrieval">(i.e. the date at which the box will be available for retrieval at your local convenient store)</p></h2>
        <DatePicker 
            className='ml-10'
            selected={startDate} 
            onSelect={date => handleDateSelect(date)} 
            minDate={addDays(new Date)} 
            />
        {isSelected ? <div className='ml-10 italic'>You selected {selectedDateString}</div> : <div className='ml-10 italic'>Date not selected</div>}
        <Button className='ml-10 my-2' id='date-set' onClick={handleOnclickDate}>Press to validate this date</Button>
        <div></div>
        <Button className='ml-10 my-8' id='retrieve' onClick={() => setModalShow(true)}>Retrieve order</Button>
        <RetrieveConfirmation
        show={modalShow}
        onHide={setModalShow}
        selectedItems={selectedItems}
        >
      </RetrieveConfirmation>
    </div>
  );
}

