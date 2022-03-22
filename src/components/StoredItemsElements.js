import React from "react";
import { FaWeightHanging } from "react-icons/fa";
import { GiShatteredGlass } from "react-icons/gi";
import Icon from "./Icon";

export default function StoredItemsElements({ item, index, color, text }) {
  return (
    <div className="group rounded-lg  my-2 ">
      <div className="pending-item group-hover:opacity-100 flex items-center justify-center">
        <div className="bg-white rounded-lg w-72 text-center text-sm">
          {text}
        </div>
      </div>
      <div
        id="item"
        className="group flex flex-row justify-around items-center rounded-lg "
      >
        <div
          className={`each-items  flex min-h-100 max-h-100  ${color}  shadow-lg rounded-lg px-3 py-2 mx-2`}
        >
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
            className={`each-items  flex min-h-100 max-h-100 ${color}  shadow-lg rounded-lg px-3 py-2 mx-2 `}
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
            className={`each-items  flex min-h-100 max-h-100 ${color} shadow-lg rounded-lg px-3 py-2 mx-2`}
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
  );
}
