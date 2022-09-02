import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Row, Col, Container } from "react-bootstrap";
import GridLoader from "react-spinners/GridLoader";
import { BsArrowLeft } from "react-icons/bs";

function Countrie() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://restcountries.com/v3.1/name/${name}`
      );
      setData(res.data);
      setLoading(false);
    };
    fetchData();
  }, [name]);

  //   loading fun
  const Loading = () => {
    return (
      <div
        style={{ height: "400px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <GridLoader color={"#0d6efd"} size={30} />
      </div>
    );
  };

  const Show = () => {
    return (
      <Fragment>
        {data.map((countrie) => {
          return (
            <Fragment key={countrie.name.common}>
              <Col lg={5}>
                <img
                  className="img-fluid mb-4"
                  src={countrie.flags.svg}
                  alt=""
                />
              </Col>
              <Col lg={6} className="mb-4">
                <h1 className="display-5 fw-bold mb-4">
                  {countrie.name.common}
                </h1>
                <Row>
                  <Col sm={12} md={6}>
                    <p>
                      <span className="fw-bold ">Native Name: </span>
                      {
                        countrie.name.nativeName[
                          Object.keys(countrie.name.nativeName)[0]
                        ].official
                      }
                    </p>
                    <p>
                      <span className="fw-bold ">Population: </span>
                      {countrie.population}
                    </p>
                    <p>
                      <span className="fw-bold ">Region: </span>
                      {countrie.region}
                    </p>
                    <p>
                      <span className="fw-bold ">Sub Region: </span>
                      {countrie.subregion}
                    </p>
                    <p>
                      <span className="fw-bold ">Capital: </span>
                      {countrie.capital}
                    </p>
                  </Col>
                  <Col sm={12} md={6} className="my-4 my-lg-0">
                    <p>
                      <span className="fw-bold ">Top Level Domain: </span>
                      {countrie.tld[0]}
                    </p>
                    <p>
                      <span className="fw-bold ">Currencies: </span>
                      {
                        countrie.currencies[Object.keys(countrie.currencies)[0]]
                          .name
                      }
                    </p>
                    <p>
                      <span className="fw-bold ">Languages: </span>
                      {Object.values(Object.values(countrie.languages)).join(
                        ","
                      )}
                    </p>
                  </Col>
                </Row>
                <Row className="align-items-center justify-content-start">
                  <Col lg={3}>
                    <span className="fw-bold">Border Countries: </span>
                  </Col>
                  <Col className=" mt-3 mt-lg-0">
                    {countrie.borders ? (
                      countrie.borders.map((e, i) => (
                        <button
                          key={i}
                          style={{ cursor: "unset" }}
                          className="btn bg-white shadow-sm btn-primary border-0 text-dark py-2 px-4 me-3 mb-3 mb-lg-0"
                        >
                          {e}
                        </button>
                      ))
                    ) : (
                      <p>No border countries</p>
                    )}
                  </Col>
                </Row>
              </Col>
            </Fragment>
          );
        })}
      </Fragment>
    );
  };

  return (
    <Container id="countrie">
      <Row className="mt-5">
        <Col>
          <Link
            className="btn bg-white shadow-sm btn-primary border-0 text-dark py-2 px-4"
            to="/"
          >
            <BsArrowLeft className="me-2" /> Back
          </Link>
        </Col>
      </Row>
      <Row className="justify-content-between mt-5">
        {loading ? <Loading /> : <Show />}
      </Row>
    </Container>
  );
}

export default Countrie;
