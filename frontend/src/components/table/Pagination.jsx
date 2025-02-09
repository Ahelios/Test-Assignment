function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        {'<'}
      </button>

      {/* First page */}
      <button
        onClick={() => onPageChange(1)}
        className={currentPage === 1 ? 'active' : ''}
      >
        1
      </button>

      {/* Show dots if there are many pages before current */}
      {currentPage > 3 && <button disabled>...</button>}

      {/* Pages around current page */}
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter(
          (num) =>
            num !== 1 && num !== totalPages && Math.abs(currentPage - num) <= 1
        )
        .map((num) => (
          <button
            key={num}
            onClick={() => onPageChange(num)}
            className={currentPage === num ? 'active' : ''}
          >
            {num}
          </button>
        ))}

      {/* Show dots if there are many pages after current */}
      {currentPage < totalPages - 2 && <button disabled>...</button>}

      {/* Last page */}
      {totalPages > 1 && (
        <button
          onClick={() => onPageChange(totalPages)}
          className={currentPage === totalPages ? 'active' : ''}
        >
          {totalPages}
        </button>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        {'>'}
      </button>
    </div>
  );
}

export default Pagination;
