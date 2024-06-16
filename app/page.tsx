"use client";

import React, { useEffect, useState } from "react";
import OrgCard from "./components/OrgCard";
import Navbar from "./components/Navbar";

export default function Home() {
  const [organizationData, setOrganizationData] = useState<any>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Number of items to display per page

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
    if (typeof window !== "undefined") {
      localStorage.setItem("selectedyear", year);
    }
  }, [year]);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = organizationData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(organizationData.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const displayPages = () => {
    const pagesToShow: (number | string)[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pagesToShow.push(i);
      }
    } else {
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      pagesToShow.push(1);
      if (startPage > 2) pagesToShow.push("...");
      for (let i = startPage; i <= endPage; i++) {
        pagesToShow.push(i);
      }
      if (endPage < totalPages - 1) pagesToShow.push("...");
      pagesToShow.push(totalPages);
    }
    return pagesToShow;
  };

  return (
    <div className="flex">
      <Navbar year={year} setYear={setYear} />
      <div className="flex-grow p-4 overflow-y-auto ml-[18%]">
        <h1 className="text-center my-4">
          {`All ${year} Organizations are listed below`}
        </h1>

        {!loading && (
          <p className="text-center mb-6">{`Total Organizations: ${organizationData.length}`}</p>
        )}

        <div className="grid grid-cols-3 gap-4">
          {loading ? (
            <div className="grid col-span-3">
              <div className="flex flex-col items-center gap-2 justify-center">
                <div className="spinner"></div>
                <div>Loading....</div>
              </div>
            </div>
          ) : currentItems.length > 0 ? (
            currentItems.map((org: any, index: number) => (
              <div key={index} className="h-max">
                <OrgCard org={org} />
              </div>
            ))
          ) : (
            <p className="text-center col-span-3">No organizations found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center my-4">
          {currentPage > 1 && (
            <button
              onClick={() => paginate(currentPage - 1)}
              className="p-2 mx-1 bg-gray-200 rounded-lg focus:outline-none"
            >
              Previous
            </button>
          )}
          {displayPages().map((page: number | string, index: number) => (
            <button
              key={index}
              onClick={() => typeof page === "number" && paginate(page)}
              className={`p-2 mx-1 ${
                currentPage === page ? "bg-blue-500 text-white" : "bg-gray-200"
              } rounded-lg focus:outline-none`}
              disabled={typeof page !== "number"}
            >
              {page}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => paginate(currentPage + 1)}
              className="p-2 mx-1 bg-gray-200 rounded-lg focus:outline-none"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
