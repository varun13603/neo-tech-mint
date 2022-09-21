import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import twitter from "../assets/images/twitter.gif";
import geo from "../assets/images/geo.gif";
import telegram from "../assets/images/telegram.gif";

export default function Footer() {
    return (
        <div className='footer'>
            <Container>
                <Row>
                    <Col lg={12} sm={12} md={12}>
                    <div className="socials">
                    <span><a href="https://twitter.com/NeotechFinance"><img src={twitter} alt="" /></a></span>
                    <span><a href="https://neotech.finance/"><img src={geo} alt="" /></a></span>
                    <span><a href="https://t.me/neotechfinance"><img src={telegram} alt="" /></a></span>
                    </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
