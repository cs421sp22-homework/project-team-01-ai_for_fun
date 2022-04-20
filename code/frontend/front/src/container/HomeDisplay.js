import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


function HomeDisplay() {
  return (
    <div
      className='p-5 bg-image'
      style={{ backgroundImage: "url('/images/backgroundHome.jpg')", height: 760 }}
    >

      <div style={{ marginTop: '10%', marginLeft: '7%' }}>
        <div>
          <font face="Arial" size="+4" color="#063970"> <strong>AI FOR FUN </strong></font>
          <br></br>
          <font face="Verdana" size="+2" color="#063873"> Our application aims to provide the best AI experience. </font>
          <br></br>
          <font face="Verdana" size="+2" color="#063873"> Enjoy the fun brought by AI technology via website</font>
        </div>
        <div>
          <Button size="lg" href="/AI_face" style={{ marginTop: 20, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Face</Button>{' '}
          <Button size="lg" href="/AI_text" style={{ marginTop: 20, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Voice</Button>{' '}
          <Button size="lg" href="/AI_style" style={{ marginTop: 20, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Style</Button>{' '}
        </div>
      </div>
    </div>
  );
}

export default HomeDisplay;