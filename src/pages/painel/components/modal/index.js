import React, { Component } from "react";
import api from "../../../../services/api";
import { Button, Form, Modal, Col, Row } from "react-bootstrap";
import styled from "styled-components";

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
        variant: "primary",
        message: "Boleto salvo com sucesso ;)",
        showModal: false,
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
    let datainput = document.querySelector("input#formBasicData");
    console.log(target);
    target
      ? datainput.removeAttribute("disabled")
      : datainput.setAttribute("disabled", true);
  };

  handleClose = () => this.setState({ showModal: false });

  handleShow = () => this.setState({ showModal: true });

  render() {
    return (
      <>
        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Boleto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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
                <Form.Label>Data de vencimento:</Form.Label>
                <Form.Control
                  value={this.state.billetdueDate}
                  onChange={(e) =>
                    this.setState({ billetdueDate: e.target.value })
                  }
                  type="data"
                  placeholder="20/01/2020"
                />
              </Form.Group>
              <Form.Group as={Row}>
                <Form.Label as="label">Datas de pagamento:</Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    value={`${new Date()
                      .toISOString()
                      .split("T")
                      .reverse()
                      .pop()
                      .split("-")
                      .reverse()
                      .toString()
                      .replace(",", "/")
                      .replace(",", "/")}`}
                    onClick={(e) => this.setState({ payday: e.target.value })}
                    label="Quero pagar agora"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="radio"
                    value={this.state.billetdueDate}
                    onClick={(e) => {
                      this.setState({ payday: e.target.value });
                    }}
                    label="Quero pagar no ultimo dia"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="radio"
                    label="Quero pagar no dia:"
                    onClick={(e) => this.handleCheck(e.target)}
                    name="formHorizontalRadios"
                    id="datacheck"
                  />
                  <Form.Control
                    value={this.state.payday}
                    onChange={(e) => this.setState({ payday: e.target.value })}
                    type="data"
                    id="formBasicData"
                    placeholder="20/01/2020"
                    disabled
                  />
                </Col>
              </Form.Group>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.handleClose}>
                  Cancelar
                </Button>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
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
