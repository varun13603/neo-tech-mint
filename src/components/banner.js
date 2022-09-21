import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import bannerBg from "../assets/images/banner-bg.png";
export default function Banner() {
  return (
    <div className="banner">
      <Container className="banner-cont">
        <Row className="banner-row">
          <Col className="left" lg={7} md={12} sm={12}>
            <h1>
              Own the <strong className="big">META FUTURE</strong>
            </h1>
            <h1>Take part in the Real Metaverse!</h1>
            <p>
              Each NTF from our collection of thousands of items represents a
              monument, a historical building, a stadium, a street or a
              reference point in a big city of the world.
              <br />
              And you can own it! And monetize it in so many ways! <br />{" "}
              <b>You don’t just own an NFT, you own a business plan!</b>
            </p>
            <a href="#mint" className="btn-light">Mint Now</a>
          </Col>
          <Col className="right" lg={5} md={12} sm={12}>
            <img src={bannerBg} alt="Banner" />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
