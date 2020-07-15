import React, { Component } from "react";
import api from "../../../services/api";
import { Form, Modal, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { ModalInfos } from "../style";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { FileCopyOutlined } from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import StepCarousel from "./Carousel";
import MyAlert from "./Alert";

const OpenModalButton = styled.div`
  button{
    position:relative
    bottom:9em;
  }  

`;

class ViewModal extends Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
      showInstructions: true,
      name: "",
      billetdueDate: "",
      data: "1",
      variant: "",
      selecSteps: "gmail-steps",
      message: "",
      isError: false,
      isLoading: false,
      email:''
    };
  }
  onSubmitPress = async (e) => {
    e.preventDefault();
    const { name, data } = this.state;
    try {
      if (!name || !data) {
        this.setState({
          isError: true,
          variant: "info",
          message: "Preencha todos os campos para continuar!",
        });
      } else {
        await api
          .post("/billets", {
            name,
            data,
          })
          .then((res) =>{

            
            this.setState({
              email: res.statusText,
              name: "",
              billetdueDate: "",
              data: "",
              isError: true,
              variant: "success",
              message: "Boleto salvo com sucesso ;)",
              showInstructions: false,
            });
          });
      }
    } catch (err) {
      this.setState({
        isError: true,
        variant: "error",
        message:
          "Não foi possivel enviar seu boleto, por favor tente novamente!",
      });
    }
  };

  copyEmail = (str) => {
    str = this.state.email;
    const el = document.createElement('textarea');
    el.value = str
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy')
    document.body.removeChild(el)
    this.setState({
      isError: true,
      variant: "info",
      message: "Copiado",
    });
  };

  handleCheck = (target) => {
    let datainput = document.getElementById("inputDay");
    target
      ? datainput.removeAttribute("disabled")
      : datainput.setAttribute("disabled", true);
  };

  handleClose = () => this.setState({ showModal: false });

  handleShow = () => this.setState({ showModal: true, showInstructions: true });

  render() {
    return (
      <>
        <MyAlert
          open={this.state.isError}
          onClose={() => this.setState({ isError: false })}
          severity={this.state.variant}
          message={this.state.message}
        />
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          {this.state.showInstructions ? (
            <Modal.Body>
              <Modal.Header>
                <ModalInfos>
                  <label id="number1">1</label>
                  <label id="letters1">Preencha as informações</label>
                </ModalInfos>
              </Modal.Header>
              <Form onSubmit={this.onSubmitPress}>
                <Form.Group className="d-flex flex-column" controlId="">
                  <Form.Label>Nome do Boleto</Form.Label>
                  <TextField
                    className="w-50"
                    maxLength={30}
                    value={this.state.name}
                    onChange={(e) => this.setState({ name: e.target.value })}
                    type="text"
                    label="Ex: Conta de Luz"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label as="label">Datas de pagamento:</Form.Label>
                  <Row>
                    <Form.Check
                      type="radio"
                      value={"Pagar agora"}
                      onClick={(e) => this.setState({ data: e.target.value })}
                      label="Quero pagar assim que receber o boleto"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      value={"Pagar do dia do vencimento"}
                      onClick={(e) => {
                        this.setState({ data: e.target.value });
                      }}
                      label="Quero pagar no dia de vencimento"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios2"
                    />
                    <Form.Check
                      type="radio"
                      label="Quero pagar no dia:"
                      className="mr-3"
                      onClick={(e) => {
                        this.handleCheck(e.target.checked);
                      }}
                      name="formHorizontalRadios"
                      id="datacheck"
                    />
                    <Form.Control
                      className="w-25"
                      as="select"
                      value={this.state.data}
                      onChange={(e) => this.setState({ data: e.target.value })}
                      id="inputDay"
                      disabled
                    >
                      <option>Selecione</option>
                      <option value="Quero pagar no dia 1">1</option>
                      <option value="Quero pagar no dia 2">2</option>
                      <option value="Quero pagar no dia 3">3</option>
                      <option value="Quero pagar no dia 4">4</option>
                      <option value="Quero pagar no dia 5">5</option>
                      <option value="Quero pagar no dia 6">6</option>
                      <option value="Quero pagar no dia 7">7</option>
                      <option value="Quero pagar no dia 8">8</option>
                      <option value="Quero pagar no dia 9">9</option>
                      <option value="Quero pagar no dia 10">10</option>
                      <option value="Quero pagar no dia 11">11</option>
                      <option value="Quero pagar no dia 12">12</option>
                      <option value="Quero pagar no dia 13">13</option>
                      <option value="Quero pagar no dia 14">14</option>
                      <option value="Quero pagar no dia 15">15</option>
                      <option value="Quero pagar no dia 16">16</option>
                      <option value="Quero pagar no dia 17">17</option>
                      <option value="Quero pagar no dia 18">18</option>
                      <option value="Quero pagar no dia 19">19</option>
                      <option value="Quero pagar no dia 20">20</option>
                      <option value="Quero pagar no dia 21">21</option>
                      <option value="Quero pagar no dia 22">22</option>
                      <option value="Quero pagar no dia 23">23</option>
                      <option value="Quero pagar no dia 24">24</option>
                      <option value="Quero pagar no dia 25">25</option>
                      <option value="Quero pagar no dia 26">26</option>
                      <option value="Quero pagar no dia 27">27</option>
                      <option value="Quero pagar no dia 28">28</option>
                      <option value="Quero pagar no dia 29">29</option>
                      <option value="Quero pagar no dia 30">30</option>
                      <option value="Quero pagar no dia 31">31</option>
                    </Form.Control>
                  </Row>
                </Form.Group>
                <Modal.Footer className="d-flex flex-row bd-highlight mb-3 w-100">
                  <Button
                    className="w-25 h-25 mr-2"
                    variant="light"
                    onClick={this.handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    className="w-25 h-25"
                    variant="contained"
                    color="primary"
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Modal.Footer>
              </Form>
            </Modal.Body>
          ) : (
            <Modal.Body>
              <Modal.Header>
                <ModalInfos>
                  <label id="number2">2</label>
                  <label id="letters2">Siga os seguintes passos</label>
                </ModalInfos>
              </Modal.Header>
              <Modal.Body>
                <p>Este é seu E-mail</p>
                <div className="d-flex flex-row align-items-end m-3">
                  <p>{this.state.email}</p>
                  <IconButton
                    color="primary"
                    component="span"
                    onClick={this.copyEmail}
                  >
                    <FileCopyOutlined color="primary" />
                  </IconButton>
                </div>
                <label htmlFor="select email serv">
                  Selecione seu serviço de E-mail
                </label>
                <StepCarousel />
              </Modal.Body>
              <Modal.Footer className="d-flex flex-row bd-highlight mb-3 w-100">
                <Button
                  className="w-25 h-25 mr-2"
                  variant="light"
                  onClick={this.handleClose}
                >
                  Entendi
                </Button>
              </Modal.Footer>
            </Modal.Body>
          )}
        </Modal>
        <OpenModalButton>
          <Button
            id="open-btn"
            variant="contained"
            color="primary"
            onClick={this.handleShow}
          >
            Adicionar Boleto
          </Button>
        </OpenModalButton>
      </>
    );
  }
}

export default ViewModal;
