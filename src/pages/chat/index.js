import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Container, Button, Row, Form } from "react-bootstrap";
import { database, auth } from "../../services/firebase";

class Chat extends Component {
  state = {
    message: "",
    messages: [],
  };
  sendMessage(e) {
    e.preventDefault();
    var userId = auth.currentUser.uid;
    database.ref(`chats/chat1/${userId}`).set({
      message: "message",
    });
  }

  teste() {
    var userId = auth.currentUser.uid;
    database
      .ref(`chats/chat1/${userId}`)
      .once("value")
      .then((snapshot) => {
        var username =
          (snapshot.val() && snapshot.val().username) || "Anonymous";
        console.log(username);
      });
  }

  handleMessage(message) {
    this.setState({
      message,
    });
  }

  render() {
    return (
      <Container style={{ height: "100vh" }} fluid>
        <Row style={{ height: "80vh" }}></Row>
        <Row className="justify-content-md-center">
          <Form onSubmit={this.sendMessage}>
            <Form.Group controlId="formBasicPassword">
              <Form.Control
                onChange={(e) => this.handleMessage(e.target.value)}
                placeholder="Message.."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Row>
        {this.teste()}
      </Container>
    );
  }
}

export default withRouter(Chat);
