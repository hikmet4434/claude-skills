#!/usr/bin/env python3
"""
Görev Dağıtıcı
Projeyi analiz edip görevleri farklı ajanlara dağıtır
"""

import json
from typing import Dict, List

class TaskDistributor:
    def __init__(self):
        self.tasks = {
            'flash': [],
            'pro_low': [],
            'pro_high': []
        }
        
        # Anahtar kelimeler
        self.keywords = {
            'flash': [
                'design', 'ui', 'css', 'style', 'layout', 'button',
                'card', 'navbar', 'footer', 'hero', 'icon', 'color'
            ],
            'pro_low': [
                'logic', 'state', 'hook', 'form', 'validation', 'api call',
                'fetch', 'filter', 'search', 'pagination', 'routing', 'event'
            ],
            'pro_high': [
                'database', 'schema', 'backend', 'auth', 'security',
                'api endpoint', 'payment', 'encryption', 'optimization', 'algorithm'
            ]
        }
    
    def analyze_project(self, description: str) -> Dict[str, List[str]]:
        """Proje açıklamasını analiz et ve görevleri dağıt"""
        words = description.lower().split()
        
        # Her ajan için puan hesapla
        scores = {agent: 0 for agent in ['flash', 'pro_low', 'pro_high']}
        
        for word in words:
            for agent, keywords in self.keywords.items():
                if any(keyword in word for keyword in keywords):
                    scores[agent] += 1
        
        # Görev dağılımını belirle
        total = sum(scores.values())
        if total == 0:
            # Default: balanced
            return {
                'flash': ['UI components'],
                'pro_low': ['Frontend logic'],
                'pro_high': ['Backend API']
            }
        
        # Ağırlıklı dağılım
        distribution = {
            agent: (score / total * 100) 
            for agent, score in scores.items()
        }
        
        return self._create_tasks(description, distribution)
    
    def _create_tasks(self, description: str, distribution: Dict[str, float]) -> Dict[str, List[str]]:
        """Dağılıma göre görevleri oluştur"""
        tasks = {
            'flash': [],
            'pro_low': [],
            'pro_high': []
        }
        
        # Flash görevleri (UI)
        if distribution['flash'] > 20:
            tasks['flash'] = [
                'UI component tasarımı',
                'Layout ve styling',
                'Responsive design'
            ]
        
        # Pro Low görevleri (Frontend Logic)
        if distribution['pro_low'] > 20:
            tasks['pro_low'] = [
                'State management',
                'Form handling',
                'API integration (frontend)'
            ]
        
        # Pro High görevleri (Backend)
        if distribution['pro_high'] > 20:
            tasks['pro_high'] = [
                'Database schema',
                'API endpoints',
                'Authentication'
            ]
        
        return tasks
    
    def print_distribution(self, tasks: Dict[str, List[str]]) -> None:
        """Görev dağılımını yazdır"""
        print("\n" + "="*60)
        print("🎯 GÖREV DAĞILIMI")
        print("="*60 + "\n")
        
        for agent, task_list in tasks.items():
            if task_list:
                agent_name = {
                    'flash': '🚀 Gemini 3 Flash',
                    'pro_low': '💡 Gemini 3 Pro Low',
                    'pro_high': '🔥 Gemini 3 Pro High'
                }[agent]
                
                print(f"{agent_name}:")
                for task in task_list:
                    print(f"  • {task}")
                print()
        
        print("="*60 + "\n")

def main():
    import sys
    
    if len(sys.argv) < 2:
        print("Kullanım: python task_distributor.py '<proje_açıklaması>'")
        print("Örnek: python task_distributor.py 'E-commerce sitesi yap'")
        sys.exit(1)
    
    description = sys.argv[1]
    distributor = TaskDistributor()
    
    print(f"📝 Proje: {description}\n")
    tasks = distributor.analyze_project(description)
    distributor.print_distribution(tasks)
    
    # JSON çıktı
    print("📄 JSON Format:")
    print(json.dumps(tasks, indent=2, ensure_ascii=False))

if __name__ == "__main__":
    main()
