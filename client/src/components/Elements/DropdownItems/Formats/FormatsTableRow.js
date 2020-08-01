import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { StyledTableRow } from "../../../../styles";

const FormatsTableRow = ({ elementFormat, _id, deleteFormat }) => (
  <StyledTableRow>
    <td>{elementFormat}</td>
    <td>
      <Link to={`/-formats/edit/${_id}`}>
        <Button size="sm" variant="outline-warning">
          edit
        </Button>
      </Link>
      <span> | </span>
      <Button
        onClick={() => {
          deleteFormat(_id);
        }}
        size="sm"
        variant="outline-danger"
      >
        delete
      </Button>
    </td>
  </StyledTableRow>
);

export default FormatsTableRow;
