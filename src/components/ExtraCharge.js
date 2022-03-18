import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Button, Badge, ListGroup } from "react-bootstrap";
import RetrieveConfirmation from "./RetrieveConfirmation";
import { useNavigate } from "react-router-dom";
import { keys } from "@material-ui/core/styles/createBreakpoints";
export default function ExtraCharge({ user, items, email, setItems }) {
  const [startDate, setStartDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState();
  const [selectedDateString, setSelectedDateString] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [selectedItems, setSelectedItem] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [localItems, setLocalItems] = useState([]);
  const navigate = useNavigate();

  const retrieveItem = (e) => {
    const temp = [...selectedItems];
    const tempForLocal = [...localItems];
    tempForLocal.forEach((item) => {
      for (let key in item) {
        const tag = document.getElementById(e.target.id);

        if (
          item[key] === e.target.textContent &&
          item.box_id === parseInt(tag.id)
        ) {
          item[key] = "";
          return;
        }
      }
    });
    if (e.target.textContent !== "No Items added") {
      temp.push(e.target.textContent);
    }
    setSelectedItem(temp);
    setLocalItems(tempForLocal);
  };

  const handleOnclickDate = () => {
    const selectedDateStr = `${selectedDate.getFullYear()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getDate()}`;
    console.log(selectedDateStr);
  };

  const handleDateSelect = (date) => {
    setStartDate(date);
    setSelectedDate(date);
    setIsSelected(true);
    const selectedDateStr = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`;
    setSelectedDateString(selectedDateStr);
  };

  const addDays = (newDate) => {
    const weeklater = newDate.getDate() + 7;
    newDate.setDate(weeklater);
    return newDate;
  };

  const check = (e) => {
    e.preventDefault();
    console.log("items", items);
    console.log("user", user);
    console.log("email", email);
  };

  const updateItemList = () => {
    // axios.post("/allItems", { email }).then((res) => setItems(res.data));
    axios
      .post("/allItems", { email: localStorage.email_user })
      .then((res) => setItems(res.data));
  };

  useEffect(() => {
    updateItemList();
  }, []);

  useEffect(() => {
    setLocalItems(items);
  }, [items]);

  return (
    <div>
      {/* <h1>{user}</h1> */}
      <div className="flex justify-between">
        <p className="text-2xl text-cyan-800 ml-10 my-4 m rounded-full bg-white w-fit px-8 py-2">
          {localStorage.firstName_user}
        </p>
        <Button className="mx-3" onClick={() => navigate("/user")}>
          Go Back to User Page
        </Button>
      </div>

      <h1 className="my-6 text-cyan-800 italic bg-white">
        Select the items you want to retrieve
      </h1>
      <div className="flex justify-between flex-row border-8">
        {localItems.map((item) => {
          return (
            <div className="">
              {item.declared_content_one ||
              item.declared_content_two ||
              item.declared_content_three ? (
                <Badge bg="light" id="user-items">
                  <section key={item.box_id} className="text-left">
                    <div
                      key={`${item.box_id}b`}
                      id={`${item.box_id}`}
                      className="user-items"
                      onClick={retrieveItem}
                    >
                      {item.declared_content_one}
                    </div>
                    <div
                      key={`${item.box_id}c`}
                      id={`${item.box_id}`}
                      className="user-items"
                      onClick={retrieveItem}
                    >
                      {item.declared_content_two
                        ? item.declared_content_two
                        : ""}
                    </div>
                    <div
                      key={`${item.box_id}d`}
                      id={`${item.box_id}`}
                      className="user-items"
                      onClick={retrieveItem}
                    >
                      {item.declared_content_three
                        ? item.declared_content_three
                        : ""}
                    </div>
                  </section>
                </Badge>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <section
        className="flex 
        flex-wrap 
        items-center m-10 text-sky-900 font-bold"
      >
        <p className="bg-white px-3 py-3 rounded-3xl">Selected item:</p>
        {selectedItems.map((item, idx) => {
          return (
            <section className="w-fit m-2 text-cyan-800 bg-white rounded-full py-2 px-4">
              <li className="selected-items" key={idx}>
                {item}
              </li>
            </section>
          );
        })}
      </section>

      <h2 className="my-8 text-cyan-800 italic bg-white">
        Select retrieval date
      </h2>
      <DatePicker
        className="ml-10"
        selected={startDate}
        onSelect={(date) => handleDateSelect(date)}
        minDate={addDays(new Date())}
      />
      {isSelected ? (
        <div className="ml-10 italic">You selected {selectedDateString}</div>
      ) : (
        <div className="ml-10 italic">Date not selected</div>
      )}
      <Button className="ml-10 my-2" id="date-set" onClick={handleOnclickDate}>
        Press to validate this date
      </Button>
      <div></div>
      <Button
        className="ml-10 my-8"
        id="retrieve"
        onClick={() => setModalShow(true)}
      >
        Retrieve order
      </Button>
      <RetrieveConfirmation
        show={modalShow}
        onHide={setModalShow}
        selectedItems={selectedItems}
      ></RetrieveConfirmation>
    </div>
  );
}
