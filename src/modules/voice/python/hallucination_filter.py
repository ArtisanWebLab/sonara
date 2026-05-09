"""
Post-processing filter for known Whisper hallucinations.

Whisper (and faster-whisper) is trained on YouTube subtitles and on silence/noise tends
to emit boilerplate phrases from that corpus: "Субтитры сделал DimaTorzok", "Продолжение
следует...", "Спасибо за просмотр", trailing ellipses, and stray CJK glyphs in
non-CJK languages. None of these come from the actual audio.

This module strips them before the text reaches the user.
"""

import re
from typing import Optional


HALLUCINATION_PATTERNS: list[re.Pattern] = [
    re.compile(r"субтитры\s+(делал|сделал|подогнал|редактировал|создавал|выполнил|подготовил|корректировал)[^.!?\n]*", re.IGNORECASE),
    re.compile(r"редактор\s+субтитров[^.!?\n]*", re.IGNORECASE),
    re.compile(r"корректор\s+субтитров[^.!?\n]*", re.IGNORECASE),
    re.compile(r"\bdima\s*tor[zs]ok\b[^.!?\n]*", re.IGNORECASE),
    re.compile(r"продолжение\s+следует[.!\s…]*", re.IGNORECASE),
    re.compile(r"спасибо\s+за\s+просмотр[.!\s…]*", re.IGNORECASE),
    re.compile(r"подписывайтесь\s+на\s+канал[^.!?\n]*", re.IGNORECASE),
    re.compile(r"ставьте\s+лайк[^.!?\n]*", re.IGNORECASE),
    re.compile(r"не\s+забудьте\s+подписаться[^.!?\n]*", re.IGNORECASE),
    re.compile(r"thanks\s+for\s+watching[.!\s…]*", re.IGNORECASE),
    re.compile(r"thank\s+you\s+for\s+watching[.!\s…]*", re.IGNORECASE),
    re.compile(r"please\s+subscribe[^.!?\n]*", re.IGNORECASE),
    re.compile(r"subtitles?\s+by[^\n]*", re.IGNORECASE),
    re.compile(r"[^\s]*amara\.org[^\s]*\s*\w*", re.IGNORECASE),
]

CJK_RANGE = re.compile(r"[　-〿぀-ゟ゠-ヿ㐀-䶿一-鿿가-힯＀-￯]+")
LATIN_CYRILLIC = re.compile(r"[A-Za-zА-Яа-яЁё]")
TRAILING_ELLIPSIS = re.compile(r"[\s.…]*[.…]{2,}\s*$")
MULTI_SPACE = re.compile(r"[ \t]{2,}")
ORPHAN_PUNCT = re.compile(r"([.!?])\s+([.!?,;:…])+")


def sanitize_transcription(text: str, language: Optional[str] = None) -> str:
    """Remove known Whisper hallucinations from a transcription chunk.

    `language` is the active Whisper language code (e.g. "ru", "en"). When set to a
    non-CJK language we also strip stray CJK glyphs - they are always hallucinations
    in that context.
    """
    if not text:
        return text

    cleaned = text

    for pattern in HALLUCINATION_PATTERNS:
        cleaned = pattern.sub("", cleaned)

    if language and language not in {"zh", "ja", "ko", "yue"}:
        if not CJK_RANGE.search(cleaned) or LATIN_CYRILLIC.search(cleaned):
            cleaned = CJK_RANGE.sub("", cleaned)

    cleaned = ORPHAN_PUNCT.sub(r"\1", cleaned)
    cleaned = TRAILING_ELLIPSIS.sub("", cleaned)
    cleaned = MULTI_SPACE.sub(" ", cleaned)

    leading_ws = len(text) - len(text.lstrip())
    trailing_ws = len(text) - len(text.rstrip())
    core = cleaned.strip()
    if not core:
        return ""

    return text[:leading_ws] + core + text[len(text) - trailing_ws:]
