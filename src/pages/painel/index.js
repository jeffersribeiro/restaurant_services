import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container, Row, Col, Form } from "react-bootstrap";
import MaskedInput from "react-text-mask";

import ViewModal from "./components/modal";
import Billets from "./components/billet";
import { InputContainer, FullValue } from "./style";
import api from "../../services/api";
import { logout } from "../../services/auth";

class Painel extends Component {
  constructor() {
    super();
    this.state = {
      cardName: "",
      cardNumber: "",
      carDueDate: "",
      cardVCC: "",
      lastCardNumberValue: "",
      showModal: true,
      fullValue: "",
      error: "",
    };
  }

  getCardInfos = async () => {
    try {
      const response = await api.get("/card").then((res) => res);
      const { cardName, cardNumber, carDueDate, cardVCC } = response.data;
      this.setState({
        cardName: cardName,
        cardNumber: cardNumber,
        carDueDate: carDueDate,
        cardVCC: cardVCC,
        lastCardNumberValue: cardNumber,
      });
      for (let i = 0; i <= 3; i++) {
        document
          .getElementsByTagName("input")
          .item(i)
          .setAttribute("disabled", true);
      }
    } catch (err) {
      this.setState({
        error: "ops, parece que algo deu errado,por favor tente novamente!",
      });
    }
  };

  getFullValue = async () => {
    await api.get("/billets").then((res) => {
      const { data } = res;
      let soma = data.reduce((somatorio, el) => {
        return parseFloat(parseFloat(somatorio) + parseFloat(el.value))
          .toFixed(2)
          .replace(".", ",");
      }, 0);
      this.setState({
        fullValue: soma,
      });
    });
  };

  componentDidMount() {
    this.getCardInfos();
    this.getFullValue();
  }

  onSavePress = async (e) => {
    e.preventDefault();
    const {
      cardName,
      cardNumber,
      cardDueDate,
      cardVCC,
      lastCardNumberValue,
    } = this.state;

    if (cardNumber === lastCardNumberValue) {
      this.setState({
        error: "alterar os dados para continuar!",
      });
    } else {
      try {
        await api
          .post("/updatecard", {
            cardName,
            cardNumber,
            cardDueDate,
            cardVCC,
          })
          .then((e) => e.status);
        this.setState({
          error: "Atualizado com sucesso!",
          lastCardNumberValue: cardName,
        });
      } catch (err) {
        this.setState({
          error: "ops, não foi possivel atualizar, tente novamente!",
        });
      }

      for (let i = 0; i <= 3; i++) {
        document
          .getElementsByTagName("input")
          .item(i)
          .setAttribute("disabled", true);
      }
    }
  };

  onUpdatePress = () => {
    for (let i = 0; i <= 3; i++) {
      document
        .getElementsByTagName("input")
        .item(i)
        .removeAttribute("disabled");
    }
  };

  handleLogout = (e) => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Container className="h-100" fluid>
        <Row className="justify-content-between m-2">
          <ViewModal />
          <Button href="/" variant="primary" onClick={this.handleLogout}>
            Logout
          </Button>
        </Row>
        <Row className="mv-2">
          <Col>
            <Billets />
          </Col>
          <Col xs lg="3" md="auto">
            <>
              <InputContainer>
                <Form onSubmit={this.onSavePress}>
                  <Form.Group controlId="teste12">
                    <Form.Label>Nome do titular</Form.Label>
                    <Form.Control
                      value={this.state.cardName}
                      name="teste1"
                      onChange={(e) =>
                        this.setState({ cardName: e.target.value })
                      }
                      type="text"
                      placeholder="Alan F. Santos"
                    />
                  </Form.Group>
                  <Form.Group controlId="teste12">
                    <Form.Label>Numero do cartão</Form.Label>
                    <MaskedInput
                      mask={[
                        /[1-9]/,
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                        " ",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      className="form-control"
                      guide={false}
                      showMask={false}
                      id="my-input-id"
                      value={this.state.cardNumber}
                      name="teste2"
                      onChange={(e) => {
                        this.setState({ cardNumber: e.target.value });
                      }}
                      type="text"
                      placeholder="1234 5678 91234 5678"
                    />
                  </Form.Group>
                  <Form.Group controlId="teste12">
                    <Form.Label>Data de vencimento:</Form.Label>
                    <MaskedInput
                      mask={[
                        /[1-9]/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        "/",
                        /\d/,
                        /\d/,
                        /\d/,
                        /\d/,
                      ]}
                      className="form-control"
                      guide={false}
                      showMask={true}
                      id="my-input-id"
                      value={this.state.carDueDate}
                      name="teste1"
                      onChange={(e) =>
                        this.setState({ carDueDate: e.target.value })
                      }
                      type="data"
                      placeholder="20/01/2020"
                    />
                  </Form.Group>
                  <Form.Group controlId="teste12">
                    <Form.Label>VCC</Form.Label>
                    <Form.Control
                      value={this.state.cardVCC}
                      name="teste1"
                      onChange={(e) =>
                        this.setState({ cardVCC: e.target.value })
                      }
                      type="data"
                      maxLength={4}
                      placeholder="***"
                    />
                  </Form.Group>
                  <Button
                    onClick={this.onUpdatePress}
                    className="m-3"
                    variant="secondary"
                  >
                    Atualizar
                  </Button>
                  <Button type="submit" variant="primary">
                    Salvar
                  </Button>
                </Form>
                <div>
                  {this.state.error && <p id="error">{this.state.error}</p>}
                </div>
                <FullValue>
                  <label>Despesas Total:</label>
                  <label>R$ {this.state.fullValue}</label>
                </FullValue>
              </InputContainer>
            </>
          </Col>
        </Row>
        <Row className="m-2"></Row>
      </Container>
    );
  }
}

export default withRouter(Painel);
