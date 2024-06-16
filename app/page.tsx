"use client";

import React, { useEffect, useState } from "react";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import {
  MDBCard,
  MDBCardImage,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBRow,
  MDBCol,
  MDBPagination,
  MDBPaginationItem,
  MDBPaginationLink
} from 'mdb-react-ui-kit';
import Link from 'next/link';

export default function Home() {
  const [organizationData, setOrganizationData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // Adjust the number of items per page here

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/organizations/2024");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setOrganizationData(data.allOrganizations);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const extractOrgNameFromUrl = (url: string) => {
    // Remove the protocol (http, https) and 'www' if present
    let cleanUrl = url.replace(/(^\w+:|^)\/\//, '').replace('www.', '');

    // Remove any trailing slashes
    cleanUrl = cleanUrl.replace(/\/$/, '');

    // Extract the name before the domain extension
    const name = cleanUrl.split('.')[0];

    return name;
  };

  const generateOrgNameVariations = (orgName: string) => {
    const variations = [];

    // Add the original name
    variations.push(orgName);

    // Add the name with dashes replacing spaces
    variations.push(orgName.replace(/\s+/g, '-'));

    // Add the name with spaces removed
    variations.push(orgName.replace(/\s+/g, ''));

    // Add the name with the first letter of each word capitalized
    variations.push(orgName.replace(/\s+/g, '-').toLowerCase());
    variations.push(orgName.replace(/\s+/g, '').toLowerCase());

    return variations;
  };

  const fetchOrgDataWithFallback = async (orgName: string) => {
    const variations = generateOrgNameVariations(orgName);

    for (const variation of variations) {
      const response = await fetch(`/api/repos/${variation}`);
      if (response.ok) {
        const data = await response.json();
        return data;
      }
    }

    throw new Error('No valid organization name found');
  };

  const handleViewDetailsClick = async (org: any) => {
    try {
      const orgName = extractOrgNameFromUrl(org.url);
      const data = await fetchOrgDataWithFallback(orgName);
      console.log(data);
      // Here you should redirect to the OrgDetails page with the valid orgName
    } catch (error) {
      console.error("Error fetching organization data:", error);
    }
  };

  if (loading) {
    return <div className="spinner"></div>;
  }

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = organizationData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(organizationData.length / itemsPerPage);

  // Determine which page numbers to show in pagination
  const maxPagesToShow = 5; // Adjust the number of page numbers to show
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  // Adjust startPage and endPage if nearing the edges
  if (totalPages - currentPage < Math.floor(maxPagesToShow / 2)) {
    startPage = Math.max(1, totalPages - maxPagesToShow + 1);
  }
  if (currentPage <= Math.floor(maxPagesToShow / 2)) {
    endPage = Math.min(maxPagesToShow, totalPages);
  }

  return (
    <div>
      <h1 style={{ marginBottom: 10, marginTop: 20, textAlign: "center" }}>All the Organizations are listed below</h1>
      <p style={{ marginBottom: 40, textAlign: "center" }}>The organizations for the year 2024 are listed as below</p>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {currentItems.map((org: any, index: number) => (
          <MDBCol key={index}>
            <MDBCard className='h-100'>
              <MDBCardImage
                src={org.image_url}
                alt={org.name}
                position='top'
                style={{ backgroundColor: org.image_background_color }}
              />
              <MDBCardBody>
                <MDBCardTitle>Name : {org.name}</MDBCardTitle>
                <MDBCardText>{org.description}</MDBCardText>
                <MDBCardText>Category: {org.category}</MDBCardText>
                <MDBCardText>Technologies: </MDBCardText>
                {org.technologies.map((technology: string, techIndex: number) => (
                  <span key={techIndex} className='badge bg-success me-1'>{technology}</span>
                ))}
                <div style={{ marginBottom: 15 }}></div>
                <MDBCardText>Topics</MDBCardText>
                {org.topics.map((topic: string, topicIndex: number) => (
                  <span key={topicIndex} className='badge bg-primary me-1'>{topic}</span>
                ))}
                {/* Use Link to navigate to dynamic route */}
                <Link href={`/OrgDetails/${extractOrgNameFromUrl(org.url)}`} className="btn btn-primary" style={{ marginTop: 30 }}>
                  View Details
                </Link>
              </MDBCardBody>
              <MDBCardFooter>
                <small className='text-muted'>Category: {org.category}</small>
              </MDBCardFooter>
            </MDBCard>
          </MDBCol>
        ))}
      </MDBRow>

      {/* Pagination */}
      <MDBPagination className="my-4">
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => handlePageChange(1)} aria-disabled={currentPage === 1}>
            First
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem disabled={currentPage === 1}>
          <MDBPaginationLink onClick={() => handlePageChange(currentPage - 1)} aria-disabled={currentPage === 1}>
            Previous
          </MDBPaginationLink>
        </MDBPaginationItem>
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
          <MDBPaginationItem active={startPage + i === currentPage} key={startPage + i}>
            <MDBPaginationLink onClick={() => handlePageChange(startPage + i)}>
              {startPage + i}
            </MDBPaginationLink>
          </MDBPaginationItem>
        ))}
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => handlePageChange(currentPage + 1)} aria-disabled={currentPage === totalPages}>
            Next
          </MDBPaginationLink>
        </MDBPaginationItem>
        <MDBPaginationItem disabled={currentPage === totalPages}>
          <MDBPaginationLink onClick={() => handlePageChange(totalPages)} aria-disabled={currentPage === totalPages}>
            Last
          </MDBPaginationLink>
        </MDBPaginationItem>
      </MDBPagination>
    </div>
  );
}
