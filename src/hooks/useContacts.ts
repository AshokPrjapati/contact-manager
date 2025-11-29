"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../app/store";
import {
  selectAllContacts,
  setContacts,
} from "../features/contacts/contactSlice";

const STORAGE_KEY = "contact_manager_contacts";

export function useContacts() {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector(selectAllContacts);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const savedContacts = localStorage.getItem(STORAGE_KEY);
    if (savedContacts) {
      try {
        const parsed = JSON.parse(savedContacts);
        dispatch(setContacts(parsed));
      } catch (error) {
        console.error("Failed to load contacts:", error);
      }
    }
  }, [dispatch]);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return contacts;
}
