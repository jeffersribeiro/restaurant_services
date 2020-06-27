import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ContainerAbout, ContainerLogin } from "./styles";
import api from "../../services/api";

import { Button, Row, Col, Container, Form, InputGroup } from "react-bootstrap";

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
          error:
            "Obrigado, agora é só aguardar ;)",
        });
      } catch (err) {
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
          <ContainerLogin>
            <div className="loginButton">
              <Button variant="outline-primary" href="/signin">
                Login
              </Button>
            </div>
            <h1>Solicite sua analise AGORA é grátis, fácil e rápido.</h1>
            <Form onSubmit={this.onProposalSubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  value={this.state.email}
                  onChange={(e) => this.setState({ email: e.target.value })}
                  type="email"
                  placeholder="E-mail"
                />
              </Form.Group>
              <Form.Group controlId="formBasicPassword">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  value={this.state.username}
                  onChange={(e) => this.setState({ username: e.target.value })}
                  type="text"
                  placeholder="Nome completo"
                />
              </Form.Group>
              <Form.Label>Valor atual de gastos com Boletos</Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  value={this.state.value}
                  onChange={(e) => this.setState({ value: e.target.value })}
                  type="number"
                  id="inlineFormInputGroup"
                  placeholder="Valor"
                />
              </InputGroup>
              <div>
              {this.state.error && <p id="error">{this.state.error}</p>}
              </div>
              <Button className="mt-1" variant="primary" type="submit">
                Quero uma analise
              </Button>
            </Form>
          </ContainerLogin>
        </Row>
        <Row>
          <Col>
            <ContainerAbout>
              <label>Como funciona</label>
              <p>
                Desenvolvido pela house Dogs a plataforma Pague fácil vem para
                te mostrar uma nova forma de se organizar e pagar suas finanças.
              </p>
            </ContainerAbout>
          </Col>
          <Col>
            <ContainerAbout>
              <label>Quem Somos</label>
              <p>
                Desenvolvido pela house Dogs a plataforma Pague fácil vem para
                te mostrar uma nova forma de se organizar e pagar suas finanças.
              </p>
            </ContainerAbout>
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
