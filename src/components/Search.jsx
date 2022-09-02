import { Fragment } from "react";
import { Form, Col, Dropdown } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
function Search({ data, filterData }) {
  
  const handelFilter = (cat) => {
    if (cat === "All") {
      filterData(data);
    } else {
      const update = data.filter((e) => e.region === cat);
      filterData(update);
    }
  };

  const search = async (word) => {
    const res = await axios.get(`https://restcountries.com/v3.1/name/${word}`);
    filterData(res.data);
  };

  const allCategory = ["All", ...new Set(data.map((e) => e.region))];

  return (
    <Fragment>
      <Col sm={12} lg={6}>
        <Form className="rounded d-flex align-items-center px-4 py-3 bg-white shadow-sm">
          <AiOutlineSearch className="fs-3 me-3 zom" />
          <Form.Control
            type="search"
            placeholder="Search for a Country..."
            className="me-2 border-0"
            aria-label="Search"
            onChange={(e) => search(e.target.value)}
          />
        </Form>
      </Col>
      <Col sm={12} lg={6} className="text-lg-end mt-3 mt-lg-0">
        <Dropdown>
          <Dropdown.Toggle className="shadow-sm p-3" id="dropdown-basic">
            Filter by Region
          </Dropdown.Toggle>
          <Dropdown.Menu className="border-0 shadow-sm">
            {allCategory.map((cat, i) => (
              <Dropdown.Item key={i} onClick={() => handelFilter(cat)}>
                {cat}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </Col>
    </Fragment>
  );
}

export default Search;
