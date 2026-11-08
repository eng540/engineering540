#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
وكيل الإنتاج البصري — إبداعات هندسية (Engineering 540)
========================================================
وكيل ذكاء اصطناعي يتولّى دورة إنتاج المنشور البصري كاملة:
    موضوع من القاعدة → تخطيط فني → توليد صورة → تركيب عربي → مراجعة جودة → ملف PNG

الاستخدام:
    python ai_visual_agent.py --check                    # فحص حالة المزوّدين
    python ai_visual_agent.py --topic P1-002             # إنتاج منشور واحد
    python ai_visual_agent.py --topic P1-002 --provider fal
    python ai_visual_agent.py --batch plan --limit 3     # إنتاج من خطة اليوم

المزوّدون (مرتّبون بحسب جودة النص العربي داخل الصورة):
    1. openrouter  — google/gemini-3-pro-image  → بوستر كامل بالنص العربي
    2. google      — gemini-3-pro-image          → بوستر كامل بالنص العربي
    3. fal         — flux-pro/v1.1-ultra         → صورة بصرية فقط + تركيب نص عربي
"""
import argparse, base64, csv, json, os, re, sys, time, urllib.request, urllib.error
from datetime import datetime

BASE = "/root/DSH_Projects/engineering540_strategy"
CONTENT = f"{BASE}/content"
MASTER = f"{BASE}/topics/Engineering540_Topics_Master.csv"
ASSETS = f"{BASE}/assets"
CREDS = "/root/.dsh/.credentials.yaml"
FONT = "/tmp/NotoSansAr.ttf"
FONT_URL = ("https://github.com/google/fonts/raw/main/ofl/notosansarabic/"
            "NotoSansArabic%5Bwdth%2Cwght%5D.ttf")

C = {"navy": "#13203A", "navy2": "#1C2E4A", "orange": "#E87722",
     "white": "#FFFFFF", "light": "#FFD9B3", "muted": "#C3CEDE"}
BANNED = ["مضمون", "ربح مضمون", "استثمار آمن", "استثمار مضمون", "سوف يرتفع",
          "فرصة ذهبية", "عائد مضمون", "ضمان الربح", "لا خسارة"]


# ═══════════════════════ 1) المفاتيح والمزوّدون ═══════════════════════
def load_keys():
    keys = {}
    try:
        raw = open(CREDS, encoding="utf-8").read()
        for name in ["FAL_API_KEY", "GOOGLE_AI_STUDIO_API_KEY",
                     "OPENROUTER_API_KEY", "NVIDIA_API_KEY", "GROQ_API_KEY"]:
            m = re.search(name + r":\s*(\S+)", raw)
            if m:
                keys[name] = m.group(1)
    except Exception:
        pass
    for k in list(keys):
        if os.environ.get(k):
            keys[k] = os.environ[k]
    return keys


def _post(url, body, headers, timeout=240):
    req = urllib.request.Request(url, data=json.dumps(body).encode(), headers=headers)
    return json.load(urllib.request.urlopen(req, timeout=timeout))


def _err(e):
    if isinstance(e, urllib.error.HTTPError):
        try:
            d = json.loads(e.read())
            return f"HTTP {e.code} — {d.get('error', {}).get('message', d) if isinstance(d, dict) else d}"[:180]
        except Exception:
            return f"HTTP {e.code}"
    return str(e)[:180]


def gen_openrouter(keys, prompt, model="google/gemini-3-pro-image"):
    k = keys.get("OPENROUTER_API_KEY")
    if not k:
        return None, "لا مفتاح"
    try:
        r = _post("https://openrouter.ai/api/v1/chat/completions",
                  {"model": model, "messages": [{"role": "user", "content": prompt}],
                   "modalities": ["image", "text"]},
                  {"Content-Type": "application/json", "Authorization": f"Bearer {k}",
                   "HTTP-Referer": "https://eng540.github.io", "X-Title": "E540 Visual Agent"})
        imgs = r["choices"][0]["message"].get("images") or []
        if not imgs:
            return None, "لم تُرجَع صورة"
        url = imgs[0]["image_url"]["url"]
        if url.startswith("data:"):
            return base64.b64decode(url.split(",", 1)[1]), None
        return urllib.request.urlopen(url, timeout=120).read(), None
    except Exception as e:
        return None, _err(e)


def gen_google(keys, prompt, model="gemini-3-pro-image"):
    k = keys.get("GOOGLE_AI_STUDIO_API_KEY")
    if not k:
        return None, "لا مفتاح"
    try:
        r = _post(f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={k}",
                  {"contents": [{"parts": [{"text": prompt}]}]},
                  {"Content-Type": "application/json"})
        for p in r["candidates"][0]["content"]["parts"]:
            if "inlineData" in p:
                return base64.b64decode(p["inlineData"]["data"]), None
        return None, "لم تُرجَع صورة"
    except Exception as e:
        return None, _err(e)


def gen_fal(keys, prompt, model="fal-ai/flux-pro/v1.1-ultra", aspect="4:5"):
    k = keys.get("FAL_API_KEY")
    if not k:
        return None, "لا مفتاح"
    try:
        r = _post(f"https://fal.run/{model}",
                  {"prompt": prompt, "aspect_ratio": aspect, "output_format": "png"},
                  {"Content-Type": "application/json", "Authorization": f"Key {k}"}, timeout=180)
        imgs = r.get("images") or ([r["image"]] if "image" in r else [])
        if not imgs:
            return None, "لم تُرجَع صورة"
        return urllib.request.urlopen(imgs[0]["url"], timeout=120).read(), None
    except Exception as e:
        return None, _err(e)


PROVIDERS = [
    # (اسم, الدالة, يرسم النص العربي؟, وصف)
    ("openrouter", lambda k, p: gen_openrouter(k, p), True, "Gemini 3 Pro Image — بوستر كامل"),
    ("google", lambda k, p: gen_google(k, p), True, "Gemini 3 Pro Image — بوستر كامل"),
    ("fal", lambda k, p: gen_fal(k, p), False, "FLUX Pro Ultra — صورة فقط + تركيب"),
]


def check_providers(keys, verbose=True):
    """يفحص كل مزوّد بطلب حقيقي صغير ويعيد الحالة."""
    status = {}
    for name, fn, __, desc in PROVIDERS:
        data, err = fn(keys, "minimal navy blue square, no text")
        status[name] = {"ok": bool(data), "error": err, "desc": desc,
                        "bytes": len(data) if data else 0, "draws_arabic": __}
        if verbose:
            mark = "✔ يعمل" if data else "✘ متوقّف"
            print(f"  {name:12s} {mark:9s} {desc}")
            if err:
                print(f"               السبب: {err}")
    return status


# ═══════════════════════ 2) مدير فني — يقرأ الموضوع ويصوغ الموجز ═══════════════════════
PILLAR_VISUAL = {
    "P1": "concrete structure, formwork, reinforcement bars, foundation layers, surveying instruments",
    "P2": "construction site planning, project schedule charts, cost breakdown, contract documents, cranes",
    "P3": "real estate master plan, land plots grid, city skyline under construction, property documents",
    "P4": "digital twin, BIM model wireframe, AI neural grid over a building, data dashboard",
    "P5": "business handshake silhouette, growth chart, office towers, opportunity map",
    "P6": "engineering leader silhouette, blueprint desk, drafting tools, podium",
}
PILLAR_AR = {"P1": "الهندسة المدنية", "P2": "المقاولات وإدارة المشاريع", "P3": "التطوير العقاري",
             "P4": "التقنية والذكاء الاصطناعي", "P5": "الفرص والأعمال", "P6": "الهوية المهنية"}


def read_topic(tid):
    for p in range(1, 7):
        f = os.path.join(CONTENT, f"P{p}", f"{tid}.md")
        if os.path.exists(f):
            return open(f, encoding="utf-8").read()
    return None


def parse_topic(md):
    title = ""
    m = re.search(r"العنوان\s*:\s*(.+)", md)
    if m:
        title = m.group(1).strip()
    if not title:
        h = re.search(r"^#\s+(.+)", md, re.M)
        title = h.group(1).strip() if h else ""
    raw = re.sub(r"^---[\s\S]*?---\s*", "", md).strip()
    body = re.sub(r"\*\*|^#+\s*", "", raw, flags=re.M).strip()
    lines = [l.strip() for l in body.split("\n") if len(l.strip()) > 30]
    key = lines[1] if len(lines) > 1 else (lines[0] if lines else "")
    slides = []
    after, at = [], []
    for m2 in re.finditer(r"الشريحة\s*(\d+)\s*[:：]", raw):
        at.append(m2.start()); after.append(m2.end())
    for i, s in enumerate(after):
        seg = raw[s:(at[i + 1] if i + 1 < len(at) else len(raw))]
        seg = re.sub(r"\s+", " ", seg).strip()
        if len(seg) > 20:
            slides.append(re.sub(r"\*\*", "", seg))
    if not slides:
        # مقالات بأقسام (##): كل قسم = بطاقة/شريحة
        for s in re.split(r"\n(?=#{2,3}\s)", raw)[1:]:
            t = re.sub(r"\s+", " ", re.sub(r"^#+\s*", "", s)).strip()
            if len(t) > 40:
                slides.append(t[:240])
        slides = slides[:10]
    return title, key, slides, body


def art_brief(tid, title, key, body, pillar):
    """الموجز الفني الموجّه لنموذج الصور."""
    visual = PILLAR_VISUAL.get(pillar, "civil engineering")
    return (
        f"Professional Arabic social-media poster for a Saudi civil-engineering channel, "
        f"vertical 4:5 format, flat modern editorial design.\n"
        f"BACKGROUND: deep navy #{C['navy'][1:]} with subtle #{C['navy2'][1:]} gradient, "
        f"thin engineering grid lines, generous empty space.\n"
        f"VISUAL ELEMENTS (illustration only, technical line-art style): {visual}. "
        f"Accent colour orange #{C['orange'][1:]} used sparingly on one geometric shape and thin rules.\n"
        f"TYPOGRAPHY: bold modern Arabic sans-serif (Cairo-like). Headline in white, "
        f"second line in orange.\n"
        f"HEADLINE TEXT (render exactly, right aligned, no spelling changes):\n«{title}»\n"
        f"SUB-LINE (smaller, muted): «{key[:110]}»\n"
        f"FOOTER: small text «إبداعات هندسية · Engineering 540».\n"
        f"RULES: no human faces, no photographs, no distorted or invented Arabic letters, "
        f"no extra paragraphs, no watermarks, no financial promises. Clean, credible, editorial."
    )


def compose_prompt_flux(tid, title, key, pillar):
    """موجز لمزوّد لا يرسم العربية: صورة بصرية فقط بلا نص."""
    visual = PILLAR_VISUAL.get(pillar, "civil engineering")
    return (
        f"Vertical 4:5 editorial background for an engineering publication. "
        f"Deep navy #{C['navy'][1:]} gradient, subtle thin grid, "
        f"flat vector technical line-art of {visual}, "
        f"sparing orange #{C['orange'][1:]} accents, large calm empty area for typography, "
        f"professional, minimal, no text, no letters, no words, no human faces."
    )


# ═══════════════════════ 3) التركيب العربي الاحترافي ═══════════════════════
def ensure_font():
    if not os.path.exists(FONT):
        os.makedirs("/tmp", exist_ok=True)
        urllib.request.urlretrieve(FONT_URL, FONT)
    return FONT


def compose(topic_title, key_line, image_bytes, out_path,
            brand="إبداعات هندسية · Engineering 540",
            footer="صناعة الأثر لا مجرد الإنجاز", source=None, page=None):
    """يبني المنشور النهائي: طبقة بصرية + طبقة نصية عربية احترافية."""
    from PIL import Image, ImageDraw, ImageFont, ImageFilter
    import arabic_reshaper
    from bidi.algorithm import get_display
    ensure_font()

    W, H = 1080, 1350
    def ar(t):
        return get_display(arabic_reshaper.reshape(t))
    def F(sz, w=600):
        f = ImageFont.truetype(FONT, sz)
        try:
            f.set_variation_by_axes([100, w])
        except Exception:
            try:
                f.set_variation_by_name(str(w))
            except Exception:
                pass
        return f

    # الخلفية
    if image_bytes:
        import io
        bg = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        # قصّ لتغطية الإطار 4:5
        tr = W / H
        r = bg.width / bg.height
        if r > tr:
            nw = int(bg.height * tr); bg = bg.crop(((bg.width - nw) // 2, 0, (bg.width - nw) // 2 + nw, bg.height))
        else:
            nh = int(bg.width / tr); bg = bg.crop((0, (bg.height - nh) // 2, bg.width, (bg.height - nh) // 2 + nh))
        bg = bg.resize((W, H), Image.LANCZOS)
        bg = bg.filter(ImageFilter.GaussianBlur(0.4))
    else:
        bg = Image.new("RGB", (W, H), C["navy"])
        d0 = ImageDraw.Draw(bg)
        for y in range(H):
            t = y / H
            d0.line([(0, y), (W, y)], fill=(
                int(19 + (28 - 19) * t), int(32 + (46 - 32) * t), int(58 + (74 - 58) * t)))

    img = bg.convert("RGBA")
    ov = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(ov)
    # ستارة علوية وسفلية لضمان قراءة النص
    for y in range(0, 660):
        a = int(232 * (1 - y / 660))
        od.rectangle([0, y, W, y + 1], fill=(19, 32, 58, a))
    for y in range(H - 620, H):
        a = int(228 * ((y - (H - 620)) / 620))
        od.rectangle([0, y, W, y + 1], fill=(19, 32, 58, a))
    img = Image.alpha_composite(img, ov)

    d = ImageDraw.Draw(img)
    M = 84  # الهامش

    # شبكة خفيفة أعلى المنطقة النصية
    for x in range(0, W, 72):
        d.line([(x, 0), (x, H)], fill=(255, 255, 255, 8))
    # شريط علوي + هوية
    d.rectangle([0, 0, W, 8], fill=C["orange"])
    d.text((W - M, 58), ar(brand), font=F(28, 700), fill=C["light"], anchor="ra")
    # شارة الصفحة
    if page:
        d.ellipse([M - 6, 40, M + 92, 138], fill=C["orange"])
        d.text((M + 43, 89), str(page), font=F(44, 900), fill="#FFFFFF", anchor="mm")

    # العنوان الرئيسي
    y = 690
    words = topic_title.split()
    lines, cur = [], ""
    for w in words:
        t = (cur + " " + w).strip()
        if len(t) <= 26:
            cur = t
        else:
            lines.append(cur); cur = w
    if cur:
        lines.append(cur)
    lines = lines[:3]
    for ln in lines:
        y += 96
        d.text((W - M, y), ar(ln), font=F(74, 800), fill="#FFFFFF", anchor="ra")
    # قاعدة برتقالية
    d.rectangle([W - M - 170, y + 34, W - M, y + 42], fill=C["orange"])
    # السطر الثاني
    y += 108
    sub = key_line[:150]
    slines, cur = [], ""
    for w in sub.split():
        t = (cur + " " + w).strip()
        if len(t) <= 46:
            cur = t
        else:
            slines.append(cur); cur = w
    if cur:
        slines.append(cur)
    for ln in slines[:3]:
        d.text((W - M, y), ar(ln), font=F(40, 600), fill=C["muted"], anchor="ra")
        y += 62

    # التذييل
    d.rectangle([0, H - 104, W, H - 100], fill=C["orange"])
    d.text((W - M, H - 62), ar(footer), font=F(30, 700), fill=C["light"], anchor="rs")
    if source:
        d.text((M, H - 62), ar(source[:90]), font=F(24, 500), fill=C["muted"], anchor="ls")

    img.convert("RGB").save(out_path, "PNG", optimize=True)
    return out_path


# ═══════════════════════ 4) مراجعة الجودة ═══════════════════════
def qc_check(title, text, out_path, has_ai_image):
    issues = []
    for b in BANNED:
        if b in text:
            issues.append(f"كلمة ممنوعة: «{b}»")
    if re.search(r"\d{3,}", text) and "المصدر" not in text and "مصدر" not in text:
        issues.append("يوجد رقم بلا مصدر معلن")
    if not has_ai_image:
        issues.append("تنبيه: لم تُستخدم صورة مولّدة — خلفية بديلة")
    try:
        from PIL import Image
        im = Image.open(out_path)
        if im.size != (1080, 1350):
            issues.append(f"المقاس غير مطابق: {im.size}")
    except Exception as e:
        issues.append(f"تعذّر فتح الملف: {e}")
    return issues


# ═══════════════════════ 5) التشغيل ═══════════════════════
def load_master():
    if not os.path.exists(MASTER):
        return {}
    return {r["رقم_الموضوع"]: r for r in csv.DictReader(open(MASTER, encoding="utf-8"))}


def produce(tid, keys, provider=None, outdir=ASSETS):
    md = read_topic(tid)
    if not md:
        return {"id": tid, "ok": False, "error": "لا يوجد ملف محتوى"}
    master = load_master().get(tid, {})
    pillar = master.get("المحور_الرئيسي", "")
    pcode = {"الهندسة المدنية والتطبيق العملي": "P1", "المقاولات وإدارة المشاريع": "P2",
             "التطوير العقاري والسوق السعودي": "P3", "التقنية والذكاء الاصطناعي": "P4",
             "الفرص والأعمال والعلاقات": "P5", "الهوية المهنية والقيادة الفكرية": "P6"}.get(pillar, "P1")
    title, key, slides, body = parse_topic(md)

    order = [p for p in PROVIDERS if provider is None or p[0] == provider]
    used, img, err = None, None, "لا مزوّد متاح"
    for name, fn, draws, desc in order:
        prompt = art_brief(tid, title, key, body, pcode) if draws else compose_prompt_flux(tid, title, key, pcode)
        data, e = fn(keys, prompt)
        if data:
            used, img, err = name, data, None
            break
        err = f"{name}: {e}"

    os.makedirs(outdir, exist_ok=True)
    out = os.path.join(outdir, f"{tid}.png")
    compose(title, key, img if (used and PROVIDERS[[p[0] for p in PROVIDERS].index(used)][2]) is False else None,
            out, source=(master.get("المصادر_المطلوبة", "")[:60] or None))
    # ملاحظة: إذا كان المزوّد يرسم النص بنفسه نُعيد الصورة كما هي
    if used and PROVIDERS[[p[0] for p in PROVIDERS].index(used)][2]:
        open(out, "wb").write(img)

    issues = qc_check(title, body, out, bool(img))
    return {"id": tid, "ok": True, "provider": used, "error": err,
            "out": out, "slides": len(slides), "issues": issues,
            "size": os.path.getsize(out)}


def main():
    ap = argparse.ArgumentParser(description="وكيل الإنتاج البصري — إبداعات هندسية")
    ap.add_argument("--check", action="store_true", help="فحص حالة المزوّدين")
    ap.add_argument("--topic", help="رقم الموضوع، مثال P1-002")
    ap.add_argument("--provider", choices=[p[0] for p in PROVIDERS], help="فرض مزوّد")
    ap.add_argument("--batch", choices=["plan"], help="إنتاج من خطة اليوم")
    ap.add_argument("--limit", type=int, default=2)
    ap.add_argument("--out", default=ASSETS)
    a = ap.parse_args()

    keys = load_keys()
    if a.check:
        print("فحص المزوّدين —", datetime.now().strftime("%Y-%m-%d %H:%M"))
        st = check_providers(keys)
        ok = [k for k, v in st.items() if v["ok"]]
        print("\nالخلاصة:", ("مزوّد جاهز: " + ", ".join(ok)) if ok else
              "لا يوجد مزوّد يعمل — يلزم رصيد/حصة في أحد المزوّدين")
        return 0 if ok else 1

    if a.batch == "plan":
        cal = f"{BASE}/calendar/90day_calendar.csv"
        ids, seen = [], set()
        for r in csv.DictReader(open(cal, encoding="utf-8")):
            i = r.get("الموضوع_المعرف") or r.get("الموضوع_المعرّف")
            if i and i not in seen:
                seen.add(i); ids.append(i)
            if len(ids) >= a.limit:
                break
        res = [produce(i, keys, a.provider, a.out) for i in ids]
    elif a.topic:
        res = [produce(a.topic, keys, a.provider, a.out)]
    else:
        ap.print_help(); return 0

    for r in res:
        if r["ok"]:
            print(f"✔ {r['id']} · مزوّد={r['provider']} · {r['size']}B · شرائح={r['slides']}")
            for i in r["issues"]:
                print("   ⚠", i)
            if r.get("error"):
                print("   ↳", r["error"])
        else:
            print(f"✘ {r['id']} — {r['error']}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
