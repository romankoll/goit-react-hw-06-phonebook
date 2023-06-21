import React, { useState } from 'react';

import css from 'components/ContactForm/ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from 'redux/contactsSlice';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const dispatch = useDispatch();
  const contacts = useSelector(getContacts);

  const handleInputChange = ({ target: { name, value } }) => {
    const normalizedValue = value.toLowerCase();

    if (name === 'number') {
      if (value && !/^[0-9\s()+-]+$/.test(value)) {
        alert(
          'Номер телефону повинен містити лише цифри та може містити пробіли, тире, дужки і може починатись з +'
        );
        return;
      }

      if (contacts.some(contact => contact.number === value)) {
        alert(`${value} вже є у списку контактів`);
        return;
      } else {
        setNumber(value);
      }
    }

    if (name === 'name') {
      if (value && !/^[a-zA-Zа-яА-Я\s'-]+$/.test(value)) {
        alert(
          "Ім'я може містити лише літери, апостроф, тире та пробіли. Наприклад, Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        );
        return;
      }

      if (
        contacts.some(
          contact =>
            contact.name.toLowerCase() === normalizedValue &&
            contact.name.toLowerCase() !== normalizedValue
        )
      ) {
        alert(`${value} вже є у списку контактів`);
        return;
      } else {
        setName(value);
      }
    }
  };

  // const handleInputChange = ({ target: { name, value } }) => {
  //   const normalizedValue = value.toLowerCase();
  //   if (name === 'number')
  //     if (contacts.some(contact => contact.number === value)) {
  //       return alert(`${value} is already in contacts`);
  //     } else setNumber(value);
  //   if (name === 'name')
  //     if (
  //       contacts.some(contact => contact.name.toLowerCase() === normalizedValue)
  //     ) {
  //       return alert(`${value} is already in contacts`);
  //     } else setName(value);
  // };

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleFormSubmit = evt => {
    evt.preventDefault();
    dispatch(addContact(name, number));
    reset();
  };

  return (
    <div className={css.formContainer}>
      <form action="" onSubmit={handleFormSubmit}>
        <div className={css['form-label']}>
          <label htmlFor="name">Name</label>
          <input
            value={name}
            type="text"
            id="name"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={handleInputChange}
          />
        </div>

        <div className={css['form-label']}>
          <label htmlFor="number">Number</label>
          <input
            value={number}
            type="tel"
            id="number"
            name="number"
            pattern="^[0-9]+$"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={handleInputChange}
          />
        </div>

        <input
          className={css['form-submit']}
          type="submit"
          value="Add contact"
        />
      </form>
    </div>
  );
};

export default ContactForm;
