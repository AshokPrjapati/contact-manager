import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Contact } from "./types";

interface ContactsState {
  items: Contact[];
  selectedIds: string[];
}

const initialState: ContactsState = {
  items: [],
  selectedIds: [],
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setContacts: (state, action: PayloadAction<Contact[]>) => {
      state.items = action.payload;
    },
    addContact: (state, action: PayloadAction<Contact>) => {
      state.items.push(action.payload);
    },
    updateContact: (state, action: PayloadAction<Contact>) => {
      const index = state.items.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((c) => c.id !== action.payload);
      state.selectedIds = state.selectedIds.filter(
        (id) => id !== action.payload
      );
    },
    deleteBulk: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter((c) => !action.payload.includes(c.id));
      state.selectedIds = [];
    },
    toggleSelected: (state, action: PayloadAction<string>) => {
      const index = state.selectedIds.indexOf(action.payload);
      if (index >= 0) {
        state.selectedIds.splice(index, 1);
      } else {
        state.selectedIds.push(action.payload);
      }
    },
    selectAll: (state) => {
      state.selectedIds = state.items.map((c) => c.id);
    },
    clearSelected: (state) => {
      state.selectedIds = [];
    },
  },
});

export const {
  setContacts,
  addContact,
  updateContact,
  deleteContact,
  deleteBulk,
  toggleSelected,
  selectAll,
  clearSelected,
} = contactsSlice.actions;

// Selectors
export const selectAllContacts = (state: RootState) => state.contacts.items;
export const selectSelectedIds = (state: RootState) =>
  state.contacts.selectedIds;
export const selectSelectedCount = (state: RootState) =>
  state.contacts.selectedIds.length;

export default contactsSlice.reducer;
