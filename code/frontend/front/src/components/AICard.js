import React from 'react';
import { Link } from 'react-router-dom';

function AICard(props) {
  return (
    <>
      <li className='cards__item'>
          <figure className='cards__item__pic-wrap'>
            <img
              className='cards__item__img'
              alt=''
              src={props.src}
            />
          </figure>
      </li>
    </>
  );
}

export default AICard;
