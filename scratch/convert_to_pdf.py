# scratch/convert_to_pdf.py
# Converts '명리_진로_12p_보고서.docx' to a high-quality PDF using Microsoft Word or docx2pdf.

import os
import sys
import subprocess

def install_and_import(package):
    try:
        __import__(package)
    except ImportError:
        print(f"Installing {package}...")
        subprocess.check_call([sys.executable, "-m", "pip", "install", package])

def convert():
    docx_path = os.path.abspath("명리_진로_12p_보고서.docx")
    pdf_path = os.path.abspath("명리_진로_12p_보고서.pdf")

    if not os.path.exists(docx_path):
        print(f"Error: Word file not found at {docx_path}")
        sys.exit(1)

    print(f"Attempting to convert:\nSource: {docx_path}\nTarget: {pdf_path}")

    # Method 1: Using pywin32 (COM object) - Most reliable on Windows with Word installed
    try:
        install_and_import("pywin32")
        import win32com.client
        print("Using Microsoft Word COM interface for PDF conversion...")
        
        # Initialize word application in background
        word = win32com.client.Dispatch("Word.Application")
        word.Visible = False
        
        try:
            doc = word.Documents.Open(docx_path)
            # wdFormatPDF = 17
            doc.SaveAs(pdf_path, FileFormat=17)
            doc.Close()
            print("Conversion completed successfully via Word COM!")
            return True
        except Exception as e:
            print(f"Word COM conversion failed: {e}")
        finally:
            word.Quit()
    except Exception as e:
        print(f"Failed to use pywin32: {e}")

    # Method 2: Fallback to docx2pdf
    try:
        install_and_import("docx2pdf")
        from docx2pdf import convert as d2p_convert
        print("Using docx2pdf fallback...")
        d2p_convert(docx_path, pdf_path)
        print("Conversion completed successfully via docx2pdf!")
        return True
    except Exception as e:
        print(f"docx2pdf conversion failed: {e}")

    print("Error: All conversion methods failed. Please ensure Microsoft Word is installed on this machine.")
    sys.exit(1)

if __name__ == "__main__":
    convert()
