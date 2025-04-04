import React, { Component } from "react";
import { nanoid } from "nanoid";

import style from "./App.module.css";

import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchContact from "./SearchContact/SearchContact";

export class App extends Component {
  state = {
    contacts: [
      {id: 'id-1', name: 'Rosie Simpson', number: '459-12-56'},
      {id: 'id-2', name: 'Hermione Kline', number: '443-89-12'},
      {id: 'id-3', name: 'Eden Clements', number: '645-17-79'},
      {id: 'id-4', name: 'Annie Copeland', number: '227-91-26'},
    ],
    name: "",
    number: "",
    filter: "", 
  };
  

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  addContact = () => {
    const { name, number, contacts } = this.state;

    if (name.trim() === "" || number.trim() === "") return;

    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = { id: nanoid(), name, number };

    this.setState({
      contacts: [...contacts, newContact],
      name: "",
      number: "",
    });
  };

  changeFilter = event => {
    this.setState({ filter: event.target.value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(({ name }) => {
      return name.includes(normalizedFilter);
    });
  };

  deleteContact = (id) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  }

  render() {
    const { filter } = this.state;

    const filteredContacts = this.getVisibleContacts();

    return (
      <div className={style.container}>
      <h1 className={style.title}>Phonebook</h1>
      <ContactForm
        name={this.state.name}
        number={this.state.number}
        onInputChange={this.handleInputChange}
        onAddContact={this.addContact}
      />
      <h2 className={style.subtitle}>Contacts</h2>
      <SearchContact value={filter} onFilterChange={this.changeFilter} />
      <ContactList contacts={filteredContacts} onDelete={this.deleteContact} />
      </div>
    );
  }
}

export default App;
