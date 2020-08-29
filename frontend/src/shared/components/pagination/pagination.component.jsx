import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { Pagination } from 'semantic-ui-react';

import { PaginationLessContainer, PaginationMoreContainer } from './pagination.styles';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const PaginationComponent = ({ allItems, limit }) => {
  let query = useQuery();
  let history = useHistory();
  let location = useLocation();
  let page = query.get('page') ? query.get('page') : 1;
  const countPages = Math.ceil(allItems/limit);

  if(countPages === 1) return <React.Fragment></React.Fragment>

  return (
    <div>
      <PaginationLessContainer>
        <Pagination
          defaultActivePage={page} 
          totalPages={countPages}
          firstItem={null}
          lastItem={null}
          ellipsisItem={null}
          boundaryRange={0}
          onPageChange={(event, data) => {
            history.push({
              pathname: location.pathname,
              search: `?page=${data.activePage}`
            });
          }}
        />
      </PaginationLessContainer>
      <PaginationMoreContainer>
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
      </PaginationMoreContainer>
    </div>
  )
}

export default PaginationComponent;