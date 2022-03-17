import React from 'react';
import { Button } from 'react-bootstrap';
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass } from "react-icons/gi";
import Icon from './Icon';


export default function StoredItems(props) {

    const { updateItemList,
            setDisplayTable,
            setAddItem,
            setBoxOrderReceived,
            items,
            displayTable } = props;

  return (
        // <div className="flex flex-col  w-96 ">
        <div id='stored-item' className="flex flex-col  w-96 ">
          <Button
            id='store-item-button'
            className="max-w-lg"
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
              className="boxes-before flex flex-col justify-center items-center max-w-lg rounded-br-lg rounded-bl-lg"
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
                        <div
                          id="item"
                          className=" flex flex-row justify-center items-center rounded-lg  my-2 "
                        >
                          <div className="flex min-h-100 max-h-100  bg-gray-400 shadow-lg rounded-lg py-2 px-3 mr-2">
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
                              className="flex min-h-100 max-h-100 bg-gray-300  shadow-lg rounded-lg py-2 px-3 "
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
                              className="flex min-h-100 max-h-100 bg-gray-300 shadow-lg rounded-lg py-2 ml-2"
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
                      ) : (
                        <div
                          id="item"
                          className=" flex flex-row justify-center items-center rounded-lg  my-2 px-3"
                        >
                          <div className="flex min-h-100 max-h-100  shadow-lg rounded-lg py-2 px-3 mr-2">
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
                              className="flex min-h-100 max-h-100 shadow-lg rounded-lg py-2 "
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
                              className="flex min-h-100 max-h-100 shadow-lg rounded-lg py-2 ml-2"
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
  )
}
