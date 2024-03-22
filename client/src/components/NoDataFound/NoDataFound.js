import React from 'react';
import { Card } from 'react-bootstrap';
import { BsExclamationTriangle } from 'react-icons/bs';

const NoDataFound = () => {
  return (
    <Card className="text-center mt-3">
      <Card.Body>
        <BsExclamationTriangle size={50} color="Blue" />
        <h4 className="mt-3">No Employee Data Found</h4>
      </Card.Body>
    </Card>
  );
};

export default NoDataFound;