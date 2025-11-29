import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Contact } from "./types";

interface ContactsState {
  items: Contact[];
}

const initialState: ContactsState = {
  items: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {},
});

export const {} = contactsSlice.actions;

// Selectors
export const selectAllContacts = (state: RootState) => state.contacts.items;
export default contactsSlice.reducer;
