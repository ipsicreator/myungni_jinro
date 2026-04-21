from __future__ import annotations

import json
import re
import zipfile
from dataclasses import dataclass, asdict
from pathlib import Path
from typing import List
from xml.etree import ElementTree as ET


@dataclass
class ReferenceSection:
    title: str
    lines: List[str]


def extract_docx_paragraphs(docx_path: Path) -> List[str]:
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    with zipfile.ZipFile(docx_path, "r") as zf:
        xml = zf.read("word/document.xml")
    root = ET.fromstring(xml)
    paragraphs: List[str] = []
    for p in root.findall(".//w:p", ns):
        texts = [t.text for t in p.findall(".//w:t", ns) if t.text]
        line = "".join(texts).strip()
        if line:
            paragraphs.append(line)
    return paragraphs


def split_docx_sections(paragraphs: List[str]) -> List[ReferenceSection]:
    section_mark = re.compile(r"^(제\s*\d+|제\s*\d+~\d+면|\[제\s*\d+[-‑]\d+면)")
    sections: List[ReferenceSection] = []
    current_title = "문서 개요"
    current_lines: List[str] = []

    for line in paragraphs:
        if section_mark.match(line):
            if current_lines:
                sections.append(ReferenceSection(title=current_title, lines=current_lines))
            current_title = line
            current_lines = []
            continue
        current_lines.append(line)

    if current_lines:
        sections.append(ReferenceSection(title=current_title, lines=current_lines))
    return sections


def extract_fulltext_sections(txt_path: Path) -> List[ReferenceSection]:
    raw = txt_path.read_text(encoding="utf-8", errors="replace")
    chunks = re.split(r"^===== FILE:\s*(.+?)\s*=====$", raw, flags=re.MULTILINE)
    # split result: [head, name1, body1, name2, body2, ...]
    sections: List[ReferenceSection] = []
    if len(chunks) < 3:
        return sections
    for i in range(1, len(chunks), 2):
        name = chunks[i].strip()
        body = chunks[i + 1]
        lines = [ln.strip() for ln in body.splitlines() if ln.strip()]
        sections.append(ReferenceSection(title=name, lines=lines))
    return sections


def build_reference_json(docx_path: Path, txt_path: Path, out_path: Path) -> None:
    docx_paragraphs = extract_docx_paragraphs(docx_path)
    docx_sections = split_docx_sections(docx_paragraphs)
    fulltext_sections = extract_fulltext_sections(txt_path)

    payload = {
        "source": {
            "docx": str(docx_path),
            "txt": str(txt_path),
        },
        "docx": {
            "paragraph_count": len(docx_paragraphs),
            "section_count": len(docx_sections),
            "sections": [asdict(s) for s in docx_sections],
        },
        "fulltext": {
            "section_count": len(fulltext_sections),
            "sections": [asdict(s) for s in fulltext_sections],
        },
    }

    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")


def main() -> None:
    base = Path(r"C:\Users\chris\Desktop\myungni_jinro\보고서_항목별_TXT_패키지")
    docx = base / "명리_진로_12p_보고서.docx"
    txt = base / "FULLTEXT_노출본.txt"
    out = Path(r"C:\Users\chris\Desktop\myungni_jinro\myungni_next\src\data\report_reference.json")

    build_reference_json(docx, txt, out)
    print(f"[ok] report reference saved: {out}")


if __name__ == "__main__":
    main()
