import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';

const PaginatedList = (props) => {
  const getPaginationClassName = () => {
    if(props.displaySize === 'small'){
        return 'pagination pagination-small';
    } else {
        return 'pagination';
    }
  };

  return (
    <div>
      <ReactPaginate
        pageCount={Math.ceil(props.totalRecords / props.size)}
        pageRangeDisplayed={1}
        marginPagesDisplayed={1}
        onPageChange={props.handlePageClick}
        containerClassName={getPaginationClassName()}
        activeClassName={'active'}
        forcePage={props.page}
        renderOnZeroPageCount={null}
      />
    </div>
  );
};
PaginatedList.propTypes = {
    displaySize: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.oneOf([null, undefined]),
    ]),
    size: PropTypes.number,
    page: PropTypes.number,
    totalRecords: PropTypes.number,
    handlePageClick: PropTypes.func,
};
export default PaginatedList;