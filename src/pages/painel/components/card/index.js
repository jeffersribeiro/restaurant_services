import React, { Component } from "react";
import { Row, Col, Form, Button, FormControl, Image } from "react-bootstrap";
import { CardStyle, FullValue } from "../../style";
import MaskedInput from "react-text-mask";
import Flippy, { FrontSide, BackSide } from "react-flippy";
import api from "../../../../services/api";
import ShowAlert from "../alert";

class Card extends Component {
  constructor() {
    super();
    this.state = {
      cardName: "",
      cardNumber: "",
      cardDueDate: "",
      variant: "",
      message: "",
      cardVCC: "",
      showModal: true,
      fullValue: "",
      isLoading: false,
      flagCard: "https://img.icons8.com/cotton/2x/sim-card-chip--v1.png",
      haveCard: false,
    };
  }

  getCardInfos = async () => {
    try {
      const response = await api.get("/card").then((res) => res);
      const { cardName, cardNumber, cardDueDate, cardVCC } = response.data;
      this.setState({
        cardName: cardName,
        cardNumber: cardNumber,
        cardDueDate: cardDueDate,
        cardVCC: cardVCC,
        variant: "success",
        message: "carregado com sucesso!!",
      });

      

      if(response.data.cardNumber){
        this.setState({
          haveCard:true
        })
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        variant: "danger",
        message: "Algo deu errado recarregue a pagina!!",
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

  onSavePress = async (e) => {
    e.preventDefault();
    const { cardName, cardNumber, cardDueDate, cardVCC } = this.state;

    if (!cardName || !cardNumber || !cardDueDate || !cardVCC) {
      alert("Preencha os dados para continuar");
      this.setState({
        variant: "warning",
        message: "insira os dados para continuar!!",
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
        alert("novo cartão salvo");
        this.setState({
          variant: "success",
          message: "Novo cartão salvo!!",
          lastCardNumberValue: cardName,
          haveCard: true,
        });
      } catch (err) {
        alert("Não foi póssivel salvar, tente novamente!!")
        this.setState({
          variant: "danger",
          message: "Não foi póssivel salvar, tente novamente!!",
        });
      }
    }
  };

  onDeletePress = () => {
    this.setState({
      haveCard: false,
      cardName: "",
      cardNumber: "",
      cardDueDate: "",
      cardVCC: "",
      lastCardNumberValue: "",
      variant: "success",
      message: "deletado com sucesso!!",
    });
  };

  getCardFlag(cardnumber) {
    let number = cardnumber.replace(/[^0-9]+/g, "");

    var cards = {
      visa: /^4[0-9]{12}(?:[0-9]{3})/,
      mastercard: /^5[1-5][0-9]{14}/,
      diners: /^3(?:0[0-5]|[68][0-9])[0-9]{11}/,
      amex: /^3[47][0-9]{13}/,
      discover: /^6(?:011|5[0-9]{2})[0-9]{12}/,
      hipercard: /^(606282\d{10}(\d{3})?)|(3841\d{15})/,
      elo: /^((((636368)|(438935)|(504175)|(451416)|(636297))\d{0,10})|((5067)|(4576)|(4011))\d{0,12})/,
      jcb: /^(?:2131|1800|35\d{3})\d{11}/,
      aura: /^(5078\d{2})(\d{2})(\d{11})$/,
    };

    for (var flag in cards) {
      if (cards[flag].test(number)) {
        return flag;
      }
    }
    return false;
  }

  componentDidMount() {
    this.getCardInfos();
    this.getFullValue();
  }
  render() {
    return (
      <>
      <ShowAlert  variant={this.state.variant} message={this.state.message} />
        <div>
          <Col className="card-form" sm="6" xl="auto" xs="12" lg="auto" >
            {this.state.haveCard ? (
              <div>
                <CardStyle className="p-3 justify-content-end">
                  <Col>
                    <Row>
                      <Image
                        rounded
                        src={this.state.flagCard}
                        alt="badeira"
                        height="40px"
                      />
                    </Row>
                    <Row>
                      <FormControl
                        style={{border:"none"}}
                        type="text"
                        className="h-25 card-infos"
                        value={this.state.cardNumber}
                        placeholder="•••• •••• •••• ••••"
                        disabled
                      />
                    </Row>
                    <Row>
                      <Col className="p-0 w-100" sm="13">
                        <FormControl
                        style={{border:"none"}}
                          className="h-50 card-infos"
                          type="text"
                          value={this.state.cardName}
                          placeholder="NOME IGUAL NO CARTÃO "
                          disabled
                        />
                      </Col>
                      <Col className="p-0" sm="5">
                        <FormControl
                        style={{border:"none"}}
                          className="h-50 w-100 card-infos"
                          type="text"
                          placeholder="MÊS/ANO"
                          value={this.state.cardDueDate}
                          disabled
                        />
                      </Col>
                    </Row>
                  </Col>
                </CardStyle>
                <Button
                  onClick={this.onDeletePress}
                  className="mt-2 w-100 h-25 text-center"
                  variant="secondary"
                >
                  Excluir
                </Button>
              </div>
            ) : (
              <div>
                <Flippy
                  flipOnHover={false}
                  flipOnClick={true}
                  flipDirection="horizontal"
                  ref={(r) => (this.flippy = r)}
                >
                  <FrontSide
                    style={{
                      backgroundColor: "#3b7ec5",
                      borderRadius: 8,
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      width: "100%",
                      height: "100%",
                      paddingLeft: 9,
                    }}
                  >
                    <Col>
                      <Row>
                        <Image
                          rounded
                          src={this.state.flagCard}
                          alt="badeira"
                          height="30px"
                        />
                      </Row>
                      <Row>
                        <FormControl
                          style={{
                            border: "none",
                            backgroundColor: "#3b7ec5",
                            color: "white",
                          }}
                          type="text"
                          className="h-25 card-infos"
                          value={this.state.cardNumber}
                          disabled
                          placeholder="•••• •••• •••• ••••"
                        />
                      </Row>
                      <Row>
                        <Col className="p-0 w-100" sm="13">
                          <FormControl
                            style={{
                              border: "none",
                              backgroundColor: "#3b7ec5",
                              color: "white",
                            }}
                            className="h-50 w-100"
                            type="text"
                            value={this.state.cardName}
                            disabled
                            placeholder="NOME IGUAL NO CARTÃO"
                          />
                        </Col>
                        <Col className="p-0" sm="4">
                          <FormControl
                            style={{
                              border: "none",
                              backgroundColor: "#3b7ec5",
                              color: "white",
                            }}
                            className="h-50 w-100 card-infos"
                          type="text"
                          placeholder="MÊS/ANO"
                          value={this.state.cardDueDate}
                          disabled
                          />
                        </Col>
                      </Row>
                    </Col>
                  </FrontSide>
                  <BackSide
                    style={{
                      backgroundColor: "#3b7ec5",
                      borderRadius: 8,
                      border: "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-around",
                      width: "100%",
                      height: "100%",
                      paddingLeft: 9,
                    }}
                  >
                    <FormControl
                      className="h-50 w-100 card-infos"
                      style={{
                        border:"none",
                        backgroundColor: "#3b7ec5",
                        color: "white",
                      }}
                      type="text"
                      value={this.state.cardVCC}
                      disabled
                      placeholder="VCC"
                    />
                  </BackSide>
                </Flippy>
                <Form onSubmit={this.onSavePress}>
                  <Form.Group controlId="teste12">
                    <Form.Label>Nome do titular</Form.Label>
                    <Form.Control
                      className="h-50"
                      value={this.state.cardName}
                      name="teste1"
                      onChange={(e) =>
                        this.setState({ cardName: e.target.value })
                      }
                      type="text"
                      placeholder="NOME IGUAL NO CARTÃO"
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
                      className="form-control h-50"
                      guide={false}
                      showMask={false}
                      id="my-input-id"
                      value={this.state.cardNumber}
                      name="teste2"
                      onChange={(e) => {
                        this.getCardFlag(e.target.value);
                        this.setState({ cardNumber: e.target.value });
                      }}
                      type="text"
                      placeholder="•••• •••• •••• ••••"
                    />
                  </Form.Group>
                  <Form.Group controlId="teste12" as={Row}>
                    <Col>
                      <Form.Label>vencimento</Form.Label>
                      <MaskedInput
                        mask={[/[1-9]/, /\d/, "/", /\d/, /\d/]}
                        className="form-control w-100 h-50"
                        guide={false}
                        showMask={true}
                        id="my-input-id"
                        value={this.state.cardDueDate}
                        name="teste1"
                        onChange={(e) =>
                          this.setState({ cardDueDate: e.target.value })
                        }
                        type="data"
                        placeholder="MÊS/ANO"
                      />
                    </Col>
                    <Col>
                      <Form.Label>VCC</Form.Label>
                      <Form.Control
                        className="w-75 h-50"
                        value={this.state.cardVCC}
                        name="teste1"
                        onFocus={() => {
                          this.flippy.toggle();
                        }}
                        onChange={(e) => {
                          this.setState({ cardVCC: e.target.value });
                        }}
                        type="data"
                        maxLength={4}
                        placeholder="***"
                      />
                    </Col>
                  </Form.Group>
                  <Row className="justify-content-center">
                    <Button
                      disabled={this.state.isLoading}
                      className="m-2 w-100 h-50 text-center"
                      type="submit"
                    >
                      {this.state.isLoading ? "Loading…" : "Salvar"}
                    </Button>
                  </Row>
                </Form>
              </div>
            )}
            <FullValue className="mt-3">
              <label>Despesas Total:</label>
              <label>R$ {this.state.fullValue}</label>
            </FullValue>
          </Col>
        </div>
      </>
    );
  }
}

export default Card;
