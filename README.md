# Automoney - Simplified Budget and Wallet Management

## Overview

Automoney is a mobile application designed to help individuals, especially those with dyscalculia, manage their finances autonomously and effortlessly. This project was undertaken as part of the Holberton School curriculum with the objective of providing an intuitive, accessible, and educational solution for users struggling with numbers.

Automoney combines simplicity with accessibility to assist users in day-to-day financial management, covering budgeting, payments, and verifying change received during transactions.

## Features

- **Budget Management**: Create, adjust, and track budgets using a visual gauge to monitor current budget status in real-time.
- **Virtual Wallet**: Manage available bills and coins via simple interactions, including voice commands.
- **Payment Suggestions**: Provide users with the optimal combination of bills and coins for a given amount.
- **Change Verification**: Ensure the correct change is received after purchases, with both visual and voice feedback.
- **Transaction History**: Keep track of spending and incoming funds, including the total balance after each transaction.
- **Increased Accessibility**: Voice recognition is utilized for entering amounts, managing budgets, or adding/removing funds, making the app accessible to those with numerical difficulties.

## Resources

- **React Native Documentation**: [React Native](https://reactnative.dev/docs/getting-started)
- **Firebase Documentation**: [Firebase](https://firebase.google.com/docs)
- **Expo Documentation**: [Expo](https://docs.expo.dev/)

## Technologies and Tools Used

Automoney is built using modern technologies to ensure compatibility, scalability, and ease of use.

### Frontend

- **React Native**: Used for developing a cross-platform mobile application.
- **Expo**: To streamline development and deployment on various devices.

### Backend

- **Firebase**: For user authentication, data storage, and real-time accessibility.

### Database

- **Firestore**: A NoSQL database provided by Firebase, used for storing user information, wallet details, and transaction history.

## Architectural Diagram

Automoney is designed to prioritize user interactions, data security, and accessibility, integrating Firebase to ensure data synchronization across all user devices.

**Data Flow Overview**:

1. **User**: Interacts with the frontend interface.
2. **Frontend**: Sends requests to the backend via Firebase (authentication, data retrieval, etc.).
3. **Backend (Firebase)**: Processes the request, accesses the Firestore database.
4. **Database**: Stores data about users, budgets, transactions, etc.

## Installation and Configuration

Follow these steps to install and configure Automoney on your local machine:

### Prerequisites

- **Node.js** (version 14 or higher): Make sure Node.js is installed.
- **Expo CLI**: Install Expo CLI globally:
  ```bash
  npm install -g expo-cli
  ```
- **Firebase Account**: Set up a Firebase account for authentication and database management.

### Installation Steps

1. **Clone the Repository**:

   ```bash
   git clone <REPOSITORY_URL>
   cd Automoney
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   - Create a project on [Firebase](https://firebase.google.com/).
   - Set up authentication and Firestore database.
   - Copy the Firebase configuration and add it to a `.env` file.

4. **Set Environment Variables**:

   - Create a `.env` file at the root with the following details:
     ```env
     API_KEY=<YOUR_FIREBASE_API_KEY>
     AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
     PROJECT_ID=<YOUR_PROJECT_ID>
     STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
     MESSAGING_SENDER_ID=<YOUR_MESSAGING_SENDER_ID>
     APP_ID=<YOUR_APP_ID>
     ```

5. **Start the Application**:
   ```bash
   npm start
   ```
   - Scan the QR code with the Expo Go app on your mobile device to preview the application.

## Usage

### Getting Started

- **Create an Account**: Open the app and sign up with your email address.
- **Manage Your Wallet**: Navigate to the wallet section to add or remove funds.
- **Create a Budget**: Set budget goals and track progress with the budget gauge.
- **Verify Change**: Use the change verification feature after making purchases.

### Application Features

- **Budget Planning**: Users can set a budget, monitor progress in real-time, and make adjustments as needed.
- **Virtual Wallet Management**: Easily add or remove coins and bills, with real-time balance updates.
- **Payment Assistance**: Suggestions on how to pay using available coins and bills.
- **Change Verification**: Check if the correct change is received after transactions.
- **Accessibility**: Voice input helps users interact with the app seamlessly.
- **Transaction Tracking**: A full history of all income and expenses is available, along with current wallet totals.

## Contribute

Contributions are welcome! Here’s how you can contribute:

1. **Fork the repository** on GitHub.
2. **Clone the forked repository** to your local machine.
   ```bash
   git clone <FORKED_REPOSITORY_URL>
   ```
3. **Create a new branch** for your feature or bug fix:
   ```bash
   git checkout -b feature/NewFeature
   ```
4. **Commit your changes** and push to GitHub:
   ```bash
   git commit -m 'Add new feature'
   git push origin feature/NewFeature
   ```
5. **Submit a Pull Request**: Open a pull request to propose your changes.

## Future Features

- **Google Sign-In Integration**: Enable users to log in via Google accounts.
- **Advanced Notifications**: Implement reminders for budget adjustments and spending goals.
- **Multi-Language Support**: Expand accessibility to a broader user base by including multiple languages.

## Contact

If you have any questions or suggestions, feel free to reach out:

- **Email**: 8685@holbertonsctudents.com

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Feel free to suggest any improvements or add new features! Together, we can make Automoney an even better solution for those in need of simple and accessible money management.
