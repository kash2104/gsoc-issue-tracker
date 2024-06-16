import Link from "next/link";
import React from "react";

type RepoCardProps = {
  name: string;
  description: string;
  link: string;
  issues: number;
  createdAt: string;
};

const RepoCard = ({
  name,
  description,
  link,
  issues,
  createdAt,
}: RepoCardProps) => {
  return (
    <div className="flex flex-col p-4 bg-gray-100 rounded-lg shadow-md border border-gray-200">
      <p className="text-gray-500 text-sm mb-2">
        Created At: {createdAt.split("T")[0]}
      </p>

      <h2 className="text-xl font-bold text-gray-800 mb-2">{name}</h2>

      <p className="text-gray-700 mb-4">{description}</p>

      <p className="text-gray-700 font-medium mb-4">Open Issues: {issues}</p>

      <div>
        <Link href={link} target="blank">
          <p className="text-blue-500">Go To Issues</p>
        </Link>
      </div>
    </div>
  );
};

export default RepoCard;
