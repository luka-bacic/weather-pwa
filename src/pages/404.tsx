import React, { useContext } from 'react';
import { Link } from 'gatsby';
import { GlobalDispatchContext } from 'context';
import { setPageName } from 'context/actions';
import SEO from 'components/misc/SEO';

const NotFoundPage = () => {
  const dispatch = useContext(GlobalDispatchContext);

  dispatch(setPageName('404 - not found'));

  return (
    <div className="not-found">
      <p>Close, but no cigar.</p>

      <p>The page you wanted doesn't exist.</p>

      <p>You could:</p>

      <ul className="not-found__links">
        <li>
          {typeof window !== 'undefined' && (
            <button
              className="not-found__back"
              onClick={() => {
                window.history.back();
              }}
            >
              Go back
            </button>
          )}
        </li>
        <li>
          <Link to="/">Go to home page</Link>
        </li>
      </ul>

      <SEO
        title="Page not found | Weather"
        description="A page you requested doesn't exist. Please check the URL or let the site admin know about it."
      />
    </div>
  );
};

export default NotFoundPage;
