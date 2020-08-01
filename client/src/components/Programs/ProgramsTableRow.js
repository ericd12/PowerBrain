import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const ProgramsTableRow = ({
  programNumber,
  programName,
  _id,
  deleteProgram,
}) => {
  return (
    <tr>
      <td>{programNumber}</td>
      <td>{programName}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`/-programs/edit/${_id}`}>
          <Button size="sm" variant="outline-warning">
            edit
          </Button>
        </Link>
        <span> | </span>
        <Button
          onClick={() => {
            deleteProgram(_id);
          }}
          size="sm"
          variant="outline-danger"
        >
          delete
        </Button>
      </td>
    </tr>
  );
};

export default ProgramsTableRow;
