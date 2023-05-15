import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import css from './ContactForm.module.css';
import { addContact } from '../../redux/contactsSlice';
import { getContacts } from '../../redux/selectors';
import Notiflix from 'notiflix';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const duplicationNameCheck = newName => {
    return contacts.find(({ name }) => name === newName);
  };

  const duplicationNumberCheck = newNumber => {
    return contacts.find(({ number }) => number === newNumber);
  };

  function handleInputChange(e) {
    const { name, value } = e.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        break;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (duplicationNameCheck(name) || duplicationNumberCheck(number)) {
      Notiflix.Notify.failure(`This number is already in Сontacts`);
      return;
    }

    dispatch(addContact({ name, number }));
    reset();
  }

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={css.formItem}>
        <input
          className={css.input}
          value={name}
          onChange={handleInputChange}
          placeholder="write your name"
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </div>
      <div className={css.formItem}>
        <input
          className={css.input}
          value={number}
          onChange={handleInputChange}
          placeholder="+3** ** ** ** ***"
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </div>
      <button className={css.button} type="submit" aria-label="button-submit">
        Add contact
      </button>
    </form>
  );
}
