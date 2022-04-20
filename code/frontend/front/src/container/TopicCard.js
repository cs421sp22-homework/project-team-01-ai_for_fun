import React from 'react';
import '../style/Cards.css';
import CardItem from '../components/CardItem';

function TopicCards(props) {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            <CardItem
              src={props.info[0].src}
              text={props.info[0].text}
              label={props.info[0].label}
              path={props.info[0].path}
            />
            <CardItem
                src={props.info[1].src}
                text={props.info[1].text}
                label={props.info[1].label}
                path={props.info[1].path}
            />
             <CardItem
                 src={props.info[2].src}
                 text={props.info[2].text}
                 label={props.info[2].label}
                 path={props.info[2].path}
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
                src={props.info[3].src}
                text={props.info[3].text}
                label={props.info[3].label}
                path={props.info[3].path}
            />
            <CardItem
                src={props.info[4].src}
                text={props.info[4].text}
                label={props.info[4].label}
                path={props.info[4].path}
            />
            <CardItem
                src={props.info[5].src}
                text={props.info[5].text}
                label={props.info[5].label}
                path={props.info[5].path}
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopicCards;
