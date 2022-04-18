import React from 'react';
import '../style/Cards.css';
import CardItem from '../components/CardItem';

function Cards() {
  return (
    <div className='cards'>
      <div className='cards__container'>
        <div className='cards__wrapper'>
          <h5>AI Voice Topic</h5>
          <ul className='cards__items'>
            <CardItem
              src='images/AI_voice_donald.jpeg'
              text='Donald Duck, disney character voiced by Tony Anselmo'
              label='Donald Duck'
              path='/AI_text'
            />
            <CardItem
              src='images/AI_voice_goofy.jpeg'
              text='Goofy, disney character voiced by Bill Farmer'
              label='Goofy'
              path='/AI_text'
            />
             <CardItem
              src='images/AI_voice_mickey.jpeg'
              text='Mickey Mouse, disney character voiced by Wayne Anthony Allwine'
              label='Mickey Mouse'
              path='/AI_text'
            />
          </ul>
          <h5>AI Style Topic</h5>
          <ul className='cards__items'>
            <CardItem
              src='images/AI_style_pencil.jpeg'
              text='Pencil style, drawing executed with a pencil'
              label='Pencil'
              path='/AI_style'
            />
            <CardItem
              src='images/AI_style_chinese.jpeg'
              text='Chinese style, done with a brush dipped in black ink'
              label='Chinese'
              path='/AI_style'
            />
            <CardItem
              src='images/AI_style_raffaello.jpeg'
              text='Raphael style, looks like the painting of Raphael'
              label='Raphael'
              path='/AI_style'
            />
            <CardItem
              src='images/AI_style_van_gogh.jpeg'
              text='Van Gogh style, bold and dramatic brush strokes'
              label='Van Gogh'
              path='/AI_style'
            />
          </ul>
          <h5>AI Face Topic</h5>
          <ul className='cards__items'>
            <CardItem
              src='images/AI_face_singer.jpeg'
              text='Popular singer photo resources provided. Exchange face with famous finger using our Face Swap now.'
              label='Singer'
              path='/AI_face_topic'
            />
            <CardItem
              src='images/AI_face_movie.jpg'
              text='A collection of movie star face. Enjoy the fun of swith your face with these movie stars.'
              label='Movie Star'
              path='/AI_face_topic'
            />
          </ul>

        </div>
      </div>
    </div>
  );
}

export default Cards;
