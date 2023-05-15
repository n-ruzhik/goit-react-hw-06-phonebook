import { createSlice, nanoid } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

export const contactsSlice = createSlice({
  name: 'contacts',
  initialState: { contactsArr: [] },
  reducers: {
    addContact: {
      reducer(state, action) {
        state.contactsArr.push(action.payload);
      },
      prepare({ name, number }) {
        return {
          payload: {
            name,
            number,
            id: nanoid(),
          },
        };
      },
    },
    deleteContact: (state, action) => {
      const index = state.contactsArr.findIndex(
        contact => contact.id === action.payload
      );
      state.contactsArr.splice(index, 1);
    },
  },
});

const persistConfig = {
  key: 'contacts',
  storage,
};

export const contactsReducer = persistReducer(
  persistConfig,
  contactsSlice.reducer
);

export const { addContact, deleteContact } = contactsSlice.actions;
export const getContacts = state => state.contacts.contactsArray;
