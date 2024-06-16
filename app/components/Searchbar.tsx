import React from "react";

const Searchbar = () => {
  return (
    <div>
      <input
        type="text"
        placeholder="Search for an organization"
        className="p-2 border border-gray-300 rounded-lg"
        onChange={(e) => {
          e.target.value;
        }}
      />
    </div>
  );
};

export default Searchbar;
