import toast from "react-hot-toast";
import { apiConnector } from "../utils/apiConnector";
import redis from "./redisClient";

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
    toast.error("Please enter year");
    toast.dismiss();
  }

  const response = await apiConnector(
    "GET",
    `${process.env.ALL_ORGANIZATIONS_API}${year}.json`,
    null,
    null,
    null
  );

  if (!response) {
    toast.error("Error while fetching all organizations");
    toast.dismiss();

    return;
  }

  return response.data;
}
