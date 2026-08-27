---
name: industry-research-report-writer
description: "Creates professional industry research reports with comprehensive data gathering, synthesis, fact-checking, and DOCX/PDF formatting. Trigger keywords: research report, industry analysis, market analysis, competitive landscape, sector research, financial report, market size, trend analysis."
---

# Industry Research Report Writer

## Overview

This skill produces professional, data-driven industry research reports following a strict 4-phase workflow: Research → Report Writing → Fact-Checking → Document Formatting. Every request involving industries, markets, companies, or technologies is treated as a full research task — there are no "simple query" exceptions. The final deliverables are a DOCX and PDF with embedded charts and professional styling.

## ⚠️ Critical Rules

1. **Every request is a full research task.** Product comparisons, industry status inquiries, technical analysis, market size questions, trend analysis, and ANY question about industries/markets/companies/technologies MUST go through the complete 4-phase workflow.
2. **All outputs go to files** — never output report content directly in conversation.
3. **Never cite Wikipedia** — use primary sources only.
4. **Never use `convert_docx_to_md`** — it loses formatting. Use Read tool, unzip+parse XML, or `pandoc input.docx -t markdown` instead.
5. **Charts are generated ONLY in Phase 2 (Report Writing).**

## Workflow

### Phase 1: Research

Conduct comprehensive industry research using trusted financial sources.

#### 1.1 Scope Definition
1. Clarify research objectives and key questions
2. Define industry boundaries and geographic scope
3. Identify key metrics to collect (market size, growth rates, market share, etc.)
4. Establish timeframe for data collection

#### 1.2 Date Awareness

**ALWAYS include the current year in search queries** for time-sensitive data:
- ❌ Bad: "electric vehicle market size"
- ✅ Good: "electric vehicle market size 2026"

#### 1.3 Multilingual Search Strategy

**Search in BOTH Chinese and English for comprehensive coverage:**

| Industry/Topic Focus | Primary Language | Secondary Language |
|---------------------|------------------|-------------------|
| China market, Chinese companies | Chinese (中文) | English |
| Global/Western markets | English | Chinese (for China angle) |
| Cross-border industries | Both equally | - |

**Bilingual Search Examples:**

| Topic | Chinese Query | English Query |
|-------|---------------|---------------|
| EV battery market | "2026年 动力电池 市场规模" | "EV battery market size 2026" |
| Semiconductor industry | "半导体行业 发展趋势 2026" | "semiconductor industry trends 2026" |
| Fintech payments | "金融科技 支付 行业研究 2026" | "fintech payment solutions report 2026" |
| Company analysis | "比亚迪 财报 2025" | "BYD annual report 2025" |

**Source Language Priority:**
- **Tier 1 Chinese**: 国家统计局, 中国人民银行, 证监会, 工信部
- **Tier 1 English**: Federal Reserve, SEC, IMF, World Bank
- **Tier 2 Chinese**: 艾瑞咨询, 前瞻产业研究院, 中金研究
- **Tier 2 English**: Bloomberg, Reuters, McKinsey, BCG

#### 1.4 Data Collection

**Quantitative Data:**
- Market size and forecasts
- Growth rates (CAGR)
- Market share by company/segment
- Financial metrics (revenue, margins, valuations)
- Industry-specific KPIs

**Qualitative Data:**
- Industry trends and drivers
- Regulatory landscape
- Competitive dynamics
- Technology developments
- Risk factors

**Company Intelligence:**
- Key player profiles
- Strategic initiatives
- Recent M&A activity
- Leadership and governance

#### 1.5 Source Documentation

For every piece of data collected, document:
- Source name and type
- URL or reference
- Publication date
- Reliability rating (Tier 1-5)
- Brief justification for reliability rating

#### 1.6 Research Output Files

```
docs/
├── research_summary.md          # Executive research summary
├── market_data.md               # Quantitative findings
├── industry_analysis.md         # Qualitative analysis
├── competitive_landscape.md     # Company and competitor data
└── sources_list.md              # Complete source documentation

data/
├── market_metrics.json          # Structured numerical data
└── company_data.json            # Company-specific data

memory/
└── research_history_record.json # Research session log
```

#### 1.7 Research Standards

- At least 3 Tier 1-2 sources for key statistics
- At least 5 different source domains
- Cross-verify critical facts with independent sources
- Prefer data from last 12 months; clearly mark older data
- Flag unverifiable claims and note conflicting data
- Distinguish between facts and projections

