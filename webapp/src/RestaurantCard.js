import React from "react";
import clsx from "clsx";

const RestaurantCard = ({
  restaurant,
  active,
  postition,
  className,
  ...rest
}) => (
  <div
    className={clsx(
      "hover:underline cursor-pointer p-4",
      active && "bg-gray-200",
      className
    )}
    {...rest}
  >
    <h2 className="font-bold">{restaurant.name}</h2>
    <p className="text-sm">
      <span className="text-gray-500">{restaurant.location.emirate}</span>
      <span className="mx-0.5">.</span>
      <span className="text-gray-500">{restaurant.location.address}</span>
    </p>
  </div>
);

export default RestaurantCard;
