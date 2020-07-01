import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import api from "../../services/api";
import { Button, Row, Container, Form } from "react-bootstrap";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        await api.post("/users", {
          username,
          email,
          password,
        });
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error:
            "Houve um problema com o login, verifique suas credenciais. T.T",
        });
      }
    }
  };

  render() {
    return (
      <Container fluid>
        <Row className="justify-content-center m-2">
          <img
            src={require("../../assets/images/logo.jpeg")}
            alt="Airbnb logo"
            height="80em"
          />
        </Row>
        <Row className="justify-content-center m-3">
          <Form className="p-5 signup-form" onSubmit={this.handleSignIn}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Nome</Form.Label>
              <Form.Control
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                type="text"
                placeholder="Nome completo *"
              />
            </Form.Group>
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
              <Form.Label>Senha</Form.Label>
              <Form.Control
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                placeholder="senha secreta *"
              />
            </Form.Group>
            <Button type="submit">Registrar</Button>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
