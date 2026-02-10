# Phone Verification

Twilio-based phone verification service (send OTP, verify OTP) with multi-client support and rate limiting.

## Setup

1. **Clone and install**

   ```bash
   git clone <your-repo-url>
   cd phone-verification
   npm install
   ```

2. **Environment**

   Copy the example env file and fill in your Twilio credentials:

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set:

   - `PORT` – server port (default: 3000)
   - For each client: `{CLIENT}_ACCOUNT_SID`, `{CLIENT}_AUTH_TOKEN`, `{CLIENT}_VERIFY_SERVICE_ID` (see `.env.example` for the pattern)

3. **Run**

   ```bash
   npm start
   ```

   Server runs at `http://localhost:3000` (or your `PORT`). Static UI is served from `/`.

## API

- **POST** `/phone-verification/send-otp` – send OTP (body: `{ "phone": "+44...", "clientName": "..." }`)
- **POST** `/phone-verification/verify-otp` – verify OTP (body: `{ "phone": "+44...", "code": "123456", "clientName": "..." }`)

`clientName` must match a configured client (e.g. ISES, NUHOME, BoilerBase). Rate limiting applies per IP.

## License

Private / internal use.
