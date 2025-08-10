import React, { useMemo } from 'react';
import TicketItem from './TicketItem';

const TicketList = ({ tickets = [], searchTerm = '', isLoading = false }) => {
    const filteredTickets = useMemo(() => {
        if (!searchTerm) return tickets;

        const searchLower = searchTerm.toLowerCase();
        return tickets.filter(ticket => {
            return (
                ticket.title.toLowerCase().includes(searchLower) ||
                ticket.description.toLowerCase().includes(searchLower) ||
                ticket.priority.toLowerCase().includes(searchLower)
            );
        });
    }, [tickets, searchTerm]);

    if (isLoading) {
        return <div className="loading">Loading tickets...</div>;
    }

    if (filteredTickets.length === 0) {
        return (
            <div className="no-tickets">
                {searchTerm
                    ? 'No tickets match your search. Try different keywords.'
                    : 'No tickets found. Create one to get started!'
                }
            </div>
        );
    }

    return (
        <div className="ticket-list">
            {filteredTickets.map(ticket => (
                <TicketItem key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
};

// Only re-render if tickets or searchTerm changes
const areEqual = (prevProps, nextProps) => {
    return (
        prevProps.tickets === nextProps.tickets &&
        prevProps.searchTerm === nextProps.searchTerm &&
        prevProps.isLoading === nextProps.isLoading
    );
};

export default React.memo(TicketList, areEqual);
