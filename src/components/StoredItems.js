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
        <div className="flex flex-col  w-96 ">
          <Button
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
              Stored Items:
              {items.map((item, index) => {
                return (
                  <div className=" text-blue-600 w-full " key={index}>
                    <div
                      className="flex justify-center items-center  "
                      key={`${index}a`}
                    >
                      {item.pending ? (
                        <div
                          id="item"
                          className=" flex flex-row justify-center items-center rounded-lg  my-2 "
                        >
                          <div className="flex min-h-100 max-h-100  bg-green-300 shadow-lg rounded-lg py-2 mr-2">
                            No.{item.box_id}:{item.declared_content_one}
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
                              className="flex min-h-100 max-h-100 bg-green-300  shadow-lg rounded-lg py-2  "
                              key={`${index}b`}
                            >
                              No.{item.box_id}:{item.declared_content_two}{" "}
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
                              className="flex min-h-100 max-h-100 bg-green-300 shadow-lg rounded-lg py-2 ml-2"
                              key={`${index}c`}
                            >
                              No.{item.box_id}:{item.declared_content_three}{" "}
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
                          className=" flex flex-row justify-center items-center rounded-lg  my-2 "
                        >
                          <div className="flex min-h-100 max-h-100  shadow-lg rounded-lg py-2 mr-2">
                            No.{item.box_id}:{item.declared_content_one}
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
                              className="flex min-h-100 max-h-100  shadow-lg rounded-lg py-2  "
                              key={`${index}b`}
                            >
                              No.{item.box_id}:{item.declared_content_two}{" "}
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
