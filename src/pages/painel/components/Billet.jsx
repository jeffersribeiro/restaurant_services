import React, { Component, useState } from "react";
import { Container } from "react-bootstrap";
import {
  DeleteOutline,
  CreateOutlined,
  FileCopyOutlined,
  CheckCircleOutlined,
} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import api from "../../../services/api";
import MyAlert from "./Alert";
import styled from "styled-components";

const Card = styled.div`
  height: 100%;
  width: 230px;
  @media only screen and (max-width: 375px) {
    width: 100%;
  }
  margin: 11px;
  border-radius: 3px;
  padding: 20px;
  box-shadow: 1px 1px 4px gray;
`;

const CardActions = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
`;

function Item({ id, name, data, value, email }) {
  const [isDisabled, setDisabled] = useState(true);
  const [nameState, setNameState] = useState(name);
  const [dataState, setDataState] = useState(data);
  const [variant, setVariant] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [daySelect, setDaySelect] = useState(0);
  const [day, setDay] = useState(true);
  const [emailState, setEmail] = useState(email);
  const deleteBillet = async () => {
    try {
      await api.delete(`/billets/${id}`).then((res) => {
        setIsError(true);
        setVariant("success");
        setMessage("Boleto excluido");
        window.location.reload(false);
      });
    } catch (err) {
      setIsError(true);
      setVariant("error");
      setMessage("Não foi possivel excluir :/");
    }
  };

  const updateItem = async () => {
    setDisabled(false);
    let icon = document.getElementById(`icon-${id}`);
    icon.style.color = "green";
  };

  const copyEmail = (str) => {
    str = emailState;
    const el = document.createElement("textarea");
    el.value = str;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    setIsError(true);
    setVariant("info");
    setMessage("Email copiado");
  };

  const onDaySelect = () => {
    setDaySelect(1)
    setDay(false);
  };

  const saveUpdate = async () => {
    let icon = document.getElementById(`icon-${id}`);
    let inputDaySelect = document.getElementById(`select-day-field-${id}`);

    if (daySelect !== 0) {
      if (inputDaySelect.value < 1 || inputDaySelect.value > 31) {
        setIsError(true);
        setVariant("warning");
        setMessage("Por favor coloque um dia valido :|");
      } else {
        try {
          await api
            .put(`/billets/${id}`, {
              id: id,
              name: nameState,
              email: emailState,
              data: `Quero pagar no dia ${daySelect}`,
            })
            .then((res) => {
              setIsError(true);
              setVariant("success");
              setMessage("Atualizado");
              setDisabled(true);
              icon.style.color = "gray";
            });
        } catch (err) {
          setIsError(true);
          setVariant("error");
          setMessage("Não foi possivel atualizar, tente novamente :/");
          icon.style.color = "green";
          setDisabled(false);
        }
      }
    } else {
      try {
        await api
          .put(`/billets/${id}`, {
            id: id,
            name: nameState,
            email: emailState,
            data: dataState,
          })
          .then((res) => {
            setIsError(true);
            setVariant("success");
            setMessage("Atualizado");
            setDisabled(true);
            icon.style.color = "gray";
          });
      } catch (err) {
        setIsError(true);
        setVariant("error");
        setMessage("Não foi possivel atualizar, tente novamente :/");
        icon.style.color = "green";
        setDisabled(false);
      }
    }
  };

  return (
    <>
      <Card>
        <TextField
          id={`name-field-${id}`}
          label="Nome"
          value={nameState}
          onChange={(e) => setNameState(e.target.value)}
          disabled={isDisabled}
        />
        <FormControl className="d-flex flex-row w-100">
          <InputLabel id="demo-simple-select-label">Data</InputLabel>
          <Select
            className="data-disable-field"
            labelId="demo-simple-select-label"
            id={`data-field-${id}`}
            value={dataState}
            onChange={(e) => setDataState(e.target.value)}
            disabled={isDisabled}
          >
            <MenuItem value={data} disabled>
              {data}
            </MenuItem>
            <MenuItem value={"Pago no vencimento"}>Pago no vencimento</MenuItem>
            <MenuItem value={"Pago no recebimento"}>
              Pago no recebimento
            </MenuItem>
            <MenuItem onClick={onDaySelect} value="Pagar no dia:">
              Pagar no dia:{" "}
            </MenuItem>
          </Select>
          <TextField
            type="number"
            max="31"
            min="1"
            value={daySelect}
            onChange={(e) => setDaySelect(e.target.value)}
            style={{ display: day ? "none" : "block" }}
            className="w-25"
            id={`select-day-field-${id}`}
            label="Dia"
            disabled={isDisabled}
          />
        </FormControl>
        <div className="access-email-container">
          <p className="mt-3 access-email">{email}</p>
        </div>
        <CardActions>
          <IconButton color="primary" component="span" onClick={deleteBillet}>
            <DeleteOutline color="secondary" />
          </IconButton>
          <IconButton color="primary" component="span" onClick={updateItem}>
            <CreateOutlined color="primary" />
          </IconButton>
          <IconButton color="primary" component="span" onClick={copyEmail}>
            <FileCopyOutlined color="primary" />
          </IconButton>
          <IconButton
            style={{ color: "gray" }}
            as="button"
            onClick={saveUpdate}
            id={`icon-${id}`}
            component="span"
            disabled={isDisabled}
          >
            <CheckCircleOutlined />
          </IconButton>
        </CardActions>
        <MyAlert
          open={isError}
          onClose={() => setIsError(false)}
          severity={variant}
          message={message}
        />
      </Card>
    </>
  );
}

class Billets extends Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      variant: "",
      message: "",
      isError: false,
    };
  }

  getAllBillets = async () => {
    try {
      await api.get("/billets").then((res) => {
        this.setState({
          dataSource: res.data,
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
      <Container fluid className="d-flex flex-wrap">
        {dataSource.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            email={item.email}
            data={item.data}
            value={item.value}
          />
        ))}
      </Container>
    );
  }
}

export default Billets;
