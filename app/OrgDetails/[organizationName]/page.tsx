"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function OrgDetails() {
  const organizationName = useParams().organizationName;
  const [orgRepos, setOrgRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [orgImage, setOrgImage] = useState<string | any>(null);
  const [year, setYear] = useState<string | any>(null);
  const [ownerDetails, setOwnerDetails] = useState<any>(null);
  const [newOwnerDetails, setnewOwnerDetails] = useState<any>(null);

  useEffect(() => {
    const fetchOrgRepos = async () => {
      try {
        const response = await fetch(`/api/repos/${organizationName}`);
        const newResponse = await fetch(`https://api.github.com/users/${organizationName}`);
        if (!response.ok || !newResponse.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const newData = await newResponse.json();
        console.log(data);
        setOwnerDetails(data.repos[0].owner);
        setnewOwnerDetails(newData);
        setOrgImage(data.repos[0].owner.avatar_url)
        setOrgRepos(data.repos);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrgRepos();
  }, [organizationName]);

  if (loading) {
    return <div className="spinner"></div>;
  }

  return (
    <div>
      <img src={orgImage} alt={`${organizationName}'s avatar`} style={{ width: '50px', height: '50px' }} />
      <h1>{organizationName}</h1>
      {/* Owner Details */}
      <h4>Owner Details Section</h4>
            <p><strong>Owner Name:</strong> {ownerDetails.login}</p>
            <p><strong>Owner ID:</strong> {ownerDetails.id}</p>
            <p style={{color : "blue"}}> <a href={newOwnerDetails.blog}> {organizationName} Official Website </a></p>
            <p><a href={ownerDetails.html_url} target="_blank" rel="noopener noreferrer" style={{color : "blue"}}>Owner Profile</a></p>
            <p><strong>Owner Type:</strong> {newOwnerDetails.type}</p> 
            <p><strong>Owner Site Admin:</strong> {newOwnerDetails.site_admin ? "Yes" : "No"}</p>
            <p><a href={`https://github.com/orgs/${organizationName}/followers`}>{organizationName} Followers : {newOwnerDetails.followers}</a></p> 
            <p><a href={`https://github.com/orgs/${organizationName}/repositories`}> Public Repositories : {newOwnerDetails.public_repos}</a></p>
            <p>Twitter username : {newOwnerDetails.twitter_username || "No username registered"}</p>
            <p>Contact Email : {newOwnerDetails.email}</p>
            <p>Location : {newOwnerDetails.location || "No Location Registered"}</p>

            <br /><br />
      <ul>
        {orgRepos.map((repo) => (
          <div key={repo.id}>

            <p>Repo Name : <span style={{color : "chocolate"}}><a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a></span></p>
            <p>{repo.full_name}</p>
            <p>{repo.description}</p>
            <p style={{color : "blue"}}><a href={repo.html_url} target="_blank" rel="noopener noreferrer">GitHub Repo url</a></p>
            <p>Created at : {repo.created_at}</p>
            <p>Updated at : {repo.updated_at}</p>
            <p>Pushed at : {repo.pushed_at}</p>
            <p>Issues Open : {repo.open_issues_count}</p>
            <p>Colaborators : <a href={`https://github.com/${repo.name}/graphs/contributors`}></a></p>
            <p style={{color : "blue"}}><a href={`https://github.com/${organizationName}/${repo.name}/issues?q=is%3Aissue+is%3Aopen+no%3Aassignee`}>Open Issues Assigned to Nobody</a></p>
            <p style={{color : "blue"}}><a href={`/OrgDetails/${organizationName}/${repo.name}/issues`} >View the Unassigned Issues</a></p>
            <br />
          </div>
        ))}
      </ul>
    </div>
  );
}
