import React from 'react';
import { Button } from 'react-bootstrap';


function HomeDisplay() {
  return (
    <div
      className='p-5 bg-image'
      style={{ backgroundImage: "url('/images/header.jpg')", height: 760 }}
    >
      <div style={{ width: '50%', marginTop: '10%' }}>
        <div style={{ marginTop: '10%', marginLeft: '5%' }}>
          <div>
            <font face="Arial" size="+4" color="white"> <strong>AI FOR FUN </strong></font>
            <br></br>
            <font face="Verdana" size="+2" color="white"> Our application aims to provide the best AI experience. </font>
            <br></br>
            <font face="Verdana" size="+2" color="white"> Enjoy the fun brought by AI technology via website</font>
          </div>
          <div>
            <Button size="lg" href="/AI_face" style={{ marginTop: 20, marginRight: 10, backgroundColor: "rgb(69,113,182)", borderColor: 'rgba(0,0,0,0)' }}>AI Face</Button>{' '}
            <Button size="lg" href="/AI_text" style={{ marginTop: 20, marginRight: 10, backgroundColor: "rgb(69,113,182)", borderColor: 'rgba(0,0,0,0)' }}>AI Voice</Button>{' '}
            <Button size="lg" href="/AI_style" style={{ marginTop: 20, marginRight: 10, backgroundColor: "rgb(69,113,182)", borderColor: 'rgba(0,0,0,0)' }}>AI Style</Button>{' '}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDisplay;