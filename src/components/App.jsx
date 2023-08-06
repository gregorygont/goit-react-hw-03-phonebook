import React, { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import initialContacts from './contacts.json';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ContactList } from './ContactList/ContactList';
import { Header } from './Header/Header';
import Filter from './Filter/Filter';

const notifyOptions = {
  position: 'bottom-left',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export default class App extends Component {
  state = {
    contacts: initialContacts,
    filter: '',
  };

  addContact = newContact => {
    this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().trim() ===
          newContact.name.toLowerCase().trim() ||
        contact.number.trim() === newContact.number.trim()
    ).length
      ? toast.error(`${newContact.name}: is already in contacts`, notifyOptions)
      : this.setState(prevState => {
          return {
            contacts: [newContact, ...prevState.contacts],
          };
        });
  };

  deleteContact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(
          contact => contact.id !== contactId
        ),
      };
    });
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Layout>
        <Section title="Phonebook">
          <ContactForm onAddContact={this.addContact} />
          <Header title="Contacts" />
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactList
            contacts={visibleContacts}
            onDelete={this.deleteContact}
          />
        </Section>
        <ToastContainer />
        <GlobalStyle />
      </Layout>
    );
  }
}

// addContact: Цей метод додає новий контакт до списку контактів (contacts). Він перевіряє, чи вже існує контакт із
// таким же ім'ям або номером телефону у списку контактів. Якщо контакт вже існує, то відображається сповіщення про
// помилку за допомогою бібліотеки react-toastify (toast.error(...)) зі спеціально визначеними параметрами notifyOptions.
//  У протилежному випадку контакт додається до списку контактів за допомогою this.setState(...).
// deleteContact: Цей метод видаляє контакт зі списку контактів (contacts). Використовуючи this.setState(...),
// він оновлює стан додатку, фільтруючи контакти за допомогою prevState.contacts.filter(...).
// changeFilter: Цей метод викликається при зміні тексту у полі фільтрації. Він оновлює стан додатку filter
// зі значенням, яке користувач ввів у полі пошуку.
// getVisibleContacts: Цей метод фільтрує контакти за значенням, яке ввів користувач у полі фільтрації. Він повертає
// масив контактів, які містять введений користувачем текст у своєму імені.
// render: Цей метод відповідає за відображення додатку. Він містить JSX, який відображає заголовок "Phonebook",
// форму додавання контакту (ContactForm), заголовок "Contacts", поле фільтрації (Filter) та список контактів (ContactList).
// Компонент ContactForm отримує метод addContact як проп onAddContact, а компонент ContactList отримує метод deleteContact
// як проп onDelete. Додатково, в компоненті використовується react-toastify, і для відображення сповіщень використовується
// компонент ToastContainer.
// Цей код створює простий додаток "Phonebook" з можливістю додавання, видалення та фільтрації контактів за ім'ям.
