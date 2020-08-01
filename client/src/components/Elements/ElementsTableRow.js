import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { StyledTableRow } from "../../styles";

const ElementsTableRow = ({
  _id,
  deleteElement,
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
}) => {
  return (
    <StyledTableRow>
      <td>{elementNumber}</td>
      <td>{elementLabel}</td>
      <td>{elementDescription}</td>
      <td>{elementFormat.elementFormat}</td>
      <td>{elementDuration}</td>
      <td>{elementCategory.elementCategory}</td>
      <td>{elementSubCategory}</td>
      <td>{elementMarket.elementMarket}</td>
      <td>{elementCogRating}</td>
      <td>{elementPhysRating}</td>
      <td>{elementLink}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`/-elements/edit/${_id}`}>
          <Button size="sm" variant="outline-warning">
            edit
          </Button>
        </Link>
        <span> | </span>
        <Button
          onClick={() => {
            deleteElement(_id);
          }}
          size="sm"
          variant="outline-danger"
        >
          delete
        </Button>
      </td>
    </StyledTableRow>
  );
};

export default ElementsTableRow;
