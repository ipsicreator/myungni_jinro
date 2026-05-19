# scratch/convert.ps1
# Dynamically finds the docx file in the current directory and converts it to PDF using Word COM

# Find the docx file dynamically to avoid Korean filename encoding issues
$docxFiles = Get-ChildItem -Path . -Filter "*.docx"
if ($docxFiles.Count -eq 0) {
    Write-Error "Could not find any .docx files in the current directory."
    Exit 1
}

$targetDocx = $docxFiles[0]
$docxPath = $targetDocx.FullName
$pdfPath = Join-Path (Get-Location) ($targetDocx.BaseName + ".pdf")

Write-Output "Found DOCX file: $docxPath"
Write-Output "Target PDF path: $pdfPath"

try {
    Write-Output "Initializing Word COM object..."
    $word = New-Object -ComObject Word.Application
    $word.Visible = $false
    
    Write-Output "Opening document..."
    $doc = $word.Documents.Open($docxPath)
    
    Write-Output "Saving as PDF (Format=17)..."
    # 17 represents wdFormatPDF
    $doc.SaveAs($pdfPath, 17)
    
    Write-Output "Closing document..."
    $doc.Close()
    $word.Quit()
    
    Write-Output "SUCCESS: PDF generated successfully!"
} catch {
    Write-Error "Failed to convert document: $_"
    if ($word) {
        $word.Quit()
    }
    Exit 1
}
