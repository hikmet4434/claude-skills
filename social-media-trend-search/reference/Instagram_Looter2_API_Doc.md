# Instagram Looter2 API 完整接入文档

## 基础配置

| 配置项 | 值 |
|--------|---|
| **Base URL** | `https://instagram-looter2.p.rapidapi.com` |
| **认证方式** | RapidAPI Key |

### 必需请求头

```
X-RapidAPI-Key: {你的RapidAPI密钥}
X-RapidAPI-Host: instagram-looter2.p.rapidapi.com
```

---

## 1. Identity Utilities（身份工具）

### 1.1 User ID from username（通过用户名获取用户ID）

**请求方式**: `GET`  
**端点**: `/id`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | String | 是 | Instagram用户名 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/id?username=javan' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 1.2 Username from user ID（通过用户ID获取用户名）

**请求方式**: `GET`  
**端点**: `/username`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | Instagram用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/username?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 1.3 Media ID from media URL（通过媒体URL获取媒体ID）

**请求方式**: `GET`  
**端点**: `/id-media`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | String | 是 | Instagram帖子URL |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/id-media?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FCowkyywjSZQ%2F' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 1.4 Media shortcode from media ID（通过媒体ID获取短代码）

**请求方式**: `GET`  
**端点**: `/id-media`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 媒体ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/id-media?id=3040091568624969296' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 2. User Insights（用户洞察）

### 2.1 User info by username（通过用户名获取用户信息）

**请求方式**: `GET`  
**端点**: `/profile`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | String | 是 | Instagram用户名 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/profile?username=javan' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.2 User info (V2) by username（通过用户名获取用户信息V2）

**请求方式**: `GET`  
**端点**: `/profile-v2`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | String | 是 | Instagram用户名 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/profile-v2?username=javan' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.3 User info by user ID（通过用户ID获取用户信息）

**请求方式**: `GET`  
**端点**: `/profile`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | Instagram用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/profile?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.4 User info (V2) by user ID（通过用户ID获取用户信息V2）

**请求方式**: `GET`  
**端点**: `/profile-v2`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | Instagram用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/profile-v2?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.5 Web profile info by username（通过用户名获取网页版用户信息）

**请求方式**: `GET`  
**端点**: `/web-profile`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| username | String | 是 | Instagram用户名 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/web-profile?username=javan' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.6 Media list by user ID（获取用户帖子列表）

**请求方式**: `GET`  
**端点**: `/media`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |
| count | Integer | 否 | 返回数量 |
| cursor | String | 否 | 分页游标 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/media?id=123456789&count=12' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.7 Media list (V2) by user ID（获取用户帖子列表V2）

**请求方式**: `GET`  
**端点**: `/media-v2`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |
| count | Integer | 否 | 返回数量 |
| cursor | String | 否 | 分页游标 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/media-v2?id=123456789&count=12' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.8 Reels by user ID（获取用户Reels短视频）

**请求方式**: `GET`  
**端点**: `/reels`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |
| count | Integer | 否 | 返回数量 |
| cursor | String | 否 | 分页游标 |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/reels?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.9 Reposts by user ID（获取用户转发内容）

**请求方式**: `GET`  
**端点**: `/reposts`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/reposts?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.10 Tagged media by user ID（获取用户被标记的媒体）

**请求方式**: `GET`  
**端点**: `/tagged`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/tagged?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.11 Related profiles by user ID（获取相关用户推荐）

**请求方式**: `GET`  
**端点**: `/related`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 用户ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/related?id=123456789' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 2.12 Search users by keyword（搜索用户）

**请求方式**: `GET`  
**端点**: `/search`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | String | 是 | 搜索关键词 |
| select | String | 否 | 搜索类型：users |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/search?query=javan&select=users' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 3. Media Details（媒体详情）

### 3.1 Media info by URL（通过URL获取媒体信息）

**请求方式**: `GET`  
**端点**: `/media-info`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | String | 是 | Instagram帖子/Reels URL |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/media-info?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FXXX' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 3.2 Media info by ID（通过ID获取媒体信息）

**请求方式**: `GET`  
**端点**: `/media-info`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 媒体ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/media-info?id=3040091568624969296' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 3.3 Download link by media ID or URL（获取媒体下载链接）

**请求方式**: `GET`  
**端点**: `/download`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| url | String | 是 | Instagram帖子URL |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/download?url=https%3A%2F%2Fwww.instagram.com%2Fp%2FXXX' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 3.4 Music info by music ID（通过音乐ID获取音乐信息）

