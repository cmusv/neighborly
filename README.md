
# Neighborly App

A modern web application designed for managing and enhancing community engagement in apartment living.

## Technology Stack

- **Backend**: Node.js
- **Frontend**: React
- **Storage**: IndexedDB, LocalStorage
- **UI Libraries**: Ant Design, MUI

## Style Guide

Explore the app's style guide here: [Neighborly Style Guide](https://neighborly-1.onrender.com/style-guide)

## Operation Instructions

### Development Mode

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run start
   ```
4. Access the app locally at `http://localhost:3000`.

### Production

Visit the live application at [Neighborly App Production](https://neighborly-1.onrender.com/).

## Limitations

1. **Optimized for Phone View**:
    - The app is designed for a phone screen. For the best experience, use your browser's phone size screen or access it directly from your phone.

2. **User Account (Login) Not Implemented**:
    - Multi-user features (e.g., Pet Tinder) rely on a "switch user" option.
    - The name on the payment page is hardcoded to a persona due to the absence of user login functionality.

3. **Local Storage and IndexedDB**:
    - Information is stored locally in the browser.
    - Dynamic updates for some information are not implemented.
    - Cross-client information exchange (across different browsers) is not supported.

4. **Payment Simulation**:
    - Rent payment functionality simulates saving money to an apartment account.
    - Minimal safety authentication is included, but basic input validity checks are implemented.
