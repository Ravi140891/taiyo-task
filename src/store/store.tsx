import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

export interface RootState {
  contact: {
    contacts: Contact[];
  };
}

const store = configureStore({
  reducer: {
    contact: contactReducer,
  },
});

export default store;
