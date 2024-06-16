"use client";

import React, { useEffect, useState } from "react";
import "mdb-react-ui-kit/dist/css/mdb.min.css";

import OrgCard from "./components/OrgCard";
import Navbar from "./components/Navbar";
import Searchbar from "./components/Searchbar"; // Added Searchbar component import

export default function Home() {
  const [organizationData, setOrganizationData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]); // State to hold filtered data
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  const date = new Date();
  const currentYear = date.getFullYear();
  const selectedYear =
    typeof window !== "undefined" ? localStorage.getItem("selectedyear") : null;

  const [year, setYear] = useState(selectedYear || currentYear.toString());
  const [loading, setLoading] = useState<boolean>();

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`/api/organizations/${year}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setOrganizationData(data.allOrganizations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching organization data:", error);
        setLoading(false);
      }
    }

    fetchData();
  }, [year]);

  useEffect(() => {
    // Filter organizationData based on searchQuery
    const filteredOrgs = organizationData.filter((org) =>
      org.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filteredOrgs);
  }, [searchQuery, organizationData]);

  useEffect(() => {
    if(typeof window !== 'undefined'){
      localStorage.setItem("selectedyear", year);
    }
  }, [year]);

  return (
    <div className="flex">
      <Navbar year={year} setYear={setYear} setSearchQuery={setSearchQuery}/>
      <div className="flex-grow p-4 overflow-y-auto ml-[18%]">
        <h1 className="text-center my-4">
          {`All ${year} Organizations are listed below`}
        </h1>


        {!loading && filteredData.length === 0 && (
          <p className="text-center mb-6">No Organizations found</p>
        )}

        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <div className="grid col-span-3">
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="spinner"></div>
                <div>Loading....</div>
              </div>
            </div>
          ) : (
            !loading &&
            filteredData.map((org: any, index: number) => (
              <div key={index} className="h-max">
                <OrgCard org={org} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}