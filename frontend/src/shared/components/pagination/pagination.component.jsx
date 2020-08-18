import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const PaginationComponent = ({ allComments, limit }) => {
  let query = useQuery();
  let history = useHistory();
  let location = useLocation();
  let page = query.get('page') ? query.get('page') : 1;
  const countPages = Math.ceil(allComments/limit);

  if(countPages === 1) return <React.Fragment></React.Fragment>

  return (
    <div>
      <Pagination
        defaultActivePage={page} 
        totalPages={countPages}
        onPageChange={(event, data) => {
          history.push({
            pathname: location.pathname,
            search: `?page=${data.activePage}`
          });
        }}
      />
    </div>
  )
}

export default PaginationComponent;