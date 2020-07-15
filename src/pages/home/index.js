import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../../services/api";
import "../../assets/global-styles/styles.css";
import { Image, Row, Col, Container, Form, InputGroup, Nav } from "react-bootstrap";
import TextField from "@material-ui/core/TextField";
import MatButton from "../components/Button";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class Main extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      email: "",
      value: "",
      severity: "",
      error: "",
      isError: false,
    };
  }

  onProposalSubmit = async (e) => {
    e.preventDefault();
    const { username, email, value } = this.state;
    if (!username || !email || !value) {
      this.setState({
        isError: true,
        severity: "warning",
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
          isError: true,
          severity: "success",
          error: "Obrigado, agora é só aguardar ;)",
        });
      } catch (err) {
        this.setState({
          isError: true,
          severity: "error",
          error: "ouve um problema, por favor tente novamente :|",
        });
      }
    }
  };

  render() {
    return (
      <Container fluid className="p-0 m-0">
        <div className="body">
          <Row className="d-flex justify-content-end align-items-end m-2 con">
            <Nav>
              <Nav.Item>
                <MatButton
                  variant="contained"
                  color="primary"
                  href="/singin"
                  text="Login"
                />
              </Nav.Item>
            </Nav>
          </Row>
          <Row className="justify-content-center m-2">
          <img
            src={require("../../assets/images/logo.jpeg")}
            alt="Airbnb logo"
            height="80em"
          />
        </Row>
          <Row className="d-flex justify-content-center align-items-center m-2">
            <Col
              className="d-flex flex-column justify-content-start align-items-start about"
               xs={12} md={8}
            >
              <label>Where can I get some?</label>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don't look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn't anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. The generated Lorem Ipsum is therefore always free
                from repetition, injected humour, or non-characteristic words
                etc.
              </p>
              <label>Where does it come from?</label>
              <p>
                Contrary to popular belief, Lorem Ipsum is not simply random
                text. It has roots in a piece of classical Latin literature from
                45 BC, making it over 2000 years old. Richard McClintock, a
                Latin professor at Hampden-Sydney College in Virginia, looked up
                one of the more obscure Latin words, consectetur, from a Lorem
                Ipsum passage, and going through the cites of the word in
                classical literature, discovered the undoubtable source. Lorem
                Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus
                Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero,
                written in 45 BC. This book is a treatise on the theory of
                ethics, very popular during the Renaissance. The first line of
                Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line
                in section 1.10.32.
              </p>
            </Col>
            <Col xs="auto"  md={4} className="d-flex flex-column justify-content-center align-items-center">
              <label className="form-title">
                There are many variations of passages of Lorem Ipsum available
              </label>
              <Form
                className="home-form w-100"
                onSubmit={this.onProposalSubmit}
              >
                <Form.Group controlId="formBasicEmail">
                  <TextField
                    className="w-100"
                    label="E-mail *"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    type="email"
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <TextField
                    className="w-100"
                    label="Nome completo *"
                    value={this.state.username}
                    onChange={(e) =>
                      this.setState({ username: e.target.value })
                    }
                    type="text"
                  />
                </Form.Group>
                <InputGroup className="mb-2">
                  <TextField
                    value={this.state.value}
                    className="w-75"
                    onChange={(e) => this.setState({ value: e.target.value })}
                    type="number"
                    id="inlineFormInputGroup"
                    label="Valor de gastos com Boletos *"
                  />
                </InputGroup>
                <MatButton
                  className="mt-3"
                  variant="contained"
                  color="primary"
                  text="Quero uma analise"
                  type="submit"
                />
                <Snackbar
                  open={this.state.isError}
                  autoHideDuration={4000}
                  onClose={() => this.setState({ isError: false })}
                >
                  <Alert severity={this.state.severity}>
                    {this.state.error}
                  </Alert>
                </Snackbar>
              </Form>
            </Col>
          </Row>
          <Row className="d-flex flex-column justify-content-center align-items-center">
            <label>© 2020 Copyright House Dogs Software Ltda.</label>
            <label>CNPJ: 12.345.789/1011-12.</label>
          </Row>
        </div>
      </Container>
    );
  }
}

export default withRouter(Main);
