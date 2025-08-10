# Mini Ticketing App

A React-based Mini Ticketing System that allows users to create, view, and search support tickets. Built with React 18, Vite, and modern React Hooks.

## Features

- **Create Tickets** with title, description, and priority
- **View Tickets** in a clean, responsive list
- **Search & Filter** tickets by title or description
- **Priority Indicators** with color coding
- **Responsive Design** that works on all devices

## Getting Started

### Prerequisites

- Node.js 18.0.0 or later
- npm 8.0.0 or later

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/react-mini-ticket-app.git
   cd react-mini-ticket-app
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

## Documentation

For detailed information about the application's architecture and design decisions, please see [ARCHITECTURE.md](./ARCHITECTURE.md).

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── SearchBar.jsx   # Search functionality
│   ├── TicketCounter.jsx # Displays open ticket count
│   ├── TicketForm.jsx  # Form for creating new tickets
│   ├── TicketItem.jsx  # Individual ticket display
│   └── TicketList.jsx  # List of all tickets
├── App.jsx            # Main application component
└── App.css            # Global styles
```

### Development Experience

- **ESLint**: For code quality and consistency
- **Vite**: For fast development server and build times
- **React Developer Tools**: For debugging React component hierarchy and state
- **Browser DevTools**: For CSS debugging and performance profiling

## Future Improvements

1. **Persistence**: Add local storage or a backend API
2. **Testing**: Add unit and integration tests
3. **Authentication**: User accounts and permissions
4. **Advanced Filtering**: More sophisticated search and filtering options
5. **Responsive Design**: Further mobile optimizations

## License

MIT
