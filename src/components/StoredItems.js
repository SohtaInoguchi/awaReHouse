import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass } from "react-icons/gi";
import Icon from "./Icon";

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
  }, []);

  return (
    // <div className="flex flex-col  w-96 ">
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
        {displayTable ? "" : "Display"} Stored Items
      </Button>

      {displayTable ? (
        <div
          id="boxes"
          className="boxes-before flex flex-col justify-center items-center rounded-br-lg rounded-bl-lg text-1xl"
        >
          {items.map((item, index) => {
            return (
              // <div className=" text-blue-600 w-full " key={index}>
              <div className="selected-items" key={index}>
                <div
                  className="flex justify-center items-center  "
                  key={`${index}a`}
                >
                  {item.pending ? (
                    <div className="group rounded-lg  my-2 ">
                      <div className="pending-item group-hover:opacity-100 flex items-center justify-center">
                        <div className="bg-white rounded-lg w-72 text-center text-sm">
                          Pending Items
                        </div>
                      </div>
                      <div
                        id="item"
                        className="group flex flex-row justify-around items-center rounded-lg "
                      >
                        {/* <div className=" border-4 border-violet-300 flex min-h-100 max-h-100  bg-green-400 shadow-lg rounded-lg py-2 p-3 mx-4"> */}
                        <div className="each-items  flex min-h-100 max-h-100  bg-green-400 shadow-lg rounded-lg px-3 py-2 mx-2">
                          {item.declared_content_one}
                          {item.fragile === true ? (
                            <Icon icon={<GiShatteredGlass size="24" />} />
                          ) : (
                            ``
                          )}{" "}
                          {item.heavy === true ? (
                            <Icon icon={<FaWeightHanging size="24" />} />
                          ) : (
                            ``
                          )}
                        </div>

                        {item.declared_content_two !== "" ? (
                          <div
                            // className="border-4 border-violet-300 flex min-h-100 max-h-100 bg-green-400  shadow-lg rounded-lg py-2 px-3 mx-4 "
                            className="each-items  flex min-h-100 max-h-100 bg-green-400  shadow-lg rounded-lg px-3 py-2 mx-2 "
                            key={`${index}b`}
                          >
                            {item.declared_content_two}{" "}
                            {item.fragile === true ? (
                              <Icon icon={<GiShatteredGlass size="24" />} />
                            ) : (
                              ``
                            )}{" "}
                            {item.heavy === true ? (
                              <Icon icon={<FaWeightHanging size="24" />} />
                            ) : (
                              ``
                            )}
                          </div>
                        ) : (
                          <></>
                        )}

                        {item.declared_content_three !== "" ? (
                          <div
                            // className=" border-4 border-violet-300 flex min-h-100 max-h-100 bg-green-400 shadow-lg rounded-lg py-2 mx-4"
                            className="each-items  flex min-h-100 max-h-100 bg-green-400 shadow-lg rounded-lg px-3 py-2 mx-2"
                            key={`${index}c`}
                          >
                            {item.declared_content_three}{" "}
                            {item.fragile === true ? (
                              <Icon icon={<GiShatteredGlass size="24" />} />
                            ) : (
                              ``
                            )}{" "}
                            {item.heavy === true ? (
                              <Icon icon={<FaWeightHanging size="24" />} />
                            ) : (
                              ``
                            )}
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      id="item"
                      // className=" border-4 border-violet-300 flex flex-row justify-center items-center rounded-lg px-3 mx-4"
                      className="   flex flex-row justify-center items-center rounded-lg px-3 py-2 mx-2"
                    >
                      {/* <div className=" border-4 border-teal-300 flex min-h-100 max-h-100  shadow-lg rounded-lg py-2 px-3 mx-4"> */}
                      <div className=" each-items  flex min-h-100 max-h-100  shadow-lg rounded-lg px-3 py-2 mx-2">
                        {item.declared_content_one}
                        {item.fragile === true ? (
                          <Icon icon={<GiShatteredGlass size="24" />} />
                        ) : (
                          ``
                        )}{" "}
                        {item.heavy === true ? (
                          <Icon icon={<FaWeightHanging size="24" />} />
                        ) : (
                          ``
                        )}
                      </div>

                      {item.declared_content_two !== "" ? (
                        <div
                          // className="border-4 border-teal-300 flex min-h-100 max-h-100 shadow-lg rounded-lg py-2 mx-4"
                          className="each-items  flex min-h-100 max-h-100 shadow-lg rounded-lg px-3 py-2 mx-2"
                          key={`${index}b`}
                        >
                          {item.declared_content_two}{" "}
                          {item.fragile === true ? (
                            <Icon icon={<GiShatteredGlass size="24" />} />
                          ) : (
                            ``
                          )}{" "}
                          {item.heavy === true ? (
                            <Icon icon={<FaWeightHanging size="24" />} />
                          ) : (
                            ``
                          )}
                        </div>
                      ) : (
                        <></>
                      )}

                      {item.declared_content_three !== "" ? (
                        <div
                          // className=" border-4 border-teal-300 flex min-h-100 max-h-100 shadow-lg rounded-lg py-2 mx-4"
                          className="each-items  flex min-h-100 max-h-100 shadow-lg rounded-lg px-3 py-2 mx-2"
                          key={`${index}c`}
                        >
                          {item.declared_content_three}{" "}
                          {item.fragile === true ? (
                            <Icon icon={<GiShatteredGlass size="24" />} />
                          ) : (
                            ``
                          )}{" "}
                          {item.heavy === true ? (
                            <Icon icon={<FaWeightHanging size="24" />} />
                          ) : (
                            ``
                          )}
                        </div>
                      ) : (
                        <></>
                      )}
                    </div>
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