---

### Phase 2: Report Writing & Chart Generation

Synthesize ALL research materials from Phase 1 into ONE comprehensive, exhaustive report with embedded charts.

#### 2.1 Input Requirements

**Read and integrate ALL research documents:**
- `docs/research_*.md` — All research summary files
- `docs/sources_list.md` — Source documentation
- `data/*.json` — Structured data files

**FORBIDDEN:**
- ❌ Reading only some research files and ignoring others
- ❌ Producing a shallow summary that omits research details
- ❌ Skipping data files in `data/*.json`

#### 2.2 Report Structure Framework

Select structure based on research type (see "Report Structure by Research Type" section below).

**Core Components (Required):**

1. **Executive Summary** — Most critical findings, key metrics, conclusions (no word limit)
2. **Introduction** — Report objectives, scope, industry context
3. **Key Findings** — Major discoveries with supporting evidence, data-driven insights
4. **Conclusion** — Summary of findings, implications, forward-looking perspective
5. **Sources** — Complete source documentation with reliability ratings

**Analytical Sections (Select as Needed):**
- Methodology, In-Depth Analysis, Recommendations, Appendices

**Optional Sections:**
- Unexpected Discoveries, Limitations, Future Research Directions

#### 2.3 Writing Style

- **Primary Style**: Narrative, prose-based format
- **Data Integration**: Embed statistics naturally within narrative
- **Lists**: Use sparingly, only for genuine enumerations
- **Tone**: Professional, objective, authoritative third-person voice
- **Terminology**: Industry-appropriate language

#### 2.4 Chart Generation

**⚠️ Charts are generated ONLY in this phase.** No other phase generates charts.

**CJK Font Support (MANDATORY before any chart generation):**
```python
import matplotlib.pyplot as plt

def setup_matplotlib_fonts():
    """Must call BEFORE generating any chart to support CJK languages"""
    plt.rcParams["font.sans-serif"] = ["Noto Sans CJK SC", "WenQuanYi Zen Hei", "SimHei", "Microsoft YaHei", "PingFang SC", "Arial Unicode MS", "DejaVu Sans"]
    plt.rcParams["axes.unicode_minus"] = False

setup_matplotlib_fonts()
```

**Font Priority:**
- Chinese: SimHei, Microsoft YaHei, Noto Sans CJK SC
- Japanese: Noto Sans CJK JP, MS Gothic
- Korean: Noto Sans CJK KR, Malgun Gothic

**Chart Color Strategy:**

1. **Company-focused report**: Use that company's brand colors
   - Tesla → `#E82127` (Tesla Red)
   - Apple → `#555555` (Apple Gray)
   - BYD → `#1E4D8C` (BYD Blue)

2. **Industry report (no single company)**: Use professional business palette
   ```python
   THEME_COLORS = ["#1A1A1A", "#4A4A4A", "#B8860B", "#6B6B6B", "#9B9B9B"]
   ```

3. **Multi-company comparison**: Assign each company its brand color
   ```python
   COMPANY_COLORS = {"Tesla": "#E82127", "BYD": "#1E4D8C", "NIO": "#3C6EE5"}
   ```

**Chart Styling:**
```python
def setup_chart_style(theme_colors):
    """Apply theme colors to matplotlib charts"""
    plt.rcParams["axes.prop_cycle"] = plt.cycler(color=theme_colors)
    plt.rcParams["axes.edgecolor"] = "#9B9B9B"
    plt.rcParams["figure.facecolor"] = "#FFFFFF"
    plt.rcParams["axes.facecolor"] = "#FFFFFF"
    plt.rcParams["grid.color"] = "#E0E0E0"
```

Save charts to `charts/*.png`. Embed in report using `![Figure X: Caption](charts/filename.png)`.

#### 2.5 Mandatory Conceptual Visualizations

**Generate using AI image generation tool. Prompts MUST be content-specific (not generic templates).**

**For Company-Focused Reports, MUST generate:**
1. Company Timeline/History Diagram — Key milestones, founding date, major events, acquisitions
2. Business Model Diagram — Revenue streams, customer segments, value proposition

**For Industry Reports, MUST generate:**
1. Value Chain / Industry Map — Upstream suppliers, midstream, downstream customers
2. Competitive Landscape Map — Market positioning of major players

