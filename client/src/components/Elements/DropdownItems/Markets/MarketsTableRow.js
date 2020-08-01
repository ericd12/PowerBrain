import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { StyledTableRow } from "../../../../styles";

const MarketsTableRow = ({ elementMarket, _id, deleteMarket }) => (
  <StyledTableRow>
    <td>{elementMarket}</td>
    <td>
      <Link to={`/-markets/edit/${_id}`}>
        <Button size="sm" variant="outline-warning">
          edit
        </Button>
      </Link>
      <span> | </span>
      <Button
        onClick={() => {
          deleteMarket(_id);
        }}
        size="sm"
        variant="outline-danger"
      >
        delete
      </Button>
    </td>
  </StyledTableRow>
);

export default MarketsTableRow;
