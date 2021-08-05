import React from 'react';
import { Link } from 'react-router-dom';

const index = () => {
  return (
    <div>
      <Link to='/users' className="nav-link"> Users </Link>
    </div>
  );
};

export default index;