**For Comparative Analysis, MUST generate:**
1. Competitive Positioning Map — Visual comparison on key dimensions

**Example — WRONG (Generic):**
```
"Professional business timeline infographic showing company milestones, corporate blue color scheme"
```

**Example — CORRECT (Content-Specific):**
```
"Professional business timeline infographic for Tesla Inc: Founded 2003 by Martin Eberhard and Marc Tarpenning, 2004 Elon Musk joins as chairman, 2008 Roadster launch, 2010 IPO at $17/share, 2012 Model S launch, 2017 Model 3 mass production, 2020 S&P 500 inclusion, 2023 Cybertruck delivery. Corporate style, Tesla red (#E82127) accent color, clean modern design, English labels"
```

**Example — CORRECT (Value Chain):**
```
"Professional value chain diagram for EV battery industry: Upstream - lithium mining (Albemarle, SQM), cobalt (Glencore), nickel (Norilsk); Midstream - cathode materials (Umicore), anode (BTR), electrolyte (Tianqi); Downstream - cell manufacturing (CATL 37%, LG 14%, BYD 12%), pack assembly (Tesla, Rivian); End use - EVs, ESS. Clean infographic style, grayscale with gold accents, Chinese labels"
```

**Visual Requirements:**
- Professional business aesthetic (clean, corporate style)
- Match the report's language (Chinese report → Chinese labels; English report → English labels)
- Consistent with overall theme colors
- Modern, minimalist, infographic-style, NO cartoonish elements
- Include specific names, dates, percentages, relationships from report content

#### 2.6 Sources Section Format

```markdown
## Sources

[1] Source Name - High Reliability - Official government data
    URL: https://actual-source-url.com/path/to/document

[2] Company Annual Report 2024 - High Reliability - Official company filing
    URL: https://investor.company.com/annual-report-2024.pdf
```

**Requirements:**
- Minimum 5 sources from at least 3 different domains
- Include reliability ratings for all sources
- Include FULL clickable URLs
- For listed companies: Prioritize official annual/quarterly reports

**FORBIDDEN Sources:**
- ❌ Wikipedia
- ❌ Generic news articles without primary data
- ❌ Unverifiable blog posts
- ❌ Sources without accessible URLs

#### 2.7 Report Writing Output

Save to: `docs/{topic}_report.md`

This must be a **complete, exhaustive report** — NOT a summary or outline. All charts must be embedded at relevant positions.

---

### Phase 3: Fact-Checking

Verify all data, statistics, and factual claims in the report from Phase 2.

#### 3.1 Input

- Primary: `docs/{topic}_report.md` (the report from Phase 2)
- Cross-reference: `docs/sources_list.md`, `data/*.json`

#### 3.2 Data Extraction

Extract and categorize all factual claims:
- **Critical Facts**: Core findings that drive conclusions
- **Supporting Data**: Secondary statistics and context
- **Projections**: Forward-looking statements
- **Attributions**: Quoted or cited expert opinions

#### 3.3 Verification Process

1. **Cross-Reference with Original Research** — Check against `docs/sources_list.md` and `data/*.json`
2. **Independent Verification (Critical Facts)** — Search for independent confirmation using Tier 1-2 sources
3. **Source Quality Assessment** — Verify URLs are accessible, check publication dates, confirm credibility

**Verification Requirements by Source Tier:**

| Source Tier | Minimum Verification |
|-------------|---------------------|
| Tier 1 (Official/Regulatory) | Accept if current |
| Tier 2 (Financial Data Providers) | Accept with date check |
| Tier 3 (Research/Consulting) | Cross-reference recommended |
| Tier 4 (Industry Sources) | Verify with Tier 1-2 if possible |
| Tier 5 (News/Media) | Must verify with higher tier |

#### 3.4 Red Flags to Check

- Statistics without clear sources
- Round numbers that suggest estimation
- Data older than 12 months without acknowledgment
- Conflicting figures within the same report
- Projections presented as facts
- Unattributed expert opinions

#### 3.5 Discrepancy Documentation

For each verified data point, document:
- **Status**: Verified / Unverified / Discrepancy Found
- **Original Source**: Where the claim originated
- **Verification Source**: How it was verified
- **Confidence Level**: High / Medium / Low
- **Notes**: Any caveats or context

