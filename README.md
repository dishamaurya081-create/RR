# SupeRR Selector — Rajasthan Royals 2027 Acquisition Intelligence Dashboard

> **Pressure Performance | Reliability | Squad Fit | Acquisition Strategy**
> 
> *An internal sports intelligence and decision-support product developed for Rajasthan Royals (RR) executive leadership and scouting management targeting the IPL 2027 acquisition cycle.*

---

## 1. Project Overview & Strategic Reality

**SupeRR Selector** is a sports analytics and acquisition intelligence platform engineered specifically for Rajasthan Royals (RR).

Rather than presenting unweighted career statistics, the platform isolates **crunch-time performance under high-leverage pressure scenarios** (death overs 16–20, high required run-rate chases >10 RPO, and defensive bowling pressure).

### Official IPL 2027 Squad & Retention Reality
Following the official IPL 2027 retention announcements ([TATA IPL 2027 Player Retentions Announced](https://www.iplt20.com/news/article/tata-ipl-2027-player-retentions-announced)), Rajasthan Royals' squad baseline is established:

- **Retained / Traded-in Players**: **19** (17 Retained, 2 Traded-in: Mohammed Shami, Manimaran Siddharth)
- **Available Squad Positions**: **6** (Squad capacity: 25)
- **Remaining Auction Purse**: **₹27.05 Crore**
- **Available Overseas Slots**: **3** (Current Overseas: 5 — Archer, Shanaka, Ferreira, Pretorius, Burger; Max: 8)
- **Official 19-Player Roster**:
  1. Aman Rao Perala (Batting All-Rounder, Domestic)
  2. Brijesh Sharma (Spin-Bowling All-Rounder, Domestic)
  3. Dasun Shanaka (Pace-Bowling All-Rounder, Overseas)
  4. Dhruv Jurel (Wicketkeeper-Batter, Domestic)
  5. Donovan Ferreira (Wicketkeeper-Batter / Finisher, Overseas)
  6. Jofra Archer (Right-Arm Fast, Overseas)
  7. Lhuan-dre Pretorius (Wicketkeeper-Batter, Overseas)
  8. Manimaran Siddharth (Slow Left-Arm Orthodox, Domestic — *Traded In*)
  9. Mohammed Shami (Right-Arm Fast, Domestic — *Traded In*)
  10. Nandre Burger (Left-Arm Fast, Overseas)
  11. Ravi Bishnoi (Right-Arm Leg-Spinner, Domestic)
  12. Ravindra Jadeja (Left-Arm Spin All-Rounder, Domestic)
  13. Riyan Parag (Top-Order Batter / Off-Spin, Domestic)
  14. Sandeep Sharma (Right-Arm Medium-Fast / Death Specialist, Domestic)
  15. Shubham Dubey (Middle-Order Finisher, Domestic)
  16. Sushant Mishra (Left-Arm Medium-Fast, Domestic)
  17. Vaibhav Sooryavanshi (Top-Order Batter, Domestic)
  18. Yash Raj Punja (Right-Arm Fast, Domestic)
  19. Yashasvi Jaiswal (Top-Order Explosive Batter, Domestic)

### Strategic Acquisition Realities & Alternatives
A rigorous audit of the 50 candidate records against official franchise retention registries reveals:
- **8 of 10 Original Recommendations are Confirmed Retained by Rivals**:
  - Rinku Singh (KKR), Varun Chakravarthy (KKR), Tristan Stubbs (DC), David Miller (DC), Heinrich Klaasen (SRH), Shardul Thakur (MI), Josh Hazlewood (RCB), Yuzvendra Chahal (PBKS).
- **1 Original Recommendation Retained by RR**: Dhruv Jurel.
- **1 Original Recommendation Registration Pending**: Maheesh Theekshana.
- **Critical Vacancy Created by Release**: **Shimron Hetmyer** was released by RR, leaving a marquee death-overs finisher gap.
- **Core Conclusion**: RR decision-makers **must leverage the 40 Alternative Candidates** (e.g. Ashutosh Sharma, Arshdeep Singh, Marcus Stoinis, Tim David, Mohammed Siraj) to deploy their ₹27.05 Cr purse across the 6 available squad slots.

---

## 2. Standardized Candidate Acquisition Statuses

All 50 candidate records are classified into 5 strict, real-world statuses (separating historical performance ranking from acquisition feasibility):

| Status | Description | Example Candidates |
|---|---|---|
| **Retained by RR** | Already locked in Rajasthan Royals' 19-player roster. | Dhruv Jurel, Ravindra Jadeja, Sandeep Sharma |
| **Retained by another franchise** | Contracted to rival franchises; unavailable at auction. | Rinku Singh (KKR), Varun Chakravarthy (KKR), Tristan Stubbs (DC), David Miller (DC), Heinrich Klaasen (SRH), Josh Hazlewood (RCB), Yuzvendra Chahal (PBKS), MS Dhoni (CSK), Rashid Khan (GT), Andre Russell (KKR), Axar Patel (DC) |
| **Released & potentially auction-eligible** | Officially released into the auction pool; subject to registration. | Shimron Hetmyer (Released by RR), Ashutosh Sharma (PBKS), Arshdeep Singh (PBKS), Marcus Stoinis (LSG), Tim David (MI), Mohammed Siraj (RCB), Harshal Patel (PBKS), Washington Sundar (SRH) |
| **Pending auction registration verification** | Target awaiting final auction entry paperwork. | Maheesh Theekshana |
| **Auction eligibility unverified** | Player status unconfirmed or retired from IPL play. | Dinesh Karthik (Retired), Jason Holder (Unconfirmed) |

---

## 3. Core Dashboard Modules

The application is structured into **10 connected modules**, all fed from a single unified TypeScript dataset (`app/src/data/intelligenceData.ts`):

1. **Executive Overview**: High-level strategic KPIs (₹27.05 Cr purse, 6 available positions, 3 overseas slots, 50 candidates breakdown, top batter and bowler rankings).
2. **Squad Requirements**: Real-world gap analysis of the 19-player squad against planning targets, identifying strengths, weaknesses (marquee finisher vacancy), pace/spin depth, and an **interactive, editable roster simulator**.
3. **Player Acquisition Board**: Comprehensive master registry of all 50 candidate records with role filters, source toggles, sorting, and full player dossier modals.
4. **Batter Intelligence**: Deep-dive analytics on death overs (16–20) and high RR (>10) batting: Strike Rate, Average, 4s/6s, Ordinary vs Pressure improvement, and Strike Rate vs Average scatterplots.
5. **Bowler Intelligence**: Defensive bowling pressure metrics: Economy rate (lower is better), dot-ball %, wickets/100 balls, and Economy vs Wickets scatterplots.
6. **Original vs Alternative Comparison**: Head-to-head comparison tool with normalized radar profiles, metric delta breakdown, and cross-discipline compatibility warnings.
7. **Player Reliability**: Disentangles peak impact from consistency. Sample adequacy breakdown (Adequate vs Limited vs Needs Validation) and 3-appearance sample warnings.
8. **Squad Combination Builder**: Interactive Playing XI + Impact Player architect with real-time rule enforcement (Overseas ≤ 4, Wicketkeeper check, Pace ≥ 3, Spin ≥ 2, Finishers ≥ 2) and lineup export.
9. **Acquisition Decisions**: Strategic decision matrix (Priority, Strong Alternative, Backup, Further Evaluation, Retained Elsewhere) with custom scout notes.
10. **Data Quality & Methodology**: Full mathematical transparency, dual-pool candidate resolutions, and inventory of all 26 dataset files.

---

## 4. Data Integrity & Validation Highlights

The raw archive `rr_final_review_pack.zip` was systematically unpacked and cross-verified:

1. **50 Unique Player-Role Records Preserved**:
   - **10 Original Recommendations** (5 batters, 5 bowlers)
   - **40 Alternative Candidates** (21 batters, 19 bowlers)
   - **47 Unique Individuals** (3 players evaluated in both batting and bowling pools).

2. **Dual-Pool Candidate Resolutions**:
   - **Rashid Khan**: Evaluated in both `alternative_batters` (SR 189.17) and `alternative_bowlers` (Econ 10.18, 9 wkts). Classified as a **Bowling All-Rounder / Leg-Spinner** rather than a specialist batter.
   - **Andre Russell**: Preserved in both pools; classified as **Fast-Bowling All-Rounder / Power Finisher**.
   - **Krunal Pandya**: Preserved in both pools; classified as **Spin-Bowling All-Rounder**.

3. **Zero-Fabrication Data Governance**:
   - 5 of 5 original batters lacked an independent reliability score in historical pipelines. These are displayed as **"Pending / N/A"** and **never replaced with zero or synthetic approximations**.
   - Squad fit baseline scores are clearly flagged as **provisional planning assumptions**.

---

## 5. Technology Stack & Architecture

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 8 with Tailwind CSS v4
- **Icons**: Lucide React
- **Data Visualizations**: Recharts (Horizontal Bar Charts, Scatterplots, Multi-Dimensional Radar Charts, Donut Charts)
- **Styling**: Tailored Dark Sports Analytics Theme (Rajasthan Royals Pink `#EA1A85`, Royal Blue `#1E3A8A`, Navy `#090E1A`, Gold `#D4AF37`)

---

## 6. Production Verification & Test Results

The platform has passed all production verification tests:

| Test | Tool / Script | Status | Notes |
|---|---|---|---|
| **TypeScript Typecheck** | `npx tsc --noEmit` | **PASS (0 errors)** | Full type safety across all components and data structures |
| **Production Build** | `npx vite build` | **PASS (3.25s)** | Generated optimized JS bundle (`924 kB`) and CSS (`51.8 kB`) |
| **Preview Server Probe** | `node scripts/test_preview.js` | **PASS (HTTP 200)** | Verified live server response on port 4173 with complete HTML & bundle |
| **Candidate Count Check** | `scripts/check_candidates.js` | **PASS** | Exactly 50 candidate records (10 original, 40 alternative, 47 unique players) |
| **Squad Purse & Slots Check**| Component validation | **PASS** | Verified 19 retained players, 6 available slots, ₹27.05 Cr purse, 3 overseas slots |
| **No External Fetching** | Static Data Model | **PASS** | Fully self-contained, 100% operational offline without network APIs |

---

## 7. Instructions to Run Locally

### Prerequisites
- Node.js (v18+ or v24+)
- pnpm or npm

### Development Server
```bash
cd app
pnpm dev
# or: npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Preview Server
```bash
cd app
npx vite build
node scripts/test_preview.js
# or: npx vite preview --host 127.0.0.1 --port 4173
```
Open [http://127.0.0.1:4173](http://127.0.0.1:4173) in your browser.

---

## 8. Final Submission Deliverables

- `app/src/`: Complete source code and unified dataset (`app/src/data/intelligenceData.ts`).
- `app/dist/`: Production-ready compiled assets.
- `scripts/`: Data inspection, verification, preview testing, and packaging scripts.
- `extracted_data/`: The 26 analytical datasets from `rr_final_review_pack.zip`.
- `supe_rr_selector_final_submission.zip`: Complete, clean submission package (<20 MB) excluding `node_modules` and raw match dump files.
