interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="error-message">
      <p><strong>Error:</strong> {message}</p>
    </div>
  );
}