import React, { Component } from "react";
import api from "../../../../services/api";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { ModalInfos } from "../../style";
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
      billetName: "",
      billetdueDate: "",
      payday: "",
      variant: "",
      message: "",
    };
  }
  onSubmitPress = async (e) => {
    e.preventDefault();
    const { billetName, billetdueDate, payday } = this.state;
    try {
      await api
        .post("/billet", {
          billetName,
          billetdueDate,
          payday,
        })
        .then((res) => res);

      this.setState({
        billetName: "",
        billetdueDate: "",
        payday: "",
        billetValue: "",
        variant: "primary",
        message: "Boleto salvo com sucesso ;)",
        showInstructions: false,
      });
    } catch (err) {
      this.setState({
        variant: "danger",
        message:
          "Não foi possivel enviar seu boleto, por favor tente novamente!",
      });
    }
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
                <Form.Group controlId="">
                  <Form.Label>Nome do Boleto</Form.Label>
                  <Form.Control
                    value={this.state.billetName}
                    onChange={(e) =>
                      this.setState({ billetName: e.target.value })
                    }
                    type="text"
                    placeholder="Ex: Conta de Luz"
                  />
                </Form.Group>
                <Form.Group controlId="">
                  <Form.Label>Valor:</Form.Label>
                  <Form.Control
                    value={this.state.billetValue}
                    onChange={(e) =>
                      this.setState({ billetValue: e.target.value })
                    }
                    type="data"
                    placeholder="R$ 0,00"
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label as="label">Datas de pagamento:</Form.Label>
                  <Row>
                    <Form.Check
                      type="radio"
                      value={this.state.payday}
                      onClick={(e) => this.setState({ payday: e.target.value })}
                      label="Quero pagar assim que receber o boleto"
                      name="formHorizontalRadios"
                      id="formHorizontalRadios1"
                    />
                    <Form.Check
                      type="radio"
                      value={this.state.billetdueDate}
                      onClick={(e) => {
                        this.setState({ payday: e.target.value });
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
                      value={this.state.payday}
                      onChange={(e) =>
                        this.setState({ payday: e.target.value })
                      }
                      id="inputDay"
                      disabled
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
                      <option>13</option>
                      <option>14</option>
                      <option>15</option>
                      <option>16</option>
                      <option>17</option>
                      <option>18</option>
                      <option>19</option>
                      <option>20</option>
                      <option>21</option>
                      <option>22</option>
                      <option>23</option>
                      <option>24</option>
                      <option>25</option>
                      <option>26</option>
                      <option>27</option>
                      <option>28</option>
                      <option>29</option>
                      <option>30</option>
                      <option>31</option>
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
                  <Button className="w-25 h-25" variant="primary" type="submit">
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
                  <label id="letters2">Siga esses passo</label>
                </ModalInfos>
              </Modal.Header>
              <div>
                <p>Enviado com sucesso</p>
              </div>
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
          <Button id="open-btn" variant="primary" onClick={this.handleShow}>
            Adicionar Boleto
          </Button>
        </OpenModalButton>
      </>
    );
  }
}

export default ViewModal;
