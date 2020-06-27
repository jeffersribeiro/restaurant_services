import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { Form, Container } from "./styles";

import { login } from "../../services/auth";
import api from "../../services/api";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    error: "",
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({ error: "Preencha e-mail e senha para continuar!" });
    } else {
      try {
        const response = await api.post("/sessions", { email, password });
        login(response.data.token);
        this.props.history.push("/painel")
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
            type="email"
            value={this.state.email}
            placeholder="Endereço de e-mail"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
            value={this.state.password}
            placeholder="Senha"
            onChange={(e) => this.setState({ password: e.target.value })}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/signup">Criar conta grátis</Link>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);
