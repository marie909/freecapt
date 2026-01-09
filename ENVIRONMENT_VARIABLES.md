# Environment Variables Documentation

This document lists all environment variables required and optional for running the HeyGen Streaming Avatar Next.js application.

## Required Environment Variables

### HEYGEN_API_KEY

**Description**: Your HeyGen API key for authenticating with the HeyGen API.

**Required**: Yes

**Where to get it**: 
1. Log in to your HeyGen account
2. Navigate to [Settings → API](https://app.heygen.com/settings?nav=API)
3. Copy your API Key or Trial Token

**Important Notes**:
- API Keys are reserved for **Enterprise customers**
- Trial Tokens are available for testing (limited to 3 concurrent sessions)
- The key is used server-side to generate session tokens
- Never expose this key in client-side code

**Example**:
```env
HEYGEN_API_KEY=sk_1234567890abcdef1234567890abcdef
```

**Security**: Keep this secret! Add `.env.local` to `.gitignore` (already configured)

---

## Optional Environment Variables

### HEYGEN_BASE_URL

**Description**: Base URL for the HeyGen API endpoints.

**Required**: No

**Default**: `https://api.heygen.com`

**When to use**:
- Testing with a staging/development HeyGen environment
- Using a custom HeyGen deployment
- For most users, the default value is correct

**Example**:
```env
HEYGEN_BASE_URL=https://api-staging.heygen.com
```

---

## Setting Up Environment Variables

### Local Development

1. Copy the example file:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and add your values:
   ```env
   HEYGEN_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

### Production Deployment

#### Vercel
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add `HEYGEN_API_KEY` with your production API key
4. Optionally add `HEYGEN_BASE_URL` if needed

#### Other Platforms
Add environment variables according to your platform's documentation:
- **AWS Amplify**: Environment variables in app settings
- **Netlify**: Site settings → Environment variables
- **Docker**: Use `docker run -e` or docker-compose.yml
- **Railway**: Project settings → Variables

---

## Environment Variable Files

The application supports multiple environment files (loaded in order):

1. `.env` - Default values (committed to git, no secrets!)
2. `.env.local` - Local overrides (gitignored, use for secrets)
3. `.env.production` - Production-specific values
4. `.env.development` - Development-specific values

**Priority**: `.env.local` > `.env.production`/`.env.development` > `.env`

---

## Validation

The application validates environment variables at runtime:

### API Key Missing
If `HEYGEN_API_KEY` is not set, the `/api/token` endpoint will return:
```json
{
  "error": "API key not configured"
}
```

**Solution**: Set the `HEYGEN_API_KEY` environment variable and restart the server.

---

## Security Best Practices

1. **Never commit secrets**: `.env.local` is gitignored - use it for secrets
2. **Use different keys**: Use separate API keys for development and production
3. **Rotate keys**: Regularly rotate your API keys
4. **Monitor usage**: Check your HeyGen dashboard for unexpected API usage
5. **Server-side only**: API keys should only be used in API routes (server-side)

---

## Troubleshooting

### "API key not configured" error

**Problem**: The API key environment variable is not set or not loaded.

**Solutions**:
1. Verify `.env.local` exists in the project root
2. Check the variable name is exactly `HEYGEN_API_KEY`
3. Restart the development server after adding variables
4. Check for syntax errors in `.env.local` (no quotes, spaces, etc.)

### "Failed to create token" error

**Problem**: The API key is invalid or expired.

**Solutions**:
1. Verify the API key is correct and active
2. Check if your HeyGen account is active
3. Ensure you have API access (Enterprise customers)
4. Try generating a new Trial Token for testing

### Environment variables not updating

**Problem**: Changes to `.env.local` are not reflected.

**Solutions**:
1. Restart the Next.js development server
2. Clear `.next` cache: `rm -rf .next`
3. Verify no typos in variable names

---

## Example Configuration Files

### .env.example (Template)
```env
# HeyGen API Configuration
HEYGEN_API_KEY=your_heygen_api_key_here
# HEYGEN_BASE_URL=https://api.heygen.com
```

### .env.local (Your Local Setup)
```env
# Development API Key (Trial Token)
HEYGEN_API_KEY=sk_dev_1234567890abcdef1234567890abcdef
```

### .env.production (Production - Deploy to Hosting Platform)
```env
# Production API Key
HEYGEN_API_KEY=sk_prod_0987654321fedcba0987654321fedcba
```

---

## Additional Resources

- [HeyGen API Documentation](https://docs.heygen.com/)
- [Next.js Environment Variables](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables)
- [HeyGen API Settings](https://app.heygen.com/settings?nav=API)
