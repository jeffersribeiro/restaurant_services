import styled from "styled-components";

export const ContainerAbout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50vh;
  label {
    font-size: 1.3em;
    color:#3d3d3d;

  }
  p {
    font-size: 1.1em;
    color:#7a7a7a;
  }
`;

export const ContainerLogin = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #12233d;
  background-size: 120px 120px;
  width: 100%;
  height: 100vh;
  h1 {
    color: white;
    margin-bottom: 0.5em;
    text-align:center;
  }
  label {
    font-size: 1.3em;
    color: white;
    font-weight: bold;
  }
  input {
    height: 3.5em;
  }
  button {
    height: 3.3em;
    width: 100%;
    margin-top:1em;
    font-weight: 500;
    font-size: 1.3em;
  }
  .loginButton {
    width: 90%;
    height:3em;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    justify-content: center;
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
