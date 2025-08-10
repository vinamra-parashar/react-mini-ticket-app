import { memo, useMemo } from 'react';

const priorityColors = {
  Low: 'var(--priority-low)',
  Medium: 'var(--priority-medium)',
  High: 'var(--priority-high)'
};

const TicketItem = memo(({ ticket }) => {
  const formattedDate = useMemo(() => {
    return new Date(ticket.createdAt).toLocaleDateString();
  }, [ticket.createdAt]);

  const truncatedDescription = useMemo(() => {
    return ticket.description.length > 100 
      ? `${ticket.description.substring(0, 100)}...` 
      : ticket.description;
  }, [ticket.description]);

  const priorityStyle = useMemo(() => ({
    backgroundColor: priorityColors[ticket.priority] || 'var(--secondary-color)'
  }), [ticket.priority]);

  return (
    <div className="ticket-item">
      <div className="ticket-header">
        <h3>{ticket.title}</h3>
        <span 
          className="priority-badge"
          style={priorityStyle}
        >
          {ticket.priority}
        </span>
      </div>
      <p className="ticket-description">
        {truncatedDescription}
      </p>
      <div className="ticket-footer">
        <span className="ticket-status">{ticket.status}</span>
        <span className="ticket-date">
          {formattedDate}
        </span>
      </div>
    </div>
  );
});

TicketItem.displayName = 'TicketItem';

export default TicketItem;
