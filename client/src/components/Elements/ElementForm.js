import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../../constants";
import { createEnum } from "../../helpers";

const ElementForm = ({
  buttonText,
  elementCategory,
  elementCogRating,
  elementDescription,
  elementDuration,
  elementFormat,
  elementLabel,
  elementLink,
  elementMarket,
  elementNumber,
  elementPhysRating,
  elementSubCategory,
  onChange,
  onChangeDropdown,
  onSubmit,
}) => {
  const [dropdowns, setDropdowns] = useState({
    formats: {},
    categories: {},
    markets: {},
  });

  useEffect(() => {
    const componentDidMount = () => {
      Promise.all([
        axios.get(`${API_URL}/formats/`),
        axios.get(`${API_URL}/categories/`),
        axios.get(`${API_URL}/markets/`),
      ]).then(
        ([{ data: formats }, { data: categories }, { data: markets }]) => {
          setDropdowns({
            formats: createEnum(formats),
            categories: createEnum(categories),
            markets: createEnum(markets),
          });
        }
      );
    };

    componentDidMount();
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Form.Row>
        <Form.Group as={Col} controlId="elementNumber">
          <Form.Label>Number</Form.Label>
          <Form.Control
            name="elementNumber"
            onChange={onChange}
            placeholder="add #"
            required
            type="text"
            value={elementNumber}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementLabel">
          <Form.Label>Label</Form.Label>
          <Form.Control
            name="elementLabel"
            onChange={onChange}
            placeholder="add label"
            required
            type="text"
            value={elementLabel}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="elementDescription"
            onChange={onChange}
            placeholder="add description"
            required
            type="text"
            value={elementDescription}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementFormat">
          <Form.Label>Format</Form.Label>
          <Form.Control
            as="select"
            name="elementFormat"
            onChange={(e) => {
              onChangeDropdown(e, dropdowns.formats);
            }}
            required
            value={elementFormat._id}
          >
            <option selected disabled>Choose ...</option>
            {Object.keys(dropdowns.formats).map((format, idx) => {
              return (
                <option key={`format-${format}`} value={format}>
                  {dropdowns.formats[format].elementFormat}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementDuration">
          <Form.Label>Duration</Form.Label>
          <Form.Control
            name="elementDuration"
            onChange={onChange}
            placeholder="min:secs"
            required
            type="text"
            value={elementDuration}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementCategory">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            name="elementCategory"
            onChange={(e) => {
              onChangeDropdown(e, dropdowns.categories);
            }}
            required
            value={elementCategory._id}
          >       
            <option selected disabled>Choose ...</option>
            {Object.keys(dropdowns.categories).map((item, idx) => {
              return (
                <option key={`category-${item}`} value={item}>
                  {dropdowns.categories[item].elementCategory}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementSubCategory">
          <Form.Label>Subcategory</Form.Label>
          <Form.Control
            name="elementSubCategory"
            onChange={onChange}
            placeholder="insert subcategory"
            required
            type="text"
            value={elementSubCategory}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="elementMarket">
          <Form.Label>Market</Form.Label>
          <Form.Control
            as="select"
            name="elementMarket"
            onChange={(e) => {
              onChangeDropdown(e, dropdowns.markets);
            }}
            required
            value={elementMarket._id}
          >            
            <option selected disabled>Choose ...</option>
            {Object.keys(dropdowns.markets).map((id, idx) => {
              return (
                <option key={`market-${id}`} value={id}>
                  {dropdowns.markets[id].elementMarket}
                </option>
              );
            })}
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementCogRating">
          <Form.Label>Cognitive Rating</Form.Label>
          <Form.Control
            as="select"
            name="elementCogRating"
            onChange={onChange}
            required
            value={elementCogRating}
          >
            <option defaultValue>Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Form.Control>
        </Form.Group>

        <Form.Group as={Col} controlId="elementPhysRating">
          <Form.Label>Physical Rating</Form.Label>
          <Form.Control
            as="select"
            name="elementPhysRating"
            onChange={onChange}
            required
            value={elementPhysRating}
          >
            <option defaultValue>Choose...</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
          </Form.Control>
        </Form.Group>
      </Form.Row>

      <Form.Row>
        <Form.Group as={Col} controlId="elementLink">
          <Form.Label>Vimeo Link</Form.Label>
          <Form.Control
            name="elementLink"
            onChange={onChange}
            placeholder="insert address"
            required
            type="text"
            value={elementLink}
          />
        </Form.Group>
      </Form.Row>

      <Form.Row
        style={{
          justifyContent: "flex-end",
        }}
      >
        <Button as={Link} to="./" variant="link">
          Go Back
        </Button>
        <Button type="submit" variant="primary">
          {buttonText}
        </Button>
      </Form.Row>
    </Form>
  );
};

export default ElementForm;
