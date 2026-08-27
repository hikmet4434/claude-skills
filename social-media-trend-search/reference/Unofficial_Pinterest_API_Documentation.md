# Unofficial Pinterest API 接入文档

> 来源: [RapidAPI - Unofficial Pinterest API](https://rapidapi.com/asyncsolutions-asyncsolutions-default/api/unofficial-pinterest-api)

---

## 1. 基础信息

| 项目 | 值 |
|------|-----|
| **Base URL** | `https://unofficial-pinterest-api.p.rapidapi.com` |
| **Host** | `unofficial-pinterest-api.p.rapidapi.com` |

---

## 2. 请求头 (Headers)

所有接口调用均需包含以下请求头：

| Header | 说明 | 示例值 |
|--------|------|--------|
| `X-RapidAPI-Key` | 你的 RapidAPI 密钥 | `YOUR_API_KEY` |
| `X-RapidAPI-Host` | API 主机地址 | `unofficial-pinterest-api.p.rapidapi.com` |

---

## 3. 接口详情

### 3.1 Pins 接口

#### 3.1.1 相关 Pins (Relevance Pins)

根据关键词搜索最相关的 Pin。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/pins/relevance` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

#### 3.1.2 最新 Pins (Recent Pins)

根据关键词搜索最新的 Pin。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/pins/recent` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

### 3.2 Videos 接口

#### 3.2.1 相关视频 (Relevance Videos)

根据关键词搜索最相关的视频。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/videos/relevance` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

#### 3.2.2 最新视频 (Recent Videos)

根据关键词搜索最新的视频。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/videos/recent` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

### 3.3 Boards 接口

#### 3.3.1 相关板块 (Relevance Boards)

根据关键词搜索相关的图板 (Boards)。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/boards/relevance` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

### 3.4 Users 接口

#### 3.4.1 相关用户 (Relevance Users)

根据关键词搜索相关的用户。

| 项目 | 值 |
|------|-----|
| **方法** | `GET` |
| **路径** | `/users/relevance` |

**参数：**

| 参数名 | 类型 | 必填 | 范围 | 默认值 | 说明 |
|--------|------|------|------|--------|------|
| `keyword` | string | 是 | - | - | 搜索关键词 |
| `num` | number | 否 | 1-600 | 20 | 返回结果数量 |

---

## 4. 代码示例

### 4.1 Python (requests)

```python
import requests

url = "https://unofficial-pinterest-api.p.rapidapi.com/pins/relevance"

querystring = {
    "keyword": "cats",
    "num": "20"
}

headers = {
    "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY",
    "X-RapidAPI-Host": "unofficial-pinterest-api.p.rapidapi.com"
}

response = requests.get(url, headers=headers, params=querystring)
print(response.json())
```

### 4.2 JavaScript (fetch)

```javascript
const url = 'https://unofficial-pinterest-api.p.rapidapi.com/pins/relevance?keyword=cats&num=20';

const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': 'YOUR_RAPIDAPI_KEY',
        'X-RapidAPI-Host': 'unofficial-pinterest-api.p.rapidapi.com'
    }
};

fetch(url, options)
    .then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.error('error:' + err));
```

### 4.3 cURL

```bash
curl --request GET \
     --url 'https://unofficial-pinterest-api.p.rapidapi.com/pins/relevance?keyword=cats&num=20' \
     --header 'X-RapidAPI-Host: unofficial-pinterest-api.p.rapidapi.com' \
     --header 'X-RapidAPI-Key: YOUR_RAPIDAPI_KEY'
```

---

## 5. 接口总览

| 接口名称 | 方法 | 路径 | 说明 |
|----------|------|------|------|
| 相关 Pins | `GET` | `/pins/relevance` | 按相关性搜索图片 |
| 最新 Pins | `GET` | `/pins/recent` | 按时间搜索最新图片 |
| 相关视频 | `GET` | `/videos/relevance` | 按相关性搜索视频 |
| 最新视频 | `GET` | `/videos/recent` | 按时间搜索最新视频 |
| 相关板块 | `GET` | `/boards/relevance` | 按相关性搜索板块 |
| 相关用户 | `GET` | `/users/relevance` | 按相关性搜索用户 |

---

## 6. 注意事项

- 所有接口均为 **GET** 请求
- 单次请求最多可获取 **600** 条数据
- 接口路径遵循 `/{资源类型}/{排序方式}` 格式
- API 可自动绕过 antibot 和 reCAPTCHA 验证

---

## 7. 定价方案

| 方案 | 价格 |
|------|------|
| BASIC | $0.00 / 月 |
| PRO | $4.99 / 月 |
| ULTRA | $30.00 / 月 |
| MEGA | $50.00 / 月 |

---

*文档生成时间: 2026-01-29*
