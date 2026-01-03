import React from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";

const MenuItem = ({ item }) => {
  const { name, recipe, image, price } = item;
  return (
    <div className="flex space-x-4">
      <img
        className="w-24 rounded-tr-4xl rounded-br-4xl rounded-bl-4xl "
        src={image}
        alt=""
      />
      <div>
        <h3 className="font-semibold">{name} ----------</h3>
        <p className="text-[#737373]">{recipe}</p>
      </div>
      <div className="flex justify-center items-center text-[#bb8506]">
        <FaBangladeshiTakaSign className="h-3 w-3"/>
        <p className="text-[#bb8506] ml-1">{price}</p>
        {/* <p className="text-[#bb8506]">${price}</p> */}
      </div>
    </div>
  );
};

export default MenuItem;
