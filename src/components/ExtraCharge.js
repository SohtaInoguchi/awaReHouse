import "../input.css";
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
  const [clear, setClear] = useState(false);
  const [boxNumber, setBoxNumber] = useState();
  const [boxIsSelected, setBoxIsSelected] = useState(false);
  const [isValidated, setIsValidated] = useState(false);

  const navigate = useNavigate();

  const handleOnclickDate = () => {
    const selectedDateStr = `${selectedDate.getFullYear()}/${
      selectedDate.getMonth() + 1
    }/${selectedDate.getDate()}`;
    setSelectedDateString(selectedDateStr);
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

  const updateItemList = () => {
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

  const sendRetrievalPending = async (req, res) => {
    axios
      .post("/inventory/:box_id", {
        box_id: boxNumber,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1 id="next-period">
        {localStorage.firstName_user}, please select one box to retrieve
      </h1>
      <div className="flex justify-end mx-5 my-2 px-2 py-2">
        <Button
          className="py-3 px-3"
          id="go-back-to-user-page"
          onClick={() => navigate("/user")}
        >
          Go Back To User Page
        </Button>
      </div>
      <div>
        {boxIsSelected === false ? (
          <div className="containerItemsRetrieval">
            {localItems.map((item) => {
              if (item.pending === false)
                return (
                  <div
                    key={`${item.box_id}m`}
                    className="boxesOfItemsR"
                    onClick={() => {
                      setBoxIsSelected(true);
                      setBoxNumber(item.box_id);
                    }}
                  >
                    <p>Box Number: {item.box_id} </p>
                    <section key={item.box_id} className="text-left">
                      <li key={`${item.box_id}g`}>
                        {item.declared_content_one}
                      </li>
                      {item.declared_content_two !== "" ? (
                        <li key={`${item.box_id}h`}>
                          {item.declared_content_two}
                        </li>
                      ) : (
                        <></>
                      )}
                      {item.declared_content_three !== "" ? (
                        <li key={`${item.box_id}k`}>
                          {item.declared_content_three}
                        </li>
                      ) : (
                        <></>
                      )}
                    </section>
                  </div>
                );
            })}
          </div>
        ) : (
          <div>
            <p className="boxSelection">You Selected: </p>
            <div className="containerItemsRetrieval">
              {localItems.map((item) => {
                if (item.pending === false && item.box_id === boxNumber)
                  return (
                    <div
                      key={`${item.box_id}r`}
                      className="boxesOfItemsR2"
                      onClick={() => {
                        setIsValidated(false);
                        setBoxIsSelected(false);
                      }}
                    >
                      <p>Box Number: {boxNumber} </p>
                      <section key={item.box_id} className="text-left">
                        <li key={`${item.box_id}t`}>
                          {item.declared_content_one}
                        </li>
                        {item.declared_content_two !== "" ? (
                          <li key={`${item.box_id}y`}>
                            {item.declared_content_two}
                          </li>
                        ) : (
                          <></>
                        )}
                        {item.declared_content_three !== "" ? (
                          <li key={`${item.box_id}u`}>
                            {item.declared_content_three}
                          </li>
                        ) : (
                          <></>
                        )}
                      </section>
                    </div>
                  );
              })}
            </div>
          </div>
        )}
      </div>

      {selectedDate === undefined ? (
        <h2 id="next-period">
          Please select a possible retrieval date
          <p className="detailsR">
            (i.e. the date from which you will be able to pick up the box from
            your local convenient store)
          </p>
          <DatePicker
            className="ml-10"
            selected={startDate}
            onSelect={(date) => handleDateSelect(date)}
            minDate={addDays(new Date())}
          />
        </h2>
      ) : (
        <p
          className="boxesOfItemsR2"
          onClick={() => {
            setIsValidated(false);
            setSelectedDate(undefined);
          }}
        >
          {selectedDateString}
        </p>
      )}

      <div className="bottomContainer">
        {selectedDate !== undefined &&
        boxIsSelected === true &&
        isValidated === false ? (
          <button
            className="confirmButtons"
            onClick={() => {
              handleOnclickDate();
              setIsValidated(true);
              sendRetrievalPending();
            }}
          >
            Please confirm these choices
          </button>
        ) : (
          <></>
        )}

        <></>
        {selectedDate !== undefined &&
        boxIsSelected === true &&
        isValidated === true ? (
          <div>
            <button
              className="confirmButtons"
              id="lastButtonR"
              onClick={() => setModalShow(true)}
            >
              Order
            </button>
            <RetrieveConfirmation
              show={modalShow}
              onHide={setModalShow}
              selectedItems={selectedItems}
            ></RetrieveConfirmation>{" "}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
