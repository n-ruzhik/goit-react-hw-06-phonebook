import { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';
import { nanoid } from 'nanoid';

export default function App() {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  //  ---------------  Замість didMount && didUpdate в useLocalStorage додали useEffect  ---------------
  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts')
  //   const parsedContacts = JSON.parse(contacts);

  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //    localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
  //  }
  // }

  const duplicationCheck = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const addContact = ({ name, number }) => {
    if (!duplicationCheck(name)) {
      const contact = {
        id: nanoid(),
        name,
        number,
      };

      setContacts(prevContacts => [contact, ...prevContacts]);
      return;
    }

    alert('This name is already in Contacts');
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const getVisibleContacts = () => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase()) ||
        contact.number.includes(filter)
    );
  };

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList
        contacts={getVisibleContacts()}
        onDeleteContact={deleteContact}
      />
    </>
  );
}
