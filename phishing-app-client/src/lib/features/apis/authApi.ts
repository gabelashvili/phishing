import { ILoginResponse, IAuth } from "../../../@types/user";
import baseApi from "./baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    register: build.mutation<ILoginResponse, IAuth>({
      query: (arg) => ({
        url: "auth/register",
        method: "POST",
        body: arg,
      }),
    }),
    login: build.mutation<ILoginResponse, IAuth>({
      query: (arg) => ({
        url: "auth/login",
        method: "POST",
        body: arg,
      }),
    }),
    ping: build.mutation<ILoginResponse, void>({
      query: (arg) => ({
        url: "auth/ping",
        method: "POST",
        body: arg,
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  usePingMutation
} = authApi;
export default authApi;