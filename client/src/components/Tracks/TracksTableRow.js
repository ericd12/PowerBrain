import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import ElemData from "./TracksTableElemData";
import { StyledTable } from "../../styles";

const TracksTableRow = ({
  _id,
  deleteTrack,
  elements,
  info,
  trackInfo,
  trackName,
  trackNumber,
}) => {
  return (
    <tr>
      <td>
        <strong>{trackNumber}</strong>
      </td>
      <td>
        <strong>{trackName}</strong>
      </td>
      <td>
        <StyledTable borderless responsive size="sm">
          <thead>
            <tr>
              <th width="75">Slide #</th>
              <th width="100">Element #</th>
              <th width="200">Label</th>
              <th width="100">Timing</th>
              <th width="400">Link</th>
            </tr>
          </thead>
          <tbody style={{ border: "none", fontSize: "90%" }}>
            {trackInfo.map((element, idx) => {
              return (
                <ElemData
                  key={element._id}
                  slideNumber={idx + 1}
                  {...element}
                />
              );
            })}
          </tbody>
        </StyledTable>
      </td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`/-tracks/edit/${_id}`}>
          <Button size="sm" variant="outline-warning">
            edit
          </Button>
        </Link>
        <span> | </span>
        <Button
          onClick={() => {
            deleteTrack(_id);
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

export default TracksTableRow;
