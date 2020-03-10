import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

export default function showFullDetails(ontology_term, details) {
  return (
    <Container>
      <div>
        <strong>Details:</strong>
        {details[0] &&
          details[0].evidence &&
          Array.isArray(details[0].evidence.Description) &&
          details[0].evidence.Description[0]}
      </div>
      <div>
        <strong>Type:</strong>
        {details[0] &&
          details[0].evidence &&
          details[0].evidence.Type &&
          Array.isArray(details[0].evidence.Type) &&
          details[0].evidence.Type[0]}
      </div>
    </Container>
  );
}
