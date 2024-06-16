import React from "react";
import Searchbar from "./Searchbar";
import Link from "next/link";

type NavbarProps = {
  year: string;
  setYear: Function;
  setSearchQuery: Function;
};

const Navbar = ({ year, setYear, setSearchQuery }: NavbarProps) => {
  return (
    <div className="fixed left-0 top-0 h-full w-[18%] bg-gray-100 shadow-md p-4 rounded-lg flex flex-col justify-between">
      <div>
        <div className="text-xl font-bold text-gray-800">
          GSOC Issue Tracker
        </div>

        <div className="my-4">
          <Searchbar setSearchQuery={setSearchQuery} />
        </div>

        <div className="flex flex-col gap-2 items-start">
          <label className="text-gray-700">Select Year:</label>
          <select
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
          </select>
        </div>
      </div>

      <footer className="text-lg text-gray-600 mt-4">
        Made by
        <br />
        <Link
          href="https://www.linkedin.com/in/kavish-parikh"
          target="blank"
          className=" text-blue-600 ml-4"
        >
          Kavish
        </Link>
        {" and "}
        <Link
          href="linkedin.com/in/tirthraj-raval-773422263"
          target="blank"
          className=" text-blue-600"
        >
          Tirthraj
        </Link>
      </footer>
    </div>
  );
};

export default Navbar;
