import {Row, Col, Button, Form} from 'react-bootstrap';

function EditPswd(props) {
    const info = props
    return (
      <div>
          <Row className='profileContainer'>
              <Col md={6}>
                  {/* <Form onSubmit={submitHandler}> */}
                  <Form>
                      <Form.Group controlId="name">
                          <Form.Label>Name</Form.Label>
                          <Form.Control
                             type="text"
                             placeholder="Enter Name"
                             value={name}
                             onChange={(e) => setName(e.target.value)}></Form.Control>
                      </Form.Group>
                      <Form.Group controlId='email'>
                          <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            value={email}
                            onchange={(e) => setEmail(e.target.value)}>
                            </Form.Control>
                      </Form.Group>
                  </Form>
              </Col>
          </Row>
      </div>
    );
  }
  
  export default EditPswd;
  