**请求方式**: `GET`  
**端点**: `/music`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 音乐ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/music?id=MUSIC_ID' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 4. Hashtag Lookup（话题标签查找）

### 4.1 Hashtag media（获取话题标签下的媒体）

**请求方式**: `GET`  
**端点**: `/hashtag`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| name | String | 是 | 话题标签名称（不含#） |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/hashtag?name=travel' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 4.2 Search hashtags by keyword（搜索话题标签）

**请求方式**: `GET`  
**端点**: `/search`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | String | 是 | 搜索关键词 |
| select | String | 是 | 搜索类型：hashtags |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/search?query=travel&select=hashtags' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 5. Location Data（位置数据）

### 5.1 Location info（获取位置信息）

**请求方式**: `GET`  
**端点**: `/location`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| id | String | 是 | 位置ID |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/location?id=LOCATION_ID' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

### 5.2 Search places（搜索地点）

**请求方式**: `GET`  
**端点**: `/search`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | String | 是 | 搜索关键词 |
| select | String | 是 | 搜索类型：places |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/search?query=tokyo&select=places' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 6. Explore Feed（探索动态）

### 6.1 Explore feed（获取探索页面内容）

**请求方式**: `GET`  
**端点**: `/explore`

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/explore' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## 7. Global Search（全局搜索）

### 7.1 Global search（全局搜索）

**请求方式**: `GET`  
**端点**: `/search`

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| query | String | 是 | 搜索关键词 |
| select | String | 否 | 搜索类型：users / hashtags / places |

**示例**:
```bash
curl --request GET \
  --url 'https://instagram-looter2.p.rapidapi.com/search?query=keyword&select=users' \
  --header 'x-rapidapi-host: instagram-looter2.p.rapidapi.com' \
  --header 'x-rapidapi-key: YOUR_API_KEY'
```

---

## Python 接入示例

```python
import requests

BASE_URL = "https://instagram-looter2.p.rapidapi.com"

headers = {
    "x-rapidapi-key": "YOUR_API_KEY",
    "x-rapidapi-host": "instagram-looter2.p.rapidapi.com"
}

# 获取用户ID
def get_user_id(username):
    response = requests.get(f"{BASE_URL}/id", headers=headers, params={"username": username})
    return response.json()

# 获取用户信息
def get_user_profile(username):
    response = requests.get(f"{BASE_URL}/profile", headers=headers, params={"username": username})
    return response.json()

# 获取用户帖子
def get_user_media(user_id, count=12):
    response = requests.get(f"{BASE_URL}/media", headers=headers, params={"id": user_id, "count": count})
    return response.json()

# 获取用户Reels
def get_user_reels(user_id):
    response = requests.get(f"{BASE_URL}/reels", headers=headers, params={"id": user_id})
    return response.json()

# 搜索用户
def search_users(query):
    response = requests.get(f"{BASE_URL}/search", headers=headers, params={"query": query, "select": "users"})
    return response.json()

# 获取媒体信息
def get_media_info(url):
    response = requests.get(f"{BASE_URL}/media-info", headers=headers, params={"url": url})
    return response.json()

# 获取下载链接
def get_download_link(url):
    response = requests.get(f"{BASE_URL}/download", headers=headers, params={"url": url})
    return response.json()

# 使用示例
if __name__ == "__main__":
    # 获取用户ID
    result = get_user_id("instagram")
    print(result)
    
    # 获取用户信息
    profile = get_user_profile("instagram")
    print(profile)
```

---

## 定价方案

| 套餐 | 价格 | 说明 |
|------|------|------|
| BASIC | 免费 | 有限请求额度 |
| PRO | $9.90/月 | 更多请求额度 |
| ULTRA | $27.90/月 | 高级额度 |
| MEGA | $75.90/月 | 大量请求额度 |

---

## 联系方式

如需高容量定制套餐（1M/2M/5M/10M/15M+月请求），请联系：

- **Telegram**: [@IrrorSystems](https://t.me/IrrorSystems)
- **Email**: [Irrors@proton.me](mailto:Irrors@proton.me)

---

## 注意事项

1. 部分端点路径是根据API命名规则推断的，建议在 [RapidAPI Playground](https://rapidapi.com/irrors-apis/api/instagram-looter2/playground) 中确认具体路径
2. 获取API Key需要在 [RapidAPI](https://rapidapi.com/irrors-apis/api/instagram-looter2) 注册并订阅
3. 5XX服务器错误不计入使用配额，不收费
4. 此服务为独立服务，与Meta/Instagram官方无关
