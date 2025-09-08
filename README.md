# Credit Cards Eligibility Checker

A Next.js application that helps users find their perfect credit card by checking eligibility and displaying available offers.

[Demo](https://credit-cards-app.vercel.app/) 

## Features

- **Check Eligibility** - Find out eligible credit cards based on customer input
- **Browse Cards** - View multiple credit card offers and show card details
- **Form Validation** - Customer data validation on client and server side
- **Responsive Design** - Mobile-first approach following responsive design best practices
- **End-to-End Testing** - App tested to ensure everything works smoothly

## Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js 15 with React 19
- **Styling:** Tailwind CSS
- **Testing:** Playwright
- **Validation:** Zod

## Project Structure

```
src/
├── app/
│   ├── (home)/           # Home page
│   ├── api/              # API routes
│   │   └── credit-cards/ # Credit card API endpoints
│   ├── credit-cards/     # Credit cards page
│   └── layout.tsx        # Root layout
├── components/           # Reusable UI components
│   ├── AppLogo.tsx
│   ├── Button.tsx
│   ├── CreditCardDetails.tsx
│   ├── CreditCardView.tsx
│   ├── CustomerForm.tsx
│   ├── CustomerSelector.tsx
│   ├── Modal.tsx
│   └── StackedCards.tsx
├── constants/            # Application constants
├── styles/               # Global styles
├── types/                # TypeScript type definitions
└── utils/                # Utility functions
tests/                    # End-to-end tests
public/                   # Static assets
```

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## App Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Test Scripts

```bash
# Run all tests
npm test

# Run with UI (visual test runner)
npm run test:ui

# Run in headed mode (see browser)
npm run test:headed

# Debug tests
npm run test:debug

# View test report
npm run test:report
```
