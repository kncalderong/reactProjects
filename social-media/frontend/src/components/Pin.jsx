import React from "react";
import { urlFor } from "../client";

const Pin = ({ pin }) => {
  const { image, _id, postedBy, destination } = pin;
  return (
    <div>
      <img
        src={urlFor(image).width(250).url()}
        alt="user-post"
        className="rounded-lg w-full"
      />
    </div>
  );
};

export default Pin;
