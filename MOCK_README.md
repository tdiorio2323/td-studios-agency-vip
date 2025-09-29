# MOCK BACKEND SETUP

This project now includes a complete mock backend system that eliminates the need for external services (OpenAI, Mailgun, Supabase) during development.

## Mock Data Structure

Mock data lives in `/data/mock/*.json`:
- `creators.json` - Sample creator profiles with filters and preferences
- `inquiries.json` - Sample brand inquiries (mix of serious offers and spam)

## API Endpoints

### Mock Data Endpoints
- **GET /api/mock/inquiries** → Returns all inquiries from `inquiries.json`
- **POST /api/mock/seed** → Seeds/refreshes the JSON files with sample data (no external services)

### Processing Endpoints
- **POST /api/classify** → Local keyword-based classifier that returns `{ classification: "serious"|"spam" }`
- **POST /api/inbound/mock** → Simulates incoming emails, appends new inquiry to `inquiries.json`

## Usage

### Start Development
```bash
npm run dev
# or
pnpm dev
```

### Seed Demo Data
```bash
curl -X POST http://localhost:3000/api/mock/seed
```

### Simulate Incoming Email
```bash
curl -X POST http://localhost:3000/api/inbound/mock \
  -H "Content-Type: application/json" \
  -d '{
    "recipient": "jessica@tdstudiosagency.com",
    "sender": "Brand <brand@brand.com>",
    "subject": "Paid collab $2000",
    "body": "We would like to pay $2000 for a reel"
  }'
```

### Test Classification
```bash
curl -X POST http://localhost:3000/api/classify \
  -H "Content-Type: application/json" \
  -d '{"subject": "Brand collaboration", "body": "Budget $1000"}'
```

## Pages

- **/** - Landing page with glassmorphism design
- **/inquiries** - Mock inquiries dashboard (fetches from `/api/mock/inquiries`)

## Reset Data

To reset mock data:
1. Delete `data/mock/*.json` files
2. Call `POST /api/mock/seed` to regenerate sample data
3. Or edit the JSON files directly

## Local Classification Logic

The local classifier looks for these keywords to determine if an inquiry is "serious":
- budget, $, paid, partner, net, retainer, collab, sponsor

All other inquiries are classified as "spam".