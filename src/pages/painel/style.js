import styled from "styled-components";

export const InputContainer = styled.div`
  input {
    ::placeholder {
      color: #c2c2c2;
    }
  }
  p[id="error"] {
    color: #ff3333;
    background-color:white;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;

export const FullValue = styled.div`
  display: flex;
  flex-direction:column;
  justifu-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight:bold;
  color:#363636;
  label:nth-child(2){
    width:100%;
    border-top: solid 1px;
    text-align:center;

  }
  p[id="error"] {
    color: #ff3333;
    background-color:white;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
`;
