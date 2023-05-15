import { useSelector } from 'react-redux';
import { getContacts, getFilterByQuery } from '../../redux/selectors';
import ContactItem from '../ContactItem';
import css from './ContactList.module.css';

const getVisibleContacts = (contacts, query) => {
  return contacts.filter(({ name }) =>
    name.toLowerCase().includes(query.toLowerCase())
  );
};

const ContactList = () => {
  const contacts = useSelector(getContacts);
  const query = useSelector(getFilterByQuery);
  const visibleContacts = getVisibleContacts(contacts, query);

  return (
    <ul className={css.list}>
      {contacts &&
        visibleContacts.map(contact => (
          <ContactItem key={contact.id} {...contact} />
        ))}
    </ul>
  );
};

export default ContactList;
