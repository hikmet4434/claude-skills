#!/usr/bin/env python3
"""
Paralel Çalıştırıcı
Ajanları eş zamanlı çalıştırır ve sonuçları birleştirir
"""

import concurrent.futures
import time
from typing import Dict, List, Callable

class ParallelExecutor:
    def __init__(self):
        self.results = {}
        self.timings = {}
    
    def execute_agent(self, agent_name: str, tasks: List[str], delay: int = 0) -> Dict:
        """Tek bir ajanın görevlerini çalıştır"""
        print(f"🚀 {agent_name} başladı...")
        start_time = time.time()
        
        # Simüle edilmiş çalıştırma (gerçek implementasyonda API call olacak)
        time.sleep(delay)
        
        results = []
        for task in tasks:
            results.append({
                'task': task,
                'status': 'completed',
                'output': f"{task} tamamlandı"
            })
        
        elapsed = time.time() - start_time
        print(f"✅ {agent_name} tamamlandı ({elapsed:.1f}s)")
        
        return {
            'agent': agent_name,
            'tasks': tasks,
            'results': results,
            'elapsed': elapsed
        }
    
    def run_parallel(self, task_distribution: Dict[str, List[str]]) -> Dict:
        """Tüm ajanları paralel çalıştır"""
        print("\n" + "="*60)
        print("⚡ PARALEL ÇALIŞTIRMA BAŞLIYOR")
        print("="*60 + "\n")
        
        start_time = time.time()
        
        # Simüle edilmiş süreler (gerçekte model yanıt süreleri)
        delays = {
            'flash': 2,      # Flash en hızlı
            'pro_low': 5,    # Pro Low orta
            'pro_high': 10   # Pro High en yavaş
        }
        
        # Paralel çalıştırma
        with concurrent.futures.ThreadPoolExecutor(max_workers=3) as executor:
            futures = {}
            
            for agent, tasks in task_distribution.items():
                if tasks:
                    agent_name = {
                        'flash': '🚀 Gemini 3 Flash',
                        'pro_low': '💡 Gemini 3 Pro Low',
                        'pro_high': '🔥 Gemini 3 Pro High'
                    }[agent]
                    
                    future = executor.submit(
                        self.execute_agent,
                        agent_name,
                        tasks,
                        delays.get(agent, 0)
                    )
                    futures[agent] = future
            
            # Sonuçları topla
            for agent, future in futures.items():
                self.results[agent] = future.result()
        
        total_elapsed = time.time() - start_time
        
        print("\n" + "="*60)
        print("📊 PARALEL ÇALIŞTIRMA TAMAMLANDI")
        print("="*60)
        print(f"\n⏱️  Toplam Süre: {total_elapsed:.1f} saniye\n")
        
        # Sıralı çalışma ile karşılaştırma
        sequential_time = sum(
            self.results[agent]['elapsed'] 
            for agent in self.results
        )
        speedup = sequential_time / total_elapsed if total_elapsed > 0 else 0
        
        print(f"📈 Hız Kazancı: {speedup:.1f}x")
        print(f"   Sıralı çalışma: {sequential_time:.1f}s")
        print(f"   Paralel çalışma: {total_elapsed:.1f}s")
        print(f"   Kazanılan zaman: {sequential_time - total_elapsed:.1f}s\n")
        
        return {
            'results': self.results,
            'total_time': total_elapsed,
            'sequential_time': sequential_time,
            'speedup': speedup
        }
    
    def integrate_results(self) -> Dict:
        """Sonuçları entegre et"""
        print("="*60)
        print("🔗 SONUÇLARI ENTEGRASYONİ")
        print("="*60 + "\n")
        
        integration_order = ['pro_high', 'pro_low', 'flash']
        integrated = []
        
        for agent in integration_order:
            if agent in self.results:
                print(f"✓ {self.results[agent]['agent']} sonuçları entegre edildi")
                integrated.append(self.results[agent])
        
        print("\n✅ Entegrasyon tamamlandı!\n")
        
        return {
            'integrated': integrated,
            'status': 'completed'
        }

def main():
    import sys
    import json
    
    if len(sys.argv) < 2:
        print("Kullanım: python parallel_executor.py '<tasks_json>'")
        print('Örnek: python parallel_executor.py \'{"flash":["UI"],"pro_low":["Logic"],"pro_high":["Backend"]}\'')
        sys.exit(1)
    
    tasks_json = sys.argv[1]
    tasks = json.loads(tasks_json)
    
    executor = ParallelExecutor()
    execution_result = executor.run_parallel(tasks)
    integration_result = executor.integrate_results()
    
    print("="*60)
    print("📄 ÖZET")
    print("="*60)
    print(f"\n✅ Başarı: {len(execution_result['results'])} ajan")
    print(f"⏱️  Süre: {execution_result['total_time']:.1f}s")
    print(f"🚀 Hız: {execution_result['speedup']:.1f}x\n")

if __name__ == "__main__":
    main()
