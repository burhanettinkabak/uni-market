
<div align="center">

  <h1>
    Uni Market
  </h1>
  
</div>

## Introduction

The **Uni Market** is a mobile application developed to provide a secure and exclusive platform for university students to buy and sell products within their campus community. This app is built using Expo, Clerk, and Firebase for a seamless and robust user experience.

### Project Features

- **Secure Authentication**: Only verified university students can access the app using Clerk-powered authentication.
- **Product Listings**: Users can create, edit, and manage their product listings with detailed descriptions and images.
- **Chat Functionality**: A real-time chat system enables secure and direct communication between buyers and sellers.
- **Firebase Integration**: Reliable and scalable database management for storing user data, product information, and chat messages.
- **Mobile-First Design**: Optimized for a seamless experience on mobile devices with an intuitive user interface.

## App Screenshots

<table> <tr> <td align="center"> <img src="./assets/screenshots/entrance.png" alt="Entrance" width="250"> <br><b>Entrance</b> </td> <td align="center"> <img src="./assets/screenshots/signup.png" alt="Sign Up" width="250"> <br><b>Sign Up</b> </td> <td align="center"> <img src="./assets/screenshots/signin.png" alt="Sign In" width="250"> <br><b>Sign In</b> </td> </tr> <tr> <td align="center"> <img src="./assets/screenshots/home.png" alt="Home" width="250"> <br><b>Home</b> </td> <td align="center"> <img src="./assets/screenshots/productdetail.png" alt="Product Detail" width="250"> <br><b>Product Detail</b> </td> <td align="center"> <img src="./assets/screenshots/chat.png" alt="Chat" width="250"> <br><b>Chat</b> </td> </tr> <tr> <td align="center"> <img src="./assets/screenshots/inbox.png" alt="Inbox" width="250"> <br><b>Inbox</b> </td> <td align="center"> <img src="./assets/screenshots/addproduct.png" alt="Add Product" width="250"> <br><b>Add Product</b> </td> <td align="center"> <img src="./assets/screenshots/myproducts.png" alt="My Products" width="250"> <br><b>My Products</b> </td> </tr> <tr> <td align="center"> <img src="./assets/screenshots/profile.png" alt="Profile" width="250"> <br><b>Profile</b> </td> </tr> </table>

## Installation

To clone the repository, run the following command:

```sh
git clone https://github.com/burhanettinkabak/uni-market.git
```

To run the application locally, follow these steps:

1. **Sign up for a Clerk account** at [Clerk](https://dashboard.clerk.com/sign-up).

2. **Set up Firebase**:
   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a project.
   - Download the required Firebase configuration files and place them in the project.

3. **Install dependencies**:
   ```sh
   cd uni-market
   npm install
   ```

4. **Configure the environment variables** using the `.env.example` file.
   ```js
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   ```
5. **Configure the firebase** using the `firebaseConfig.tsx` file.
  ```js
  const firebaseConfig = {
  apiKey: "Your Firebase API Key",
  authDomain: "Your Firebase Auth Domain",
  projectId: "Your Firebase Project ID",
  storageBucket: "Your Firebase Storage Bucket",
  messagingSenderId: "Your Firebase Messaging Sender ID",
  appId: "Your Firebase App ID",
  measurementId: "Your Firebase Measurement ID"
  };
  ```
6. **Start the development server**:
   
   ```sh
   npm expo start
   ```

## Learn more

For detailed instructions and additional resources, check out the following links:

- [Expo Documentation](https://docs.expo.dev/)
- [Clerk Documentation](https://clerk.com/docs/)
- [Firebase Documentation](https://firebase.google.com/docs/)

## Contact

Burhanettin Kabak

For any questions or feedback, please contact me at [kabakburhanettin@gmail.com](mailto:kabakburhanettin@gmail.com).

Linkedin: [Burhanettin Kabak](https://www.linkedin.com/in/burhanettin-kabak-5aab731a4/)
