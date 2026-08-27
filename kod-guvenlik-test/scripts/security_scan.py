#!/usr/bin/env python3
"""
Otomatik güvenlik tarayıcı
Kod içinde güvenlik açıklarını tespit eder
"""

import os
import re
import sys
from pathlib import Path
from typing import List, Dict

class SecurityScanner:
    def __init__(self):
        self.issues = {
            'critical': [],
            'high': [],
            'medium': [],
            'low': []
        }
        
        # Güvenlik pattern'leri
        self.patterns = {
            'sql_injection': [
                (r'execute\s*\(\s*["\']SELECT.*' + r'\$\{|\+', 'SQL Injection riski: String concatenation'),
                (r'query\s*=\s*["\']SELECT.*\+', 'SQL Injection riski: String concatenation'),
                (r'\.query\s*\(["\'].*\$\{', 'SQL Injection riski: Template literal'),
            ],
            'xss': [
                (r'innerHTML\s*=', 'XSS riski: innerHTML kullanımı'),
                (r'dangerouslySetInnerHTML', 'XSS riski: dangerouslySetInnerHTML'),
                (r'document\.write', 'XSS riski: document.write'),
            ],
            'hardcoded_secrets': [
                (r'password\s*=\s*["\'][^"\']{8,}["\']', 'Hardcoded password'),
                (r'api[_-]?key\s*=\s*["\'][^"\']+["\']', 'Hardcoded API key'),
                (r'secret\s*=\s*["\'][^"\']+["\']', 'Hardcoded secret'),
                (r'token\s*=\s*["\'][^"\']{20,}["\']', 'Hardcoded token'),
            ],
            'insecure_crypto': [
                (r'md5|sha1', 'Zayıf hash algoritması (MD5/SHA1)'),
                (r'Math\.random', 'Kriptografik olmayan random kullanımı'),
            ],
            'insecure_cors': [
                (r'Access-Control-Allow-Origin:\s*\*', 'CORS tüm origin\'lere açık'),
                (r'cors\(\s*\)', 'CORS yapılandırması eksik'),
            ]
        }
    
    def scan_file(self, filepath: str) -> None:
        """Tek dosyayı tara"""
        try:
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
                lines = content.split('\n')
                
                for category, patterns in self.patterns.items():
                    for pattern, description in patterns:
                        matches = re.finditer(pattern, content, re.IGNORECASE)
                        for match in matches:
                            line_num = content[:match.start()].count('\n') + 1
                            line_content = lines[line_num - 1].strip()
                            
                            issue = {
                                'file': filepath,
                                'line': line_num,
                                'code': line_content,
                                'description': description,
                                'category': category
                            }
                            
                            # Severity belirleme
                            if category in ['sql_injection', 'hardcoded_secrets']:
                                self.issues['critical'].append(issue)
                            elif category in ['xss', 'insecure_cors']:
                                self.issues['high'].append(issue)
                            elif category in ['insecure_crypto']:
                                self.issues['medium'].append(issue)
                            else:
                                self.issues['low'].append(issue)
        
        except Exception as e:
            print(f"⚠️  {filepath} okunamadı: {e}")
    
    def scan_directory(self, directory: str) -> None:
        """Dizini tara"""
        extensions = ['.js', '.jsx', '.ts', '.tsx', '.py', '.java']
        exclude_dirs = ['node_modules', '.git', 'dist', 'build', '.next']
        
        for root, dirs, files in os.walk(directory):
            # Excluded dizinleri atla
            dirs[:] = [d for d in dirs if d not in exclude_dirs]
            
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    filepath = os.path.join(root, file)
                    self.scan_file(filepath)
    
    def print_report(self) -> None:
        """Tarama raporunu yazdır"""
        print("\n" + "="*70)
        print("🛡️  GÜVENLİK TARAMASI RAPORU")
        print("="*70 + "\n")
        
        total = sum(len(issues) for issues in self.issues.values())
        
        if total == 0:
            print("✅ Güvenlik sorunu bulunamadı!\n")
            return
        
        # Kritik sorunlar
        if self.issues['critical']:
            print(f"🚨 KRİTİK SORUNLAR ({len(self.issues['critical'])}):")
            print("-" * 70)
            for issue in self.issues['critical']:
                print(f"\n📍 {issue['file']}:{issue['line']}")
                print(f"   ❌ {issue['description']}")
                print(f"   💻 {issue['code']}")
        
        # Yüksek öncelikli sorunlar
        if self.issues['high']:
            print(f"\n⚠️  YÜKSEK ÖNCELİKLİ SORUNLAR ({len(self.issues['high'])}):")
            print("-" * 70)
            for issue in self.issues['high']:
                print(f"\n📍 {issue['file']}:{issue['line']}")
                print(f"   ⚠️  {issue['description']}")
                print(f"   💻 {issue['code']}")
        
        # Orta öncelikli sorunlar
        if self.issues['medium']:
            print(f"\n📢 ORTA ÖNCELİKLİ SORUNLAR ({len(self.issues['medium'])}):")
            print("-" * 70)
            for issue in self.issues['medium']:
                print(f"\n📍 {issue['file']}:{issue['line']}")
                print(f"   ⚠️  {issue['description']}")
        
        # Düşük öncelikli sorunlar
        if self.issues['low']:
            print(f"\nℹ️  DÜŞÜK ÖNCELİKLİ SORUNLAR ({len(self.issues['low'])}):")
            print("-" * 70)
            for issue in self.issues['low']:
                print(f"  • {issue['file']}:{issue['line']} - {issue['description']}")
        
        # Özet
        print("\n" + "="*70)
        print("📊 ÖZET")
        print("="*70)
        print(f"🚨 Kritik: {len(self.issues['critical'])}")
        print(f"⚠️  Yüksek: {len(self.issues['high'])}")
        print(f"📢 Orta: {len(self.issues['medium'])}")
        print(f"ℹ️  Düşük: {len(self.issues['low'])}")
        print(f"📈 Toplam: {total}")
        print("="*70 + "\n")

def main():
    if len(sys.argv) < 2:
        print("Kullanım: python security_scan.py <dizin_veya_dosya>")
        sys.exit(1)
    
    path = sys.argv[1]
    scanner = SecurityScanner()
    
    print(f"🔍 Tarama başlıyor: {path}\n")
    
    if os.path.isfile(path):
        scanner.scan_file(path)
    elif os.path.isdir(path):
        scanner.scan_directory(path)
    else:
        print(f"❌ Geçersiz path: {path}")
        sys.exit(1)
    
    scanner.print_report()
    
    # Exit code
    has_critical = len(scanner.issues['critical']) > 0
    sys.exit(1 if has_critical else 0)

if __name__ == "__main__":
    main()
