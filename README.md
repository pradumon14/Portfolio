# Pradumon's Portfolio

A highly polished, interactive, and skeuomorphic personal portfolio designed for a security researcher and developer. Built with React, Tailwind CSS, and Framer Motion, it features dynamic GitHub integrations and meticulous glassmorphic UI elements.

## Features

- **Skeuomorphic & Glassmorphic Design:** The UI utilizes layered shadows, gradients, and backdrop filters to create a tactile and modern aesthetic. Active states mimicking real physical buttons add to the experience.
- **Dynamic Top/Bottom Navigation:** A sleek top navigation bar for desktop and a bottom-docked navigation bar for mobile environments, featuring custom SVG layouts, glow elements, and dynamic browser `theme-color` switching.
- **Interactive "Dossier":** An expandable GitHub widget that asynchronously fetches live profile stats, repository count, stargazers, top languages, and recent activity from the GitHub API. 
- **Expandable Project Cards:** Complex, fluidly animated cards utilizing `framer-motion`'s `layout` prop to elegantly expand and reveal deeper contexts like "Problem," "Solution," and "Impact."
- **Film Grain Overlay:** A subtle SVG `fractalNoise` filter is layered over the entire background to provide a cinematic, textured feel.

## Tech Stack

- **React Structure**: Modern modular architecture utilizing robust functional components with detailed inline documentation.
- **TypeScript**: Ensuring scalable and maintainable data definitions, specifically with defined interfaces for complex structures like `PortfolioItem`.
- **Tailwind CSS**: Leveraging deep customization with complex `shadow`, `inset-shadow`, `gradient`, and `backdrop-blur` utilities to achieve nuanced UI elements.
- **Framer Motion (`motion/react`)**: Powering all animations across the viewport—from layout shifting in cards to mount/unmount animations in modals and scrolling reactions in the `<Navbar />`.
- **Lucide React**: For highly legible, crisp, scalable SVG icons aligned with the overall theme.

## Project Structure

The codebase has been refactored for maximum maintainability:

```
src/
├── components/
│   ├── layout/
│   │   └── Navbar.tsx            # Desktop & Mobile navigation systems
│   ├── sections/
│   │   ├── HeroSection.tsx       # Landing area with intro text
│   │   ├── ResearchSection.tsx   # Display of security research papers
│   │   ├── ProjectsSection.tsx   # Interactive & frontend project listings
│   │   └── ContactSection.tsx    # Skeuomorphic 'Hire Me' CTA area
│   └── ui/
│       ├── CardLayout.tsx        # Reusable, expandable card with Framer Motion layout
│       └── GithubWidget.tsx      # Complex widget & Dossier fetcher
├── data/
│   └── portfolioData.tsx         # Centralized typing and static data defining Research & Projects
├── App.tsx                       # Main entry component
├── index.css                     # Global styles including tailwindcss import
└── main.tsx                      # DOM rendering entry point
```

## Setup & Installation

To run this application locally:

1. Copy the codebase into your local repository.
2. Ensure you have Node.js installed.
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser to `http://localhost:3000`.

## Architecture Details

- **GitHub API Integration**: The `GithubWidget` initially fetches minimal data (followers, repo count, avatar). For optimized load times, deep metrics (stargazers, top languages, recent activity) are fetched *only* when the dossier is opened, using `Promise.all` for efficiency.
- **Interactive UI Limits**: Expanding a card ensures that typical text-selection (`window.getSelection`) is respected—stopping accidental layout collapsing when a user is merely trying to read or copy a paragraph.
- **Performance Considerations**: All complex inner glow and shadow calculations are done via standard CSS to take advantage of GPU compositing, keeping DOM overhead low despite visual complexity.

## License

This project is licensed under the MIT License.
