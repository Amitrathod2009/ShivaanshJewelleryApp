# ShivaanshJewelleryApp

ShivaanshJewelleryApp is a premium product browsing mobile application built with React Native CLI. Designed with high-end jewellery collections in mind, it provides an exquisite interface for users to browse, search, filter, and purchase jewellery products.

The project connects to the [Fake Store API](https://fakestoreapi.com/) to fetch real-time product catalogs and manages the state of the shopping cart completely client-side.

---

## App Screen Previews

You can preview the application screen previews at the following directory:
- [src/assets/images/App screenshort](./src/assets/images/App%20screenshort)

---

## Technical Stack & Libraries

- **Framework**: React Native (v0.86) + Native CLI
- **Language**: Strict TypeScript (no `any` types permitted)
- **State Management**: Redux Toolkit (RTK) + React Redux
- **Data Fetching & Caching**: TanStack Query (React Query)
- **Networking**: Axios
- **Navigation**: React Navigation v6 (Native Stack)
- **Styling**: Pure CSS-in-JS stylesheets (no external component libraries)
- **Testing**: Jest unit testing

---

## Architectural & Design Decisions

### 1. State Management with Redux Toolkit
We selected Redux Toolkit to manage the client-side cart operations (adding items, removing items, updating quantities). 
- **Derivation Over Duplication**: In compliance with strict state-management principles, calculations such as `totalPrice` and `totalItems` are **not** written to the store state. Instead, they are dynamically computed on the fly using helper utilities (`calculateCartTotal` and `calculateCartItemCount`) to prevent state desynchronization.
- **Official Boilerplate Optimization**: Built-in typescript interfaces (`PayloadAction`) allow full type-safety for cart state mutations.

### 2. Networking & Cache with TanStack Query
API query state is powered by TanStack Query combined with Axios.
- **Optimized Caching**: Cached product data is stored with unique cache keys (`['products']` and `['product', id]`).
- **Network Decoupling**: Screens trigger UI updates reactively using customized hooks (`useProductsQuery`, `useProductQuery`), isolating query concerns from components.
- **Error Handling**: A centralized, type-safe Axios error formatter (`getErrorMessage`) extracts and handles network errors consistently.

### 3. Navigation Stack
- Uses React Navigation's Native Stack.
- Features a custom **Header Cart Button** component. The header cart button reads the current cart state using typed hooks, updates its badge count dynamically, and navigates seamlessly to the `CartScreen`.

### 4. Bespoke Jewellery Theme Layout
- **Strictly Custom UI**: Built entirely using React Native core components (`View`, `Text`, `FlatList`, etc.) and `StyleSheet` configurations.
- **Harmonious Bronze & Ivory Color Palette**: Inspired by high-end jewellery design, utilizing curated spacing, custom shadows, and micro-interaction-friendly components like `PrimaryButton`, `QuantitySelector`, and `ProductCard`.

---

## Prerequisites

- **Node.js**: Version 22 (`v22.23.1`)
- **JDK**: Java Development Kit 17
- **Android SDK**: Correctly configured emulator and platform tools
- **Xcode**: Required for running the iOS Simulator (macOS only)

---

## Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd ShivaanshJewelleryApp
   ```

2. **Install Dependencies**:
   Ensure Node 22 is active, then run:
   ```bash
   export PATH="/usr/local/opt/node@22/bin:$PATH" # If using macOS with Homebrew Node 22
   npm install
   ```

3. **Install iOS Pods** (macOS only):
   ```bash
   cd ios
   bundle install
   bundle exec pod install
   cd ..
   ```

---

## Running the Application

### 1. Start Metro Bundler
Start the Metro server in a separate terminal tab:
```bash
export PATH="/usr/local/opt/node@22/bin:$PATH"
npm start
```

### 2. Compile and Run Android Emulator
Ensure your Android emulator is running, then execute:
```bash
export PATH="/usr/local/opt/node@22/bin:$PATH"
npm run android
```

### 3. Compile and Run iOS Simulator (macOS)
Execute:
```bash
export PATH="/usr/local/opt/node@22/bin:$PATH"
npm run ios
```

---

## Validation & Verification

### Static Type-Checking
Verify that the codebase contains no TypeScript compiler errors by running:
```bash
npx tsc --noEmit
```

### Running Automated Unit Tests
Run the Jest unit tests to verify the correctness of the cart calculations:
```bash
npm test
```

---

## Git Workflow & Branch Information

- **Main Branch**: `main`
- **Feature Branch**: `feature/product-app`
- All features were implemented sequentially using incremental, meaningful commits.
