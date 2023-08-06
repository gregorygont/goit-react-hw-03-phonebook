import React from 'react';
import { BsSearch } from 'react-icons/bs';
import { Input, LabelDescr } from './Filter.styled';
import { LabelWrapper } from 'components/ContactForm/ContactForm.styled';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => (
  <LabelDescr>
    <LabelWrapper>
      <BsSearch size="16" /> Find contacts by name
    </LabelWrapper>
    <Input type="text" value={value} onChange={onChange} placeholder="search" />
  </LabelDescr>
);

export default Filter;

// Компонент Filter відображає елементи форми, які дозволяють виконувати пошук контактів за ім'ям.
// У компоненті використовується компонент LabelDescr, який, описує мітку та опис для поля пошуку.
// Елемент <LabelWrapper> включає в себе значок (іконку) пошуку (представлену як BsSearch іконка з бібліотеки
// Bootstrap Icons) та текст "Find contacts by name". Це надає інструкції користувачу щодо того, як користуватись
// полем для пошуку.
// Елемент <Input> відображає поле вводу тексту, яке дозволяє користувачеві вводити ім'я контакту для фільтрації.
// Значення поля вводу тексту (value) передається через проп value, а також встановлюється атрибут value елементу
// <Input>, щоб зберігати та показувати поточне значення поля.
// Коли користувач вводить текст у поле пошуку, спрацьовує подія onChange, яка передається через проп onChange.
// Функція onChange повинна бути визначена в батьківському компоненті, і вона буде викликатися з новим значенням поля
// при кожній зміні.


Filter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};
