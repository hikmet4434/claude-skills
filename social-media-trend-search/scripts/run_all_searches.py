#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
社交媒体热门内容并行搜索脚本
并行执行Instagram、Pinterest、TikTok三个平台的搜索，然后合并结果

Author: Auto Generated
Date: 2026-01-29
"""

import subprocess
import os
import sys
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime

# 获取脚本所在目录
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))


def run_script(script_name):
    """
    运行指定的Python脚本
    
    Args:
        script_name: 脚本文件名
    
    Returns:
        (script_name, success, message)
    """
    script_path = os.path.join(SCRIPT_DIR, script_name)
    
    if not os.path.exists(script_path):
        return (script_name, False, f"脚本不存在: {script_path}")
    
    start_time = time.time()
    
    try:
        result = subprocess.run(
            [sys.executable, script_path],
            capture_output=True,
            text=True,
            timeout=600,  # 10分钟超时
            cwd=SCRIPT_DIR  # 在scripts目录下执行
        )
        
        elapsed = time.time() - start_time
        
        if result.returncode == 0:
            return (script_name, True, f"执行成功 ({elapsed:.1f}秒)")
        else:
            error_msg = result.stderr[:500] if result.stderr else "未知错误"
            return (script_name, False, f"执行失败: {error_msg}")
            
    except subprocess.TimeoutExpired:
        return (script_name, False, "执行超时 (>10分钟)")
    except Exception as e:
        return (script_name, False, f"执行出错: {str(e)}")


def main():
    """主函数：并行执行三个搜索脚本"""
    
    print("🚀 社交媒体热门内容并行搜索工具")
    print("=" * 60)
    print(f"⏰ 开始时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 60)
    
    # 要执行的脚本列表
    scripts = [
        "instagram_search.py",
        "pinterest_search.py",
        "tiktok_search.py"
    ]
    
    print("\n📋 将并行执行以下脚本:")
    for i, script in enumerate(scripts, 1):
        print(f"   {i}. {script}")
    
    print("\n⏳ 开始并行搜索...\n")
    
    start_time = time.time()
    results = []
    
    # 并行执行三个脚本
    with ThreadPoolExecutor(max_workers=3) as executor:
        futures = {executor.submit(run_script, script): script for script in scripts}
        
        for future in as_completed(futures):
            script_name, success, message = future.result()
            platform = script_name.replace("_search.py", "").capitalize()
            
            if success:
                print(f"   ✅ {platform}: {message}")
            else:
                print(f"   ❌ {platform}: {message}")
            
            results.append((script_name, success, message))
    
    total_time = time.time() - start_time
    
    print("\n" + "=" * 60)
    print(f"⏱️  总耗时: {total_time:.1f}秒 ({total_time/60:.1f}分钟)")
    print("=" * 60)
    
    # 统计成功/失败
    success_count = sum(1 for _, success, _ in results if success)
    
    if success_count > 0:
        print(f"\n✅ {success_count}/{len(scripts)} 个脚本执行成功")
        
        # 执行合并脚本
        print("\n📊 正在合并搜索结果...")
        merge_script = os.path.join(SCRIPT_DIR, "merge_results.py")
        
        if os.path.exists(merge_script):
            try:
                result = subprocess.run(
                    [sys.executable, merge_script, SCRIPT_DIR],
                    capture_output=True,
                    text=True,
                    cwd=SCRIPT_DIR
                )
                print(result.stdout)
                if result.stderr:
                    print(result.stderr)
            except Exception as e:
                print(f"❌ 合并脚本执行失败: {e}")
        else:
            print("⚠️  合并脚本不存在，跳过合并步骤")
    else:
        print(f"\n❌ 所有脚本执行失败")
    
    print("\n🎉 搜索任务完成!")
    print(f"📁 结果文件位于: {SCRIPT_DIR}")


if __name__ == "__main__":
    main()
