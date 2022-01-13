import { useState, useEffect } from 'react';

import Form from './components/Form';
import SearchContact from './components/SearchContact';
import ContactList from './components/ContactList';
import s from './components/Phone.module.css';

export default function Mobile() {
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem('contacts')) ?? [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = Newcontact => {
    setContacts([Newcontact, ...contacts]);
  };

  const veluesFilter = e => {
    const { value } = e.currentTarget;
    setFilter(value);
  };

  const getFilter = () => {
    const filterValues = filter.toLowerCase();

    return contacts.filter(contact => contact.name.toLowerCase().includes(filterValues));
  };

  const oncheckName = (newName, numbers) => {
    return contacts.some(({ name }) => name === Object.values(newName).join(''));
  };

  const deletedContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className={s.container}>
      <h1 className={s.headingForm}>Phoneboock</h1>
      <Form onSubmit={addContact} contactList={oncheckName} />
      <h2 className={s.contactList}>Contacts</h2>
      <SearchContact value={filter} SearchContact={veluesFilter} />
      <ContactList contactList={getFilter()} onDeleted={deletedContact} />
    </div>
  );
}
