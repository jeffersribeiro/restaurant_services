import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { login } from "../../services/auth";
import api from "../../services/api";

import { Container, Row, Button, Form } from "react-bootstrap";
class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
    isLoading: false,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        this.setState({
          isLoading: true,
        });
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/painel");
      } catch (err) {
        this.setState({
          isLoading: false,
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
          <Form className="p-5 signin-form" onSubmit={this.handleSignIn}>
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
            <Button disabled={this.state.isLoading} type="submit">
              {this.state.isLoading ? "Loading…" : "Login"}
            </Button>
            <hr />
            <div
              style={{
                marginLeft: "22%",
              }}
            >
              <Link className="signup-link" to="/signup">Criar conta grátis</Link>
            </div>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignIn);
