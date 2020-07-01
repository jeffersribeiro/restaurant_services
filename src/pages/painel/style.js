import styled from "styled-components";

export const ModalInfos = styled.div`
width:100%;
display:flex;
flex-direction:row;
justify-content:center;
label[id="number1"]{
  background-color:#0878F0;
  height:25px;
  width:25px;
  margin:2px 10px;
  text-align:center;
  border-radius:50%;
  color:white;
}
label[id="letters1"]{
  color:black;
}
label[id="number2"]{
  background-color:#0878F0;
  height:25px;
  width:25px;
  margin:2px 10px;
  text-align:center;
  border-radius:50%;
  color:white;
}
label[id="letters2"]{
  color:black;
}

`
export const InputContainer = styled.div`
  input {
    ::placeholder {
      color: #c2c2c2;
    }
  }
  p[id="error"] {
    color: #ff3333;
    background-color: white;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

export const CardStyle = styled.div`
  background-color: #3b7ec5;
  border-radius: 8px;
  border: none;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 100%;
  padding-left: 9px;

  .card-infos {
    background-color: #3b7ec5;
    border: none;
    font-size: 16px;
    color: white;
    ::placeholder,
    ::-webkit-input-placeholder {
      color: white;
    }
    :-ms-input-placeholder {
      color: white;
    }
    :hover {
      border: solid 50px;
    }
    active {
      :border: none;
    }
  }
`;

export const FullValue = styled.div`
  display: flex;
  flex-direction: column;
  justifu-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #363636;
  label:nth-child(2) {
    width: 100%;
    border-top: solid 1px;
    text-align: center;
  }
  p[id="error"] {
    color: #ff3333;
    background-color: white;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;
