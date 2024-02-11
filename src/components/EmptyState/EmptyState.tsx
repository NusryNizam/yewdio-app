type EmptyStateProps = {
  message?: string;
};

const EmptyState = ({ message }: EmptyStateProps) => {
  return (
    <div className="empty-state">
      {message ?? "Content not found."}
    </div>
  );
};

export default EmptyState;
