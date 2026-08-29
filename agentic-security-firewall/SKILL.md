---
name: agentic-security-firewall
description: Ajanik ve yapay zeka destekli uygulamalar için 4 kademeli derinlemesine savunma (Defense-in-Depth Agentic Security) güvenlik duvarı mimarisi ve standardı. Semantik girdi korumaları (Prompt Injection & Model Armor/ShieldGemma), BOLA (Broken Object Level Authorization), DLP (PII/Hassas Veri Maskeleme), gVisor/Sandbox kernel izolasyonu, Sıfır Çıkış (Zero-Egress), Metadata Server Koruması, Zero-Trust Agent Kimliği (SPIFFE/mTLS/JWT), Confused Deputy engelleme ve Shift-Left CI/CD Supply Chain Governance kurallarını uygular.
---

# Agentic Security Firewall (4-Kademeli Derinlemesine Savunma)

Bu skill, LLM ve otonom ajan (agentic) iş yüklerini barındıran tüm sistemlerde endüstri standardı **4 Kademeli Derinlemesine Savunma (Defense-in-Depth)** güvenlik duvarını kurmak, denetlemek ve uygulamak için kullanılır.

Geleneksel ağ güvenlik duvarları (WAF / Network Firewall), ajanların çok adımlı planlama, araç çağırma (tool calling) ve harici veri işleme (e-posta, webhook, dosya) dinamiklerini koruyamaz. Bu skill, deterministik güvenlik sınırları oluşturur.

---

## 🏛️ 4 KATMANLI MİMARİ ŞEMASI

```
[ Gelen Veri: Kullanıcı / E-posta / Webhook / Dosya ]
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 1. KATMAN: Semantik Giriş & Guardrail (Input Firewall)      │
│  - Model Armor / ShieldGemma (Prompt Injection & Jailbreak) │
│  - DLP Maskeleme (PII: T.C., Kart, Telefon, API Key)        │
│  - Pre-Planning & Post-Planning BOLA Doğrulaması            │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 2. KATMAN: Çalışma Zamanı & Sandbox İzolasyonu (Kernel)     │
│  - gVisor / Cloud Run Sandbox Launcher / microVM             │
│  - Cloud Metadata Server (169.254.169.254) Bloklama         │
│  - Sıfır Çıkış (Zero-Egress) / Ağ Sızdırma Koruması         │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 3. KATMAN: Zero-Trust & Ajan Kimlik Doğrulaması (Gateway)    │
│  - SPIFFE / mTLS / Kriptografik Ajan Token (JWT)            │
│  - Audience, Freshness (Süre), İmza & Aktör Doğrulaması     │
│  - Confused Deputy Saldırı Engeli                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ 4. KATMAN: Tedarik Zinciri & CI/CD Governance (Shift-Left)  │
│  - Gemini Code Assist / SAST PR Analizi (Secret, IaC)       │
│  - Binary Authorization & İmzalı İmaj Zorunluluğu           │
│  - Runtime Security Command Center (SCC) Anomali Tespiti    │
└─────────────────────────────────────────────────────────────┘
```

---

## 🛡️ KATMAN 1: Semantik Giriş, DLP ve BOLA Koruması

### 1.1. Semantik Giriş Filtresi (Prompt Injection & Jailbreak Engeli)
* **Kural:** LLM planlama döngüsüne giren HER GİRDİ (yalnızca kullanıcı mesajı değil; okunan e-postalar, webhook yükleri, dosya içerikleri) planlayıcıya iletilmeden önce taranmalıdır.
* **Uygulama:** Model Armor şablonu veya ShieldGemma güvenlik sınıflandırıcısı ile girdi kontrol edilir.

