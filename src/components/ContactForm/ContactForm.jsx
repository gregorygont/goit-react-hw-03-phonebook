import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { nanoid } from 'nanoid';
import { BsFillTelephoneFill, BsPersonFill } from 'react-icons/bs';
import { IoMdPersonAdd } from 'react-icons/io';
import PropTypes from 'prop-types';

import {
  Form,
  FormField,
  FieldFormik,
  ErrorMessage,
  StyledButton,
  LabelWrapper,
} from './ContactForm.styled';

const schema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .matches(
      /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
      'Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d`Artagnan'
    )
    .required(),
  number: yup
    .string()
    .trim()
    .matches(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
      'Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
    )
    .required(),
});

// Код вище містить опис форми зв'язку (Contact Form) разом з валідацією введених даних за допомогою бібліотеки yup.
// Валідація пройде два поля:
// Поле "name":
// Це обов'язкове поле (required()), тобто користувач повинен ввести щось у це поле.
// Введені дані будуть перевірені на відповідність регулярному виразу (matches()) для перевірки правильності формату.
// Регулярний вираз: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/
// Цей регулярний вираз перевіряє, чи введене ім'я містить тільки літери, апостроф, тире та пробіли.
// Поле "number":
// Це також обов'язкове поле (required()).
// Введені дані будуть перевірені на відповідність регулярному виразу (matches()) для перевірки правильності формату.
// Регулярний вираз: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
// Цей регулярний вираз перевіряє, чи номер містить лише цифри та може містити пробіли, тире та дужки.
// Номер також може починатись з "+", що дозволяє використання формату міжнародних номерів телефонів.
// Цей код описує схему валідації для форми.

export const ContactForm = ({ onAddContact }) => {
  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={(values, { resetForm }) => {
        onAddContact({ id: nanoid(), ...values });
        resetForm();
      }}
      validationSchema={schema}
    >
      <Form autoComplete="off">
        <FormField htmlFor="name">
          <LabelWrapper>
            <BsPersonFill />
            Name
          </LabelWrapper>
          <FieldFormik
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage name="name" component="span" />
        </FormField>
        <FormField htmlFor="number">
          <LabelWrapper>
            <BsFillTelephoneFill /> Number
          </LabelWrapper>
          <FieldFormik
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage name="number" component="span" />
        </FormField>
        <StyledButton type="submit">
          <IoMdPersonAdd size="16" />
          Add contact
        </StyledButton>
      </Form>
    </Formik>
  );
};

ContactForm.propType = {
  onSubmit: PropTypes.func.isRequired,
};


// Цей код є реалізацією компонента ContactForm, який відповідає за відображення форми для додавання контактів з ім'ям
// та номером телефону. Він використовує бібліотеку Formik для управління станом форми та валідацією введених даних
// згідно з попередньо визначеною схемою schema яка використовує бібліотеку yup.
// Визначається компонент ContactForm, який отримує проп onAddContact. Цей проп передається з батьківського компонента
// і буде викликатися, коли користувач успішно додасть новий контакт. Функція onSubmit компонента Formik буде викликатися
// при відправці форми.
// У компоненті Formik визначаються початкові значення форми (пусті рядки для name та number).
// Якщо користувач натисне на кнопку "Add contact" і дані проходять валідацію (відповідають схемі schema), то буде
// виконана функція onSubmit. Вона викликає onAddContact з об'єктом, який містить id (згенерований за допомогою nanoid())
// та введені name та number.
// Всі поля форми зв'язані зі станом форми, а також з валідацією, виконаною за допомогою yup. Кожне поле має свої
// власні мітки (LabelWrapper) та виводить помилки валідації, якщо необхідно.
// Кнопка "Add contact" (StyledButton) має тип submit, що дозволяє відправляти форму при натисканні.
// Вся форма охоплена компонентом Form з вимкненим автозаповненням (autoComplete="off").
// Коли користувач заповнює форму та натискає кнопку "Add contact", валідація буде автоматично перевіряти дані.
// Якщо дані коректні, буде викликана функція onAddContact з новим контактом, а форма буде очищена (поля name та number
// стають пустими рядками). Якщо дані некоректні, будуть відображені повідомлення про помилки відповідних полів.





