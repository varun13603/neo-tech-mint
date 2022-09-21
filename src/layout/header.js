import { Button } from "react-bootstrap";
import React, { useCallback, useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/images/logo-light.png";
export const Header = () => {
  const [y, setY] = useState(0);
  const [atTop, setAtTop] = useState(true);

  const handleNavigation = useCallback(
    (e) => {
      const window = e.currentTarget;
      if (y > 60) {
        setAtTop(false)
      } else if (y < 60) {
        setAtTop(true);
      }
      setY(window.scrollY);
    },
    [y]
  );

  useEffect(() => {
    setY(window.scrollY);
    window.addEventListener("scroll", handleNavigation);

    return () => {
      window.removeEventListener("scroll", handleNavigation);
    };
  }, [handleNavigation]);
  return (
    <div>
      <Navbar className={`${!atTop ? 'header-blur' : "header-nav"}`} collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Navbar.Brand href="#home">
            <img src={logo} alt="NeoTech Logo" />
          </Navbar.Brand>
          <span className="spacer"></span>
          <button className="btn-dark">My NFTs</button>
        </Container>
      </Navbar>
    </div>
  );
};