```python
# Python Örneği: Semantik Giriş Kontrolü
def sanitize_input_guardrail(input_text: str) -> bool:
    # 1. Zararlı URL ve Prompt Injection Taraması (Model Armor / ShieldGemma API)
    decision = model_armor_client.sanitize(input_text)
    if decision.has_prompt_injection or decision.is_malicious:
        raise SecurityException("Prompt Injection veya Zararlı İçerik Tespit Edildi!")
    return True
```

### 1.2. BOLA (Broken Object Level Authorization) Koruması
* **Kural:** LLM bir araç çağırdığında (örn. `get_account(account_id=4471)`), talep eden kullanıcının/aktörün (`caller_id=10001`) bu nesneye sahip olduğu kod seviyesinde doğrulanmadan işlem yapılmaz.
* **Uygulama:**

```python
def get_account_tool(caller_identity: str, requested_account_id: str):
    # Deterministik Sahiplik Kontrolü (BOLA Guard)
    account = db.get_account(requested_account_id)
    if account.owner_id != caller_identity:
        raise AuthorizationException(f"BOLA İhlali: {caller_identity} hesabı {requested_account_id} nesnesine erişemez.")
    return account.data
```

### 1.3. DLP (Data Loss Prevention / PII Maskeleme)
* **Kural:** Ajanın ürettiği veya işlediği veriler dışarı aktarılmadan önce T.C. Kimlik, Kredi Kartı, Telefon ve Özel Anahtarlar maskelenmelidir.

```python
import re

def dlp_redact(text: str) -> str:
    # Kredi Kartı Maskeleme
    text = re.sub(r"\b(?:\d[ -]*?){13,16}\b", "[REDACTED_CARD]", text)
    # T.C. Kimlik No Maskeleme (11 haneli)
    text = re.sub(r"\b[1-9][0-9]{10}\b", "[REDACTED_TCKN]", text)
    # API Secret Maskeleme
    text = re.sub(r"(AIza[0-9A-Za-z-_]{35}|sk-[a-zA-Z0-9]{32,})", "[REDACTED_KEY]", text)
    return text
```

---

## 🔒 KATMAN 2: Çalışma Zamanı & Sandbox İzolasyonu

### 2.1. Kernel ve Süreç İzolasyonu (gVisor)
* Ajanın kod yürüttüğü konteynerler doğrudan ana çekirdeği (host kernel) kullanmamalıdır.
* **Google Cloud Run:** `--execution-environment=gen2` ve Sandbox Launcher aktif edilmelidir.
* **Docker / Coolify:** `gVisor (runsc)` runtime kullanılmalıdır.

```dockerfile
# Güvenli Dockerfile Standardı
FROM python:3.11-slim
WORKDIR /app
# Root olmayan kullanıcı ile çalıştırma
RUN useradd -m -u 10001 agentuser
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY --chown=agentuser:agentuser . .
USER agentuser
EXPOSE 8080
CMD ["python", "main.py"]
```

### 2.2. Bulut Meta Veri Sunucusunu Engelleme (SSRF Önleme)
* Saldırganlar ajan üzerinden SSRF ile `http://169.254.169.254` adresine ulaşıp IAM token çalmaya çalışır.
* **Kural:** Meta veri uç noktasına tüm giden istekler iptables/ağ seviyesinde DROP edilmelidir.

```bash
# Sandbox İçerisinde Metadata Server ve Zararlı Çıkış Engeli
iptables -A OUTPUT -d 169.254.169.254 -j DROP
```

### 2.3. Sıfır Çıkış (Zero-Egress) Ağ Politikası
* Kod çalıştıran sandbox ortamının varsayılan olarak genel internete çıkışı kapalı (Zero-Egress) olmalıdır. Sadece izinli endpoint listesine (allowlist) erişebilir.

---

## 🔑 KATMAN 3: Zero-Trust & Ajan Kimlik Doğrulaması (Agent Gateway)

### 3.1. Ağ Erişimi Yetki Değildir
* Aynı VPC veya iç ağda olmak işlem yetkisi sağlamaz. Her ajan ve servis kriptografik kimlik (SPIFFE ID veya İmzalı JWT) ile doğrulanmalıdır.

