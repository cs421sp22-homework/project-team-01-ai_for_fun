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
              text='Popular singer photo resources provided. Exchange face with famous finger using our Face Swap now.'
              label='Singer'
              path='/AI_face_topic'
            />
            <CardItem
              src={props.info[1].src}
              text='A collection of movie star face. Enjoy the fun of swith your face with these movie stars.'
              label='Movie Star'
              path='/AI_face_topic'
            />
             <CardItem
              src={props.info[2].src}
              text='Mickey Mouse, disney character voiced by Wayne Anthony Allwine'
              label='Mickey Mouse'
              path='/AI_text'
            />
          </ul>
          <ul className='cards__items'>
            <CardItem
              src={props.info[3].src}
              text='Donald Duck, disney character voiced by Tony Anselmo'
              label='Donald Duck'
              path='/AI_text'
            />
            <CardItem
              src={props.info[4].src}
              text='Goofy, disney character voiced by Bill Farmer'
              label='Goofy'
              path='/AI_text'
            />
            <CardItem
              src={props.info[5].src}
              text='Goofy, disney character voiced by Bill Farmer'
              label='Goofy'
              path='/AI_text'
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TopicCards;
