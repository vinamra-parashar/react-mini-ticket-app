import { useEffect, useState } from 'react';

const TicketCounter = ({ tickets = [] }) => {
    const [openCount, setOpenCount] = useState(0);

    useEffect(() => {
        const count = Array.isArray(tickets)
            ? tickets.filter(ticket => ticket.status !== 'closed').length
            : 0;
        setOpenCount(count);
    }, [tickets]);

    return (
        <div className="ticket-counter">
            You have {openCount} open {openCount === 1 ? 'ticket' : 'tickets'}
        </div>
    );
};

export default TicketCounter;
