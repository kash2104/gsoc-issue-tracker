import React, { useState } from "react";
import Searchbar from "./Searchbar";
import Link from "next/link";
import TechBar from "./TechBar";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai"; // Assuming you use react-icons for icons

type NavbarProps = {
  year: string;
  setYear: Function;
  setSearchQuery: Function;
  organizationData: any[];
  setTechSearchQuery: Function;
  techSet: Set<string>;
};

const Navbar = ({
  year,
  setYear,
  setSearchQuery,
  setTechSearchQuery,
  techSet,
}: NavbarProps) => {
  const [techSearch, setTechSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleCloseMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <div className="fixed left-0 top-0 h-full w-[18%] bg-gray-100 shadow-md p-4 rounded-lg flex flex-col justify-between hidden lg:flex">
        <div>
          <div className="text-xl font-bold text-blue-700">
            GSOC Issue Tracker
          </div>

          <div className="flex flex-col gap-1 mt-4 justify-center items-center">
            <div>Organizations</div>
            <div className="h-[1.5px] w-full bg-black"></div>
            <div className="my-1">
              <Searchbar setSearchQuery={setSearchQuery} />
            </div>
          </div>

          <div className="flex flex-col gap-2 items-center mt-4">
            <label className="text-gray-700"> Year</label>
            <div className="h-[1.5px] w-full bg-black"></div>
            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-300 w-[55%] text-center"
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
          <div className="flex flex-col gap-1 mt-8 justify-center items-center">
            <div>Technology</div>
            <div className="h-[1.5px] w-full bg-black"></div>
            <div className="my-1">
              <TechBar
                techSearch={techSearch}
                setTechSearch={setTechSearch}
                setTechSearchQuery={setTechSearchQuery}
              />
            </div>
          </div>
        </div>

        <footer className="text-lg text-gray-600 mt-4">
          Developed by
          <br />
          <Link
            href="https://www.linkedin.com/in/kavish-parikh"
            target="blank"
            className=" text-blue-600"
          >
            Kavish
          </Link>
          {" and "}
          <Link
            href="https://www.linkedin.com/in/tirthraj-raval-773422263"
            target="blank"
            className=" text-blue-600"
          >
            Tirthraj
          </Link>
        </footer>
      </div>

      <div className="lg:hidden fixed top-0 left-0 w-full flex justify-between items-center bg-gray-100 p-4 shadow-md">
        <div className="text-xl font-bold text-blue-700">GSOC Issue Tracker</div>
        <button onClick={handleMenuToggle} className="text-2xl">
          {menuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
        </button>
      </div>

      {menuOpen && (
        <div className="fixed left-0 top-0 h-[60%] w-full bg-gray-100 shadow-md p-6 flex flex-col justify-between md:hidden z-50 ">
          <div>
            <div className="text-xl font-bold text-blue-700 mb-4">
              GSOC Issue Tracker
            </div>

            <div className="flex flex-col gap-1 mt-4 justify-center items-center">
              <div>Organizations</div>
              <div className="h-[1.5px] w-full bg-black"></div>
              <div className="my-1">
                <Searchbar setSearchQuery={setSearchQuery} />
              </div>
            </div>

            <div className="flex flex-col gap-2 items-center mt-4">
              <label className="text-gray-700"> Year</label>
              <div className="h-[1.5px] w-full bg-black"></div>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="p-2 border border-gray-300 rounded-lg focus:outline-yellow-300 w-[55%] text-center"
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
            <div className="flex flex-col gap-1 mt-8 justify-center items-center">
              <div>Technology</div>
              <div className="h-[1.5px] w-full bg-black"></div>
              <div className="my-1">
                <TechBar
                  techSearch={techSearch}
                  setTechSearch={setTechSearch}
                  setTechSearchQuery={setTechSearchQuery}
                />
              </div>
            </div>
          </div>

          <button
            onClick={handleCloseMenu}
            className="self-end text-xl text-gray-700 absolute top-4 right-4"
          >
            <AiOutlineClose />
          </button>

          <footer className="text-lg text-gray-600 mt-4">
            Developed by
            <br />
            <Link
              href="https://www.linkedin.com/in/kavish-parikh"
              target="blank"
              className=" text-blue-600"
            >
              Kavish
            </Link>
            {" and "}
            <Link
              href="https://www.linkedin.com/in/tirthraj-raval-773422263"
              target="blank"
              className=" text-blue-600"
            >
              Tirthraj
            </Link>
          </footer>
        </div>
      )}
    </div>
  );
};

export default Navbar;
