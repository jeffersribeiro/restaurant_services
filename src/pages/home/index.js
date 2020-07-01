import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";

import "../../assets/global-styles/styles.css";

import {
  Button,
  Row,
  Col,
  Container,
  Form,
  InputGroup,
  Nav,
} from "react-bootstrap";

class Main extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      value: "",
      error: "",
    };
  }

  onProposalSubmit = async (e) => {
    e.preventDefault();
    const { username, email, value } = this.state;
    if (!username || !email || !value) {
      this.setState({
        error: "Preencha todos os campos para poder enviar",
      });
    } else {
      try {
        await api
          .post("/proposal", {
            username,
            email,
            value,
          })
          .then((e) => e.status);
        this.setState({
          error: "Obrigado, agora é só aguardar ;)",
        });
      } catch (err) {
        alert("ouve um problema, por favor tente novamente :|")
        this.setState({
          error: "ouve um problema, por favor tente novamente :|",
        });
      }
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Nav className="justify-content-end m-2">
            <Nav.Item>
              <Button variant="outline-primary" href="/signin">
                Login
              </Button>
            </Nav.Item>
          </Nav>
        </Row>
        <Row>
          <Col className="about" xs={12} md={8}>
            <label>Where can I get some?</label>
            <p>
              t is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout. The
              point of using Lorem Ipsum is that it has a more-or-less normal
              distribution of letters, as opposed to using 'Content here,
              content here', making it look like readable English. Many desktop
              publishing packages and web page editors now use Lorem Ipsum as
              their default model text, and a search for 'lorem ipsum' will
              uncover many web sites still in their infancy. Various versions
              have evolved over the years, sometimes by accident, sometimes on
              purpose (injected humour and the like).
            </p>
            <label>Where does it come from?</label>
            <p>
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in some form, by
              injected humour, or randomised words which don't look even
              slightly believable. If you are going to use a passage of Lorem
              Ipsum, you need to be sure there isn't anything embarrassing
              hidden in the middle of text. All the Lorem Ipsum generators on
              the Internet tend to repeat predefined chunks as necessary, making
              this the first true generator on the Internet. It uses a
              dictionary of over 200 Latin words, combined with a handful of
              model sentence structures, to generate Lorem Ipsum which looks
              reasonable. The generated Lorem Ipsum is therefore always free
              from repetition, injected humour, or non-characteristic words etc.
            </p>
          </Col>
          <Col>
            <Form className="home-form" onSubmit={this.onProposalSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  type="email"
                  placeholder="E-mail *"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  type="text"
                  placeholder="Nome completo *"
                />
              </Form.Group>
              <Form.Label>Valor atual de gastos com Boletos</Form.Label>
              <InputGroup className="mb-2">
                <Form.Control
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                  type="number"
                  id="inlineFormInputGroup"
                  placeholder="Valor *"
                />
              </InputGroup>
              <div classname="text-align-center">
                {this.state.error && <p id="error">{this.state.error}</p>}
              </div>
              <Button className="mt-1" variant="primary" type="submit">
                Quero uma analise
              </Button>
            </Form>
          </Col>
        </Row>
        <Row className="justify-content-center flex-column align-items-center">
          <label>© 2020 Copyright House Dogs Software Ltda.</label>
          <label>CNPJ: 12.345.789/1011-12.</label>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Main);
