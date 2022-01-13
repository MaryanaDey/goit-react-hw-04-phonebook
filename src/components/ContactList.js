import React from 'react';
import PropTypes from 'prop-types';
import s from './Phone.module.css';

export default function СontactList({ contactList, onDeleted }) {
  return (
    <ul className={'js-list'}>
      {contactList.map(({ id, name, number }) => {
        return (
          <li key={id}>
            <span>{name}: </span>
            <span>
              +38 <a href={`tel: ${number}`}>{number}</a>
            </span>
            <button className={s.btnList} type="button" onClick={() => onDeleted(id)}>
              Удалить
            </button>
          </li>
        );
      })}
    </ul>
  );
}

СontactList.propTypes = {
  contactList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }),
  ),
  onDeleted: PropTypes.func.isRequired,
};
