#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Engineering 540 — AI Visual & Editorial Agent (v2.0)
====================================================
المنظومة الذكية المتكاملة للإنتاج البصري والتحريري الموثق لقناة ومنصة «إبداعات هندسية | Engineering 540»
إعداد وإشراف: م. عبدالمجيد الفقيه (@Engineering540 |[رقم التواصل محذوف])

المزايا الجوهرية في الإصدار v2.0:
1. موجه القوالب البصرية النفسية الخمسة (5 Neuro-Visual Archetypes Router):
   - X_RAY_LENS: عدسة الأشعة السينية لكشف الخفايا والعيوب والتأسيس
   - FINANCIAL_ICEBERG: جبل الجليد المالي والتعاقدي للمقاولات والتطوير العقاري
   - MACRO_BENTO: العدسة الميكروية المكبرة لتفاصيل الموقع الدقيقة
   - SPLIT_COMPARISON: المقارنة النصفية الصادمة (الخطأ الكارثي ❌ مقابل الحل الهندسي ✅)
   - ISOMETRIC_3D: المجسم الإيزومتري الجغرافي والمعماري لتوزيع الفراغات ومكة المكرمة

2. بروتوكول الصرامة الهندسية وصفر اختلاق (SBC Truth & Grounding Validator):
   - ربط كل موضوع بكود البناء السعودي الرسمي (SBC 304, 1101, 303, 401, 501, 602, 701).
   - تطبيق وسوم التحقق الأربعة الإلزامية من وثيقة 09:
     [حقيقة رسمية] | [تحليل هندسي] | [تقدير توضيحي] | [لم يتحقق]
