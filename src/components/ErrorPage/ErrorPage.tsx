import './ErrorPage.scss';

type Props = {
  reload: () => void;
};

export const ErrorPage = ({ reload }: Props) => {
  return (
    <div className="error">
      <div className="error__container">
        <h2 className="error__title">Something went wrong</h2>
        <p className="error__message">Something went wrong</p>
        <button className="error__button" onClick={reload}>
          Reload
        </button>
      </div>
    </div>
  );
};
