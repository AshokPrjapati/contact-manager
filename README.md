# Contact Manager

A modern, responsive contact management application built with React, TypeScript, and Redux Toolkit. This application allows users to add, edit, delete, and search contacts with a clean and intuitive user interface.

## Features

- **Add New Contacts**: Create contacts with comprehensive information including name, phone, email, and address
- **Edit Existing Contacts**: Update contact information with an easy-to-use modal form
- **Delete Contacts**: Remove individual contacts or perform bulk deletions
- **Search Functionality**: Search contacts by name, email, phone, or address
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Redux State Management**: Efficient state management using Redux Toolkit
- **Modern UI**: Clean, gradient navigation with table-based contact display
- **Sticky Navigation**: Header remains visible while scrolling
- **Bulk Selection**: Select multiple contacts for batch operations

## Tech Stack

- **Frontend**: React 19.2.0
- **Language**: TypeScript
- **State Management**: Redux Toolkit 2.11.0
- **Build Tool**: Vite
- **Styling**: CSS with custom utility classes
- **Linting**: ESLint

## Installation & Setup

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/AshokPrjapati/contact-manager.git
   cd contact-manager
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── app/                    # Redux store configuration
│   ├── store.ts           # Store setup
│   └── hooks.ts           # Typed Redux hooks
├── components/            # React components
│   ├── ContactList.tsx    # Main contact list view
│   ├── ContactModal.tsx   # Add/Edit contact modal
│   ├── DeleteConfirmModal.tsx # Delete confirmation
│   └── Nav.tsx           # Navigation header
├── features/             # Feature-based organization
│   └── contacts/         # Contact management
│       ├── contactSlice.ts # Redux slice
│       ├── selectors.ts   # State selectors
│       ├── types.ts      # TypeScript interfaces
│       └── index.ts      # Barrel exports
├── styles/               # CSS modules
│   ├── button.css
│   ├── control.css
│   ├── form.css
│   ├── modal.css
│   └── table.css
├── utils/                # Utility functions
├── App.tsx              # Main app component
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

## Usage Guide

### Adding a Contact

1. Click the "Add Contact" button in the top-right corner
2. Fill in the contact form with required information:
   - Name (required)
   - Phone (required)
   - Email (required)
   - Address Line 1 (required)
   - Address Line 2 (optional)
   - State (required)
   - Pincode (required)
3. Click "Save Contact" to add the contact

### Editing a Contact

1. Click the edit icon (pencil) next to any contact in the table
2. Modify the information in the modal form
3. Click "Save Contact" to update

### Deleting Contacts

**Single Contact:**

1. Click the delete icon (trash) next to any contact
2. Confirm the deletion in the popup modal

**Bulk Delete:**

1. Select multiple contacts using the checkboxes
2. Click "Bulk Delete (X)" button that appears
3. Confirm the bulk deletion

### Searching Contacts

1. Use the search bar at the top of the contact list
2. Type any part of the name, email, phone, or address
3. The list will filter in real-time

## Screenshots

### Main Contact List View

![Contact List](./screenshots/contact-list.png)
_The main interface showing the contact table with search functionality and bulk actions_

### Add/Edit Contact Modal

![Contact Modal](./screenshots/contact-modal.png)
_Modal form for adding or editing contact information_

### Delete Confirmation

![Delete Confirmation](./screenshots/delete-confirmation.png)
_Confirmation modal for contact deletion with bulk delete support_

### Responsive Mobile View

![Mobile View](./screenshots/mobile-view.png)
_Mobile-optimized interface with responsive design_

## Data Model

```typescript
interface Contact {
  id: string; // Unique identifier
  name: string; // Full name
  phone: string; // Phone number
  email: string; // Email address
  addressLine1: string; // Primary address
  addressLine2?: string; // Secondary address (optional)
  state: string; // State/Province
  pincode: string; // Postal/ZIP code
}
```

## Assumptions & Design Decisions

### Assumptions

1. **Data Persistence**: Currently stores data in browser memory (Redux store). Data is lost on page refresh.
2. **Contact Validation**: Basic form validation is implemented client-side
3. **Unique Identifiers**: Contact IDs are generated using timestamps/UUIDs
4. **Single User**: Application is designed for single-user local usage

### Design Decisions

1. **Redux Toolkit**: Chosen for predictable state management and easy debugging
2. **Component Structure**: Feature-based organization for scalability
3. **CSS Architecture**: Modular CSS with utility classes for maintainability
4. **TypeScript**: Full TypeScript implementation for type safety
5. **Responsive Design**: Mobile-first approach with CSS Grid/Flexbox

## Known Limitations

### Current Limitations

1. **No Data Persistence**: Data is not saved between browser sessions
2. **No Backend Integration**: Currently a frontend-only application
3. **Limited Validation**: Basic form validation without advanced rules
4. **No Image Support**: Contacts don't support profile pictures
5. **No Import/Export**: No functionality to import/export contact data
6. **No Categories/Tags**: Contacts cannot be categorized or tagged
7. **No Advanced Search**: Search is basic text matching only

### Potential Improvements

- [ ] Add backend API integration
- [ ] Implement data persistence (localStorage/IndexedDB)
- [ ] Add contact import/export functionality
- [ ] Include profile picture support
- [ ] Implement advanced search filters
- [ ] Add contact categories/groups
- [ ] Include contact history/notes
- [ ] Add offline support with service workers
- [ ] Implement contact sharing functionality

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Development Notes

### Code Style

- Use TypeScript for all new components
- Follow React functional component patterns with hooks
- Use Redux Toolkit for state management
- Maintain consistent CSS naming conventions
- Include proper TypeScript types for all props and state

### Testing

Currently, the project does not include tests. Future improvements should include:

- Unit tests for components
- Integration tests for Redux actions
- E2E tests for user workflows

## Support

For questions or issues, please:

1. Check the existing issues on GitHub
2. Create a new issue with detailed description
3. Include steps to reproduce any bugs

---

Built with ❤️ using React, TypeScript, and Redux Toolkit
