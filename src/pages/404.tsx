import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';

const NotFoundPage = () => {
  const dispatch = useContext(GlobalDispatchContext);

  dispatch(setPageName('404 - not found'));

  return (
    <div className="not-found">
      <p>The page you were looking for wasn't found.</p>

      <Link to="/">Go to home page</Link>
    </div>
  );
};

export default NotFoundPage;
