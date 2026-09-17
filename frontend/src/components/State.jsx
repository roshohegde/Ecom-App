export const Loading = () => <div className="state">Loading…</div>;
export const Empty = ({ children }) => <div className="state">{children}</div>;
export const ErrorMessage = ({ error }) =>
  error ? (
    <p className="error" role="alert">
      {error}
    </p>
  ) : null;
