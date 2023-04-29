// Importing configureStore function from Redux Toolkit
import { configureStore } from "@reduxjs/toolkit";

// Importing contactReducer function from contactSlice.ts file
import contactReducer from "./contactSlice";

// Creating an interface for Contact object
interface Contact {
id: number;
firstName: string;
lastName: string;
status: string;
}

// Creating RootState interface which contains the contact slice
export interface RootState {
contact: {
contacts: Contact[];
};
}

// Creating a store by calling configureStore function which accepts an object with reducer
const store = configureStore({
reducer: {
contact: contactReducer, // contact slice reducer
},
});

// Exporting the store
export default store;