#### 3.6 Verified Report — Direct Modification, NOT Annotation

**CORRECT Approach:**
- ✅ Found data error → Directly replace with correct data
- ✅ Found inaccurate statement → Directly modify to accurate statement
- ✅ Found missing source → Directly add the source
- ✅ Found need for clarification → Directly rewrite that paragraph

**FORBIDDEN Approach:**
- ❌ Adding annotations like `[Editor's note: ...]`
- ❌ Adding comments like `<!-- needs modification -->`
- ❌ Keeping incorrect content with correct content marked beside it
- ❌ Using strikethrough or other markup to show modifications

#### 3.7 Fact-Check Output

**`docs/fact_check_report.md`** — Detailed verification results:

```markdown
# Fact-Check Report

## Executive Summary
- Total claims verified: X
- Verified successfully: X (X%)
- Issues found: X
- Corrections needed: X

## Verification Details

### Critical Facts
| # | Claim | Original Source | Verification | Status | Confidence |
|---|-------|-----------------|--------------|--------|------------|

### Supporting Data
[Similar table format]

### Projections & Forecasts
[Similar table format]

## Issues & Corrections

### Corrections Required
1. [Specific correction with evidence]

### Clarifications Recommended
1. [Suggested clarification]

### Unverifiable Claims
1. [Claim that could not be verified]

## Source Assessment
[Evaluation of source quality and recommendations]

## Verification Methodology
[Brief description of verification process used]
```

**`docs/{topic}_report_verified.md`** — Clean, corrected complete report (NO annotations, ready for formatting).

**⚠️ Phase 3 does NOT generate charts.**

---

### Phase 4: Document Formatting (DOCX + PDF)

Create professionally formatted DOCX from the verified report, then convert to PDF.

#### 4.1 Input

- `docs/{topic}_report_verified.md` — The verified report from Phase 3
- `charts/*.png` — All chart images from Phase 2

#### 4.2 Chart Insertion Checklist

1. **List all charts** in `charts/` directory before generating DOCX
2. **Match each chart** to its reference in the verified report (e.g., "Figure 1", "Figure 2")
3. **Insert each chart image** at the correct position in the DOCX
4. **Verify charts are visible** in the generated DOCX before converting to PDF

**FORBIDDEN:**
- ❌ Generating DOCX without charts (text-only document)
- ❌ Forgetting to include chart images in the final document
- ❌ Converting to PDF before verifying charts are embedded in DOCX

#### 4.3 DOCX Styling — Color Harmony with Charts

**Whatever colors are used in charts, the DOCX styling should complement them:**
- Chart primary color → Use as DOCX heading accent
- Chart palette → Reflect in table styling, highlights
- Maintain visual coherence between charts and document

#### 4.4 Output

- `docs/{topic}_report.docx` — Professional DOCX with embedded charts
- `docs/{topic}_report.pdf` — Converted from DOCX

---

## Report Structure by Research Type

### Type A: Company-Focused Research

| Section | Content Focus |
|---------|---------------|
| Company Overview | Founding history, key milestones, timeline visualization |
| Ownership Structure | Major shareholders, institutional holdings, ownership chart |
| Financial Performance | Revenue trends, profit margins, YoY growth |
| Revenue Breakdown | By product line, by geography, by segment |
| Competitive Position | Market share, competitive advantages, SWOT |
| Management & Strategy | Leadership team, strategic initiatives |

**Primary Sources:** Company annual reports, quarterly filings, investor presentations, official press releases

### Type B: Industry/Sector Research

| Section | Content Focus |
|---------|---------------|
| Market Size & Growth | TAM, SAM, historical and projected growth |
| Industry Structure | Value chain, upstream/downstream relationships |
| Competitive Landscape | Major players, market share distribution |
| Key Trends & Drivers | Technology shifts, regulatory changes, demand drivers |
| Barriers to Entry | Capital requirements, technology barriers |
| Future Outlook | Growth projections, emerging opportunities |

**Primary Sources:** Industry research reports, government statistics, trade associations

### Type C: Comparative Analysis

| Section | Content Focus |
|---------|---------------|
| Comparison Framework | Criteria and methodology |
| Side-by-Side Analysis | Feature/metric comparison tables |
| Strengths & Weaknesses | Per-company evaluation |
| Market Positioning | Visual competitive map |
| Recommendation | Summary verdict with rationale |

