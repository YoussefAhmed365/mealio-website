# Mealio

Mealio is a comprehensive meal planning and recipe management application designed to help users organize their dietary habits. It features a modern, user-friendly interface that allows users to track meals, discover new recipes, manage shopping lists, and analyze their nutritional intake.

## Features

- **Authentication System**: Secure user login, signup, password reset, and account restoration.
- **Onboarding Flow**: Personalized setup to tailor the experience to user preferences.
- **Dashboard**: A central hub for viewing daily meals and activities.
- **Meal Planning**: Organize weekly or monthly meal plans with ease.
- **Recipe Management**: Browse, view, and manage your favorite recipes.
- **Recipe Discovery**: Find new and exciting meal ideas.
- **Shopping List**: Automatically generate and manage grocery lists based on your meal plans.
- **Nutritional Analysis**: Track and analyze your nutritional intake.
- **User Settings**: Customize your profile and application settings.
- **Legal & Support**: Access FAQs, contact support, and view legal information (Privacy Policy, Terms, etc.).

## Tech Stack

- **Frontend Framework**: React (via Vite)
- **Routing**: React Router
- **Styling**: Tailwind CSS, Material UI
- **Components**: Headless UI, Heroicons
- **Charts**: MUI X Charts
- **Animations**: Lottie Files
- **State Management**: React Context API

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd mealio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Usage

### Development Server
To start the development server with Hot Module Replacement (HMR):
```bash
npm run dev
```
The application will be available at `http://localhost:5173` (or the port shown in your terminal).

### Build for Production
To build the application for production:
```bash
npm run build
```

### Linting
To run the ESLint configuration:
```bash
npm run lint
```

## Project Structure

```
src/
├── animations/       # Lottie animation files
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable React components
│   └── shared/       # Shared components like Navbar, LoadingScreen
├── contexts/         # React Context providers (Auth, Onboarding, etc.)
├── pages/            # Application page components (Dashboard, Recipes, etc.)
├── App.jsx           # Main application component with routing
└── main.jsx          # Entry point
```

## License

This project is private and proprietary.
