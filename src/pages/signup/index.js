import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { Form, Container } from "./styles";
import api from "../../services/api";

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    error: "",
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const {username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        await api.post("/users",{
          username, email, password
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
      <Container>
        <Form onSubmit={this.handleSignIn}>
          <img
            src={require("../../assets/images/logo.jpeg")}
            alt="Airbnb logo"
          />
          {this.state.error && <p>{this.state.error}</p>}
          <input
            type="name"
            placeholder="Nome de Usuario"
            onChange={(e) => this.setState({ username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Registrar</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignUp);
