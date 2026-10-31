# The Slot Finder — PMO Resource Planning Assistant

## Overview

The Slot Finder helps production operations teams assign incoming customer projects to interdisciplinary squads based on expertise, availability, utilization, workload, and schedule slack.

## Problem

A production team receives incoming customer projects with different sizes, deadlines, and required expertise. Today, assignment is manual, which can cause overload, underuse, deadline risk, and difficult replanning when projects change or specialists go on leave.

## Solution

The app compares project demand against specialist supply and recommends feasible squad options with transparent scoring, risk flags, utilization indicators, and slack calculation.

## Live Demo

Not deployed yet. Add the deployed Vercel URL here when available.

## GitHub Repository

[huuthangle112-bit/slot-finder](https://github.com/huuthangle112-bit/slot-finder)

## Key Features

- PMO dashboard
- Team capacity board
- Squad recommendation
- Utilization calculation
- Slack / float calculation
- Risk flags
- What-if replanning scenarios
- PMO methodology documentation

## PMO Methodology

The app uses PMO concepts including demand planning, supply planning, utilization, slack / float, resource calendar, resource leveling, resource smoothing, and risk monitoring. See [docs/methodology.md](docs/methodology.md) for details.

## Recommendation Logic

The recommendation score considers:

- Skill match
- Role coverage
- Capacity fit
- Slack score
- Other factors, represented as a fixed baseline in the current simplified model

Simplified formula:

```text
Squad Score =
Expertise Match × 0.30
+ Role Coverage × 0.20
+ Capacity Fit × 0.20
+ Slack Score × 0.15
+ Other Factors × 0.15
```

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- Local JSON mock data
- Vercel deployment

## Local Setup

```bash
npm install
npm run dev
```
