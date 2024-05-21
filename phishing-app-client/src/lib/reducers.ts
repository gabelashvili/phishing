import { combineReducers } from "redux";
import baseApi from "./features/apis/baseApi";
import auth from "./features/slices/authSlice";

export default combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth,
});
