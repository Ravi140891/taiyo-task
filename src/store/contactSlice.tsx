import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define an interface for a contact object
interface Contact {
id: number;
firstName: string;
lastName: string;
status: string;
}

// Define an interface for the contact slice state
interface ContactState {
contacts: Contact[];
}

// Define the initial state for the contact slice
const initialState: ContactState = {
contacts: [],
};

// Create the contact slice using createSlice from Redux Toolkit
const contactSlice = createSlice({
name: "contact", // Name of the slice
initialState, // Initial state of the slice
reducers: {
// Define reducer functions for adding, editing and removing contacts
addContact(state, action: PayloadAction<Contact>) {
state.contacts.push(action.payload);
},
editContact(state, action: PayloadAction<Contact>) {
const index = state.contacts.findIndex(
(contact) => contact.id === action.payload.id
);
if (index !== -1) {
state.contacts[index] = action.payload;
}
},
removeContact(state, action: PayloadAction<number>) {
state.contacts = state.contacts.filter(
(contact) => contact.id !== action.payload
);
},
},
});

// Export the reducer and actions from the slice
export const { addContact, editContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;
