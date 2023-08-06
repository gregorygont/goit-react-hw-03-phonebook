import React from 'react';
import PropTypes from 'prop-types';
import { IoPersonRemove } from 'react-icons/io5';
import { Btn, Item, List } from './ContactList.styled';

export const ContactList = ({ contacts, onDelete }) => {
  //console.log(contacts);
  return (
    <List>
      {contacts.map(({ name, number, id }) => {
        return (
          <Item key={id}>
            <span>{name}:</span>
            <span>{number}</span>

            <Btn type="button" onClick={() => onDelete(id)}>
              <IoPersonRemove size="16" />
            </Btn>
          </Item>
        );
      })}
    </List>
  );
};

// Компонент ContactList приймає два пропи: contacts та onDelete.
// У компоненті використовується метод map для перебору масиву contacts і створення нового масиву з відповідних елементів.
// Кожен контакт (представлений об'єктом) буде відображений в своєму власному компоненті Item.
// Кожен Item включає в себе ім'я (name), номер телефону (number) та кнопку для видалення контакту.
// Для кожного контакту використовується його унікальний id як ключ (key) для елемента Item, щоб забезпечити ефективне
// оновлення списку.
// Кнопка видалення (Btn) має прив'язаний до себе обробник події onClick, який буде викликатися при натисканні на
// кнопку. У даному випадку, викликається функція onDelete(id) з ідентифікатором контакту (id), що дозволяє
// батьківському компоненту зреагувати на видалення контакту.
// Кожен контакт буде відображений як span, що містить ім'я та номер телефону.

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ),
  onDelete: PropTypes.func.isRequired,
};
