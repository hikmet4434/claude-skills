#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
社交媒体搜索结果汇总脚本
合并Instagram、Pinterest、TikTok三个平台的搜索结果为一个CSV文件

Author: Auto Generated
Date: 2026-01-29
"""

import glob
import csv
from datetime import datetime
import os

def merge_social_media_results(output_dir="."):
    """
    合并三个平台的搜索结果
    
    Args:
        output_dir: 输出目录，默认为当前目录
    
    Returns:
        合并后的文件路径
    """
    
    print("📊 社交媒体搜索结果汇总工具")
    print("=" * 60)
    
    # 查找所有生成的CSV文件
    instagram_files = sorted(glob.glob(os.path.join(output_dir, 'instagram_search_results_*.csv')))
    pinterest_files = sorted(glob.glob(os.path.join(output_dir, 'pinterest_search_results_*.csv')))
    tiktok_files = sorted(glob.glob(os.path.join(output_dir, 'tiktok_search_results_*.csv')))
    
    all_results = []
    stats = {
        'instagram': 0,
        'pinterest': 0,
        'tiktok': 0
    }
    
    # 处理Instagram结果
    if instagram_files:
        latest_file = instagram_files[-1]
        print(f"📸 读取 Instagram 数据: {latest_file}")
        try:
            with open(latest_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    all_results.append({
                        '标签名字': row.get('标签名字', ''),
                        '平台': 'Instagram',
                        '封面链接': row.get('封面链接', ''),
                        '网页链接': row.get('Instagram网页链接', ''),
                        '播放数': row.get('播放数', ''),
                        '点赞数': row.get('点赞数', ''),
                        '评论数': row.get('评论数', '')
                    })
                    stats['instagram'] += 1
            print(f"   ✅ 读取 {stats['instagram']} 条记录")
        except Exception as e:
            print(f"   ❌ 读取失败: {e}")
    else:
        print("📸 Instagram: 未找到结果文件")
    
    # 处理Pinterest结果
    if pinterest_files:
        latest_file = pinterest_files[-1]
        print(f"📌 读取 Pinterest 数据: {latest_file}")
        try:
            with open(latest_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    all_results.append({
                        '标签名字': row.get('标签名字', ''),
                        '平台': 'Pinterest',
                        '封面链接': row.get('封面链接', ''),
                        '网页链接': row.get('Pinterest网页链接', ''),
                        '播放数': '',
                        '点赞数': row.get('点赞数', ''),
                        '评论数': ''
                    })
                    stats['pinterest'] += 1
            print(f"   ✅ 读取 {stats['pinterest']} 条记录")
        except Exception as e:
            print(f"   ❌ 读取失败: {e}")
    else:
        print("📌 Pinterest: 未找到结果文件")
    
    # 处理TikTok结果
    if tiktok_files:
        latest_file = tiktok_files[-1]
        print(f"🎵 读取 TikTok 数据: {latest_file}")
        try:
            with open(latest_file, 'r', encoding='utf-8') as f:
                reader = csv.DictReader(f)
                for row in reader:
                    all_results.append({
                        '标签名字': row.get('标签名字', ''),
                        '平台': 'TikTok',
                        '封面链接': row.get('封面链接', ''),
                        '网页链接': row.get('TikTok网页链接', ''),
                        '播放数': row.get('播放数', ''),
                        '点赞数': row.get('点赞数', ''),
                        '评论数': row.get('分享数', '')  # TikTok没有评论数，用分享数代替
                    })
                    stats['tiktok'] += 1
            print(f"   ✅ 读取 {stats['tiktok']} 条记录")
        except Exception as e:
            print(f"   ❌ 读取失败: {e}")
    else:
        print("🎵 TikTok: 未找到结果文件")
    
    # 保存合并结果
    if not all_results:
        print("\n❌ 没有找到任何搜索结果文件")
        return None
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    output_file = os.path.join(output_dir, f'combined_social_media_results_{timestamp}.csv')
    
    headers = ['标签名字', '平台', '封面链接', '网页链接', '播放数', '点赞数', '评论数']
    
    try:
        with open(output_file, 'w', encoding='utf-8', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=headers)
            writer.writeheader()
            writer.writerows(all_results)
        
        print("\n" + "=" * 60)
        print("📊 汇总统计:")
        print(f"   - Instagram: {stats['instagram']} 条")
        print(f"   - Pinterest: {stats['pinterest']} 条")
        print(f"   - TikTok: {stats['tiktok']} 条")
        print(f"   - 总计: {len(all_results)} 条")
        print("=" * 60)
        print(f"\n✅ 汇总文件已保存: {output_file}")
        
        return output_file
        
    except Exception as e:
        print(f"\n❌ 保存汇总文件失败: {e}")
        return None


def main():
    """主函数"""
    import sys
    
    # 支持命令行参数指定目录
    output_dir = sys.argv[1] if len(sys.argv) > 1 else "."
    
    result_file = merge_social_media_results(output_dir)
    
    if result_file:
        print(f"\n🎉 汇总完成!")
        print(f"📁 文件位置: {os.path.abspath(result_file)}")
    else:
        print("\n⚠️  汇总失败，请检查是否有搜索结果文件")


if __name__ == "__main__":
    main()
