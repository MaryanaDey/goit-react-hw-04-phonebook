import React from 'react';

import Form from './components/Form';
import SearchContact from './components/SearchContact';
import ContactList from './components/ContactList';
import s from './components/Phone.module.css';

export default class Mobile extends React.Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      console.log('Обновить');
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }
  componentDidMount() {
    const getStorageContacts = localStorage.getItem('contacts');
    const parsStorageContacts = JSON.parse(getStorageContacts);
    if (getStorageContacts) {
      this.setState({ contacts: parsStorageContacts });
    }
  }

  addContact = contact => {
    this.setState({
      contacts: [contact, ...this.state.contacts],
    });
  };

  veluesFilter = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  getFilter = () => {
    const { filter, contacts } = this.state;
    const filterValues = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(filterValues));
  };

  oncheckName = (newName, numbers) => {
    return this.state.contacts.some(({ name }) => name === Object.values(newName).join(''));
  };

  deletedContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const filterContact = this.getFilter();

    return (
      <div className={s.container}>
        <h1 className={s.headingForm}>Phoneboock</h1>
        <Form onSubmit={this.addContact} contactList={this.oncheckName} />
        <h2 className={s.contactList}>Contacts</h2>
        <SearchContact value={this.state.filter} SearchContact={this.veluesFilter} />
        <ContactList contactList={filterContact} onDeleted={this.deletedContact} />
      </div>
    );
  }
}
