#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
TikTok关键词搜索脚本
搜索指定关键词的视频，筛选点赞数破万的视频，输出为表格

Author: Auto Generated
Date: 2025-01-27
"""

import http.client
import json
import urllib.parse
from datetime import datetime
import time


class TikTokKeywordSearcher:
    """TikTok关键词搜索器"""
    
    def __init__(self, api_key):
        """初始化搜索器"""
        self.api_key = api_key
        self.host = "tiktok-api23.p.rapidapi.com"
        self.headers = {
            'x-rapidapi-key': self.api_key,
            'x-rapidapi-host': self.host
        }
        
        # 搜索关键词列表
        self.keywords = [
            "AI dance",
            "funny video",
            "AI art",
            "AI template",
            "AI Design",
            "photography",
            "viral AI-generated video",
            "CCTV",
            "transition"
        ]
        
        # 测试模式：只搜索前N个关键词（设为None则搜索全部）
        self.test_mode_limit = None  # 设为1则只测试第一个关键词
        
        # 最小点赞数阈值
        self.min_likes = 10000
    
    def search_videos(self, keyword, count=30, cursor="0"):
        """搜索指定关键词的视频"""
        try:
            # URL编码关键词
            encoded_keyword = urllib.parse.quote(keyword)
            
            # 创建HTTPS连接
            conn = http.client.HTTPSConnection(self.host)
            
            # 构建请求路径
            endpoint = f"/api/search/video?keyword={encoded_keyword}&count={count}&cursor={cursor}"
            
            # 发送GET请求
            conn.request("GET", endpoint, headers=self.headers)
            
            # 获取响应
            response = conn.getresponse()
            data = response.read()
            
            # 关闭连接
            conn.close()
            
            if response.status == 200:
                json_data = json.loads(data.decode("utf-8"))
                # API返回的字段可能是itemList或item_list
                videos = json_data.get('itemList', []) or json_data.get('item_list', [])
                next_cursor = json_data.get('cursor', None)
                
                # 检查是否还有更多结果
                has_more = json_data.get('has_more', 0) or json_data.get('hasMore', 0)
                
                return videos, next_cursor, has_more
            else:
                print(f"API请求失败，状态码: {response.status}")
                print(f"错误信息: {data.decode('utf-8')[:200]}")
                return [], None, False
                
        except Exception as e:
            print(f"搜索关键词 '{keyword}' 时出错: {e}")
            return [], None, False
    
    def extract_video_info(self, video, keyword):
        """提取视频关键信息"""
        try:
            # 获取统计数据（参考test.py的提取方式）
            stats = video.get('stats', {})
            play_count = stats.get('playCount', 0)
            digg_count = stats.get('diggCount', 0)  # 点赞数
            share_count = stats.get('shareCount', 0)  # 分享数
            collect_count = stats.get('collectCount', 0)  # 收藏数
            
            # 只处理点赞数超过阈值的视频
            if digg_count < self.min_likes:
                return None
            
            # 视频ID和描述
            video_id = video.get('id', '')
            description = video.get('desc', '')
            
            # 作者信息
            author_info = video.get('author', {})
            author_unique_id = author_info.get('uniqueId', '')
            
            # 视频信息
            video_info = video.get('video', {})
            
            # 封面链接（优先使用高质量封面）
            # originCover 是原始封面，cover 是压缩封面，dynamicCover 是动态封面
            cover_url = (video_info.get('originCover') or 
                        video_info.get('cover') or 
                        video_info.get('dynamicCover') or '')
            
            # TikTok网页链接（始终构建，用于在浏览器中打开）
            tiktok_web_url = f"https://www.tiktok.com/@{author_unique_id}/video/{video_id}"
            
            # 提取标签（从challenges和textExtra中提取）
            hashtags = []
            
            # 从challenges中提取
            challenges = video.get('challenges', [])
            for challenge in challenges:
                title = challenge.get('title', '')
                if title:
                    hashtags.append(title)
            
            # 从textExtra中提取
            text_extra = video.get('textExtra', [])
            for extra in text_extra:
                hashtag_name = extra.get('hashtagName', '')
                if hashtag_name:
                    hashtags.append(hashtag_name)
            
            # 找到匹配的标签（检查关键词是否在标签中）
            matched_tag = keyword
            for tag in hashtags:
                if keyword.lower() in tag.lower() or tag.lower() in keyword.lower():
                    matched_tag = tag
                    break
            
            # 如果没有找到匹配的标签，使用第一个标签或关键词本身
            if not hashtags:
                matched_tag = keyword
            elif matched_tag == keyword and hashtags:
                matched_tag = hashtags[0]
            
            return {
                'tag': matched_tag,
                'platform': 'TikTok',
                'cover_url': cover_url,  # 封面链接
                'tiktok_web_url': tiktok_web_url,  # TikTok网页链接
                'play_count': play_count,  # 播放数
                'like_count': digg_count,  # 点赞数
                'share_count': share_count,  # 分享数
                'collect_count': collect_count,  # 收藏数
                'video_id': video_id,
                'description': description[:50] + '...' if len(description) > 50 else description
            }
            
        except Exception as e:
            print(f"提取视频信息时出错: {e}")
            return None
    
    def search_all_keywords(self, max_videos_per_keyword=50):
        """搜索所有关键词"""
        all_results = []
        
        keywords_to_search = self.keywords
        if self.test_mode_limit:
            keywords_to_search = self.keywords[:self.test_mode_limit]
        
        for keyword in keywords_to_search:
            print(f"\n{'='*60}")
            print(f"正在搜索关键词: {keyword}")
            print(f"{'='*60}")
            
            keyword_results = []
            cursor = "0"
            page = 1
            total_fetched = 0
            
            while total_fetched < max_videos_per_keyword:
                print(f"  第 {page} 页...", end=' ')
                
                videos, next_cursor, has_more = self.search_videos(keyword, count=30, cursor=cursor)
                
                if not videos:
                    print("未获取到视频")
                    break
                
                print(f"获取到 {len(videos)} 个视频，筛选中...")
                
                # 处理每个视频
                for video in videos:
                    video_info = self.extract_video_info(video, keyword)
                    if video_info:
                        keyword_results.append(video_info)
                        total_fetched += 1
                
                # 检查是否还有更多结果
                if not has_more or not next_cursor or next_cursor == "-1":
                    print("  没有更多结果了")
                    break
                
                cursor = str(next_cursor)
                page += 1
                
                # 避免请求过于频繁
                time.sleep(1)
            
            print(f"✅ 关键词 '{keyword}' 完成，找到 {len(keyword_results)} 个符合条件的视频")
            all_results.extend(keyword_results)
            
            # 关键词之间添加延迟
            if keyword != self.keywords[-1]:
                time.sleep(2)
        
        return all_results
    
    def save_to_table(self, results, filename=None):
        """保存结果为CSV格式（直接输出CSV）"""
        if not results:
            print("\n❌ 没有找到符合条件的视频")
            return None
        
        # 准备表格数据
        table_data = []
        for result in results:
            table_data.append([
                result['tag'],
                result['platform'],
                result['cover_url'],  # 封面链接
                result['tiktok_web_url'],  # TikTok网页链接
                result['play_count'],  # 播放数
                result['like_count'],  # 点赞数
                result['share_count'],  # 分享数
                result['collect_count']  # 收藏数
            ])
        
        headers = ['标签名字', '平台', '封面链接', 'TikTok网页链接', '播放数', '点赞数', '分享数', '收藏数']
        
        # 保存到文件（默认CSV格式）
        if filename is None:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"tiktok_search_results_{timestamp}.csv"
        
        try:
            # 保存为CSV格式
            import csv
            with open(filename, 'w', encoding='utf-8', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(headers)
                for row in table_data:
                    writer.writerow(row)
            
            # 打印摘要
            print(f"\n{'='*100}")
            print(f"搜索结果汇总 (共 {len(results)} 个视频)")
            print(f"{'='*100}")
            print(f"✅ CSV文件已保存到: {filename}")
            print(f"\n📋 CSV包含以下字段:")
            print(f"  - 标签名字: 匹配的关键词标签")
            print(f"  - 平台: TikTok")
            print(f"  - 封面链接: 视频封面图片链接")
            print(f"  - TikTok网页链接: 可在浏览器中打开的TikTok页面链接")
            print(f"  - 播放数: 视频播放次数")
            print(f"  - 点赞数: 视频点赞数")
            print(f"  - 分享数: 视频分享数")
            print(f"  - 收藏数: 视频收藏数")
            
            return filename
            
        except Exception as e:
            print(f"❌ 保存文件失败: {e}")
            return None


def main():
    """主函数"""
    print("🎵 TikTok 关键词搜索器")
    print("=" * 60)
    print("将搜索以下关键词，筛选点赞数破万的视频:")
    keywords = [
        "AI dance", "funny video", "AI art", "AI template", 
        "AI Design", "photography", "viral AI-generated video", 
        "CCTV", "transition"
    ]
    for i, keyword in enumerate(keywords, 1):
        print(f"  {i}. {keyword}")
    print("=" * 60)
    
    # API密钥
    api_key = "9ab9d4694amsh1cdb56bbc9770a9p1eca1bjsnccf01daa8b1b"
    
    try:
        # 创建搜索器实例
        searcher = TikTokKeywordSearcher(api_key)
        
        # 搜索所有关键词
        results = searcher.search_all_keywords(max_videos_per_keyword=50)
        
        # 保存并显示结果（直接保存为CSV格式）
        saved_file = searcher.save_to_table(results)
        
        if saved_file:
            print(f"\n✅ 搜索完成!")
            print(f"📁 结果文件: {saved_file}")
        else:
            print(f"\n❌ 搜索完成，但保存失败!")
            
    except KeyboardInterrupt:
        print("\n\n👋 程序被用户中断")
    except Exception as e:
        print(f"❌ 程序执行出错: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
