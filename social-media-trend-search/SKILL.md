---
name: social-media-trend-search
description: "Cross-platform social media trending content search assistant. Searches Instagram, TikTok, Pinterest, and Twitter(X) for trending AI videos, viral content, and topic hotspots. Supports custom keyword searches, CSV export, and Feishu webhook push. Trigger keywords: social media search, trending content, AI video, hotspot, TikTok, Instagram, Pinterest, Twitter, Feishu push"
---

# Social Media Trend Search

## Overview

A professional social media trending search skill that searches and analyzes trending content across **Instagram, TikTok, Pinterest, and Twitter(X)**. It supports two execution paths: a fixed SOP for AI video searches (using pre-built scripts) and a custom search path for all other topics. Results are exported as CSV and can optionally be pushed to Feishu groups via webhook.

## Workflow — Two Execution Paths

**You MUST select the correct path based on user needs.**

### Path Selection Rules

| User Request | Path | Action |
|---|---|---|
| **AI Video** (explicitly mentions "video") | Path 1 — Fixed SOP | Execute pre-built search scripts |
| **AI LLM Hotspots** | Path 2 — Custom Search | Write & execute custom Python script |
| **Specific Topics** (fashion, painting, photography, etc.) | Path 2 — Custom Search | Write & execute custom Python script |
| **Any other non-video content** | Path 2 — Custom Search | Write & execute custom Python script |

**Key rule**: If user says "video", use Path 1. **For all other cases, use Path 2.**

---

### Path 1: Fixed SOP Search (AI Video Only)

**【Important】Only use this path when users explicitly ask for "AI video"**

**Step 1: Run the pre-built search scripts for four platforms**

Execute the main runner script. `{SKILL_DIR}` refers to this skill's directory:

```bash
cd /workspace && python3 {SKILL_DIR}/scripts/run_all_searches.py
```

This script automatically:
1. Runs Instagram, Pinterest, and TikTok searches in parallel
2. Merges results into a combined CSV file at `/workspace/combined_social_media_results_*.csv`

**Note:** The pre-built scripts cover Instagram, TikTok, and Pinterest. For Twitter(X), you must additionally write and execute a custom Twitter search script (see the Custom Search section for API guidance) to ensure all four platforms are covered.

**Step 2: Confirm search results contain data from all four platforms**

After search completes, verify results:
- Instagram: XX items
- TikTok: XX items
- Pinterest: XX items
- **Twitter(X): XX items** ← Must have!

**Step 3: Return results to user**

Tell the user:
1. Combined CSV file path (`/workspace/combined_social_media_results_*.csv`)
2. Per-platform video counts
3. How to download/open the file

