import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Contact {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
}

interface ContactState {
  contacts: Contact[];
}

const initialState: ContactState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
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

export const { addContact, editContact, removeContact } = contactSlice.actions;
export default contactSlice.reducer;
