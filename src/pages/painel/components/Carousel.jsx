import React, { useState } from "react";
import { Carousel, Modal } from "react-bootstrap";

const StepCarousel = () => {
  const [step, setStep] = useState("gmail");
  const [modalShow, setModalShow] = React.useState(false);
  const [index, setIndex] = useState(0);
  const handleSelect = (serv) => {
    setStep(serv);
    setModalShow(true);
    setIndex(0);
  };

  const slideSteps = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <>
      <div className="select-serv-email-section">
        <button
          onClick={() => handleSelect("gmail")}
          className="button-serv-email"
        >
          <img
            className="serv-email"
            src={require("../../../assets/images/gmail-logo.png")}
            alt="gmail"
            height="50px"
          />
          G-mail
        </button>
        <button
          onClick={() => handleSelect("outlook")}
          className="button-serv-email"
        >
          <img
            className="serv-email"
            src={require("../../../assets/images/outlook-logo.png")}
            alt="outlook"
            height="50px"
          />
          Outlook
        </button>
        <button
          onClick={() => handleSelect("icloud")}
          className="button-serv-email"
        >
          <img
            className="serv-email"
            src={require("../../../assets/images/apple-logo-3.png")}
            alt="icloud"
            height="50px"
          />
          i-Cloud
        </button>
      </div>
      <Modal
        onHide={() => setModalShow(false)}
        show={modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Carousel activeIndex={index} onSelect={slideSteps}>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require(`../../../assets/images/${step}-steps/step-1.png`)}
                alt="First slide"
              />
              <Carousel.Caption>
                <h3>Primeiro passo</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={require(`../../../assets/images/${step}-steps/step-2.png`)}
                alt="Third slide"
              />

              <Carousel.Caption>
                <h3>Segundo passo</h3>
              </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{ color: "gray" }}>
              <img
                className="d-block w-100"
                src={require(`../../../assets/images/${step}-steps/step-3.png`)}
                alt="Third slide"
              />

              <Carousel.Caption style={{ color: "gray" }}>
                <h3>Terceiro passo</h3>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default StepCarousel;
