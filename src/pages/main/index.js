import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import Icon, { FontAwesome, Feather } from "react-web-vector-icons";
import {
  Button,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  FormControl,
  Nav,
  Carousel,
  Card,
  NavDropdown,
} from "react-bootstrap";
import Mapbox from "../mapbox";

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
    <Container fluid>
      <Row>
        <Col>
          <Nav defaultActiveKey="/main" as="ul">
            <Nav.Item as="li">
              <Nav.Link href="/main">Home</Nav.Link>
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
                <NavDropdown title="Painel" id="nav-dropdown">
                  <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.2">Perfil</NavDropdown.Item>
                  <NavDropdown.Item eventKey="4.3">Plano</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item eventKey="4.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
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
        <Col>
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
      {/* Map */}
      <Row style={{ backgroundColor: "#034473", paddingTop: 40 }}>
        <Col lg="6">
          <div style={{ color: "white" }}>
            <h1>Newsletter</h1>
            <p>Fique por dentro de todas nossas novidades e promoções</p>
          </div>
        </Col>
        <Col>
          <InputGroup className="mb-4">
            <FormControl
              style={{ height: 50 }}
              placeholder="E-mail"
              aria-label="E-mail"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button
                style={{ backgroundColor: "white" }}
                variant="outline-secondary"
              >
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          <Icon
            name="tools"
            font="Entypo"
            color="green"
            size={20}
            // style={{}}
          />

          <FontAwesome
            name="bell"
            color="green"
            size={30}
            // style={{}}
          />

          <Feather
            name="award"
            color="#007ACC"
            size={40}
            // style={{}}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default withRouter(Main);
