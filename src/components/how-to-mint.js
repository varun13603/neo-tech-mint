import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import one from "../assets/images/1.png";
import two from "../assets/images/2.png";
import three from "../assets/images/3.png";
import four from "../assets/images/4.png";
export default function HowToMint() {
  return (
    <div className="howtomint">
      <Container className="mint-cont">
        <Row>
          <Col>
            <h4 className="easy-step">Easy Steps</h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h2 className="big-b">How to Mint :</h2>
          </Col>
        </Row>
        <Row className="mint-steps">
          <Col className="mint-step" lg={3} md={12} sm={12}>
            <img src={one} alt="Step one" />
            <span>Connect your wallet</span>
          </Col>
          <Col className="mint-step" lg={3} md={12} sm={12}>
            <img src={two} alt="Step one" />
            <span>Select your quantity</span>
          </Col>
          <Col className="mint-step" lg={3} md={12} sm={12}>
            <img src={three} alt="Step one" />
            <span>Confirm the transaction</span>
          </Col>
          <Col className="mint-step" lg={3} md={12} sm={12}>
            <img src={four} alt="Step one" />
            <span>Receive your NFTs</span>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
