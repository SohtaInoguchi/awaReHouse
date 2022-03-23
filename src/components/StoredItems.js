import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass, GiWeight } from "react-icons/gi";
import Icon from "./Icon";
import StoredItemsElements from "./StoredItemsElements";

export default function StoredItems(props) {
  const {
    updateItemList,
    setDisplayTable,
    setAddItem,
    setBoxOrderReceived,

    displayTable,
  } = props;
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .post("/allItems", { email: window.localStorage.getItem("email_user") })
      .then((res) => setItems(res.data));
  }, [items]);

  return (
    <div id="stored-item" className="flex flex-col ">
      <Button
        id="store-item-button"
        onClick={() => {
          updateItemList();
          setDisplayTable(!displayTable);
          setAddItem(false);
          setBoxOrderReceived(false);

          setTimeout(() => {
            const boxes = document.getElementById("boxes");

            console.log(document.getElementById("boxes"));
            if (boxes && boxes.classList.contains("boxes-before")) {
              boxes.classList.remove("boxes-before");
              boxes.classList.add("boxes-after");
            }
          }, 1);
        }}
      >
        <div className="">
          {displayTable ? "" : "Display"} Stored Items
          <div className="flex justify-center  ">
            <div className="mx-3 flex ">
              <Icon icon={<GiWeight size="24" />} />
              <p className=" ml-2 text-base">Heavy</p>
            </div>
            <div className="flex mx-3">
              <Icon icon={<GiShatteredGlass size="24" />} />
              <p className="ml-2 text-base">Fragile</p>
            </div>
          </div>
        </div>
      </Button>
      {displayTable ? (
        <div
          id="boxes"
          className="boxes-before flex flex-col justify-center items-center rounded-br-lg rounded-bl-lg text-1xl"
        >
          {items.map((item, index) => {
            return (
              <div className="selected-items" key={index}>
                <div
                  className=" flex justify-center items-center  "
                  key={`${index}a`}
                >
                  {item.pending ? (
                    <StoredItemsElements
                      item={item}
                      index={index}
                      color={"bg-green-400"}
                      text={"Pending Items"}
                      className=""
                    />
                  ) : item.pending_retrieval ? (
                    <StoredItemsElements
                      item={item}
                      index={index}
                      color={"bg-blue-400"}
                      text={"Requesting Items"}
                      className=""
                    />
                  ) : (
                    <StoredItemsElements
                      item={item}
                      index={index}
                      color={""}
                      className=""
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
