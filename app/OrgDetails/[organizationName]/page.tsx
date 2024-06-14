"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";

export default function OrgDetails() {
  const router = useRouter();
  const organizationName = useParams().organizationName;
  const [orgRepos, setOrgRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrgRepos = async () => {
      try {
        const response = await fetch(`/api/repos/${organizationName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
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
      <h1>{organizationName}</h1>
      <ul>
        {orgRepos.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
}
