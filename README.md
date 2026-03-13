# 🔥 Daily Learning Streak Tracker

A full-stack web application that helps students build consistent study habits by tracking their daily learning streaks.

Built with **Next.js 15**, **TypeScript**, and **Tailwind CSS** — deployed on **Vercel**.

---

## Live Demo

🔗 [streak-tracker.vercel.app](https://streak-tracker.vercel.app)

---

## Features

- ✅ Mark "I Studied Today" with one click
- 🔥 Track current study streak (resets if a day is missed)
- 📚 View total days studied
- 📅 See last study date
- 📖 Full study history — newest entries first
- 🚫 Prevents duplicate entries for the same day
- 💾 Data persisted via localStorage

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Backend | Next.js API Routes |
| Storage | Browser localStorage |
| Deployment | Vercel |

---

## Project Structure

```
streak-tracker/
├── app/
│   ├── page.tsx              # Dashboard (home page)
│   ├── layout.tsx            # Root layout & navigation
│   ├── globals.css           # Global styles
│   ├── history/
│   │   └── page.tsx          # Study history page
│   └── api/
│       ├── study/
│       │   └── route.ts      # POST /api/study
│       ├── streak/
│       │   └── route.ts      # GET /api/streak
│       └── history/
│           └── route.ts      # GET /api/history
├── components/
│   ├── StreakCard.tsx         # Displays streak stats
│   ├── StudyButton.tsx        # "I Studied Today" button
│   └── HistoryList.tsx        # Study history list
├── lib/
│   └── streakLogic.ts         # Core streak calculation logic
└── vercel.json
```

---

## API Endpoints

### `POST /api/study`
Records today's study session.

**Request body:**
```json
{ "dates": ["2026-03-10", "2026-03-11"] }
```

**Response:**
```json
{
  "success": true,
  "message": "Great work! Study session recorded.",
  "streak": 3,
  "totalDays": 10,
  "lastStudied": "12 March 2026"
}
```

---

### `GET /api/streak`
Returns current streak stats.

**Response:**
```json
{
  "streak": 4,
  "totalDays": 10,
  "lastStudied": "12 March 2026",
  "studiedToday": false
}
```

---

### `GET /api/history`
Returns all study dates, newest first.

**Response:**
```json
{
  "history": [
    { "iso": "2026-03-12", "formatted": "12 March 2026" },
    { "iso": "2026-03-11", "formatted": "11 March 2026" }
  ]
}
```

---

## Streak Logic

```
If studied today        → streak continues
If missed a day         → streak resets to 1
If studied consecutively → streak increments by 1
```

**Example:**
```
10 March → Studied  ✅
11 March → Studied  ✅
12 March → Studied  ✅  → Streak = 3

13 March → Missed   ❌
14 March → Studied  ✅  → Streak resets to 1
```

---

## Business Rules

1. A user cannot mark study twice in one day
2. Streak increments only if the previous day was also studied
3. Missing a day resets the streak to 1
4. All study dates are stored in history

---

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/streak-tracker.git

# Navigate into the project
cd streak-tracker

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

---

## Deployment

This project is deployed on **Vercel**.

To deploy your own:
1. Push the repo to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Select this repository — Vercel auto-detects Next.js
4. Click **Deploy**

---

## Author

**Kameswara Sarma**  
B.Tech Computer Science | Class of 2026  
[GitHub](https://github.com/rvkameswarasarma) · [LinkedIn](https://linkedin.com/in/rvkameswarasarma) · [LeetCode](https://leetcode.com/rvkameswarasarma)

---

## License

This project was built as part of the **KALNET Internship** assessment.
