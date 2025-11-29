import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Contact } from "./types";

interface ContactsState {
  items: Contact[];
  selectedIds: Set<string>;
}

const initialState: ContactsState = {
  items: [],
  selectedIds: new Set<string>(),
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
      state.selectedIds.delete(action.payload);
    },
    deleteBulk: (state, action: PayloadAction<string[]>) => {
      state.items = state.items.filter((c) => !action.payload.includes(c.id));
      state.selectedIds.clear();
    },
    toggleSelected: (state, action: PayloadAction<string>) => {
      if (state.selectedIds.has(action.payload)) {
        state.selectedIds.delete(action.payload);
      } else {
        state.selectedIds.add(action.payload);
      }
    },
    selectAll: (state) => {
      state.items.forEach((c) => state.selectedIds.add(c.id));
    },
    clearSelected: (state) => {
      state.selectedIds.clear();
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
  Array.from(state.contacts.selectedIds);
export const selectSelectedCount = (state: RootState) =>
  state.contacts.selectedIds.size;

export default contactsSlice.reducer;
