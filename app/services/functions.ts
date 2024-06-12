import toast from "react-hot-toast";
import { apiConnector } from "../utils/apiConnector";
import redis from "./redisClient";
import { NextResponse } from "next/server";

//caching function
interface fetchFunction {
  (...args: any[]): Promise<any>;
}

export async function cache(
  url: fetchFunction,
  key: string,
  retryCount: number,
  ...args: any[]
) {
  try {
    //check if the data is available in redis
    const cachedData = await redis.get(key);

    if (cachedData) {
      console.log("Cached data from redis");
      return JSON.parse(cachedData);
    }

    //if data is not available in redis
    const data = await url(...args);

    //storing the data in redis for future extraction
    await redis.setex(key, 7200, JSON.stringify(data));

    return data;
  } catch (error: any) {
    console.error("Error while caching the data", error);

    if (retryCount > 0 && error.response && error.response.status === 403) {
      // Rate limit error
      // Implement exponential backoff
      await new Promise((resolve) =>
        setTimeout(resolve, 1000 * (4 - retryCount))
      );
      return cache(url, key, retryCount - 1);
    }
    throw error;
  }
}

//getting all the organizations
export async function getAllOrganizations(year: String) {
  if (!year) {
    return NextResponse.json({
      success: false,
      message: "Please enter year for getting the GSOC organizations",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.ALL_ORGANIZATIONS_API}${year}.json`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message: "No organizations found for this year",
    });
  }

  return response.data;
}

//getting the repos of 1 organization
export async function organizationRepos(name: String) {
  if (!name) {
    return NextResponse.json({
      success: false,
      message: "Enter organization name to get the repos",
    });
  }

  const response = await apiConnector(
    "GET",
    `${process.env.ORGANIZATION_REPO_API}${name}/repos`,
    null,
    null,
    null
  );

  if (!response) {
    return NextResponse.json({
      success: false,
      message:
        "No repos found for this organization. Please check the name of the organization",
    });
  }

  return response.data;
}
