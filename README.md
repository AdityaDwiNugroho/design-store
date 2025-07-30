# DesignStore - Complete E-commerce Platform

A modern, secure, and fast digital product store built with Next.js 15, TypeScript, and Tailwind CSS.

**Created by [Aditya Dwi Nugroho](https://github.com/AdityaDwiNugroho)**

## Features

### Core E-commerce
- ✅ Product catalog with responsive grid layout
- ✅ Individual product pages with detailed views
- ✅ Shopping cart with quantity selection
- ✅ Secure cart storage with fallback handling
- ✅ Fast client-side navigation
- ✅ Mobile-first responsive design

### Security & Performance
- ✅ Enterprise-level security middleware
- ✅ XSS & CSRF protection
- ✅ Rate limiting and bot detection
- ✅ Secure storage with encryption
- ✅ Input sanitization and validation
- ✅ HTTP security headers

### Support & Legal Pages
- ✅ **Help Center** with smart search functionality
- ✅ **Contact Us** page with multiple contact methods
- ✅ **Terms of Service** with comprehensive legal coverage
- ✅ **Privacy Policy** with GDPR/CCPA compliance

### FAQ System
- ✅ **Downloads & Delivery** - Product access and download guides
- ✅ **Payment & Billing** - Payment methods, refunds, invoicing
- ✅ **Licenses & Usage** - Usage rights and commercial licensing
- ✅ **Account & Orders** - Account management and order history

### Knowledge Base Articles
- ✅ **How to Download Products** - Step-by-step download guide
- ✅ **License Types Guide** - Understanding usage rights
- ✅ **Getting Started Guide** - For new users
- ✅ **Troubleshooting Guide** - Common issues and solutions
- ✅ **Commercial Usage** - Business use guidelines
- ✅ **Account Security** - Best practices for account safety

### Smart Search
- ✅ Real-time search suggestions
- ✅ Contextual recommendations
- ✅ Category and article filtering
- ✅ Google-like search experience

## Product Categories

- **UI Kits**: Complete component libraries and design systems
- **Templates**: Landing pages, dashboards, and website templates
- **Icons**: Minimalist icon packs in SVG format
- **Illustrations**: Beautiful illustrations for mobile and web apps
- **Code Snippets**: Ready-to-use React components and utilities

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── products/          # Product listing and detail pages
│   ├── categories/        # Category browsing page
│   ├── cart/             # Shopping cart page
│   └── layout.tsx        # Root layout with navigation
├── components/           # Reusable UI components
│   ├── Header.tsx       # Navigation header
│   ├── Footer.tsx       # Site footer
│   ├── Hero.tsx         # Homepage hero section
│   ├── ProductCard.tsx  # Product display component
│   └── FeaturedProducts.tsx
├── lib/                 # Utilities and data
│   ├── data.ts         # Sample product data
│   └── cart-context.tsx # Shopping cart state management
└── types/              # TypeScript type definitions
    └── index.ts        # Product and cart interfaces
```

## Design Philosophy

- **Minimalist**: Clean, uncluttered interface focused on products
- **Fast**: Optimized for performance with client-side navigation
- **Accessible**: Semantic HTML and proper ARIA labels
- **Mobile-First**: Responsive design that works on all devices

## Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icon library
- **React Context** - State management for shopping cart

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run security-audit` - Run security vulnerability audit
- `npm run security-check` - Check for outdated packages

## Security Features

This application implements enterprise-level security measures:

- **HTTP Security Headers**: Comprehensive security headers including CSP, HSTS, and XSS protection
- **Input Validation**: All user inputs are validated and sanitized
- **Rate Limiting**: Protection against brute force and DoS attacks
- **Secure Storage**: Encrypted localStorage for sensitive data
- **Middleware Protection**: Server-level security filtering
- **Attack Prevention**: Protection against XSS, CSRF, injection attacks, and more

For detailed security information, see [SECURITY.md](docs/SECURITY.md).

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

## Customization

1. **Add Products**: Update `src/lib/data.ts` with your product information
2. **Styling**: Modify Tailwind classes or add custom CSS in `src/app/globals.css`
3. **Payment**: Integrate with Stripe, PayPal, or your preferred payment processor
4. **Images**: Replace placeholder images with your product photos

## Author

**Aditya Dwi Nugroho**
- GitHub: [@AdityaDwiNugroho](https://github.com/AdityaDwiNugroho)
- Twitter: [@ProgrammerADN](https://twitter.com/ProgrammerADN)
- Instagram: [@allen.adityadn](https://www.instagram.com/allen.adityadn/)

## Contributing

Feel free to contribute by:
- Adding new features
- Improving the design
- Fixing bugs
- Adding more product categories

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This project is open source and available under the [MIT License](LICENSE).