**Step 4: If user requests Feishu push** → See [Feishu Push](#feishu-push) section below.

---

### Path 2: Custom Search (All Non-Video Requests)

**【Important】All requests other than "AI video" MUST use this path.**

**Step 1: Parse User Needs**

Extract from user input:
1. **Target platforms**: TikTok / Instagram / Pinterest / Twitter(X) — can be one or multiple. **Default to all four platforms when not specified.**
2. **Search keywords**: e.g., "AI LLM", "fashion", "photography"
3. **Filter conditions**: likes threshold, time range, etc.
4. **Result count**: how many results user needs

**Step 2: Read API Reference Documentation**

Based on target platforms, read the corresponding API reference docs (paths relative to this SKILL.md):

| Platform | Reference Doc Path |
|---|---|
| TikTok | `./reference/TikTok_API_Reference.md` |
| Instagram | `./reference/Instagram_Looter2_API_Doc.md` |
| Pinterest | `./reference/Unofficial_Pinterest_API_Documentation.md` |
| Twitter(X) | Use Twitter/X API (see Twitter API section below) |

**Step 3: Write Custom Python Script**

Write a customized search script based on user needs and API documentation. Save script to `/workspace/{topic}_search.py`.

**Step 4: Execute Script**

```bash
cd /workspace && python3 {topic}_search.py
```

Save results as CSV to `/workspace/{topic}_search_results.csv`.

**Step 5: Return Results to User**

```
📊 {Topic} Search Results

📁 CSV file generated, please download:

/workspace/{topic}_search_results.csv

📋 Usage Instructions:
1. Click the file path above to download the CSV file
2. Open with Excel, WPS, or other spreadsheet software
3. View complete search result data

📈 Data Statistics:
- Platform1: XX items
- Platform2: XX items
- Keywords: keyword1, keyword2, etc.
```

**【Important】Custom Search does NOT need HTML conversion or deployment. Directly return the CSV file path.**

---

## API Configuration

### Shared API Key

```
API_KEY = "9ab9d4694amsh1cdb56bbc9770a9p1eca1bjsnccf01daa8b1b"
```

### TikTok API

| Config | Value |
|---|---|
| **Base URL** | `https://tiktok-api23.p.rapidapi.com` |
| **Host Header** | `tiktok-api23.p.rapidapi.com` |
| **Method** | GET |

```python
import requests

headers = {
    "x-rapidapi-host": "tiktok-api23.p.rapidapi.com",
    "x-rapidapi-key": API_KEY
}

def search_videos(keyword, count=30, cursor="0"):
    """搜索TikTok视频"""
    url = f"https://tiktok-api23.p.rapidapi.com/api/search/video"
    params = {"keyword": keyword, "count": count, "cursor": cursor}
    response = requests.get(url, headers=headers, params=params)
    return response.json()
```

**Key endpoints:**

| Endpoint | Purpose |
|---|---|
| `/api/search/video` | Search videos by keyword |
| `/api/user/info` | Get user info |
| `/api/user/posts` | Get user posts |
| `/api/trending/get-trending-video` | Get trending videos |
| `/api/trending/get-trending-video-by-keyword` | Get trending videos by keyword |
| `/api/challenge/posts` | Get hashtag/challenge videos |
| `/api/trending/get-trending-keyword` | Get trending keywords |
| `/api/trending/get-trending-hashtag` | Get trending hashtags |

**Pagination**: Uses cursor-based pagination. Check `hasMore` field; use returned `cursor` for next page. Stop when cursor is `null`, empty, or `-1`.

For the complete TikTok API reference (56 endpoints), see `./reference/TikTok_API_Reference.md`.

### Instagram API

| Config | Value |
|---|---|
| **Base URL** | `https://instagram-looter2.p.rapidapi.com` |
| **Host Header** | `instagram-looter2.p.rapidapi.com` |
| **Method** | GET |

```python
import requests

headers = {
    "x-rapidapi-host": "instagram-looter2.p.rapidapi.com",
    "x-rapidapi-key": API_KEY
}

def search_users(query):
    """搜索Instagram用户"""
    url = f"https://instagram-looter2.p.rapidapi.com/search"
    params = {"query": query, "select": "users"}
    response = requests.get(url, headers=headers, params=params)
    return response.json()

def get_user_reels(user_id, count=12):
    """获取用户的Reels视频"""
    url = f"https://instagram-looter2.p.rapidapi.com/reels"
    params = {"id": user_id, "count": count}
    response = requests.get(url, headers=headers, params=params)
    return response.json()

def search_hashtag(name):
    """搜索话题标签下的内容"""
    url = f"https://instagram-looter2.p.rapidapi.com/hashtag"
    params = {"name": name}
    response = requests.get(url, headers=headers, params=params)
    return response.json()
```

**Key endpoints:**

| Endpoint | Purpose |
|---|---|
| `/search?query=xxx&select=users` | Search users |
| `/search?query=xxx&select=hashtags` | Search hashtags |
| `/reels?id=xxx` | Get user Reels |
| `/hashtag?name=xxx` | Get hashtag content |
| `/media-info?url=xxx` | Get media info |
| `/profile?username=xxx` | Get user profile |
| `/media?id=xxx` | Get user media list |

For the complete Instagram API reference, see `./reference/Instagram_Looter2_API_Doc.md`.

### Pinterest API

| Config | Value |
|---|---|
| **Base URL** | `https://unofficial-pinterest-api.p.rapidapi.com` |
| **Host Header** | `unofficial-pinterest-api.p.rapidapi.com` |
| **Method** | GET |

```python
import requests

headers = {
    "X-RapidAPI-Key": API_KEY,
    "X-RapidAPI-Host": "unofficial-pinterest-api.p.rapidapi.com"
}

def search_pins(keyword, num=100):
    """搜索相关Pins"""
    url = f"https://unofficial-pinterest-api.p.rapidapi.com/pins/relevance"
    params = {"keyword": keyword, "num": num}
    response = requests.get(url, headers=headers, params=params)
    return response.json()

def search_videos(keyword, num=100):
    """搜索相关视频"""
    url = f"https://unofficial-pinterest-api.p.rapidapi.com/videos/relevance"
    params = {"keyword": keyword, "num": num}
    response = requests.get(url, headers=headers, params=params)
    return response.json()
```

**Key endpoints:**

| Endpoint | Purpose |
|---|---|
| `/pins/relevance` | Search pins by relevance |
| `/pins/recent` | Search latest pins |
| `/videos/relevance` | Search videos by relevance |
| `/videos/recent` | Search latest videos |
| `/boards/relevance` | Search boards |
| `/users/relevance` | Search users |

**Note:** Pinterest API does NOT support regional search — returns global results. Max 600 items per request.

For the complete Pinterest API reference, see `./reference/Unofficial_Pinterest_API_Documentation.md`.

### Twitter(X) API

For Twitter(X) searches, write custom scripts using available Twitter/X API endpoints (e.g., via RapidAPI Twitter APIs or similar services). Ensure you search for the same keywords and apply the same filtering criteria (likes >= 10000 by default).

---

## Default Search Keywords (AI Video SOP)

The pre-built scripts search these AI-related keywords:

- AI dance
- funny video
- AI art
- AI template
- AI Design
- photography
- viral AI-generated video
- CCTV
- transition
- klingai / kling AI
- vidu / vidu AI
- jimeng / jimeng AI
- 可灵
- 即梦

---

## CSV Output Format

### Standard CSV Fields

| Field | Description |
|---|---|
| 标签名字 | Search keyword/tag |
| 平台 | Instagram / Pinterest / TikTok / Twitter(X) |
| 封面链接 | Video/content cover image URL |
| 网页链接 | Browser-accessible content page link |
| 播放数 | Play/view count (if available) |
| 点赞数 | Like count |
| 评论数 | Comment count (if available) |

### Output File Locations

**All output files MUST be saved to `/workspace` directory** — this is the user-accessible directory.

- Per-platform files: `/workspace/{platform}_search_results_*.csv`
- Combined file: `/workspace/combined_social_media_results_*.csv`
- Custom search files: `/workspace/{topic}_search_results.csv`

---

## Feishu Push

### When to Use

When user says "send to Feishu", "push to Feishu group", "post to Feishu" or similar.

### Execution Steps

1. **Confirm Data Source**: Ensure CSV search result file exists (e.g., `/workspace/xxx_results.csv`)

2. **【Important】Get Feishu Webhook URL**:
   - **Must ask user for Webhook URL** — cannot use any hardcoded URL
   - When user first requests Feishu push, say: "Please provide your Feishu Webhook URL so I can push results to your Feishu group"
   - After user provides Webhook URL, save for reuse in same session

3. **Push All Platform Data** (Total 5 cards):
   - Card 1: Summary card (four platform data volumes, filter conditions, trend insights)
   - Card 2: 📸 Instagram detail card
   - Card 3: 🎵 TikTok detail card
   - Card 4: 📌 Pinterest detail card
   - Card 5: 🐦 **Twitter(X) detail card** ← Must have!

### Feishu Card Message Format

Use Feishu Interactive Card JSON 2.0 format:

```python
import requests
import json
import csv
import time
import re

# 【Important】Must use user-provided Webhook URL, cannot hardcode
webhook_url = None  # Will be provided by user

# Read CSV file, group by platform (must include four platforms)
data = {'Instagram': [], 'TikTok': [], 'Pinterest': [], 'Twitter(X)': []}

# Find the latest combined CSV file
import glob
csv_files = sorted(glob.glob('/workspace/combined_social_media_results_*.csv'))
if csv_files:
    csv_file = csv_files[-1]
else:
    print("No CSV file found, please execute search first")
    exit(1)

with open(csv_file, 'r', encoding='utf-8') as f:
    reader = csv.DictReader(f)
    for row in reader:
        platform = row.get('平台', '')
        if platform in data:
            data[platform].append(row)

def parse_number(num_str):
    """Parse numbers, handle various formats"""
    if not num_str or num_str == '' or num_str == 'N/A':
        return 0
    num_str = str(num_str).replace(',', '').replace(' ', '').strip()
    if '万' in num_str:
        try:
            return int(float(num_str.replace('万', '')) * 10000)
        except:
            return 0
    try:
        return int(float(num_str))
    except:
        return 0

def format_number(num_str):
    """Format number display"""
    num = parse_number(num_str)
    if num == 0:
        return "0"
    if num >= 10000:
        return f"{num/10000:.1f}万"
    return str(num)

def safe_get_text(val, default="0"):
    """Safely get text, return default if empty or N/A"""
    if not val or val == '' or val == 'N/A':
        return default
    return str(val).strip()

# Sort by likes
for platform in data:
    data[platform].sort(key=lambda x: parse_number(x.get('点赞数', '0')), reverse=True)

def send_card(title, subtitle, elements, template_color="blue"):
    """Send card message (using JSON 2.0 format)"""
    card = {
        "schema": "2.0",
        "header": {
            "title": {"tag": "plain_text", "content": title},
            "subtitle": {"tag": "plain_text", "content": subtitle},
            "template": template_color
        },
        "body": {
            "elements": elements
        }
    }
    payload = {"msg_type": "interactive", "card": card}
    response = requests.post(webhook_url, json=payload)
    return response.json()

def build_platform_card(platform, items, emoji, color):
    """
    Build platform data card - push all data
    Due to Feishu card character limit, each card can have max ~200 elements
    When data exceeds per-page limit, automatically paginate and send multiple cards
    """
    item_count = len(items)
    if item_count == 0:
        elements = [{"tag": "markdown", "content": "暂无数据"}]
        from datetime import datetime
        update_time = datetime.now().strftime('%Y-%m-%d %H:%M')
        return send_card(f"{emoji} {platform} AI热门内容", f"共 0 条", elements, color)

    ITEMS_PER_PAGE = 40

    pages = []
    for i in range(0, item_count, ITEMS_PER_PAGE):
        page_items = items[i:i+ITEMS_PER_PAGE]
        page_num = (i // ITEMS_PER_PAGE) + 1
        total_pages = (item_count + ITEMS_PER_PAGE - 1) // ITEMS_PER_PAGE
        pages.append((page_items, page_num, total_pages))

    from datetime import datetime
    update_time = datetime.now().strftime('%Y-%m-%d %H:%M')

    for page_items, page_num, total_pages in pages:
        if platform == "Pinterest":
            table_content = f"**共 {item_count} 条热门内容**"
            if total_pages > 1:
                table_content += f" (第{page_num}页/共{total_pages}页)"
            table_content += "\n\n"
            table_content += "**序号** | **标签** | **链接**\n"
            table_content += ":---:|:---:|:---:\n"
        else:
            table_content = f"**共 {item_count} 条热门内容**"
            if total_pages > 1:
                table_content += f" (第{page_num}页/共{total_pages}页)"
            table_content += "\n\n"
            table_content += "**序号** | **标签** | **播放数** | **点赞数** | **链接**\n"
            table_content += ":---:|:---:|:---:|:---:|:---:\n"

        start_index = (page_num - 1) * ITEMS_PER_PAGE
        for idx, item in enumerate(page_items, start_index + 1):
            tag = safe_get_text(item.get('标签名字', ''), '-')[:15]
            tag = tag.replace('|', '&#124;').replace('\n', ' ')

            if platform == "Twitter(X)":
                plays = format_number(safe_get_text(item.get('播放数', '') or item.get('浏览数', '0'), '0'))
            elif platform == "Pinterest":
                plays = "-"
            else:
                plays = format_number(safe_get_text(item.get('播放数', '0'), '0'))

            if platform == "Pinterest":
                likes = "-"
            else:
                likes = format_number(safe_get_text(item.get('点赞数', '0'), '0'))

            url = (safe_get_text(item.get('网页链接', '')) or
                   safe_get_text(item.get('Twitter网页链接', '')) or
                   safe_get_text(item.get('Instagram网页链接', '')) or
                   safe_get_text(item.get('TikTok网页链接', '')) or
                   safe_get_text(item.get('Pinterest网页链接', '')))

            url = url.strip() if url else ''

            if url and (url.startswith('http://') or url.startswith('https://')):
                link_text = f"[查看]({url})"
            else:
                link_text = "-"

            if platform == "Pinterest":
                table_content += f"{idx} | {tag} | {link_text}\n"
            else:
                table_content += f"{idx} | {tag} | {plays} | {likes} | {link_text}\n"

        elements = [{"tag": "markdown", "content": table_content}]

        if total_pages > 1:
            subtitle = f"共 {item_count} 条 | 第{page_num}/{total_pages}页 | {update_time}"
        else:
            subtitle = f"共 {item_count} 条 | 更新时间: {update_time}"

        resp = send_card(f"{emoji} {platform} AI热门内容", subtitle, elements, color)
        print(f"{platform} 第{page_num}页: {resp}")

        if page_num < total_pages:
            time.sleep(0.5)

    return {"status": "success", "total_pages": len(pages)}

# ========== Push 5 Cards ==========

# 1. Summary card (contains four platforms)
from datetime import datetime
update_time = datetime.now().strftime('%Y-%m-%d %H:%M')

summary_md = f"""**📊 Four Platform AI Trending Video Search Results**

| Platform | Video Count | Filter Criteria |
|:---|:---:|:---|
| 📸 Instagram | {len(data['Instagram'])} items | Likes ≥ 10000 |
| 🎵 TikTok | {len(data['TikTok'])} items | Likes ≥ 10000 |
| 📌 Pinterest | {len(data['Pinterest'])} items | Likes ≥ 10000 |
| 🐦 Twitter(X) | {len(data['Twitter(X)'])} items | Likes ≥ 10000 |
| **Total** | **{sum(len(v) for v in data.values())} items** | - |

---
**🔥 Trending Keywords:** AI art, AI dance, AI Design, Kling AI, Vidu AI, 即梦AI

**💡 Trend Insight:** AI-generated art content continues to boom, Chinese AI tools have significant exposure on overseas social media.

*Update Time: {update_time}*
"""

print("Sending summary card...")
resp = send_card("🔥 Social Media AI Hotspot Report", f"Search Time: {update_time}", [{"tag": "markdown", "content": summary_md}], "red")
print(f"Summary: {resp}")

# 2-5. Send detailed data by platform (all four platforms)
time.sleep(1)
print("\n📸 Sending Instagram data...")
build_platform_card("Instagram", data['Instagram'], "📸", "carmine")

time.sleep(1)
print("\n🎵 Sending TikTok data...")
build_platform_card("TikTok", data['TikTok'], "🎵", "purple")

time.sleep(1)
print("\n📌 Sending Pinterest data...")
build_platform_card("Pinterest", data['Pinterest'], "📌", "orange")

time.sleep(1)
print("\n🐦 Sending Twitter data...")
build_platform_card("Twitter(X)", data['Twitter(X)'], "🐦", "blue")

print("\n" + "="*50)
print("✅ All card messages have been pushed!")
print("="*50)
```

---

## Pre-built Scripts

The following scripts are included for the Fixed SOP (AI Video) path:

```
./
├── SKILL.md                                        # This file
├── scripts/
│   ├── run_all_searches.py                         # Main runner (parallel execution + auto merge)
│   ├── merge_results.py                            # Result merger
│   ├── instagram_search.py                         # Instagram search
│   ├── pinterest_search.py                         # Pinterest search
│   └── tiktok_search.py                            # TikTok search
└── reference/
    ├── Instagram_Looter2_API_Doc.md                # Instagram API full docs
    ├── TikTok_API_Reference.md                     # TikTok API full docs (56 endpoints)
    └── Unofficial_Pinterest_API_Documentation.md   # Pinterest API docs
```

### Running the pre-built scripts

```bash
# Recommended: use the main runner (parallel execution)
cd /workspace && python3 {SKILL_DIR}/scripts/run_all_searches.py

# Alternative: manual parallel execution
python3 {SKILL_DIR}/scripts/instagram_search.py &
python3 {SKILL_DIR}/scripts/pinterest_search.py &
python3 {SKILL_DIR}/scripts/tiktok_search.py &
wait
python3 {SKILL_DIR}/scripts/merge_results.py
```

**【Important】Must `cd /workspace` before executing scripts** to ensure CSV files are saved in the user-accessible directory.

---

## API Quick Reference Tables

### TikTok Endpoints

| Endpoint | Path | Purpose |
|---|---|---|
| Search Video | `/api/search/video` | Search by keyword |
| User Info | `/api/user/info` | Get user basic info |
| User Posts | `/api/user/posts` | Get user's published videos |
| Trending Video | `/api/trending/get-trending-video` | Get platform trending videos |
| Trending by Keyword | `/api/trending/get-trending-video-by-keyword` | Get trending videos by keyword |
| Challenge Posts | `/api/challenge/posts` | Get hashtag/challenge videos |
| Trending Keywords | `/api/trending/get-trending-keyword` | Get trending keywords |
| Trending Hashtags | `/api/trending/get-trending-hashtag` | Get trending hashtags |
| Search General | `/api/search/general` | General search (top results) |
| Search Account | `/api/search/account` | Search accounts |

### Instagram Endpoints

| Endpoint | Path | Purpose |
|---|---|---|
| Search Users | `/search?select=users` | Search users by keyword |
| Search Hashtags | `/search?select=hashtags` | Search hashtags |
| User Reels | `/reels` | Get user's Reels videos |
| Hashtag Content | `/hashtag` | Get hashtag media |
| Media Info | `/media-info` | Get post/video details |
| User Profile | `/profile` | Get user profile |
| User Media | `/media` | Get user's media list |
| Explore Feed | `/explore` | Get explore page content |

### Pinterest Endpoints

| Endpoint | Path | Purpose |
|---|---|---|
| Relevance Pins | `/pins/relevance` | Search pins by relevance |
| Recent Pins | `/pins/recent` | Search latest pins |
| Relevance Videos | `/videos/relevance` | Search videos by relevance |
| Recent Videos | `/videos/recent` | Search latest videos |
| Relevance Boards | `/boards/relevance` | Search boards by relevance |
| Relevance Users | `/users/relevance` | Search users by relevance |

---

## Important Constraints & Notes

1. **Four platforms required**: When searching AI hotspots, MUST include all four platforms: Instagram, TikTok, Pinterest, Twitter(X)
2. **Feishu push**: MUST push all four platform cards, total 5 cards (1 summary + 4 platform details)
3. **Feishu Webhook URL**: MUST ask user for Webhook URL — never use hardcoded URLs
4. **Default filter**: Only return content with likes >= 10,000
5. **Pinterest limitation**: Pinterest API does NOT support regional search — returns global results
6. **Search duration**: Search may take 3-10 minutes — inform user in advance
7. **Output directory**: ALL files MUST be saved to `/workspace` directory — user cannot access other locations
8. **Dependencies**: Ensure `requests` library is installed (`pip3 install requests`)
9. **Custom search output**: Directly return CSV file path — no HTML conversion or deployment needed
10. **API rate limiting**: Be mindful of request frequency to avoid triggering API limits; add delays between requests

## Common Mistakes to Avoid

1. **Missing Twitter(X)**: Forgetting to search or push Twitter(X) data — all four platforms are mandatory
2. **Wrong execution path**: Using Fixed SOP for non-video requests or Custom Search for AI video requests
3. **Hardcoding Feishu Webhook URL**: Always ask the user for their Webhook URL
4. **Saving files outside `/workspace`**: User cannot access files saved elsewhere
5. **Converting custom search to HTML**: Custom search only needs CSV output, not HTML
6. **Skipping API documentation**: Always read the relevant API reference docs before writing custom scripts
7. **Not deduplicating results**: Always deduplicate by content ID before saving CSV