**Primary Sources:** Mix of company filings and industry reports

## Trusted Source Standards

### Tier 1: Official & Regulatory Sources (Highest Trust)
- **Central Banks**: Federal Reserve, ECB, Bank of England, People's Bank of China
- **Securities Regulators**: SEC (EDGAR filings), FCA, ESMA, CSRC
- **Government Statistics**: Bureau of Labor Statistics, Eurostat, National Bureau of Statistics
- **International Organizations**: IMF, World Bank, OECD, BIS (Bank for International Settlements)

### Tier 2: Financial Data Providers
- **Market Data**: Bloomberg, Refinitiv, FactSet, S&P Global Market Intelligence
- **Credit Ratings**: Moody's, S&P Global Ratings, Fitch Ratings
- **Industry Databases**: IBISWorld, Statista, PitchBook

### Tier 3: Research & Analysis
- **Investment Banks**: Goldman Sachs Research, Morgan Stanley Research, JP Morgan Research
- **Consulting Firms**: McKinsey Global Institute, BCG, Bain & Company
- **Academic Institutions**: NBER, university research centers

### Tier 4: Industry & Trade Sources
- **Industry Associations**: Specific sector trade associations
- **Company Filings**: Annual reports, 10-K, 10-Q filings
- **Earnings Calls & Investor Presentations**

### Tier 5: News & Media (Verify with Higher Tiers)
- **Financial News**: Financial Times, Wall Street Journal, Bloomberg News, Reuters
- **Business Media**: The Economist, Harvard Business Review

## Theme Colors

### Color Selection Strategy

**1. Report focuses on a specific company:**
- Use that company's brand colors as accent/primary

**2. Report covers an industry (no single company):**
- Use professional business colors: Black/Gray + Gold/Silver accents
- Default palette: `["#1A1A1A", "#4A4A4A", "#B8860B", "#6B6B6B", "#9B9B9B"]`

**3. Comparing multiple companies:**
- Assign each company its brand color in charts
- Keep DOCX styling neutral (black/gray)

### Default Business Palette

| Role | Color | Usage |
|------|-------|-------|
| Primary | Black/Charcoal | Headings, primary chart series |
| Secondary | Gray tones | Body text, secondary series |
| Accent | Gold or Silver | Highlights, emphasis |
| Background | White/Off-White | Clean, professional base |

## Quality Standards

- All statistics must be cited with sources (include FULL URLs)
- Key findings require verification from at least 2 independent sources
- Reports must include reliability ratings for all sources
- Data should be current (within 12 months unless historical analysis)
- Clear distinction between facts and analysis/projections
- **NEVER cite Wikipedia** — use primary sources only
- **For listed companies**: Prioritize official annual/quarterly reports as sources

## File & Output Conventions

### Directory Structure

```
docs/
├── research_summary.md
├── market_data.md
├── industry_analysis.md
├── competitive_landscape.md
├── sources_list.md
├── {topic}_report.md
├── fact_check_report.md
├── {topic}_report_verified.md
├── {topic}_report.docx
└── {topic}_report.pdf

charts/
├── *.png                        # All chart images

data/
├── market_metrics.json
└── company_data.json

memory/
└── research_history_record.json
```

### Final Deliverables

1. **Markdown Report** (`.md`) — Primary working format
2. **DOCX Report** (`.docx`) — Professional layout with embedded charts
3. **PDF Report** (`.pdf`) — Converted from DOCX
4. **Source Documentation** — Complete list of sources with reliability ratings

## Common Mistakes to Avoid

- ❌ Skipping the research phase and writing from general knowledge
- ❌ Writing the report without reading ALL research documents
- ❌ Generating charts outside of Phase 2
- ❌ Adding annotations/editor's notes in the verified report instead of directly fixing issues
- ❌ Creating DOCX without embedding chart images
- ❌ Converting to PDF before verifying charts are in the DOCX
- ❌ Using Wikipedia as a source
- ❌ Using generic/template prompts for conceptual visualizations instead of content-specific ones
- ❌ Searching only in one language when bilingual search would yield better coverage
- ❌ Omitting the current year from search queries
- ❌ Outputting report content directly in conversation instead of saving to files
- ❌ Using `convert_docx_to_md` tool (loses formatting)
- ❌ Using random/default matplotlib colors without matching brand/theme context
