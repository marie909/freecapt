# HeyGen Streaming Avatar - Next.js Demo Application

This is a Next.js application that demonstrates the HeyGen Streaming Avatar SDK for creating interactive AI avatars.

## Migration to LiveAvatar

In the near future, HeyGen will be deprecating Interactive Avatar. To migrate, please check out the documentation on [LiveAvatar](https://docs.liveavatar.com/docs/interactive-avatar-migration-guide#/).

## Features

- 🎥 Real-time video streaming with interactive avatars
- 🗣️ Voice chat support (WebSocket and LiveKit transport)
- 💬 Text-based chat mode
- 🎤 Push-to-talk functionality
- 🔄 Session management (start, stop, keep-alive)
- 📊 Connection quality monitoring
- ⚡ Built with Next.js 15 and React 19

## Prerequisites

Before you begin, ensure you have:

- Node.js 18.x or later installed
- A HeyGen account with API access
- HeyGen API key from [HeyGen Settings](https://app.heygen.com/settings?nav=API)

## Environment Variables

This application requires the following environment variables:

### Required

- `HEYGEN_API_KEY` - Your HeyGen API key
  - Get it from: https://app.heygen.com/settings?nav=API
  - This is required for generating access tokens
  - **Note:** API Keys are reserved for Enterprise customers. You can also use a Trial Token for testing.

### Optional

- `HEYGEN_BASE_URL` - Base URL for HeyGen API (default: `https://api.heygen.com`)
  - Only change this if you're using a custom HeyGen endpoint

## Getting Started

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd freecapt
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your HeyGen API key and avatar configuration:

   ```env
   HEYGEN_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_AVATAR_ID=ba7401f5391344f3a1769ad024c7205d
   NEXT_PUBLIC_VOICE_ID=84d29094d8c8472885624bd30c06459e
   NEXT_PUBLIC_KNOWLEDGE_BASE_ID=3318323f73b74f819d4f6fcfab0c49db
   ```

4. **Run the development server**

   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## How to Use

1. **Avatar Configuration**
   
   This application is pre-configured with the following defaults (set via environment variables):
   - **Avatar ID**: `ba7401f5391344f3a1769ad024c7205d`
   - **Voice ID**: `84d29094d8c8472885624bd30c06459e`
   - **Knowledge Base ID**: `3318323f73b74f819d4f6fcfab0c49db`
   
   These can be changed in the UI or by updating the environment variables in `.env.local`.

2. **Start a Session**
   - Click "Start Session" to initialize the avatar
   - Wait for the video stream to load

3. **Interact with the Avatar**
   
   **Text Mode:**
   - Type your message in the input field
   - Click "Send" or press Enter
   - The avatar will speak your message

   **Voice Mode:**
   - Click "Start Voice Chat" to enable voice interaction
   - Speak directly to the avatar
   - The avatar will respond in real-time

4. **Additional Controls**
   - **Interrupt**: Stop the avatar's current speech
   - **End Session**: Close the connection and release resources

## Available Scripts

- `npm run dev` - Start the development server (default: http://localhost:3000)
- `npm run build` - Build the production application
- `npm start` - Start the production server
- `npm run lint` - Run ESLint for code quality checks
- `npm run format` - Format code using Prettier

## API Routes

### POST /api/token

Creates a new access token for HeyGen streaming sessions.

**Response:**
```json
{
  "data": {
    "token": "eyJ...",
    "expires_at": 1234567890
  }
}
```

## Troubleshooting

### How do I get an Access Token Key?

To generate your access token, you must first have access to your API key. API Keys are reserved for Enterprise customers. You can retrieve either the API Key or Trial Token by logging in to HeyGen and navigating to [API Settings](https://app.heygen.com/settings?nav=API).

Access tokens are generated automatically by the `/api/token` endpoint using your API key.

### Which Avatars can I use?

By default, there are several Public Interactive Avatars available. Find Avatar IDs at [labs.heygen.com/interactive-avatar](https://labs.heygen.com/interactive-avatar) by clicking 'Select Avatar'.

You can create your own Interactive Avatar by visiting the same page and clicking 'Create Interactive Avatar' at the bottom of the screen.

### Why am I encountering issues with testing?

Most likely, you're hitting your concurrent session limit. With a Trial Token, only 3 concurrent sessions can be created. Always close unused sessions with "End Session" when they're no longer being used.

Check active sessions: [List Sessions API](https://docs.heygen.com/reference/list-sessions)

### Common Issues

**"API key not configured" error:**
- Ensure `.env.local` exists and contains `HEYGEN_API_KEY`
- Restart the development server after adding environment variables

**Video not loading:**
- Check browser console for errors
- Ensure your browser supports WebRTC
- Check your network/firewall settings

**Session limit reached:**
- Close unused sessions
- Wait a few minutes for automatic session cleanup
- Use the HeyGen API to list and close active sessions

## SDK Features

### Voice Chat Modes

- **WebSocket Transport** (default): Voice data sent via WebSocket
- **LiveKit Transport**: Voice data sent via LiveKit for better quality

### Push-to-Talk

Enable push-to-talk mode for manual control over voice input:

```typescript
{
  enablePushToTalk: true,
  voiceChatTransport: VoiceChatTransport.LIVEKIT
}
```

### Session Management

- `activityIdleTimeout`: Auto-close after inactivity (30-3600 seconds, default: 120)
- `keepAlive()`: Extend session timeout
- `interrupt()`: Stop current speech
- `startListening()` / `stopListening()`: Control avatar listening state

### Quality Settings

Available quality levels:
- `AvatarQuality.Low` - Faster loading, lower quality
- `AvatarQuality.Medium` - Balanced
- `AvatarQuality.High` - Best quality, slower loading

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19, Tailwind CSS
- **SDK**: HeyGen Streaming Avatar SDK
- **WebRTC**: LiveKit Client
- **Real-time**: WebSocket & LiveKit

## Deployment to Vercel

This Next.js application is optimized for deployment to Vercel:

### Quick Deploy

1. **Push to GitHub** (if not already done)
   ```bash
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variables**
   
   In your Vercel project settings, add these environment variables:
   
   **Required:**
   - `HEYGEN_API_KEY` = `your_actual_api_key`
   
   **Optional (Pre-configured):**
   - `NEXT_PUBLIC_AVATAR_ID` = `ba7401f5391344f3a1769ad024c7205d`
   - `NEXT_PUBLIC_VOICE_ID` = `84d29094d8c8472885624bd30c06459e`
   - `NEXT_PUBLIC_KNOWLEDGE_BASE_ID` = `3318323f73b74f819d4f6fcfab0c49db`

4. **Deploy**
   - Click "Deploy"
   - Vercel will build and deploy your application
   - Your app will be live at `your-project.vercel.app`

### Vercel CLI Deploy

Alternatively, use the Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables
vercel env add HEYGEN_API_KEY
vercel env add NEXT_PUBLIC_AVATAR_ID
vercel env add NEXT_PUBLIC_VOICE_ID
vercel env add NEXT_PUBLIC_KNOWLEDGE_BASE_ID

# Deploy to production
vercel --prod
```

### Environment Variables in Vercel

Go to your project settings → Environment Variables and add:

| Variable Name | Value | Environment |
|---------------|-------|-------------|
| `HEYGEN_API_KEY` | Your actual API key | Production, Preview, Development |
| `NEXT_PUBLIC_AVATAR_ID` | `ba7401f5391344f3a1769ad024c7205d` | Production, Preview, Development |
| `NEXT_PUBLIC_VOICE_ID` | `84d29094d8c8472885624bd30c06459e` | Production, Preview, Development |
| `NEXT_PUBLIC_KNOWLEDGE_BASE_ID` | `3318323f73b74f819d4f6fcfab0c49db` | Production, Preview, Development |

## Documentation

- [HeyGen API Documentation](https://docs.heygen.com/)
- [Interactive Avatar SDK](https://github.com/HeyGen-Official/StreamingAvatarSDK)
- [Next.js Documentation](https://nextjs.org/docs)

## License

MIT

## Support

For issues and questions:
- GitHub Issues: [StreamingAvatarSDK Issues](https://github.com/HeyGen-Official/StreamingAvatarSDK/issues)
- HeyGen Support: Contact through your HeyGen account
