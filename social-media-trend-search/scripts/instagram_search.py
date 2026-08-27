#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Instagram关键词搜索脚本 (优化版)
搜索指定关键词相关用户的Reels视频，筛选点赞数破万的视频，输出为CSV

优化内容:
1. 使用 requests 库 + Session 复用连接
2. 减少延迟时间
3. 添加并发请求支持
4. 新增关键词: klingai, vidu, jimeng

Author: Auto Generated
Date: 2026-01-29
"""

import json
import urllib.parse
from datetime import datetime
import time
import csv
from concurrent.futures import ThreadPoolExecutor, as_completed

try:
    import requests
except ImportError:
    print("❌ 需要安装 requests 库: pip3 install requests")
    exit(1)


class InstagramKeywordSearcher:
    """Instagram关键词搜索器 (优化版)"""
    
    def __init__(self, api_key):
        """初始化搜索器"""
        self.api_key = api_key
        self.base_url = "https://instagram-looter2.p.rapidapi.com"
        self.headers = {
            'x-rapidapi-key': self.api_key,
            'x-rapidapi-host': "instagram-looter2.p.rapidapi.com"
        }
        
        # 使用 Session 复用连接（大幅减少连接建立时间）
        self.session = requests.Session()
        self.session.headers.update(self.headers)
        
        # 搜索关键词列表（原有 + 新增 klingai, vidu, jimeng）
        self.keywords = [
            # 原有关键词
            "AI dance",
            "funny video",
            "AI art",
            "AI template",
            "AI Design",
            "photography",
            "viral AI-generated video",
            "CCTV",
            "transition",
            # 新增关键词
            "klingai",
            "vidu",
            "jimeng",
            # 相关扩展关键词
            "kling AI",
            "vidu AI",
            "jimeng AI",
            "可灵",
            "即梦"
        ]
        
        # 测试模式：只搜索前N个关键词（设为None则搜索全部）
        self.test_mode_limit = None  # 搜索全部关键词
        
        # 最小点赞数阈值
        self.min_likes = 10000
        
        # 每个关键词搜索的用户数量（优化：减少以提升速度）
        self.max_users_per_keyword = 10
        
        # 每个用户获取的视频数量（优化：减少以提升速度）
        self.reels_per_user = 20
        
        # API 请求延迟（优化：减少延迟）
        self.request_delay = 0.3  # 每次请求后的延迟（秒）
        self.keyword_delay = 0.5  # 关键词之间的延迟（秒）
        
        # 是否启用并发请求
        self.enable_concurrent = True
        self.max_workers = 3  # 并发线程数
        
        # 统计信息
        self.stats = {
            'total_requests': 0,
            'total_time': 0,
            'users_checked': 0,
            'videos_checked': 0
        }
    
    def search_users(self, keyword):
        """搜索包含关键词的用户"""
        try:
            encoded_keyword = urllib.parse.quote(keyword)
            url = f"{self.base_url}/search?query={encoded_keyword}&select=users"
            
            start_time = time.time()
            response = self.session.get(url, timeout=30)
            elapsed = time.time() - start_time
            
            self.stats['total_requests'] += 1
            self.stats['total_time'] += elapsed
            
            if response.status_code == 200:
                json_data = response.json()
                users = json_data.get('users', [])
                return users
            else:
                print(f"    ⚠️  搜索失败，状态码: {response.status_code}")
                return []
                
        except Exception as e:
            print(f"    ❌ 搜索关键词 '{keyword}' 时出错: {e}")
            return []
    
    def get_user_reels(self, user_id, count=12):
        """获取用户的Reels视频"""
        try:
            url = f"{self.base_url}/reels?id={user_id}&count={count}"
            
            start_time = time.time()
            response = self.session.get(url, timeout=30)
            elapsed = time.time() - start_time
            
            self.stats['total_requests'] += 1
            self.stats['total_time'] += elapsed
            
            if response.status_code == 200:
                json_data = response.json()
                items = json_data.get('items', [])
                return items
            else:
                return []
                
        except Exception as e:
            return []
    
    def extract_video_info(self, item, keyword, username):
        """提取视频关键信息"""
        try:
            media = item.get('media', {})
            
            # 获取统计数据
            like_count = media.get('like_count', 0)
            play_count = media.get('play_count', 0)
            comment_count = media.get('comment_count', 0)
            
            self.stats['videos_checked'] += 1
            
            # 只处理点赞数超过阈值的视频
            if like_count < self.min_likes:
                return None
            
            # 视频ID和code
            video_id = media.get('pk', '')
            code = media.get('code', '')
            
            # Instagram网页链接
            instagram_web_url = f"https://www.instagram.com/reel/{code}"
            
            # 封面链接
            cover_url = ''
            image_versions = media.get('image_versions2', {})
            candidates = image_versions.get('candidates', [])
            if candidates:
                cover_url = candidates[0].get('url', '')
            
            # 提取caption
            caption = media.get('caption', {})
            caption_text = caption.get('text', '') if caption else ''
            
            return {
                'tag': keyword,
                'platform': 'Instagram',
                'cover_url': cover_url,
                'instagram_web_url': instagram_web_url,
                'play_count': play_count,
                'like_count': like_count,
                'comment_count': comment_count,
                'video_id': video_id,
                'username': username,
                'caption': caption_text[:50] + '...' if len(caption_text) > 50 else caption_text
            }
            
        except Exception as e:
            return None
    
    def fetch_user_reels_with_filter(self, user_data, keyword):
        """获取单个用户的 Reels 并筛选（用于并发）"""
        results = []
        try:
            user = user_data.get('user', {})
            user_id = user.get('pk', '')
            username = user.get('username', '')
            
            if not user_id:
                return results
            
            self.stats['users_checked'] += 1
            
            # 获取用户的Reels
            reels = self.get_user_reels(user_id, self.reels_per_user)
            
            if not reels:
                return results
            
            # 处理每个视频
            for reel in reels:
                video_info = self.extract_video_info(reel, keyword, username)
                if video_info:
                    results.append(video_info)
            
            # 短暂延迟避免触发限制
            time.sleep(self.request_delay)
            
        except Exception as e:
            pass
        
        return results
    
    def search_keyword_concurrent(self, keyword, users):
        """并发搜索单个关键词的所有用户"""
        keyword_results = []
        users_to_check = users[:self.max_users_per_keyword]
        
        with ThreadPoolExecutor(max_workers=self.max_workers) as executor:
            futures = {
                executor.submit(self.fetch_user_reels_with_filter, user_data, keyword): user_data
                for user_data in users_to_check
            }
            
            for future in as_completed(futures):
                try:
                    results = future.result()
                    keyword_results.extend(results)
                except Exception as e:
                    pass
        
        return keyword_results
    
    def search_keyword_sequential(self, keyword, users):
        """顺序搜索单个关键词的所有用户"""
        keyword_results = []
        users_to_check = users[:self.max_users_per_keyword]
        
        for i, user_data in enumerate(users_to_check, 1):
            user = user_data.get('user', {})
            user_id = user.get('pk', '')
            username = user.get('username', '')
            
            if not user_id:
                continue
            
            self.stats['users_checked'] += 1
            
            print(f"    [{i}/{len(users_to_check)}] @{username}", end=' ')
            
            # 获取用户的Reels
            reels = self.get_user_reels(user_id, self.reels_per_user)
            
            if not reels:
                print("- 无视频")
                continue
            
            found_count = 0
            for reel in reels:
                video_info = self.extract_video_info(reel, keyword, username)
                if video_info:
                    keyword_results.append(video_info)
                    found_count += 1
            
            print(f"- {len(reels)}个视频，{found_count}个符合条件")
            
            # 避免请求过于频繁
            time.sleep(self.request_delay)
        
        return keyword_results
    
    def search_all_keywords(self):
        """搜索所有关键词"""
        all_results = []
        start_time = time.time()
        
        keywords_to_search = self.keywords
        if self.test_mode_limit:
            keywords_to_search = self.keywords[:self.test_mode_limit]
        
        total_keywords = len(keywords_to_search)
        
        for idx, keyword in enumerate(keywords_to_search, 1):
            print(f"\n[{idx}/{total_keywords}] 搜索关键词: {keyword}")
            
            # 1. 搜索用户
            users = self.search_users(keyword)
            print(f"    找到 {len(users)} 个相关用户")
            
            if not users:
                print(f"    ⚠️  未找到相关用户，跳过")
                continue
            
            # 2. 获取用户的Reels
            if self.enable_concurrent:
                print(f"    正在并发获取 Reels (最多 {self.max_users_per_keyword} 个用户)...")
                keyword_results = self.search_keyword_concurrent(keyword, users)
            else:
                keyword_results = self.search_keyword_sequential(keyword, users)
            
            print(f"    ✅ 找到 {len(keyword_results)} 个点赞>1万的视频")
            all_results.extend(keyword_results)
            
            # 关键词之间添加延迟
            if keyword != keywords_to_search[-1]:
                time.sleep(self.keyword_delay)
        
        total_time = time.time() - start_time
        
        # 打印统计信息
        print(f"\n{'='*60}")
        print(f"搜索统计:")
        print(f"  - 总耗时: {total_time:.1f}秒 ({total_time/60:.1f}分钟)")
        print(f"  - API请求: {self.stats['total_requests']}次")
        print(f"  - 检查用户: {self.stats['users_checked']}个")
        print(f"  - 检查视频: {self.stats['videos_checked']}个")
        print(f"  - 符合条件: {len(all_results)}个")
        print(f"{'='*60}")
        
        return all_results
    
    def save_to_csv(self, results, filename=None):
        """保存结果为CSV格式"""
        if not results:
            print("\n❌ 没有找到符合条件的视频")
            return None
        
        # 去重（基于 video_id）
        seen_ids = set()
        unique_results = []
        for result in results:
            vid = result.get('video_id', '')
            if vid and vid not in seen_ids:
                seen_ids.add(vid)
                unique_results.append(result)
        
        print(f"\n📊 去重后: {len(unique_results)} 个视频")
        
        # 准备表格数据
        table_data = []
        for result in unique_results:
            table_data.append([
                result['tag'],
                result['platform'],
                result['cover_url'],
                result['instagram_web_url'],
                result['play_count'],
                result['like_count'],
                result['comment_count']
            ])
        
        headers = ['标签名字', '平台', '封面链接', 'Instagram网页链接', '播放数', '点赞数', '评论数']
        
        # 保存到文件
        if filename is None:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"instagram_search_results_{timestamp}.csv"
        
        try:
            with open(filename, 'w', encoding='utf-8', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(headers)
                for row in table_data:
                    writer.writerow(row)
            
            print(f"\n✅ CSV文件已保存到: {filename}")
            print(f"   共 {len(unique_results)} 条记录")
            
            return filename
            
        except Exception as e:
            print(f"❌ 保存文件失败: {e}")
            return None


def main():
    """主函数"""
    print("📸 Instagram 关键词搜索器 (优化版)")
    print("=" * 60)
    
    keywords = [
        "AI dance", "funny video", "AI art", "AI template", 
        "AI Design", "photography", "viral AI-generated video", 
        "CCTV", "transition",
        # 新增关键词
        "klingai", "vidu", "jimeng",
        "kling AI", "vidu AI", "jimeng AI",
        "可灵", "即梦"
    ]
    
    print(f"将搜索 {len(keywords)} 个关键词，筛选点赞数>1万的视频:")
    for i, keyword in enumerate(keywords, 1):
        print(f"  {i}. {keyword}")
    print("=" * 60)
    
    print("\n⚡ 优化说明:")
    print("  - 使用 Session 复用连接")
    print("  - 启用并发请求")
    print("  - 减少延迟时间")
    print("=" * 60)
    
    # API密钥
    api_key = "9ab9d4694amsh1cdb56bbc9770a9p1eca1bjsnccf01daa8b1b"
    
    try:
        # 创建搜索器实例
        searcher = InstagramKeywordSearcher(api_key)
        
        # 搜索所有关键词
        results = searcher.search_all_keywords()
        
        # 保存结果
        saved_file = searcher.save_to_csv(results)
        
        if saved_file:
            print(f"\n✅ 搜索完成!")
            print(f"📁 结果文件: {saved_file}")
        else:
            print(f"\n⚠️  搜索完成，但未找到符合条件的视频")
            
    except KeyboardInterrupt:
        print("\n\n👋 程序被用户中断")
    except Exception as e:
        print(f"❌ 程序执行出错: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
