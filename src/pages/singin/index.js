import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputLabel from '@material-ui/core/InputLabel';


import { login } from "../../services/auth";
import api from "../../services/api";

import { Container, Row, Form } from "react-bootstrap";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    severity: "",
    error: "",
    showPassword: false,
    isError: false,
    isLoading: false,
  };

  handleSignIn = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      this.setState({
        isError: true,
        severity: "warning",
        error: "Preencha todos as campos para continuar!",
      });
    } else {
      try {
        this.setState({
          isLoading: true,
        });
        const response = await api.post("/users", { email, password });
        login(response.data.token);
        this.props.history.push("/painel");
      } catch (err) {
        this.setState({
          isLoading: false,
          isError: true,
          severity: "error",
          error: "Houve um problema com o login, verifique suas credenciais.",
        });
      }
    }
  };

  handleChange = (prop) => (event) => {
    this.setState({
      ...this.state, [prop]: event.target.value 
    })
  };

  handleClickShowPassword = () => {
    this.setState({
      ...this.state, showPassword: !this.state.showPassword
    })
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <Container className="align-center" fluid>
        <Row className="justify-content-center m-2">
          <img
            src={require("../../assets/images/logo.jpeg")}
            alt="Airbnb logo"
            height="80em"
          />
        </Row>
        <Row className="justify-content-center m-3">
          <Form className="p-5 signin-form" onSubmit={this.handleSignIn}>
            <Form.Group className="mb-4" controlId="formBasicEmail">
              <TextField
                autoComplete={true}
                className="w-100"
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                type="email"
                label="E-mail *"
              />
            </Form.Group>
            <Form.Group>
            <InputLabel htmlFor="standard-adornment-password">Password *</InputLabel>
              <Input
                autoComplete={true}
                id="standard-adornment-password" 
                type={this.state.showPassword ? "text" : "password"}
                value={this.state.password}
                onChange={this.handleChange("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={this.handleClickShowPassword}
                      onMouseDown={this.handleMouseDownPassword}
                    >
                      {this.state.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </Form.Group>
            <Button
              variant="contained"
              color="primary"
              disabled={this.state.isLoading}
              type="submit"
            >
              {this.state.isLoading ? "Loading…" : "Login"}
            </Button>
            <Snackbar
              open={this.state.isError}
              autoHideDuration={4000}
              onClose={() => this.setState({ isError: false })}
            >
              <Alert severity={this.state.severity}>{this.state.error}</Alert>
            </Snackbar>
          </Form>
        </Row>
      </Container>
    );
  }
}

export default withRouter(SignIn);
