# Next.js Conversion Complete! 🎉

The repository has been successfully converted from an SDK library to a **Next.js application** with a demo interface for the HeyGen Streaming Avatar.

## What Changed

### Before
- TypeScript SDK library built with Rollup
- Published as npm package `@heygen/streaming-avatar`
- Consumers needed to integrate the SDK into their own applications

### After
- Full Next.js 15 application with React 19
- Ready-to-deploy web application
- Built-in demo interface for testing avatars
- Server-side API routes for secure token generation
- Modern styling with Tailwind CSS

## Environment Variables You Need

To run this application, you need the following environment variable:

### 🔑 HEYGEN_API_KEY (Required)

**What it is**: Your HeyGen API key for authenticating with HeyGen services.

**How to get it**:
1. Log in to [HeyGen](https://app.heygen.com/)
2. Go to [Settings → API](https://app.heygen.com/settings?nav=API)
3. Copy your **API Key** or **Trial Token**

**Important Notes**:
- **API Keys** are for Enterprise customers
- **Trial Tokens** are available for testing (max 3 concurrent sessions)
- This key is used **server-side only** to generate session tokens
- Never expose it in client-side code

### 🌐 HEYGEN_BASE_URL (Optional)

**What it is**: Base URL for the HeyGen API endpoints.

**Default**: `https://api.heygen.com`

**When to use**: Only if you're using a custom HeyGen endpoint (rare)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key and configuration:
```env
HEYGEN_API_KEY=your_actual_api_key_here
NEXT_PUBLIC_AVATAR_ID=ba7401f5391344f3a1769ad024c7205d
NEXT_PUBLIC_VOICE_ID=84d29094d8c8472885624bd30c06459e
NEXT_PUBLIC_KNOWLEDGE_BASE_ID=3318323f73b74f819d4f6fcfab0c49db
```

### 3. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Try It Out!
- Enter an Avatar ID (find them at [labs.heygen.com/interactive-avatar](https://labs.heygen.com/interactive-avatar))
- Enter a Voice ID from your HeyGen account
- Click "Start Session"
- Interact with your avatar via text or voice!

## Available Commands

```bash
# Development
npm run dev          # Start dev server (http://localhost:3000)

# Production
npm run build        # Build for production
npm start            # Run production build

# Code Quality
npm run lint         # Check code with ESLint
npm run format       # Format code with Prettier
```

## Project Structure

```
freecapt/
├── src/
│   ├── app/
│   │   ├── api/token/        # API route for token generation
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Home page
│   │   └── globals.css       # Global styles
│   ├── components/
│   │   └── AvatarComponent.tsx  # Main avatar interface
│   └── lib/
│       ├── StreamingAvatar.ts   # Core SDK (moved from root)
│       ├── QualityIndicator/    # Connection quality monitoring
│       ├── VoiceChat/           # Voice chat implementations
│       ├── pipecat.json         # Protobuf definitions
│       └── utils.ts             # Utility functions
├── .env.example              # Environment variable template
├── .env.local               # Your local config (gitignored)
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── package.json             # Dependencies and scripts
├── README_NEXTJS.md         # Detailed Next.js documentation
└── ENVIRONMENT_VARIABLES.md # Complete env vars guide
```

## Key Features

✅ **Interactive Avatar Interface**: Full UI for controlling avatars  
✅ **Text & Voice Chat**: Support for both text messages and voice interaction  
✅ **Real-time Video**: WebRTC-based video streaming  
✅ **Session Management**: Start, stop, and manage avatar sessions  
✅ **Secure Token Generation**: Server-side API route for tokens  
✅ **Quality Monitoring**: Built-in connection quality indicators  
✅ **Push-to-Talk**: Optional push-to-talk mode  
✅ **Modern Stack**: Next.js 15, React 19, TypeScript, Tailwind CSS  

## Documentation

- **[README_NEXTJS.md](./README_NEXTJS.md)** - Complete application guide with features, troubleshooting, and usage examples
- **[ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)** - Detailed environment variable documentation with security best practices
- **[.env.example](./.env.example)** - Quick reference template for required variables

## Deployment

This application can be deployed to:

### Vercel (Recommended)
```bash
vercel
```

Add `HEYGEN_API_KEY` in Vercel project settings.

### Other Platforms
- **Netlify**: Deploy and add env vars in site settings
- **AWS Amplify**: Configure environment in app settings
- **Docker**: Use environment variables in your container
- **Railway/Render**: Add env vars in project settings

## Technology Stack

- **Framework**: Next.js 15 (App Router, Turbopack)
- **UI**: React 19, Tailwind CSS
- **Language**: TypeScript
- **Real-time**: WebSocket, WebRTC, LiveKit
- **SDK**: HeyGen Streaming Avatar SDK (embedded)

## Next Steps

1. ✅ Set up your `.env.local` with `HEYGEN_API_KEY`
2. ✅ Run `npm run dev` and test the application
3. ✅ Get Avatar IDs from [labs.heygen.com/interactive-avatar](https://labs.heygen.com/interactive-avatar)
4. ✅ Customize the UI in `src/components/AvatarComponent.tsx`
5. ✅ Deploy to your preferred hosting platform

## Need Help?

- **Environment Setup**: Read [ENVIRONMENT_VARIABLES.md](./ENVIRONMENT_VARIABLES.md)
- **Application Guide**: Read [README_NEXTJS.md](./README_NEXTJS.md)
- **HeyGen Docs**: [docs.heygen.com](https://docs.heygen.com/)
- **API Reference**: [HeyGen API](https://docs.heygen.com/reference/streaming-avatar-101)

## Summary

The application is **ready to use**! Just add your `HEYGEN_API_KEY` to `.env.local` and run `npm run dev`. 

All files have been updated, the build completes successfully, and the development server runs without errors.

Enjoy your interactive avatars! 🚀
