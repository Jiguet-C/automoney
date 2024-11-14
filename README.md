# 🚀 **Automoney - Simplified Budget and Wallet Management**

![Automoney Logo](https://miro.medium.com/v2/resize:fit:4800/format:webp/1*n5mxR6uoQ4Rewx11DnS8Mw.png)

## 📝 **Introduction**

Automoney is a mobile application designed to help individuals with dyscalculia manage their finances independently and effortlessly. This project was developed as part of the Holberton School program, aiming to provide an intuitive, accessible, and educational solution for users who face challenges with numbers.

![Automoney Visual](https://miro.medium.com/v2/resize:fit:640/format:webp/1*SOoMJdYycZQgOsY7wfy88w.png)

🔗 **Link to Blog**: [Automoney Blog](https://medium.com/@8685/introducing-automoney-9569461c22f8)

## 🎨 **Main Features**

- 💸 **Budget Planning**: Create, adjust, and monitor a budget using a visual gauge displaying the current budget status.
- 💰 **Virtual Wallet**: Manage available notes and coins through simple interactions, including voice commands.
- 💡 **Payment Suggestions**: Suggest the best combination of notes and coins for a given amount.
- 💵 **Change Verification**: Ensure that change returned after a purchase is correct, with both visual and vocal feedback.
- 📊 **Transaction History**: Track expenses and incoming funds, including the total balance after each transaction.
- 🎙️ **Enhanced Accessibility**: Use voice recognition to enter amounts, manage the budget, or add/remove funds.

## 🚀 **Technologies Used**

- **React Native**: Cross-platform mobile development.
- **Firebase**: Authentication, data storage, and real-time data access.
- **Expo**: Simplifies development and deployment across various devices.

## 🛠️ **Installation**

To install and run Automoney locally, follow the steps below:

1. **Clone the repository**:

   ```bash
   git clone <REPOSITORY_URL>
   cd Automoney
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure Firebase**:

   - Create a project on [Firebase](https://firebase.google.com/).
   - Set up authentication and Firestore.
   - Copy Firebase configuration details into a `.env` file.

4. **Environment Variables**:

   - Create a `.env` file at the root of the project with the following:
     ```env
     API_KEY=<YOUR_FIREBASE_API_KEY>
     AUTH_DOMAIN=<YOUR_AUTH_DOMAIN>
     PROJECT_ID=<YOUR_PROJECT_ID>
     STORAGE_BUCKET=<YOUR_STORAGE_BUCKET>
     MESSAGING_SENDER_ID=<YOUR_MESSAGING_SENDER_ID>
     APP_ID=<YOUR_APP_ID>
     ```

5. **Launch the application**:
   ```bash
   npm start
   ```
   - Scan the QR code with the Expo Go app on your phone to test the app.

## 📱 **Usage**

1. **Create an Account or Log In**:

   - Open the app and create a new account using your email.

2. **Manage Your Wallet**:

   - Add or remove notes and coins using voice or text input.

3. **Plan and Track Budget**:

   - Set a budget and keep track of your spending using real-time updates.

4. **Verify Change and Payment Suggestions**:
   - Check if change is correct after making a purchase and get suggestions for optimal payment.

## 🤝 **Contributing**

Contributions are welcome! To contribute:

1. **Fork the project**
2. **Create a branch for your feature** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

## 🔗 **Related Projects**

- [Otonomy](https://www.autonomia.org/article/otonomy-pour-faciliter-la-gestion-de-son-portefeuille): The inspiration for Automoney, now discontinued.

## 📜 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 **Contact**

If you have any questions or suggestions, feel free to contact me at:

- 📧 **Email**: 8685@holbertonstudents.com
- 🔗 **LinkedIn**: [Your LinkedIn Profile](https://www.linkedin.com/in/catherine-jiguet-877a5591/)

---

Feel free to suggest any improvements or add new features! Together, we can make Automoney an even better solution for those in need of simple and accessible money management.
