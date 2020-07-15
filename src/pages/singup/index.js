import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import api from "../../services/api";
import { Row, Container, Form } from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignUp extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    severity: "",
    error: "",
    isError: false,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { username, email, password } = this.state;
    if (!username || !email || !password) {
      this.setState({
        isError: true,
        severity: "error",
        error: "Preencha e-mail e senha para continuar!",
      });
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
          isError: true,
          severity: "warning",
          error: "Houve um problema com o cadastro, tente novamente :/",
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
              <TextField
                value={this.state.username}
                onChange={(e) => this.setState({ username: e.target.value })}
                type="text"
                label="Nome completo *"
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <TextField
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                label="E-mail *"
              />
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
              <TextField
                value={this.state.password}
                onChange={(e) => this.setState({ password: e.target.value })}
                type="password"
                label="senha secreta *"
              />
            </Form.Group>
            <div>
              <Button variant="contained" color="primary" type="submit">
                Registrar
              </Button>
              <Snackbar
                open={this.state.isError}
                autoHideDuration={4000}
                onClose={() => this.setState({ isError: false })}
              >
                <Alert severity={this.state.severity}>{this.state.error}</Alert>
              </Snackbar>
            </div>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignUp);
