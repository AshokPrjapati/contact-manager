import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { setContacts } from "../features/contacts/contactSlice";

const LOCAL_STORAGE_KEY = "contact-manager-contacts";

export const useLocalStorage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const contacts = useSelector((state: RootState) => state.contacts.items);

  useEffect(() => {
    try {
      const savedContacts = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedContacts) {
        const parsedContacts = JSON.parse(savedContacts);
        if (Array.isArray(parsedContacts)) {
          dispatch(setContacts(parsedContacts));
        }
      }
    } catch (error) {
      console.warn("Failed to load contacts from localStorage:", error);
    }
  }, [dispatch]);

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
    } catch (error) {
      console.warn("Failed to save contacts to localStorage:", error);
    }
  }, [contacts]);

  return null;
};
