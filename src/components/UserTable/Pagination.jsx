import React from 'react';

const Pagination = ({ currentPage, totalPages, paginate }) => (
  <div className="flex justify-center items-center mt-4">
    <button
      onClick={() => paginate(currentPage - 1)}
      disabled={currentPage === 1}
      className={`px-4 py-2 rounded-l ${
        currentPage === 1 ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      Previous
    </button>
    <span className="px-4 py-2 bg-gray-200 border border-gray-300 text-sm">
      {currentPage} / {totalPages}
    </span>
    <button
      onClick={() => paginate(currentPage + 1)}
      disabled={currentPage === totalPages}
      className={`px-4 py-2 rounded-r ${
        currentPage === totalPages ? 'bg-gray-500 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
      } text-white`}
    >
      Next
    </button>
  </div>
);

export default Pagination;
