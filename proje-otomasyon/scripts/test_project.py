#!/usr/bin/env python3
"""
Proje otomatik test scripti
Tüm endpoint'leri ve frontend component'lerini test eder
"""

import requests
import sys
import json
from typing import Dict, List

class ProjectTester:
    def __init__(self, base_url: str):
        self.base_url = base_url
        self.results = {
            'passed': [],
            'failed': [],
            'warnings': []
        }
    
    def test_endpoint(self, method: str, path: str, expected_status: int = 200, 
                     data: Dict = None, headers: Dict = None) -> bool:
        """API endpoint testi"""
        try:
            url = f"{self.base_url}{path}"
            
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)
            else:
                raise ValueError(f"Desteklenmeyen method: {method}")
            
            if response.status_code == expected_status:
                self.results['passed'].append(f"{method} {path} - OK")
                return True
            else:
                self.results['failed'].append(
                    f"{method} {path} - Beklenen: {expected_status}, "
                    f"Alınan: {response.status_code}"
                )
                return False
                
        except requests.exceptions.Timeout:
            self.results['failed'].append(f"{method} {path} - Timeout")
            return False
        except Exception as e:
            self.results['failed'].append(f"{method} {path} - Error: {str(e)}")
            return False
    
    def test_frontend(self) -> bool:
        """Frontend sayfalarını test et"""
        try:
            response = requests.get(self.base_url, timeout=10)
            
            # Status code kontrolü
            if response.status_code != 200:
                self.results['failed'].append(f"Homepage yanıt vermiyor: {response.status_code}")
                return False
            
            # Content-type kontrolü
            content_type = response.headers.get('content-type', '')
            if 'text/html' not in content_type:
                self.results['warnings'].append(f"Homepage HTML değil: {content_type}")
            
            # Temel HTML element kontrolü
            html = response.text.lower()
            required_elements = ['<html', '<body', '<head']
            
            for element in required_elements:
                if element not in html:
                    self.results['warnings'].append(f"HTML'de {element} eksik")
            
            self.results['passed'].append("Frontend - OK")
            return True
            
        except Exception as e:
            self.results['failed'].append(f"Frontend test hatası: {str(e)}")
            return False
    
    def test_error_handling(self) -> bool:
        """Error handling testi"""
        tests = [
            ('GET', '/api/nonexistent', 404),
            ('POST', '/api/test', 400, {'invalid': 'data'}),
            ('GET', '/api/unauthorized', 401),
        ]
        
        passed = 0
        for method, path, expected_status, *data in tests:
            payload = data[0] if data else None
            if self.test_endpoint(method, path, expected_status, payload):
                passed += 1
        
        return passed > 0
    
    def run_all_tests(self, api_endpoints: List[Dict] = None) -> Dict:
        """Tüm testleri çalıştır"""
        print("🧪 Test başlıyor...\n")
        
        # Frontend testi
        print("1️⃣ Frontend testi...")
        self.test_frontend()
        
        # API testleri
        if api_endpoints:
            print("\n2️⃣ API endpoint testleri...")
            for endpoint in api_endpoints:
                method = endpoint.get('method', 'GET')
                path = endpoint.get('path', '/')
                status = endpoint.get('expected_status', 200)
                data = endpoint.get('data')
                
                self.test_endpoint(method, path, status, data)
        
        # Error handling testi
        print("\n3️⃣ Error handling testi...")
        self.test_error_handling()
        
        # Sonuçları yazdır
        print("\n" + "="*60)
        print("📊 TEST SONUÇLARI")
        print("="*60)
        
        if self.results['passed']:
            print(f"\n✅ Başarılı ({len(self.results['passed'])}):")
            for test in self.results['passed']:
                print(f"  ✓ {test}")
        
        if self.results['warnings']:
            print(f"\n⚠️  Uyarılar ({len(self.results['warnings'])}):")
            for warning in self.results['warnings']:
                print(f"  ! {warning}")
        
        if self.results['failed']:
            print(f"\n❌ Başarısız ({len(self.results['failed'])}):")
            for test in self.results['failed']:
                print(f"  ✗ {test}")
        
        # Özet
        total = len(self.results['passed']) + len(self.results['failed'])
        success_rate = (len(self.results['passed']) / total * 100) if total > 0 else 0
        
        print("\n" + "="*60)
        print(f"📈 Başarı Oranı: {success_rate:.1f}% ({len(self.results['passed'])}/{total})")
        print("="*60 + "\n")
        
        return self.results

def main():
    """Ana test fonksiyonu"""
    if len(sys.argv) < 2:
        print("Kullanım: python test_project.py <base_url>")
        print("Örnek: python test_project.py https://myapp.vercel.app")
        sys.exit(1)
    
    base_url = sys.argv[1].rstrip('/')
    
    # Tester oluştur
    tester = ProjectTester(base_url)
    
    # Örnek API endpoints (projeye göre özelleştir)
    api_endpoints = [
        {'method': 'GET', 'path': '/api/health'},
        {'method': 'GET', 'path': '/api/users'},
        {'method': 'POST', 'path': '/api/users', 'data': {'name': 'Test', 'email': 'test@test.com'}},
    ]
    
    # Testleri çalıştır
    results = tester.run_all_tests(api_endpoints)
    
    # Exit code
    sys.exit(0 if not results['failed'] else 1)

if __name__ == "__main__":
    main()
