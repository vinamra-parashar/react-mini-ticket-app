import { useState } from 'react';
import './App.css';
import TicketForm from './components/TicketForm';
import TicketList from './components/TicketList';
import SearchBar from './components/SearchBar';
import TicketCounter from './components/TicketCounter';

function App() {
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTicket = (newTicket) => {
    setTickets([newTicket, ...tickets]);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="app">
      <header>
        <h1>Mini Ticketing System</h1>
        <TicketCounter tickets={tickets} />
      </header>
      
      <main>
        <div className="left-panel">
          <TicketForm onAddTicket={handleAddTicket} />
        </div>
        
        <div className="right-panel">
          <div className="search-container">
            <SearchBar onSearch={handleSearch} />
          </div>
          <TicketList tickets={tickets} searchTerm={searchTerm} />
        </div>
      </main>
    </div>
  );
}

export default App;
