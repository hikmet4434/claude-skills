# TikTok API 完整接口文档

> 数据来源：[TikFly API Documentation](https://docs.tikfly.io)  
> 更新时间：2026-01-29  
> 接口总数：56个

---

## 目录

- [快速入门指南](#快速入门指南)
  - [接入步骤](#接入步骤)
  - [API 基础信息](#api-基础信息)
  - [代码示例](#代码示例)
- [进阶教程](#进阶教程)
  - [Cursor 分页机制](#cursor-分页机制)
  - [secUid 用户标识符](#secuid-用户标识符)
- [API 接口列表](#api-接口列表)
  - [User（用户相关）](#user用户相关)
  - [Post（视频/帖子相关）](#post视频帖子相关)
  - [Search（搜索相关）](#search搜索相关)
  - [Trending（趋势/广告）](#trending趋势广告)
  - [Challenge/Hashtag（话题标签）](#challengehashtag话题标签)
  - [Music（音乐相关）](#music音乐相关)
  - [Place（地点相关）](#place地点相关)
  - [Download（下载相关）](#download下载相关)
  - [Live（直播相关）](#live直播相关)
  - [Effect（特效相关）](#effect特效相关)
  - [Collection（收藏夹相关）](#collection收藏夹相关)
- [接口统计](#接口统计)

---

# 快速入门指南

## 接入步骤

### 第一步：创建 RapidAPI 账户

前往 [RapidAPI](https://rapidapi.com/hub) 注册账户。如果已有账户，直接登录即可。

### 第二步：访问 TikTok API

访问 [TikTok API 页面](https://rapidapi.com/Lundehund/api/tiktok-api23)，查看 API 详情和可用端点。

### 第三步：订阅 API

在 API 页面点击 **Subscribe**，选择适合的套餐计划。确认订阅后即可访问所有端点。

### 第四步：测试端点

订阅后，可使用 RapidAPI 内置的 Playground 测试每个端点。输入参数、发送请求，直接在页面查看响应。

### 第五步：获取 API Key

在 **Code Snippets** 标签页中，RapidAPI 会自动在请求头中包含你的 API Key。此密钥用于所有 API 请求的身份验证。

### 第六步：在代码中使用 API Key

从代码片段复制 API Key，在你的代码中使用。确保在请求头中包含它以完成授权。

---

## API 基础信息

| 配置项 | 值 |
|--------|-----|
| **Base URL** | `https://tiktok-api23.p.rapidapi.com` |
| **请求方法** | GET |
| **认证方式** | API Key（请求头） |
| **响应格式** | JSON |

### 请求头配置

| Header | 值 | 说明 |
|--------|-----|------|
| `x-rapidapi-host` | `tiktok-api23.p.rapidapi.com` | API 主机地址 |
| `x-rapidapi-key` | `YOUR_API_KEY` | 你的 API 密钥 |

---

## 代码示例

### cURL 示例

```bash
curl --request GET \
  --url 'https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=taylorswift' \
  --header 'x-rapidapi-host: tiktok-api23.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

### Python 示例

```python
import requests

url = "https://tiktok-api23.p.rapidapi.com/api/user/info"
querystring = {"uniqueId": "taylorswift"}

headers = {
    "x-rapidapi-host": "tiktok-api23.p.rapidapi.com",
    "x-rapidapi-key": "YOUR_API_KEY"
}

response = requests.get(url, headers=headers, params=querystring)
print(response.json())
```

### JavaScript 示例

```javascript
const options = {
  method: 'GET',
  headers: {
    'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
    'x-rapidapi-key': 'YOUR_API_KEY'
  }
};

fetch('https://tiktok-api23.p.rapidapi.com/api/user/info?uniqueId=taylorswift', options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```

### Node.js (Axios) 示例

```javascript
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://tiktok-api23.p.rapidapi.com/api/user/info',
  params: { uniqueId: 'taylorswift' },
  headers: {
    'x-rapidapi-host': 'tiktok-api23.p.rapidapi.com',
    'x-rapidapi-key': 'YOUR_API_KEY'
  }
};

axios.request(options)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

# 进阶教程

## Cursor 分页机制

TikTok API 使用 **基于 cursor 的分页系统** 处理大数据集。每个响应包含一个 `cursor` 值，指示下一组数据的位置。

### 分页响应字段

| 字段 | 类型 | 说明 |
|------|------|------|
| `itemList` | Array | 数据列表（帖子/视频等） |
| `cursor` | String | 下一页的游标指针 |
| `hasMore` | Boolean | 是否有更多数据 |

### 分页实现步骤

1. **初始请求**：首次请求时 `cursor` 默认为 `0`
2. **获取响应**：响应包含结果列表和下一页的 cursor
3. **后续请求**：在下一次请求中使用上一响应的 `cursor` 值
4. **重复请求**：继续使用每个响应的新 cursor 值进行请求
5. **结束判断**：当 `cursor` 为 `null`、空值或 `-1` 时，表示已获取全部数据

### Python 分页完整示例

```python
import requests

def get_tiktok_user_posts(sec_uid, count=35, cursor='0'):
    """获取单页用户帖子"""
    url = "https://tiktok-api23.p.rapidapi.com/api/user/posts"
    
    headers = {
        "x-rapidapi-host": "tiktok-api23.p.rapidapi.com",
        "x-rapidapi-key": "YOUR_API_KEY"
    }
    
    params = {
        "secUid": sec_uid,
        "count": count,
        "cursor": cursor
    }
    
    response = requests.get(url, headers=headers, params=params)
    data = response.json()
    
    posts = data.get('itemList', [])
    next_cursor = data.get('cursor')
    
    # cursor 为 -1 时设为 None 以终止循环
    if next_cursor == '-1' or next_cursor == -1:
        next_cursor = None
    
    return posts, next_cursor


def fetch_all_user_posts(sec_uid, count=35):
    """获取用户所有帖子（自动分页）"""
    all_posts = []
    cursor = '0'  # 初始 cursor
    
    while cursor is not None:
        posts, cursor = get_tiktok_user_posts(sec_uid, count, cursor)
        all_posts.extend(posts)
        print(f"已获取 {len(all_posts)} 个帖子...")
    
    return all_posts


# 使用示例
if __name__ == "__main__":
    user_sec_uid = "MS4wLjABAAAAxxxxxxxx"  # 替换为实际的 secUid
    all_posts = fetch_all_user_posts(user_sec_uid)
    print(f"总共获取 {len(all_posts)} 个帖子")
```

---

## secUid 用户标识符

### 什么是 secUid？

**secUid**（Secure User ID）是 TikTok 内部的唯一二级用户标识符，是一串长字符串，用于 TikTok 后端和 API 识别用户。

### secUid 特点

- 长字符串，加密且不可读
- 即使用户更改用户名也**保持稳定**
- 主要用于 TikTok 内部 API
- 永久不变，每个用户唯一

### 为什么使用 secUid？

| 原因 | 说明 |
|------|------|
| 安全性 | 加密标识，保护用户隐私 |
| 稳定性 | 不受用户名更改影响 |
| 一致性 | 跨会话追踪用户 |
| API 兼容 | API 级用户识别的最佳方式 |

### 三种用户标识符对比

| 标识符 | 示例 | 可更改？ | 公开？ | 推荐使用场景 |
|--------|------|:--------:|:------:|--------------|
| **username** | `taylorswift` | ✅ 是 | ✅ 是 | 展示给用户 |
| **userId** | `6881290705605477381` | ❌ 否 | ⚠️ 半公开 | 内部存储 |
| **secUid** | `MS4wLjABAAAAqB08...` | ❌ 否 | ❌ 否 | API 调用 |

> **推荐**：在 API 调用中优先使用 secUid，它是最安全、最稳定的标识符。

### 如何获取 secUid？

调用 `Get User Info` 接口，通过用户名获取用户信息，响应中会包含 `secUid` 字段。

```python
#通过用户名获取 secUid
response = requests.get(
    "https://tiktok-api23.p.rapidapi.com/api/user/info",
    headers=headers,
    params={"uniqueId": "taylorswift"}
)
sec_uid = response.json()['userInfo']['user']['secUid']
```

### 常见问题

| 问题 | 答案 |
|------|------|
| secUid 会改变吗？ | 不会，永久不变 |
| 两个用户可以有相同的 secUid 吗？ | 不可以，每个都是唯一的 |
| secUid 和 userId 一样吗？ | 不一样，secUid 是加密的，更安全 |

---

# API 接口列表

## User（用户相关）

**接口数量：12个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get User Info | `/api-reference/user/get-user-info` | 获取用户基本信息 |
| GET | Get User Info v2 | `/api-reference/user/get-user-info-v2` | 获取用户信息（v2版本） |
| GET | Get User Info by ID | `/api-reference/user/get-user-info-by-id` | 通过用户ID获取用户信息 |
| GET | Get User Posts | `/api-reference/user/get-user-posts` | 获取用户发布的作品列表 |
| GET | Get User Popular Posts | `/api-reference/user/get-user-popular-posts` | 获取用户热门作品 |
| GET | Get User Oldest Posts | `/api-reference/user/get-user-oldest-posts` | 获取用户最早发布的作品 |
| GET | Get User Liked Posts | `/api-reference/user/get-user-liked-posts` | 获取用户点赞的作品 |
| GET | Get User Follower | `/api-reference/user/get-user-follower` | 获取用户粉丝列表 |
| GET | Get User Following | `/api-reference/user/get-user-following` | 获取用户关注列表 |
| GET | Get User Playlist | `/api-reference/user/get-user-playlist` | 获取用户播放列表 |
| GET | Get User Repost | `/api-reference/user/get-user-repost` | 获取用户转发内容 |
| GET | Get User Story | `/api-reference/user/get-user-story` | 获取用户快拍/故事 |

---

## Post（视频/帖子相关）

**接口数量：6个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Post Detail | `/api-reference/post/get-post-detail` | 获取视频/帖子详情 |
| GET | Get Post Comments | `/api-reference/post/get-post-comments` | 获取视频评论列表 |
| GET | Get Post Reply Comments | `/api-reference/post/get-post-reply-comments` | 获取评论的回复列表 |
| GET | Get Related Posts | `/api-reference/post/get-related-posts` | 获取相关推荐视频 |
| GET | Get Posts by Category | `/api-reference/post/get-posts-by-category` | 按分类获取视频列表 |
| GET | Discover Posts by Keyword | `/api-reference/post/discover-posts-by-keyword` | 通过关键词发现视频 |

---

## Search（搜索相关）

**接口数量：5个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Search General | `/api-reference/search/search-general` | 综合搜索（置顶结果） |
| GET | Search Video | `/api-reference/search/search-video` | 搜索视频 |
| GET | Search Account | `/api-reference/search/search-account` | 搜索账号/用户 |
| GET | Search Live | `/api-reference/search/search-live` | 搜索直播 |
| GET | Get Suggest Search Keyword | `/api-reference/search/get-suggest-search-keyword` | 获取搜索建议关键词 |

---

## Trending（趋势/广告）

**接口数量：15个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Top Ads | `/api-reference/trending/get-top-ads` | 获取热门广告列表 |
| GET | Get Ads Detail | `/api-reference/trending/get-ads-detail` | 获取广告详情 |
| GET | Get Trending Keyword | `/api-reference/trending/get-trending-keyword` | 获取热门关键词 |
| GET | Get Keyword Sentence | `/api-reference/trending/get-keyword-sentence` | 获取关键词相关句子 |
| GET | Get Trending Video By Keyword | `/api-reference/trending/get-trending-video-by-keyword` | 按关键词获取热门视频 |
| GET | Get Trending Hashtag | `/api-reference/trending/get-trending-hashtag` | 获取热门话题标签 |
| GET | Get Trending Song | `/api-reference/trending/get-trending-song` | 获取热门歌曲 |
| GET | Get Trending Creator | `/api-reference/trending/get-trending-creator` | 获取热门创作者 |
| GET | Get Trending Video | `/api-reference/trending/get-trending-video` | 获取热门视频 |
| GET | Get Commercial Music Library | `/api-reference/trending/get-commercial-music-library` | 获取商用音乐库 |
| GET | Get Commercial Music Playlist | `/api-reference/trending/get-commercial-music-playlist` | 获取商用音乐播放列表 |
| GET | Get Commercial Music Playlist Detail | `/api-reference/trending/get-commercial-music-playlist-detail` | 获取商用音乐播放列表详情 |
| GET | Get Top Products | `/api-reference/trending/get-top-products` | 获取热门商品 |
| GET | Get Top Product Metrics | `/api-reference/trending/get-top-product-metrics` | 获取热门商品指标 |
| GET | Get Top Product Detail | `/api-reference/trending/get-top-product-detail` | 获取热门商品详情 |

---

## Challenge/Hashtag（话题标签）

**接口数量：2个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Challenge Info | `/api-reference/challenge-hashtag/get-challenge-info` | 获取话题/挑战信息 |
| GET | Get Challenge Posts | `/api-reference/challenge-hashtag/get-challenge-posts` | 获取话题下的视频列表 |

---

## Music（音乐相关）

**接口数量：3个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Music Info | `/api-reference/music/get-music-info` | 获取音乐信息 |
| GET | Get Music Posts | `/api-reference/music/get-music-posts` | 获取使用该音乐的视频列表 |
| GET | Get Music Unlimited Sounds | `/api-reference/music/get-music-unlimited-sounds` | 获取无限制音乐列表 |

---

## Place（地点相关）

**接口数量：2个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Place Info | `/api-reference/place/get-place-info` | 获取地点信息 |
| GET | Get Place Posts | `/api-reference/place/get-place-posts` | 获取该地点相关的视频列表 |

---

## Download（下载相关）

**接口数量：2个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Download Video | `/api-reference/download/download-video` | 下载视频（无水印） |
| GET | Download Music | `/api-reference/download/download-music` | 下载音乐 |

---

## Live（直播相关）

**接口数量：3个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Live Category | `/api-reference/live/get-live-category` | 获取直播分类列表 |
| GET | Get Live Stream | `/api-reference/live/get-live-stream` | 获取直播流信息 |
| GET | Check Alive | `/api-reference/live/check-alive` | 检查直播是否在线 |

---

## Effect（特效相关）

**接口数量：2个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Effect Info | `/api-reference/effect/get-effect-info` | 获取特效信息 |
| GET | Get Effect Posts | `/api-reference/effect/get-effect-posts` | 获取使用该特效的视频列表 |

---

## Collection（收藏夹相关）

**接口数量：2个**

| 方法 | 接口名称 | 端点路径 | 描述 |
|:----:|----------|----------|------|
| GET | Get Collection Info | `/api-reference/collection/get-collection-info` | 获取收藏夹信息 |
| GET | Get Collection Posts | `/api-reference/collection/get-collection-posts` | 获取收藏夹中的视频列表 |

---

# 接口统计

| 分类 | 接口数量 |
|------|:--------:|
| User（用户相关） | 12 |
| Post（视频/帖子相关） | 6 |
| Search（搜索相关） | 5 |
| Trending（趋势/广告） | 15 |
| Challenge/Hashtag（话题标签） | 2 |
| Music（音乐相关） | 3 |
| Place（地点相关） | 2 |
| Download（下载相关） | 2 |
| Live（直播相关） | 3 |
| Effect（特效相关） | 2 |
| Collection（收藏夹相关） | 2 |
| **总计** | **56** |

---

## 相关链接

| 资源 | 链接 |
|------|------|
| 官方文档 | https://docs.tikfly.io |
| RapidAPI 页面 | https://rapidapi.com/Lundehund/api/tiktok-api23 |
| API Playground | https://rapidapi.com/Lundehund/api/tiktok-api23/playground |
| 技术支持 | hello@tikfly.io |
| Telegram | https://t.me/tikflyio |
| GitHub | https://github.com/tikfly |

---

## 备注

- 所有接口均为 `GET` 请求方法
- API Key 需通过 RapidAPI 订阅获取
- 请求频率限制根据订阅套餐不同而异
- 本文档整理自 TikFly API Reference
