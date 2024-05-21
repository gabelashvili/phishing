import { Middleware } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import toast from "react-hot-toast";
import { logOut } from "../slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000/",
  prepareHeaders: async (headers) => {
    headers.set("authorization", `Bearer ${localStorage.getItem("token")}`);

    return headers;
  },
});

export const rtkQueryErrorLogger: Middleware = (api) => (next) => (action: any) => {
  if (action.type.includes("rejected")) {
    let errorMessage = "Something went wrong";
    if (typeof action?.payload?.data?.message === "string") {
      errorMessage = action?.payload?.data?.message;
    }
    if (typeof action?.payload?.data?.message === "object") {
      errorMessage = action?.payload?.data?.message[0];
    }
    if(action.payload.status === 401) {
      api.dispatch(logOut())
    }
    
    toast.error(errorMessage);
  }

  return next(action);
};

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery,
  endpoints: () => ({}),
});

export default baseApi;