"""

from __future__ import annotations

import argparse
import json
import re
from dataclasses import dataclass, field
from pathlib import Path
from typing import Dict, List, Optional


class E540Palette:
    ALABASTER_BG = "#FBF9F5"
    STONE_GRAY_BG = "#F4F4F6"
    OBSIDIAN_NAVY = "#0B132B"
    DEEP_OCEAN = "#0A192F"
    BRAND_NAVY = "#13203A"
    BRAND_NAVY_LIGHT = "#1C2E4A"
    ACTION_ORANGE = "#E87722"
    GOLD_ACCENT = "#C59B27"
    SUCCESS_EMERALD = "#10B981"
    DANGER_CRIMSON = "#E63946"
    TEXT_WHITE = "#FFFFFF"
    TEXT_MUTED = "#C3CEDE"


SBC_REFERENCES: Dict[str, Dict[str, str]] = {
    "SBC_304": {
        "code": "SBC 304",
        "title": "كود البناء السعودي للمنشآت الخرسانية",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "الغطاء الخرساني للقواعد المصبوبة على التربة 75 ملم (7.5 سم) وفوق النظافة 50 ملم (5 سم)؛ "
            "قفل الكانة الزلزالي بزاوية 135 درجة؛ حظر زيادة الماء للخرسانة بالموقع؛ "
            "أقصى حرارة للخرسانة عند الصب 32 درجة مئوية؛ الكانات الداخلية إلزامية إذا زادت المسافة بين الأسياخ عن 15 سم."
        ),
    },
    "SBC_303": {
        "code": "SBC 303",
        "title": "كود البناء السعودي للتربة والأساسات",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "إلزامية فحص التربة الجيوتقني؛ الدمك الميكانيكي للدفان على طبقات لا تتجاوز 25 سم باختبار دمك 95%؛ "
            "استخدام الأسمنت المقاوم للكبريتات (Type V) في التربة السبخة؛ تدعيم جوانب الحفر العميق لحماية الجيران."
        ),
    },
    "SBC_1101": {
        "code": "SBC 1101",
        "title": "كود البناء السعودي للمباني السكنية",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "ركوب الأعتاب الخرسانية لا يقل عن 20 سم من كل طرف؛ تشريك البلوك وزوايا الربط المعدنية؛ "
            "التركيب الميكانيكي لحجر ورخام الواجهات المرتفعة؛ معادلة الدرج المريح (القائمة 15 سم والنائمة 30 سم)؛ "
            "رش مبيد النمل الأبيض قبل صبة النظافة."
        ),
    },
    "SBC_401": {
        "code": "SBC 401",
        "title": "الكود الكهربائي السعودي",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "إلزامية نظام التأريض الكهربائي (Earthing)؛ قواطع الحماية التفاضلية (RCBO 30mA) للمطابخ والحمامات؛ "
            "موازنة الأحمال على الفازات الثلاث (R-S-T)؛ أقطار الكابلات المعتمدة للمكيفات والأفران."
        ),
    },
    "SBC_501": {
        "code": "SBC 501",
        "title": "كود البناء السعودي للميكانيكا والتكييف والتهوية",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "عزل مجاري الهواء (Ducts)؛ تمرير نحاس الاسبليت داخل جراب (Sleeve)؛ ضبط ميول صرف التكاثف؛ "
            "تهوية وتبريد قمة بئر المصعد وطرد الرطوبة من غرف الغسيل والمطابخ."
        ),
    },
    "SBC_602": {
        "code": "SBC 602",
        "title": "كود ترشيد الطاقة للمباني السكنية",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "عزل الجدران الخارجية حرارياً؛ نظام السطح المقلوب؛ النوافذ المزدوجة (Double Glazed Low-E) بقطاعات معزولة حرارياً؛ "
            "التوجيه الشمسي الذكي للمبنى وكاسرات الشمس."
        ),
    },
    "SBC_701": {
        "code": "SBC 701",
        "title": "كود التمديدات الصحية السعودي",
        "url": "https://sbc.gov.sa/",
        "key_rules": (
            "اختبار ضغط مواسير التغذية؛ ضبط ميول الصرف (1% إلى 2%)؛ استخدام مشتركات وأكواع بزاوية 45 درجة؛ "
            "تمديد عمود التهوية (Vent Pipe)؛ فصل تصريف مياه الأمطار عن شبكة الصرف الصحي؛ نظام الكلين آوت المغلق."
        ),
    },
    "REGA_BALADY_SCA": {
        "code": "أنظمة بلدي والهيئة العامة للعقار وهيئة المقاولين",
        "title": "التشريعات العقارية والبلدية والتعاقدية السعودية",
        "url": "https://rega.gov.sa/",
        "key_rules": (
            "التسجيل العيني للعقار (RER)؛ رخص البيع على الخارطة (وافي) وحساب الضمان؛ العقود النموذجية للهيئة السعودية للمقاولين (SCA)؛ "
            "وثيقة التأمين الإلزامي ضد العيوب الخفية لمدة 10 سنوات؛ برنامج اتحاد الملاك؛ مستكشف مكة الجغرافي."
        ),
    },
}


@dataclass
class ArchetypeSpec:
    id: str
    arabic_name: str
    psychological_trigger: str
    background_mode: str
    best_for_pillars: List[str]
    best_for_series: List[str]
    prompt_template: str


ARCHETYPES: Dict[str, ArchetypeSpec] = {
    "X_RAY_LENS": ArchetypeSpec(
        id="X_RAY_LENS",
        arabic_name="عدسة الأشعة السينية (The X-Ray Architectural Lens)",
        psychological_trigger="فضول كشف المستور وما وراء الجدران وتحت الأرض (Curiosity Gap)",
        background_mode=f"Deep Obsidian Slate-Navy ({E540Palette.OBSIDIAN_NAVY})",
        best_for_pillars=["P1", "P3", "P5"],
        best_for_series=["من الموقع", "افهم مشروعك", "بوابة الجودة", "دقيقة هندسية"],
        prompt_template=(
            "Create a museum-grade Arabic engineering infographic (4:5 vertical portrait ratio, 1080x1350) "
            "using the 'X-Ray Architectural Scanner Lens' psychological concept.\n"
            "- Background: Deep obsidian slate-navy (#0B132B).\n"
            "- Top-Right Badge: 'إبداعات هندسية | E540'\n"
            "- Huge Bold White & Gold Hook Title: '{hook_title}'\n"
            "- Subtitle in soft cyan-gold: '{subtitle}'\n"
            "- Central Hero Visual: {visual_scene}. A glowing cyan-gold 'X-Ray Scanner Frame' cuts across the structure, "
            "revealing the hidden internal engineering anatomy with ONLY 3 glowing pure Arabic callout boxes (NO English text):\n"
            "  1. Top Box (Crimson Red Alert #EF4444): '{card_1_title}' — '{card_1_body}'\n"
            "  2. Middle Box (Amber Gold Glow #F59E0B): '{card_2_title}' — '{card_2_body}'\n"
            "  3. Bottom Box (Emerald Green Solution #10B981): '{card_3_title}' — '{card_3_body}'\n"
            "- Bottom Interactive Question Bar: '💬 {engagement_question}'\n"
            "- Minimal Footer: Right: 'م. عبدالمجيد الفقيه | مهندس مدني' | Left: '@Engineering540 |[رقم التواصل محذوف]'\n"
            "Strict rule: Pure flawless bold Arabic typography, zero English labels, zero text clutter."
        ),
    ),
    "FINANCIAL_ICEBERG": ArchetypeSpec(
        id="FINANCIAL_ICEBERG",
        arabic_name="جبل الجليد المالي والتعاقدي (The Financial Iceberg)",
        psychological_trigger="النفور من الخسارة وكشف التكاليف والثغرات الخفية (Loss Aversion)",
        background_mode=f"Crystal-clear water transitioning into Deep Ocean Navy ({E540Palette.DEEP_OCEAN})",
        best_for_pillars=["P2", "P3", "P6"],
        best_for_series=["المقاول الذكي", "قبل أن توقّع", "بند ببند", "من مهندس إلى رائد أعمال", "فرصة في السوق"],
        prompt_template=(
            "Create a viral, scroll-stopping Arabic real estate & construction infographic (4:5 vertical portrait ratio) "
            "using the 'Financial Iceberg' psychological metaphor.\n"
            "- Top-Right Badge: 'إبداعات هندسية | E540'\n"
            "- Massive Hook Title: '{hook_title}'\n"
            "- Subtitle: '{subtitle}'\n"
            "- Visual Scene: Above the water (Top 25% bright tip of iceberg): {visual_scene} labeled in bold navy:\n"
            "  '{surface_illusion}'\n"
            "- Below the water (Bottom 75% glowing massive iceberg underwater): 3 glowing hidden engineering & financial truths "
            "in pure Arabic (NO English words like LEVEL 1):\n"
            "  1. (Amber Glow): '1. {card_1_title}: {card_1_body}'\n"
            "  2. (Orange Glow): '2. {card_2_title}: {card_2_body}'\n"
            "  3. (Crimson Glow): '3. {card_3_title}: {card_3_body}'\n"
            "- Bottom Callout Bar: '💡 {golden_rule}'\n"
            "- Minimal Footer: Right: 'م. عبدالمجيد الفقيه | مهندس مدني' | Left: '@Engineering540 |[رقم التواصل محذوف]'\n"
            "Strict rule: Pure flawless bold Arabic typography, zero English words."
        ),
    ),
    "MACRO_BENTO": ArchetypeSpec(
        id="MACRO_BENTO",
        arabic_name="العدسة الميكروية المكبرة (Macro Spotlight Bento UI)",
        psychological_trigger="الملمس الواقعي المدهش لتفصيلة صغيرة تحمي المبنى (Tactile Realism)",
        background_mode=f"Soft Architectural Stone Gray ({E540Palette.STONE_GRAY_BG})",
        best_for_pillars=["P1", "P4", "P5"],
        best_for_series=["من الموقع", "أخطاء لا تُغتفر", "بوابة الجودة", "مصطلح هندسي وعقاري"],
        prompt_template=(
            "Create an ultra-modern Apple-Keynote Bento-style Arabic engineering infographic (4:5 vertical portrait ratio) "
            "using the 'Macro Spotlight Bento UI' psychological concept.\n"
            "- Background: Soft architectural stone gray (#F4F4F6) with 3 sleek rounded Bento cards and generous whitespace.\n"
            "- Top-Right Badge: 'إبداعات هندسية | E540'\n"
            "- Huge Bold Title: '{hook_title}'\n"
            "- Subtitle in vibrant orange (#EA580C): '{subtitle}'\n"
            "- HERO LARGE CARD (Top full-width card - 55% height): Hyper-detailed 3D close-up spotlight of {visual_scene}. "
            "Bold Overlay Label: '{golden_rule}'\n"
            "- BOTTOM RIGHT CARD (Red Warning Accent): '❌ {card_1_title}: {card_1_body}'\n"
            "- BOTTOM LEFT CARD (Emerald Green Success Accent): '✅ {card_2_title}: {card_2_body}'\n"
            "- Bottom Interactive Bar: '💬 {engagement_question}'\n"
            "- Minimal Footer: Right: 'م. عبدالمجيد الفقيه | مهندس مدني' | Left: '@Engineering540 |[رقم التواصل محذوف]'\n"
            "Strict rule: Pure flawless bold Arabic typography, zero English words."
        ),
    ),
    "SPLIT_COMPARISON": ArchetypeSpec(
        id="SPLIT_COMPARISON",
        arabic_name="المقارنة النصفية الحاسمة (Split Reality ❌ vs ✅)",
        psychological_trigger="التباين اللحظي بين الكارثة والحل في لمحة واحدة (Contrast Effect)",
        background_mode=f"Warm Soothing Alabaster ({E540Palette.ALABASTER_BG}) with 40% whitespace",
        best_for_pillars=["P1", "P2", "P5"],
        best_for_series=["من الموقع", "أخطاء لا تُغتفر", "اسأل المهندس"],
        prompt_template=(
            "Create a viral, ultra-engaging Arabic engineering infographic (4:5 vertical portrait ratio) "
            "using the 'Split Reality Comparison (❌ vs ✅)' concept.\n"
            "- Background: Warm soothing alabaster (#FBF9F5) with 40% clean breathing whitespace.\n"
            "- Top-Right sleek pill: 'إبداعات هندسية | E540'\n"
            "- Huge Bold Hook Title: '{hook_title}'\n"
            "- Subtitle in vibrant orange: '{subtitle}'\n"
            "- Central Hero Visual: 3D architectural split cutaway of {visual_scene}:\n"
            "  * RIGHT HALF (Red Warning #E63946 - '❌ {card_1_title}'): {card_1_body}\n"
            "  * LEFT HALF (Emerald Green #10B981 - '✅ {card_2_title}'): {card_2_body}\n"
            "- Bottom Engagement Question Bar (Dark Navy pill): '💬 {engagement_question}'\n"
            "- Minimal Footer: Right: 'م. عبدالمجيد الفقيه | مهندس مدني' | Left: '@Engineering540 |[رقم التواصل محذوف]'\n"
            "Strict rule: Pure flawless bold Arabic typography, zero duplicate labels, zero English words."
        ),
    ),
    "ISOMETRIC_3D": ArchetypeSpec(
        id="ISOMETRIC_3D",
        arabic_name="المجسم الإيزومتري الجغرافي والمعماري (3D Isometric Cutaway)",
        psychological_trigger="الإدراك المكاني السريع وتبسيط المخططات والتضاريس (Spatial Clarity)",
        background_mode=f"Soft Warm Cream-White ({E540Palette.ALABASTER_BG})",
        best_for_pillars=["P3", "P4", "P6"],
        best_for_series=["مكة تبني", "من أرض الواقع العقاري", "لغة المخططات", "هندسة بالأرقام", "تحليل مشروع"],
        prompt_template=(
            "Create a breathtaking, ultra-engaging Arabic architectural & real estate infographic (4:5 vertical portrait ratio) "
            "using the '3D Isometric Architectural Cutaway' concept.\n"
            "- Background: Soft warm cream-white (#F9F8F6) with generous breathing whitespace.\n"
            "- Top-Right sleek pill: 'إبداعات هندسية | E540'\n"
            "- Huge Bold Hook Title: '{hook_title}'\n"
            "- Subtitle in vibrant orange: '{subtitle}'\n"
            "- Central Visual Story: A clean 3D isometric cutaway of {visual_scene}, surrounded by ONLY 3 floating callout cards:\n"
            "  * Card 1 (Emerald Accent): '1. {card_1_title}' — '{card_1_body}'\n"
            "  * Card 2 (Orange Accent): '2. {card_2_title}' — '{card_2_body}'\n"
            "  * Card 3 (Royal Blue Accent): '3. {card_3_title}' — '{card_3_body}'\n"
            "- Bottom Engagement Question Bar (Dark Navy pill): '💬 {engagement_question}'\n"
            "- Minimal Footer: Right: 'م. عبدالمجيد الفقيه | مهندس مدني' | Left: '@Engineering540 |[رقم التواصل محذوف]'\n"
            "Strict rule: Pure flawless bold Arabic typography, zero English words."
        ),
    ),
}


REQUIRED_VERIFICATION_TAGS = [
    "[حقيقة رسمية]",
    "[تحليل هندسي]",
    "[تقدير توضيحي]",
    "[لم يتحقق]",
]


@dataclass
class VerificationReport:
    is_valid: bool
    sbc_code_matched: str
    verification_tags_found: List[str]
    warnings: List[str] = field(default_factory=list)
    errors: List[str] = field(default_factory=list)


def validate_engineering_content(
    hook_title: str,
    caption_text: str,
    sbc_key: str,
) -> VerificationReport:
    warnings: List[str] = []
    errors: List[str] = []

    if sbc_key not in SBC_REFERENCES:
        errors.append(f"مرجع الكود '{sbc_key}' غير مسجل في قاعدة المراجع المعتمدة.")
        sbc_code_title = "غير معروف"
    else:
        sbc_code_title = SBC_REFERENCES[sbc_key]["code"]

    tags_found = [tag for tag in REQUIRED_VERIFICATION_TAGS if tag in caption_text]
    if not tags_found:
        warnings.append(
            "النص لا يحتوي على وسم تحقق صريح مثل [حقيقة رسمية] أو [تحليل هندسي] أو [تقدير توضيحي] كما تنص وثيقة 09."
        )

    has_currency_numbers = bool(re.search(r"\d+\s*(ألف|مليون|ريال|%)", hook_title + " " + caption_text))
    if has_currency_numbers and "[تقدير توضيحي]" not in caption_text and "[حقيقة رسمية]" not in caption_text:
        warnings.append(
            "يوجد رقم مالي أو نسبة مئوية دون وسم [تقدير توضيحي] أو [حقيقة رسمية] لتوضيح سياق الرقم للقارئ."
        )

    return VerificationReport(
        is_valid=(len(errors) == 0),
        sbc_code_matched=sbc_code_title,
        verification_tags_found=tags_found,
        warnings=warnings,
        errors=errors,
    )


def select_archetype_for_topic(pillar: str, series_name: str, preferred_archetype: Optional[str] = None) -> ArchetypeSpec:
    if preferred_archetype and preferred_archetype in ARCHETYPES:
        return ARCHETYPES[preferred_archetype]
    for arch in ARCHETYPES.values():
        if series_name in arch.best_for_series:
            return arch
    for arch in ARCHETYPES.values():
        if pillar in arch.best_for_pillars:
            return arch
    return ARCHETYPES["MACRO_BENTO"]
