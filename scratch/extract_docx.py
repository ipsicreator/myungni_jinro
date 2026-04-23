import zipfile
from xml.etree import ElementTree as ET
import os

def extract_docx_text(docx_path):
    ns = {"w": "http://schemas.openxmlformats.org/wordprocessingml/2006/main"}
    try:
        with zipfile.ZipFile(docx_path, "r") as zf:
            xml_content = zf.read("word/document.xml")
    except Exception as e:
        return f"Error reading docx: {e}"

    root = ET.fromstring(xml_content)
    paragraphs = []
    for p in root.findall(".//w:p", ns):
        texts = [t.text for t in p.findall(".//w:t", ns) if t.text]
        line = "".join(texts).strip()
        if line:
            paragraphs.append(line)
    return "\n".join(paragraphs)

if __name__ == "__main__":
    docx_file = r"C:\Users\chris\Desktop\myungni_next\명리_진로_12p_보고서.docx"
    output_file = r"C:\Users\chris\Desktop\myungni_next\extracted_report_text.txt"
    
    text = extract_docx_text(docx_file)
    with open(output_file, "w", encoding="utf-8") as f:
        f.write(text)
    print(f"Extracted text saved to {output_file}")
