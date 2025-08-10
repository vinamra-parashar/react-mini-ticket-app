# Architecture & Design Decisions

## 1. Component Structure: Why did you structure components the way you did?

The application follows a component-based architecture with clear separation of concerns:

- **App**: Root component managing global state and layout
- **TicketForm**: Handles ticket creation with form validation
- **TicketList**: Displays and filters tickets based on search
- **TicketItem**: Renders individual ticket cards
- **SearchBar**: Manages search input with debouncing
- **TicketCounter**: Shows count of open tickets

This structure promotes reusability, maintainability, and single responsibility principle. Components are kept small and focused, making them easier to test and maintain.

## 2. State Management: Where is state stored and why?

State is managed using React's built-in hooks:

- **Local State**: Used for UI-specific state (form inputs, search term)
- **Lifted State**: Tickets array is managed in the App component and passed down
- **Derived State**: Filtered tickets are computed using `useMemo`

The decision to use local state was made because:
- The application is relatively simple
- No complex state sharing is required between distant components
- It reduces bundle size by avoiding additional libraries

## 3. Performance Considerations: What would you optimize if the app scaled to 1,000+
tickets?

For scaling to 1,000+ tickets:

1. **Virtualization**: Implement windowing with libraries like `react-window`
2. **Pagination/Infinite Scroll**: Load tickets in chunks
3. **Web Workers**: Move heavy filtering/sorting off the main thread
4. **Memoization**: Already implemented with `useMemo` and `React.memo`
5. **Optimized Selectors**: Use `reselect` for complex derived state
6. **Code Splitting**: Lazy load non-critical components

## 4. Search Behavior: What improvements would you make to the search UX?

Potential search enhancements:

1. **Advanced Filters**: Add filtering by priority, status, date range
2. **Search Suggestions**: Show autocomplete suggestions
3. **Search History**: Remember recent searches
4. **Saved Searches**: Allow users to save frequent queries
5. **Search Operators**: Support AND/OR logic, exact phrases
6. **Visual Feedback**: Add loading states during search
7. **Keyboard Navigation**: Better keyboard support for search results

## 5. What did you Google or use GPT for?

- I have used Windsurf AI Editor with SWE-1 (free limited time) model to generate the code for the application.

## Debugging the TicketCounter

The original `TicketCounter` component had a potential issue with the `tickets` prop being undefined. The fix included:

1. Adding a default empty array to prevent `tickets.filter is not a function` errors
2. Using `useEffect` to properly handle the ticket count calculation
3. Adding proper prop validation

```jsx
// Before (problematic)
function TicketCounter({ tickets }) {
  const openCount = tickets.filter(ticket => ticket.status !== 'closed').length;
  return <div>You have {openCount} open tickets</div>;
}

// After (fixed)
function TicketCounter({ tickets = [] }) {
  const [openCount, setOpenCount] = useState(0);

  useEffect(() => {
    const count = Array.isArray(tickets) 
      ? tickets.filter(ticket => ticket.status !== 'closed').length 
      : 0;
    setOpenCount(count);
  }, [tickets]);

  return <div>You have {openCount} open {openCount === 1 ? 'ticket' : 'tickets'}</div>;
}
```
