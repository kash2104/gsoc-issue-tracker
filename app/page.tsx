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
  MDBCol
} from 'mdb-react-ui-kit';

import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import OrgDetails from './components/OrgDetails';


export default function Home() {

  const [organizationData, setOrganizationData] = useState<any>([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/organizations/2024");
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setOrganizationData(data.allOrganizations);
    }
    
    fetchData();
  }, []);

  return (
    <div>
      <Router>
      <h1 style={{ marginBottom: 10, marginTop: 20, textAlign: "center" }}>All the Organizations are listed below</h1>
      <p style={{ marginBottom: 40, textAlign: "center" }}>The organizations for the year 2024 are listed as below</p>
      <MDBRow className='row-cols-1 row-cols-md-3 g-4'>
        {organizationData.map((org: any, index: number) => (
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
                  {org.technologies.map((technology : String) => (
                  <span className='badge bg-success me-1'>{technology}</span>
                ))}
                <div style={{marginBottom : 15}}></div>

                <MDBCardText>Topics</MDBCardText>
                {org.topics.map((topic: string, index: number) => (
                  <span key={index} className='badge bg-primary me-1'>{topic}</span>
                ))}

                {/* Use Link to navigate to dynamic route */}
                <Link to={`/OrgDetails/${org.name}`} className="btn btn-primary">
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
      </Router>
    </div>
  );
}
