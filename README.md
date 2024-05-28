# DragBox

### Guide

This project is an image gallery built using React, Firebase, and other technologies. It includes features like a responsive carousel, thumbnail navigation, user authentication, and Firestore integration.

## Table of Contents

1. [Introduction](#introduction)
2. [Features](#features)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Authentication](#authentication)
6. [Firestore Integration](#firestore-integration)
7. [Contributing](#contributing)
8. [License](#license)

## Introduction

The Image Gallery Project is designed to showcase a collection of images in an elegant and user-friendly way. It leverages React components, Firebase services, and responsive design principles.

## Features

- **Carousel**: A touch-friendly image carousel with smooth transitions.
- **Thumbnail Navigation**: Thumbnails below the carousel for easy navigation.
- **User Authentication**: Firebase authentication for user login/signup.
- **Firestore Database**: Store image metadata and other relevant data.
- **File Storage**: Firebase Storage for uploading and serving images.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/abiolafasanya/dragbox.git
   ```

2. Install dependencies:

   ```bash
   cd image-gallery
   npm install
   ```

3. Set up your Firebase project and configure authentication and Firestore.

## Usage

1. Run the development server:

   ```bash
   npm start
   ```

2. Open the app in your browser at [http://localhost:3000](http://localhost:3000).

## Authentication

- Use Firebase Authentication to handle user sign-up and login.
- Customize authentication UI components (login form, signup form, etc.).

## Firestore Integration

- Create a Firestore collection to store image metadata (e.g., title, description, URL).
- Fetch images from Firestore and display them in the carousel.

## Contributing

Contributions are welcome! If you find any issues or want to add new features, feel free to submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
> clone the repository
```bash
git clone <repo url>
```
> Install dependencies
```bash
npm install
```

> set up env variable
> run application
```bash
npm run dev | npm start
```
## Demo Login Crdentials

> username: user@example.com
> password: 1Password

> Click on login to signin or click on get started to visit dahboard

## Built with
+ NextJs 14
+ TailwindCSS
+ Firebase
+ ShadCn UI

## Features
+ Browse Gallery
+ Search Image
+ Drag and Drop
+ Upload