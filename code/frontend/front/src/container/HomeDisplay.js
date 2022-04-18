import React, { Component } from 'react';
import { Button } from 'react-bootstrap';


function HomeDisplay() {
  return (
    <div
      className='p-5 bg-image'
      style={{ backgroundImage: "url('/images/resizebackground2.jpg')", height: 760 }}
    >
      <div style={{ marginTop: '4%' }}>
        {/* <Button  size="lg" href="/AI_face" style={{ marginTop: 350, marginLeft: 52, marginRight: 10, backgroundColor: "#2E5E51", borderColor:'white' }}>AI Face</Button>{' '}
                        <Button  size="lg" href="/AI_text" style={{ marginTop: 350, marginRight: 10, backgroundColor: "#2E5E51", borderColor:'white' }}>AI Voice</Button>{' '}
                        <Button  size="lg" href="/AI_style" style={{ marginTop: 350, marginRight: 10, backgroundColor: "#2E5E51",borderColor:'white' }}>AI Style</Button>{' '} */}
        <Button size="lg" href="/AI_face" style={{ marginTop: 345, marginLeft: 55, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Face</Button>{' '}
        <Button size="lg" href="/AI_text" style={{ marginTop: 345, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Voice</Button>{' '}
        <Button size="lg" href="/AI_style" style={{ marginTop: 345, marginRight: 10, backgroundColor: "#292F8F", borderColor: 'white' }}>AI Style</Button>{' '}
      </div>
    </div>
  );
}

export default HomeDisplay;