# 📱 Visitor Management App (Expo 54+)

This project is a tablet-first single-page application built with **Expo 54+** and **React Native**. The app is designed to capture visitor information, including personal details, photos, and signatures, and display a history of recent entries.

**Company Website**: [24Karat - We Buy Gold](https://www.24karat.co.in/)

---

## 🔑 Features

1. **Authentication**

   - Login screen (Email + Password).
   - Dropdown for selecting a branch.
   - No registration flow.

2. **Visitor Form**

   - Name
   - Email address (optional)
   - Phone number
   - Purpose of visit radio button
   - Source(from where did you hear about us)radio button
   - Photo capture (camera only; no gallery selection)
   - Digital signature:
     - A white color box is shown on the form.
     - When tapped, it opens a full-screen signature input.
     - User can draw their signature using finger or stylus.
     - Two buttons are shown: "Cancel" and "Done".
     - On "Done", the signature is saved and the user returns to the form.
     - The signature is then displayed inside the white box on the form.

3. **History Screen**

   - Shows recent visitor entries with optimized performance using FlashList.
   - **Search functionality**: Real-time search through visitor data by name, email, or phone number.
   - **Performance optimized**: Uses FlashList for smooth scrolling with large datasets.
   - **Smart filtering**: Shows first 20 entries by default, expands to full search results when searching.
   - **Visual avatars**: Displays personalized avatars for visitors using UI Avatars service.
   - Accessible from the top-right corner of the app.

4. **Drawer Navigation**

   - **About Us**: Opens a dedicated page with company information and details.
   - **Logout**: Shows a confirmation alert before logging out the user.
     - Alert displays "Are you sure you want to logout?" with "Cancel" and "Logout" options.
     - On confirmation, clears user session and returns to login screen.

5. **Tablet-Optimized Layout**

   - UI designed to adapt to both iOS and Android tablets.
   - Uses responsive units for text, width, and height.

---

## 📚 Libraries & Tools

### Core

- **Expo SDK 54+** → Base app framework.
- **React Native** → Cross-platform UI.
- **React Navigation** → Screen navigation.

### Required Dependencies

- **React Hook Form** → For form state management and validation.
- **Zod** → Schema-based validation (e.g., email format, required fields).
- **expo-camera** → Capture photos directly from device camera.
- **react-native-signature-panel** → Digital signature input (finger/stylus).
- **react-native-mmkv** → Fast, encrypted local storage for recent entries.
- **Zustand** → Lightweight global state management.
- **apisauce** → For API calls and HTTP requests to your backend.
- **react-native-responsive-screen** → Responsive width, height, and font size helpers.
- **react-native-element-dropdown** → For branch selection dropdown.
- **@shopify/flash-list** → High-performance list component for large datasets.

---

## 🎨 Theme System

The app uses a professional dark theme optimized for tablet interfaces with authentic 24Karat gold branding:

### Color Palette

- **Primary**: `#FFD700` - Pure gold color matching 24Karat branding
- **Primary Light**: `#FFED4E` - Lighter gold for hover states
- **Primary Dark**: `#B8860B` - Darker gold for pressed states
- **Background**: `#0F0F0F` - Very dark background for premium feel
- **Secondary**: `#1A1A1A` - Slightly lighter than background
- **Tertiary**: `#2A2A2A` - For cards and elevated surfaces
- **Text**: `#FFFFFF` - Pure white for high contrast
- **Text Secondary**: `#E0E0E0` - Light grey for secondary text
- **Subtle Text**: `#B0B0B0` - Medium grey for subtle text
- **Border**: `#404040` - Medium grey for borders
- **Border Light**: `#333333` - Darker grey for subtle borders
- **Success**: `#4CAF50` - Green for success states
- **Error**: `#F44336` - Red for error states
- **Warning**: `#FF9800` - Orange for warnings
- **Info**: `#2196F3` - Blue for info states

### Spacing System

- **xs**: 4px (extra small)
- **s**: 8px (small)
- **m**: 16px (medium)
- **l**: 24px (large)
- **xl**: 40px (extra large)
- **xxl**: 56px (extra extra large)

### Typography

- **H1**: 36px, 700 weight, 44px line height
- **H2**: 28px, 600 weight, 36px line height
- **H3**: 22px, 600 weight, 28px line height
- **Body Large**: 18px, 400 weight, 26px line height
- **Body**: 16px, 400 weight, 24px line height
- **Body Small**: 14px, 400 weight, 20px line height
- **Caption**: 12px, 400 weight, 16px line height
- **Button**: 16px, 600 weight, 20px line height
- **Label**: 14px, 500 weight, 18px line height

### Border Radius

- **None**: 0px
- **Small**: 4px
- **Medium**: 8px
- **Large**: 12px
- **XL**: 16px
- **Full**: 9999px (circular)

### Usage

```typescript
import { theme } from '@/constants/theme';

// Using colors
backgroundColor: theme.colors.background
color: theme.colors.primary

// Using spacing
padding: theme.spacing.m
margin: theme.spacing.l

// Using typography
fontSize: theme.typography.h1.fontSize
fontWeight: theme.typography.h1.fontWeight
```

---

## 📂 Project Structure

```
/src
  /api        → Apisauce clients & API types
  /components → Reusable UI components
  /constants  → App constants (branches, purposes, sources)
  /hooks      → Custom hooks
  /screens    → Page-level components (Login, VisitorForm, History, AboutUs)
  /state      → Zustand stores (auth, visitor data)
  /storage    → MMKV / persistence
  /types      → Shared TypeScript types
  /utils      → Helpers & validation
/tests        → Unit & integration tests
/docs         → Documentation
```

---

## ⚙️ Workflow

1. **Login Flow**

   - User enters email, password, and selects branch.
   - Token/session stored locally (MMKV).
   - Login verified via backend API.

2. **Form Flow**

   - Fill details → take photo → sign → submit.
   - Data posted to backend API via Apisauce client.

3. **History Flow**

   - History screen fetches recent entries from backend API.
   - Display visitor details with photo + signature thumbnail.
   - **Search functionality**: Users can search through visitor data in real-time.
   - **Performance optimization**: FlashList ensures smooth scrolling with large datasets.
   - **Smart pagination**: Shows 20 recent entries by default, expands during search.

4. **Drawer Navigation Flow**

   - **About Us**: Navigate to dedicated about page displaying company information.
   - **Logout**: Show confirmation alert → clear session → redirect to login screen.

---

## 📝 Project Guidelines

To make the project scalable, testable, and understandable for future developers, the following practices are enforced:

### Documentation

- README.md should always be updated when new folders, files, or features are added.
- Keep a `/docs` folder for coding standards, AI agent rules, commit guidelines, and PR checklists.

### TypeScript & Code Quality

- Use strict TypeScript mode (enabled in tsconfig.json).
- Use path aliases for cleaner imports (e.g., `@/*` configured).
- Follow coding standards defined in this README.
- Linting with ESLint (configured with expo config).

### Testing

- Unit & integration tests in `/tests` folder.
- Use Jest + React Native Testing Library.

### State Management

- Use Zustand for global state.
- Keep state logic separate from UI components.

---

## 📦 Installation

```bash
# Install dependencies
npm install

# Start development
npx expo start
```

---

## 🛠 Development Notes

- App targets **tablets first**. Test on iPad and Android tablets.
- Use `react-native-responsive-screen` to avoid hardcoded sizes.
- All form submissions must include a photo and signature.
- History entries are stored locally but should be structured for optional backend sync later.
- Ensure **permissions handling** (camera, storage) works for both iOS and Android.
- **Performance**: FlashList is used for optimal performance with large visitor datasets.
- **Search**: Real-time search functionality supports filtering by name, email, and phone number.
- **Avatars**: UI Avatars service provides fallback avatars for visitors without photos.

---