import { Fragment, useEffect, useState } from "react";
import Search from "./Search";
import axios from "axios";
import { Col, Card, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import GridLoader from "react-spinners/GridLoader";

function Countries() {
  const [data, setData] = useState([]);
  const [cloneData, setCloneData] = useState([]);
  const [loading, setLoading] = useState(false);

  // fetch Data
  const fetchData = async () => {
    setLoading(true);
    const res = await axios.get("https://restcountries.com/v3.1/all");
    setData(res.data);
    setCloneData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //   show fun
  const Show = () => {
    return (
      <Fragment>
        {cloneData.map((country) => {
          return (
            <Col lg={3} md={6} className="mb-4" key={country.name.common}>
              <Link to={`/name/${country.name.official}`} className="nav-link">
                <Card className="h-100 border-0 shadow">
                  <Card.Img
                    src={country.flags.png}
                    variant="top"
                    alt={country.name.common}
                    height="200px"
                  />
                  <Card.Body className="mt-2">
                    <Card.Title className="fw-bold">
                      {country.name.common.substring(0, 25)}
                    </Card.Title>
                    <Card.Text className="mb-1">
                      <span className="fw-bold">population: </span>
                      <span className="gray"> {country.population}</span>
                    </Card.Text>
                    <Card.Text className="mb-1">
                      <span className="fw-bold">Region: </span>
                      <span className="gray"> {country.region}</span>
                    </Card.Text>
                    <Card.Text className="mb-3">
                      <span className="fw-bold">Capital: </span>
                      <span className="gray">{country.capital}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Fragment>
    );
  };

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

  return (
    <Fragment>
      <Row id="search" className="my-5">
        <Search data={data} filterData={setCloneData} />
      </Row>
      <Row id="countries">{loading ? <Loading /> : <Show />}</Row>
    </Fragment>
  );
}

export default Countries;
