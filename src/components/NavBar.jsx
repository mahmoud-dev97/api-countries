import { Row, Col, Container } from "react-bootstrap";
import { BsMoonFill } from "react-icons/bs";
function NavBar({ dark ,setDark}) {
  const toggleTheme = () => {
    setDark(!dark);
  };

  return (
    <Container>
      <Row className="py-4 align-items-center">
        <Col>
          <p className="fw-bold fs-5 m-0">Where in the world?</p>
        </Col>
        <Col>
          <p className="fw-bold m-0 fs-6 d-flex justify-content-end align-items-center">
            <BsMoonFill className="me-1" />
            <span onClick={toggleTheme} className="darkbtn">
              Dark Mode
            </span>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default NavBar;
