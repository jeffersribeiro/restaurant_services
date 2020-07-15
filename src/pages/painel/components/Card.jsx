import React from "react";
import CardReactFormContainer from "card-react";
import { Form } from "react-bootstrap";
import api from "../../../services/api";
import MyAlert from "./Alert";
import Plastic from "react-plastic";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

const CardStyle = styled.div`
  width: 100%;
  margin: 8px;
  border-radius: 3px;
  padding: 20px;
  box-shadow: 1px 1px 4px gray;
`;

export class ShowCard extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: "",
      cardNumber: "",
      cardDueDate: "",
      variant: "",
      message: "",
      isError: false,
      cardVCV: "",
      id: "",
      showModal: true,
      fullValue: "",
      isLoading: false,
      haveCard: false,
    };
  }

  getCardInfos = async () => {
    try {
      const response = await api
        .get("/carduser")
        .then((res) => res);
      const { cardName, cardNumber, cardDueDate, cardVCV, id } = response.data;
      this.setState({
        id: id,
        cardName: cardName,
        cardNumber: cardNumber,
        cardDueDate: cardDueDate,
        cardVCV: cardVCV,
        variant: "success",
        isError: true,
        message: "carregado com sucesso!!",
      });
      console.log(this.state);
      if (response.data.cardNumber) {
        this.setState({
          haveCard: true,
        });
      }
    } catch (err) {
      this.setState({
        isLoading: false,
        variant: "error",
        isError: true,
        message: "Algo deu errado recarregue a pagina!!",
      });
    }
  };

  onSavePress = async (e) => {
    console.log("tentando salvar");
    e.preventDefault();
    const { cardName, cardNumber, cardDueDate, cardVCV } = this.state;

    if (!cardName || !cardNumber || !cardDueDate || !cardVCV) {
      console.log("algo esta errado");
      this.setState({
        variant: "warning",
        isError: true,
        message: "insira os dados para continuar!!",
      });
    } else {
      try {
        console.log("salvando...");
        await api
          .put(`/carduser`, {
            cardName,
            cardNumber,
            cardDueDate,
            cardVCV,
          })
          .then((e) => e.status);
        this.setState({
          variant: "success",
          isError: true,
          message: "Novo cartão salvo!!",
          lastCardNumberValue: cardNumber,
          haveCard: true,
        });
      } catch (err) {
        this.setState({
          variant: "danger",
          isError: true,
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
      cardVCV: "",
      lastCardNumberValue: "",
      variant: "success",
      isError: true,
      message: "deletado com sucesso!!",
    });
  };

  componentDidMount() {
    this.getCardInfos();
  }
  render() {
    return (
      <>
        <CardStyle>
        <MyAlert
          open={this.state.isError}
          onClose={() => this.setState({ isError: false })}
          severity={this.state.variant}
          message={this.state.message}
        />
          {this.state.haveCard ? (
            <>
              <Plastic
                type="mastercard"
                name={this.state.cardName}
                expiry={this.state.cardDueDate}
                number={this.state.cardNumber}
                cvc={this.state.cardVCV}
              />
              <Button
                onClick={this.onDeletePress}
                className="mt-3 w-100"
                type="submit"
                variant="contained"
                color="secondary"
              >
                Deletar
              </Button>
            </>
          ) : (
            <>
              <div id="card-wrapper"></div>
              <CardReactFormContainer
                container="card-wrapper"
                formInputsNames={{
                  number: "CCnumber",
                  expiry: "CCexpiry",
                  cvc: "CCcvc",
                  name: "CCname",
                }}
                classes={{
                  valid: "valid-input",
                  invalid: "invalid-input",
                }}
                formatting={true}
              >
                <Form className="d-flex flex-column justify-content-center ">
                  <TextField
                    onChange={(e) =>
                      this.setState({ cardName: e.target.value })
                    }
                    label="Full name *"
                    type="text"
                    name="CCname"
                  />
                  <TextField
                    onChange={(e) =>
                      this.setState({ cardNumber: e.target.value })
                    }
                    label="Card number *"
                    type="text"
                    name="CCnumber"
                  />
                  <Form.Group className="d-flex flex-row justify-content-start">
                    <TextField
                      onChange={(e) =>
                        this.setState({ cardDueDate: e.target.value })
                      }
                      className="w-50 mr-3"
                      label="MÊS/ANO*"
                      type="text"
                      name="CCexpiry"
                    />
                    <TextField
                      onChange={(e) =>
                        this.setState({ cardVCV: e.target.value })
                      }
                      className="w-50"
                      label="CVC *"
                      type="text"
                      name="CCcvc"
                    />
                  </Form.Group>
                  <Button
                    onClick={this.onSavePress}
                    className="mt-3"
                    variant="contained"
                    color="primary"
                  >
                    Salvar
                  </Button>
                </Form>
              </CardReactFormContainer>
            </>
          )}
        </CardStyle>
      </>
    );
  }
}
