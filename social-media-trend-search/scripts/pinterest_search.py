#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Pinterest关键词搜索脚本
搜索指定关键词的视频，筛选点赞数破万的视频，输出为CSV表格

Author: Auto Generated
Date: 2025-01-27
"""

import http.client
import json
import urllib.parse
from datetime import datetime
import time
import csv


class PinterestKeywordSearcher:
    """Pinterest关键词搜索器"""
    
    def __init__(self, api_key):
        """初始化搜索器"""
        self.api_key = api_key
        self.host = "unofficial-pinterest-api.p.rapidapi.com"
        self.headers = {
            'x-rapidapi-key': self.api_key,
            'x-rapidapi-host': self.host
        }
        
        # 搜索关键词列表
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
            # 新增 AI 视频生成工具相关关键词
            "klingai",
            "kling ai",
            "vidu",
            "vidu ai",
            "jimeng",
            "jimeng ai",
            "即梦"
        ]
        
        # 测试模式：只搜索前N个关键词（设为None则搜索全部）
        self.test_mode_limit = None  # 设为1则只测试第一个关键词
        
        # 最小点赞数阈值
        self.min_likes = 10000
        
        # 调试模式：打印API返回的原始数据结构（第一次请求时打印）
        self.debug_mode = False  # 设为 True 可查看详细的 API 响应结构
    
    def search_videos(self, keyword, num=100, max_retries=3):
        """搜索指定关键词的内容（使用 pins 接口获取更多结果）"""
        
        for retry in range(max_retries):
            try:
                # URL编码关键词
                encoded_keyword = urllib.parse.quote(keyword)
                
                # 创建HTTPS连接
                conn = http.client.HTTPSConnection(self.host)
                
                # 使用 pins 接口获取更多结果（最多600条）
                endpoint = f"/pinterest/pins/relevance?keyword={encoded_keyword}&num={num}"
                
                # 发送GET请求
                conn.request("GET", endpoint, headers=self.headers)
                
                # 获取响应
                response = conn.getresponse()
                data = response.read()
                
                # 关闭连接
                conn.close()
                
                if response.status == 200:
                    json_data = json.loads(data.decode("utf-8"))
                    
                    # 解析数据
                    if isinstance(json_data, dict):
                        for key in ['data', 'videos', 'results', 'items', 'pins']:
                            if key in json_data:
                                return json_data[key] if isinstance(json_data[key], list) else []
                        return []
                    elif isinstance(json_data, list):
                        return json_data
                    else:
                        return []
                else:
                    print(f"API请求失败，状态码: {response.status}")
                    error_msg = data.decode('utf-8')[:200]
                    print(f"错误信息: {error_msg}")
                    
                    # 如果是 502 错误，等待后重试
                    if response.status == 502 and retry < max_retries - 1:
                        wait_time = (retry + 1) * 3
                        print(f"  等待 {wait_time} 秒后重试 ({retry + 1}/{max_retries})...")
                        time.sleep(wait_time)
                        continue
                    return []
                    
            except Exception as e:
                print(f"搜索关键词 '{keyword}' 时出错: {e}")
                if retry < max_retries - 1:
                    wait_time = (retry + 1) * 2
                    print(f"  等待 {wait_time} 秒后重试 ({retry + 1}/{max_retries})...")
                    time.sleep(wait_time)
                    continue
                import traceback
                traceback.print_exc()
                return []
        
        return []
    
    def extract_video_info(self, video, keyword):
        """提取视频关键信息"""
        try:
            # ============================================
            # 点赞/互动数提取 - 使用 reaction_counts['1']
            # ============================================
            like_count = 0
            
            # Pinterest API 返回的互动数在 reaction_counts 字段中
            reaction_counts = video.get('reaction_counts', {})
            if reaction_counts:
                # '1' 键包含保存/点赞数
                like_count = reaction_counts.get('1', 0) or 0
            
            # 只处理互动数超过阈值的视频
            if like_count < self.min_likes:
                return None
            
            # ============================================
            # 封面链接提取 - 使用 images 字段
            # ============================================
            cover_url = ""
            
            images = video.get('images', {})
            if images:
                # 优先获取较大尺寸的图片：orig > 736x > 474x > 236x
                for size in ['orig', '736x', '474x', '236x', '170x']:
                    if size in images:
                        img_info = images[size]
                        if isinstance(img_info, dict):
                            cover_url = img_info.get('url', '')
                        elif isinstance(img_info, str):
                            cover_url = img_info
                        if cover_url:
                            break
            
            # 备选：从 videos 字段获取视频封面
            if not cover_url:
                videos_data = video.get('videos', {})
                if videos_data:
                    video_list = videos_data.get('video_list', {})
                    for vkey in video_list:
                        vinfo = video_list[vkey]
                        if isinstance(vinfo, dict):
                            cover_url = vinfo.get('thumbnail', '') or vinfo.get('cover', '')
                            if cover_url:
                                break
            
            # ============================================
            # Pinterest 网页链接 - 使用 id 构建
            # ============================================
            pin_id = video.get('id', '')
            # 构建标准的 Pinterest Pin 链接
            pinterest_url = f"https://www.pinterest.com/pin/{pin_id}/" if pin_id else ""
            
            # ============================================
            # 标签名字 - 直接使用搜索关键词
            # ============================================
            # 用户需求：标签名字对应的是搜索时使用的关键词
            tag_name = keyword
            
            return {
                'tag': tag_name,  # 搜索关键词
                'platform': 'Pinterest',
                'cover_url': cover_url,
                'pinterest_url': pinterest_url,
                'like_count': like_count,  # 用于筛选
            }
            
        except Exception as e:
            print(f"提取视频信息时出错: {e}")
            import traceback
            traceback.print_exc()
            return None
    
    def search_all_keywords(self, max_videos_per_keyword=100):
        """搜索所有关键词"""
        all_results = []
        seen_ids = set()  # 用于去重
        missing_fields_report = {
            'like_count': 0,
            'cover_url': 0,
            'pinterest_url': 0
        }
        total_videos = 0
        
        keywords_to_search = self.keywords
        if self.test_mode_limit:
            keywords_to_search = self.keywords[:self.test_mode_limit]
        
        for keyword in keywords_to_search:
            print(f"\n{'='*60}")
            print(f"正在搜索关键词: {keyword}")
            print(f"{'='*60}")
            
            keyword_results = []
            
            # Pinterest API 支持一次获取最多600条
            videos = self.search_videos(keyword, num=min(max_videos_per_keyword, 600))
            
            if not videos:
                print("未获取到视频")
                continue
            
            print(f"获取到 {len(videos)} 个视频，筛选中...")
            total_videos += len(videos)
            
            # 处理每个视频
            for video in videos:
                # 去重：检查是否已处理过该 ID
                video_id = video.get('id', '')
                if video_id in seen_ids:
                    continue
                seen_ids.add(video_id)
                
                video_info = self.extract_video_info(video, keyword)
                if video_info:
                    # 统计缺失字段
                    if not video_info.get('cover_url'):
                        missing_fields_report['cover_url'] += 1
                    if not video_info.get('pinterest_url'):
                        missing_fields_report['pinterest_url'] += 1
                    
                    keyword_results.append(video_info)
            
            print(f"✅ 关键词 '{keyword}' 完成，找到 {len(keyword_results)} 个符合条件的视频")
            all_results.extend(keyword_results)
            
            # 关键词之间添加延迟
            if keyword != keywords_to_search[-1]:
                time.sleep(2)  # 增加延迟避免 502 错误
        
        # 打印缺失字段报告
        print(f"\n{'='*60}")
        print("📊 字段提取报告:")
        print(f"{'='*60}")
        print(f"总共检索视频数: {total_videos}")
        print(f"符合条件(点赞>=10000)的视频数: {len(all_results)}")
        print(f"缺少封面链接的视频: {missing_fields_report['cover_url']}")
        print(f"缺少Pinterest链接的视频: {missing_fields_report['pinterest_url']}")
        
        return all_results
    
    def save_to_csv(self, results, filename=None):
        """保存结果为CSV格式"""
        if not results:
            print("\n❌ 没有找到符合条件的视频")
            return None
        
        # 准备表格数据
        headers = ['标签名字', '平台', '封面链接', 'Pinterest网页链接']
        
        # 保存到文件
        if filename is None:
            timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
            filename = f"pinterest_search_results_{timestamp}.csv"
        
        try:
            with open(filename, 'w', encoding='utf-8', newline='') as f:
                writer = csv.writer(f)
                writer.writerow(headers)
                for result in results:
                    writer.writerow([
                        result['tag'],
                        result['platform'],
                        result['cover_url'],
                        result['pinterest_url']
                    ])
            
            print(f"\n{'='*100}")
            print(f"搜索结果汇总 (共 {len(results)} 个视频)")
            print(f"{'='*100}")
            print(f"✅ CSV文件已保存到: {filename}")
            print(f"\n📋 CSV包含以下字段:")
            print(f"  - 标签名字: 匹配的关键词标签")
            print(f"  - 平台: Pinterest")
            print(f"  - 封面链接: 视频封面图片链接")
            print(f"  - Pinterest网页链接: 可在浏览器中打开的Pinterest页面链接")
            
            return filename
            
        except Exception as e:
            print(f"❌ 保存文件失败: {e}")
            return None


def main():
    """主函数"""
    print("📌 Pinterest 关键词搜索器")
    print("=" * 60)
    print("将搜索以下关键词，筛选点赞/保存数破万的视频:")
    keywords = [
        "AI dance", "funny video", "AI art", "AI template", 
        "AI Design", "photography", "viral AI-generated video", 
        "CCTV", "transition",
        "klingai", "kling ai", "vidu", "vidu ai", 
        "jimeng", "jimeng ai", "即梦"
    ]
    for i, keyword in enumerate(keywords, 1):
        print(f"  {i}. {keyword}")
    print("=" * 60)
    print("\n⚠️ 注意：Pinterest API 不支持地区检索，返回全球搜索结果")
    
    # API密钥
    api_key = "9ab9d4694amsh1cdb56bbc9770a9p1eca1bjsnccf01daa8b1b"
    
    try:
        # 创建搜索器实例
        searcher = PinterestKeywordSearcher(api_key)
        
        # 可以设置测试模式，只搜索第一个关键词
        # searcher.test_mode_limit = 1
        
        # 搜索所有关键词（使用最大数量600）
        results = searcher.search_all_keywords(max_videos_per_keyword=600)
        
        # 保存结果为CSV格式
        saved_file = searcher.save_to_csv(results)
        
        if saved_file:
            print(f"\n✅ 搜索完成!")
            print(f"📁 结果文件: {saved_file}")
        else:
            print(f"\n❌ 搜索完成，但没有找到符合条件的视频或保存失败!")
            
    except KeyboardInterrupt:
        print("\n\n👋 程序被用户中断")
    except Exception as e:
        print(f"❌ 程序执行出错: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    main()
