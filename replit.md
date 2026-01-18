# SUOLALA - Solana Meme Token Website

## Overview

SUOLALA is a static marketing website for a Solana-based meme token/NFT project. The site serves as a landing page showcasing token information, NFTs, roadmap, and community features. It's built as a pure frontend application using vanilla HTML, CSS, and JavaScript with no backend infrastructure.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Single-Page Design**
- Pure HTML/CSS/JavaScript implementation without frameworks
- Single `index.html` file containing all page sections (Home, Token, NFTs, Roadmap, Community)
- Navigation uses anchor links for smooth scrolling between sections

**Styling Approach**
- Custom CSS with CSS variables for theming (Solana-inspired purple/green color scheme)
- Glass-morphism design patterns with blur effects and semi-transparent backgrounds
- Responsive design with mobile menu overlay system
- External fonts via Google Fonts (Space Grotesk, Inter)
- Font Awesome icons via CDN

**Interactive Features**
- Mobile-responsive navigation with hamburger menu
- Background animations (grid, particles, floating shapes)
- Music player with audio controls (play/pause, volume, progress bar)
- Live price display elements (likely placeholder for future API integration)

### Project Structure

```
/
├── index.html    # Main HTML file with all page sections
├── style.css     # All styling and animations
├── script.js     # JavaScript for interactivity
├── package.json  # Node dependencies for local development server
```

### Development Server

The project uses the `serve` npm package for local development, providing a simple static file server. No build process or bundling is required.

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0** - Icon library for UI elements
- **Google Fonts** - Space Grotesk (headings) and Inter (body text)

### NPM Dependencies
- **serve ^14.2.5** - Static file server for local development

### No Backend Services
- No database connections
- No authentication system
- No API integrations (price display appears to be placeholder)
- No server-side rendering or processing