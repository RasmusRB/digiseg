import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  AudiencesResponse,
  CountriesResponse,
  PlatformsResponse,
} from "./types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
const BASEURL = API_URL + "/taxonomy";

export const digisegApi = createApi({
  reducerPath: "digisegApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASEURL,
  }),
  tagTypes: ["Countries", "Platforms", "Audiences"],
  endpoints: (builder) => ({
    getCountries: builder.query<CountriesResponse, void>({
      query: () => "/countries",
      providesTags: ["Countries"],
    }),
    getPlatforms: builder.query<PlatformsResponse, void>({
      query: () => "/audience_platforms",
      providesTags: ["Platforms"],
    }),
    getAudiences: builder.query<
      AudiencesResponse,
      { country: string; platform: string }
    >({
      query: ({ country, platform }) => ({
        url: "/audiences",
        params: {
          country,
          platform,
        },
      }),
      providesTags: ["Audiences"],
    }),
  }),
});

export const {
  useGetCountriesQuery,
  useGetPlatformsQuery,
  useGetAudiencesQuery,
} = digisegApi;
