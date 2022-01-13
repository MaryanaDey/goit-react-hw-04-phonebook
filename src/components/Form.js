import { useState } from 'react';

import shortid from 'shortid';
import s from './Phone.module.css';

export default function Form({ contactList, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const InputValue = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const addContact = e => {
    const lengthInputNameChech = name.length;
    const lengthInputNumberChech = number.length;

    e.preventDefault();
    if (lengthInputNameChech < 2 || lengthInputNumberChech > 10) {
      alert('Введите имя больше 1-го символам и не больше 10');
      return;
    }
    if (lengthInputNumberChech < 7 || lengthInputNumberChech > 10) {
      alert('Введите номер больше 7 и меньше 10');
      return;
    }

    const checkName = contactList(name);
    if (checkName) {
      alert('Это имя уже существует');

      return;
    }

    onSubmit({
      id: shortid.generate(),
      name,
      number,
    });
    resetInputvalues();
  };

  const resetInputvalues = () => {
    setName('');
    setNumber('');
  };

  const idName = shortid.generate();
  const idNumber = shortid.generate();

  return (
    <form className={s.form} onSubmit={addContact}>
      <label htmlFor={idName} className={s.labelName}>
        Name
      </label>

      <input
        id={idName}
        type="text"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        name="name"
        value={name}
        placeholder="Name"
        onChange={InputValue}
        autoComplete="off"
      />

      <label htmlFor={idNumber} className={s.labelNumber}>
        Number
      </label>

      <input
        id={idNumber}
        type="number"
        pattern="^[ 0-9]+$"
        name="number"
        value={number}
        placeholder="(0xx) xxx-xx-xx"
        onChange={InputValue}
        autoComplete="off"
      />

      <button type="submite" className={s.btnForm}>
        Add contact
      </button>
    </form>
  );
}
