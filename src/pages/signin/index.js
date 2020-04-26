import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { auth } from "../../services/firebase";
import { Form, Container } from "./styles";

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
      // auth.signInWithEmailAndPassword(email, password).catch((err) => {
      //   this.setState({
      //     error:
      //       "Houve um problema com o login, verifique suas credenciais. T.T",
      //   });
      // });
      this.props.history.push("/main");
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
            placeholder="Endereço de e-mail"
            onChange={(e) => this.setState({ email: e.target.value })}
          />
          <input
            type="password"
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
