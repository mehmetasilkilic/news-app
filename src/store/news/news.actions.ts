import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

type NewsAPIFetchParams = {
  endpoint: string;
  q?: string;
  page?: number;
  pageSize?: number;
  category?: string;
  from?: Date | null;
  to?: Date | null;
};

type GuardianFetchParams = {
  q?: string;
  page?: number;
  tag?: string;
  "page-size"?: number;
  "from-date"?: Date | null;
  "to-date"?: Date | null;
};

type NYTimesFetchParams = {
  endpoint: string;
  q?: string;
  page?: number;
  fq?: string;
  begin_date?: Date | null;
  end_date?: Date | null;
};

const generateNewsAPIUrl = (params: NewsAPIFetchParams) => {
  const baseUrl = "https://newsapi.org/v2";
  const newsAPIKey = "2c2ceb1d9ddd4c2d9cc90c88beb9459c";
  const endpoint = params.endpoint;

  const queryParams = Object.entries(params)
    .filter(([key, value]) => key !== "endpoint" && value !== undefined)
    .map(([key, value]) => `${key}=${value}`);

  const queryString = queryParams.join("&");

  const url = `${baseUrl}/${endpoint}?${queryString}&apiKey=${newsAPIKey}`;
  return url;
};

const generateGuardianAPIUrl = (params: GuardianFetchParams) => {
  const baseUrl = "https://content.guardianapis.com/search";
  const guardianKey = "b8a48d7a-80cd-4547-9d24-5ee5d7c607ed";

  const queryParams = Object.entries(params)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value]) => `${key}=${value}`);

  const queryString = queryParams.join("&");

  const url = `${baseUrl}?${queryString}&api-key=${guardianKey}&show-fields=thumbnail,productionOffice,trailText`;
  return url;
};

const generateNYTimesAPIUrl = (params: NYTimesFetchParams) => {
  const baseUrl = "https://api.nytimes.com/svc";
  const nYTimesKey = "AlguiPMcuqwOmTeGvVzbXGwu4GqXMH2N";
  const endpoint = params.endpoint;
  /* mostpopular/v2/viewed/1.json */
  const queryParams = Object.entries(params)
    .filter(([key, value]) => key !== "endpoint" && value)
    .map(([key, value]) => {
      if (key === "fq") {
        return `fq=news_desk:("${value}")`;
      } else if (key === "begin_date" || key === "end_date") {
        return `${key}=${String(value).replace(/\//g, "")}`;
      } else {
        return `${key}=${value}`;
      }
    });

  const queryString = queryParams.join("&");

  const url = `${baseUrl}/${endpoint}?${queryString}&api-key=${nYTimesKey}`;
  return url;
};

const fetchNewsAPIData = createAsyncThunk(
  "news/fetchNewsAPIData",
  async (args: NewsAPIFetchParams, { rejectWithValue }) => {
    const url = generateNewsAPIUrl(args);
    try {
      const response = await axios.get(url);
      return response;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

const fetchGuardianData = createAsyncThunk(
  "news/fetchGuardianData",
  async (args: GuardianFetchParams, { rejectWithValue }) => {
    const url = generateGuardianAPIUrl(args);
    try {
      const response = await axios.get(url);
      return response;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

const fetchNYTimesData = createAsyncThunk(
  "news/fetchNYTimesData",
  async (args: NYTimesFetchParams, { rejectWithValue }) => {
    const url = generateNYTimesAPIUrl(args);
    try {
      const response = await axios.get(url);
      return response;
    } catch (e) {
      throw rejectWithValue(e);
    }
  }
);

export const newsActions = {
  fetchNewsAPIData,
  fetchGuardianData,
  fetchNYTimesData,
};
