import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Alert,
  Container,
  Row,
  Col,
  Form,
  Nav,
  Carousel,
  Card,
} from "react-bootstrap";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/foto-3.jpg")}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/foto-2.jpg")}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={require("../../assets/images/foto-1.jpg")}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

const Main = () => {
  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Nav defaultActiveKey="/home" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/home">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-1">About</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-2">Gallery</Nav.Link>
            </Nav.Item>
            <Nav.Item as="li">
              <Nav.Link eventKey="link-2">Contact</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col>
          <Nav className="justify-content-end" activeKey="/home">
            <Nav.Item>
              <Nav.Link>
                <Button>Painel</Button>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>
        <Col>
          <ControlledCarousel />
        </Col>
      </Row>
      {/* Cards */}
      <Row style={{ margin: 20 }}>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              variant="top"
              src={require("../../assets/images/foto-1.jpg")}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              height="160"
              variant="top"
              src={require("../../assets/images/foto-2.jpg")}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col style={{ margin: 20 }}>
          <Card style={{ width: "18rem" }}>
            <Card.Img
              height="160"
              variant="top"
              src={require("../../assets/images/foto-3.jpg")}
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* news letters */}
      <Row className="justify-content-end">
        <Col>
          <Form>
            <Form.Row>
              <Col sm lg="4">
                <Form.Control placeholder="First name" />
              </Col>
              <Col md="auto" lg="2"></Col>
              <Col xs lg="2">
                <Button>News Letter</Button>
              </Col>
            </Form.Row>
          </Form>
        </Col>
      </Row>
      <Row>
        <Col>
          <footer style={{ margin: 20 }}>
            Numero:123456789 E-mail: restaurante@gmail.com CNPJ:132456789/12
          </footer>
        </Col>
      </Row>
    </Container>
  );
};

export default Main;