### 3.2. Agent Gateway Doğrulama Standartları
Her kritik araç çağrısında (örn. para transferi, veri silme, e-posta gönderme) aşağıdaki 4 unsur kontrol edilir:
1. **İmza Geçerliliği:** Token güvenilir bir Identity Provider (IdP) tarafından imzalanmış mı?
2. **Hedef Kitle (Audience - `aud`):** Token bu spesifik ajan/servis için mi üretilmiş?
3. **Zamansal Tazelik (Freshness - `exp` / `iat`):** Token süresi dolmuş veya replay saldırısı mı?
4. **Confused Deputy Kontrolü:** İstek zincirindeki orijinal kullanıcı ile aracı ajanın yetkileri uyuşuyor mu?

```python
# Agent Gateway Token Doğrulama Şablonu
import jwt
import time

def verify_agent_token(token: str, expected_audience: str) -> dict:
    try:
        payload = jwt.decode(
            token,
            PUBLIC_KEY,
            algorithms=["RS256"],
            audience=expected_audience,
            options={"require": ["exp", "aud", "sub", "iat"]}
        )
        if time.time() - payload["iat"] > 300: # 5 dakikadan eski token reddedilir
            raise SecurityException("Token bayat (Freshness check failed)")
        return payload
    except jwt.PyJWTError as e:
        raise SecurityException(f"Geçersiz Ajan Kimliği: {str(e)}")
```

---

## 📦 KATMAN 4: Tedarik Zinciri & Dağıtım Öncesi Denetim (Shift-Left)

### 4.1. CI/CD Pre-Commit & Pre-Merge Güvenlik Taraması
* Hardcoded API anahtarı, şifre veya açık firewall kuralları içeren PR'lar build pipeline'ında otomatik reddedilir.
* **GitHub Actions Örneği:**

```yaml
name: Agentic Security Guard CI
on: [pull_request]

jobs:
  security-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Scan Secrets & Hardcoded Keys
        run: |
          if grep -rE "(AIza[0-9A-Za-z-_]{35}|sk-[a-zA-Z0-9]{32,}|BEGIN PRIVATE KEY)" .; then
            echo "Kritik Güvenlik İhlali: Hardcoded Secret Tespit Edildi!" && exit 1
          fi
      - name: IaC Firewall & Security Policy Check
        run: |
          if grep -r "0.0.0.0/0" ./terraform/ ./infra/ 2>/dev/null; then
            echo "Uyarı: Açık Güvenlik Duvarı Politikası (0.0.0.0/0) Tespit Edildi!" && exit 1
          fi
```

### 4.2. Binary Authorization & İmzalı İmajlar
* Production ortamına (Coolify / Cloud Run / Kubernetes) yalnızca CI hattında testlerden geçip kriptografik olarak imzalanmış konteyner imajları deploy edilir.

---

## 🚀 PROJE ENTEGRASYON KILAVUZU (Nasıl Kullanılır?)

Yeni veya mevcut bir projeye bu güvenlik standardı eklenirken:
1. **Giriş Katmanı:** API/Webhook router'ına `sanitize_input_guardrail` ve `dlp_redact` middleware ekleyin.
2. **Yetkilendirme Katmanı:** Tüm veritabanı ve nesne sorgularına `BOLA Guard` ekleyin.
3. **Altyapı Katmanı:** `Dockerfile`'ı non-root kullanıcı ve gVisor uyumlu hale getirin, metadata erişimini engelleyin.
4. **Kimlik Katmanı:** Agent-to-Agent ve Agent-to-Tool çağrılarına JWT/SPIFFE doğrulama katmanı koyun.
5. **CI/CD Katmanı:** GitHub Actions güvenlik tarayıcısını `.github/workflows/security.yml` olarak projeye ekleyin.
