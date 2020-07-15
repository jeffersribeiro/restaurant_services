import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Card from "./components/CreditCard";
import Button from "@material-ui/core/Button";
import ViewModal from "./components/Modal";
import Billets from "./components/Billet";
import { logout } from "../../services/auth";

class Painel extends Component {
  handleLogout = (e) => {
    logout();
    this.props.history.push("/");
  };

  render() {
    return (
      <Container className="h-100" fluid>
        <Row className="d-flex flex-row justify-content-between m-2">
          <ViewModal />
          <Button
            href="/"
            variant="contained"
            color="primary"
            onClick={this.handleLogout}
          >
            Logout
          </Button>
        </Row>
        <Row className="mt-3">
          <Col  xs={12} md={8} >
            <Billets />
          </Col>
          <Col xs="auto" md={4}>
            <Card />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withRouter(Painel);
