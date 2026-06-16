import '../Pagination/Pagination.scss';

type Props = {
  totalPosts: number;
  postsPerPage: number | string;
  setCurrentPage: (page: number) => void;
};

export const Pagination = ({
  totalPosts,
  postsPerPage,
  setCurrentPage,
}: Props) => {
  const pages = [];

  if (postsPerPage !== 'All') {
    const perPage = Number(postsPerPage);

    for (let i = 1; i < Math.ceil(totalPosts / perPage); i++) {
      pages.push(i);
    }
  }

  if (pages.length < 2) {
    return null;
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            className="pagination__button"
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};
