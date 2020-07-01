import React, { Component } from "react";
import api from "../../../../services/api";
import { Container, Table } from "react-bootstrap";

function Item({ id, name, data, value }) {
  return (
    <>
      <div className="table-responsive-xl">
        <Table striped bordered hover>
          <tbody>
            <tr>
              <td style={{width:"15.5%"}}>{id}</td>
              <td style={{width:"30%"}}>{name}</td>
              <td style={{width:"26%"}}>{data}</td>
              <td style={{width:"28%"}}>{value}</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
}

class Billets extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      variant: "",
      Messsage: "",
    };
  }

  getAllBillets = async () => {
    try {
      await api.get("/billets").then((res) => {
        const { data } = res;
        this.setState({
          dataSource: data,
          variant: "primary",
          Messsage: "Todos os boletos foram carregados!",
        });
      }); 
    } catch (err) {
      this.setState({
        variant: "danger",
        Messsage: "ops, você não tem boletos cadrastrados ou ouve um erro!",
      });
    }
  };

  componentDidMount() {
    this.getAllBillets();
  }

  render() {
    const { dataSource } = this.state;
    return (
      <Container fluid>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th style={{width:"15.5%"}}>#</th>
              <th style={{width:"30%"}}>Nome</th>
              <th style={{width:"26%"}}>Data</th>
              <th style={{width:"28%"}}>Valor</th>
            </tr>
          </thead>
        </Table>
        {dataSource.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            data={item.data}
            value={item.value}
          />
        ))}
      </Container>
    );
  }
}

export default Billets;
