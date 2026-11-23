# ==============================================================================
# Portfolio Auto-Sync Script for Windows PowerShell
# ==============================================================================
# Scans project directories for files (images, PDFs, CAD files, ZIPs),
# computes file sizes, detects categories, and updates projects.js while
# preserving any custom titles, context descriptions, and project summaries!
#
# Usage:
#   powershell -ExecutionPolicy Bypass -File .\update-projects.ps1
#   Or right-click -> "Run with PowerShell"
# ==============================================================================

Write-Host ">>> Scanning portfolio projects and media files..." -ForegroundColor Cyan

$scriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
if (-not $scriptDir) { $scriptDir = Get-Location }

$jsPath = Join-Path $scriptDir "projects.js"

# Read existing projects.js to extract current metadata map and order
$existingData = [ordered]@{}
$orderedFolders = @()
if (Test-Path $jsPath) {
    try {
        $content = [System.IO.File]::ReadAllText($jsPath, [System.Text.Encoding]::UTF8)
        $jsonMatch = [regex]::Match($content, 'window\.PORTFOLIO_DATA\s*=\s*(\[[\s\S]*?\]);\s*$')
        if ($jsonMatch.Success) {
            $parsed = $jsonMatch.Groups[1].Value | ConvertFrom-Json
            foreach ($proj in $parsed) {
                $existingData[$proj.folder] = $proj
                $orderedFolders += $proj.folder
            }
            Write-Host ">>> Loaded existing metadata for $($existingData.Count) project(s)." -ForegroundColor Gray
        }
    } catch {
        Write-Host ">>> Notice: Could not parse existing projects.js, creating fresh metadata." -ForegroundColor DarkYellow
    }
}

function Format-FileSize([long]$bytes) {
    if ($bytes -ge 1MB) {
        return "$([math]::Round($bytes / 1MB, 1)) MB"
    } elseif ($bytes -ge 1KB) {
        return "$([math]::Round($bytes / 1KB, 0)) KB"
    } else {
        return "$bytes B"
    }
}

function Get-HumanTitle([string]$filename) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($filename)
    $name = $name -replace '_', ' '
    $name = $name -replace '\s+', ' '
    return $name.Trim()
}

function Get-FileCategory([string]$relPath, [string]$ext) {
    $lower = $relPath.ToLower()
    if ($lower -match "architecture|topology|block diagram|system diagram|system block") { return "Architecture" }
    if ($lower -match "schematic|wiring|routing|harness") { return "Wiring & Schematics" }
    if ($lower -match "pcb|layout|gerber|kicad") { return "PCB Design" }
    if ($lower -match "cad|fusion|3d" -or $ext -in @("step", "stp", "f3d", "stl", "sldprt", "sldasm")) { return "CAD & 3D Models" }
    if ($lower -match "print|prototype|breadboard|mockup") { return "Prototypes & Prints" }
    if ($lower -match "pitch|award|hackathon|competition") { return "Awards & Pitches" }
    if ($ext -in @("zip", "tar", "gz", "7z", "rar")) { return "Source Files & Archives" }
    if ($ext -eq "pdf") {
        if ($lower -match "course|inverter|adder|vlsi") { return "Coursework Reports" }
        return "Lab Reports & Docs"
    }
    if ($ext -in @("png", "jpg", "jpeg", "webp", "gif")) { return "Hardware & Testing" }
    return "General"
}

$allDirs = Get-ChildItem -Path $scriptDir -Directory | Where-Object { 
    $_.Name -notmatch '^\.' -and $_.Name -notmatch 'node_modules|__pycache__' 
}

# Preserve existing project order, placing newly discovered folders at the end
$sortedDirs = $allDirs | Sort-Object {
    $idx = $orderedFolders.IndexOf($_.Name)
    if ($idx -ge 0) { $idx } else { 9999 }
}

$projectsList = @()
$totalFiles = 0

foreach ($dir in $sortedDirs) {
    $folderName = $dir.Name
    $existingProj = $existingData[$folderName]

    $projTitle = if ($existingProj -and $existingProj.title) { $existingProj.title } else { $folderName }
    $projOrg = if ($existingProj -and $existingProj.organization) { $existingProj.organization } else { $null }
    $projDate = if ($existingProj -and $existingProj.date) { $existingProj.date } else { "2024-2026" }
    $projDesc = if ($existingProj -and $existingProj.description) { $existingProj.description } elseif ($existingProj -and $existingProj.summary) { @($existingProj.summary) } else { @("Technical documentation and engineering design artifacts.") }
    $projId = if ($existingProj -and $existingProj.id) { $existingProj.id } else { ($folderName -replace '[^a-zA-Z0-9]+', '-').ToLower().Trim('-') }

    $existingMediaMap = @{}
    if ($existingProj -and $existingProj.media) {
        foreach ($m in $existingProj.media) {
            $existingMediaMap[$m.file] = $m
        }
    }

    $files = Get-ChildItem -Path $dir.FullName -Recurse -File | Where-Object {
        $_.Extension -match '\.(jpg|jpeg|png|gif|webp|pdf|zip|f3d|step|stp|stl|txt)$'
    }

    $mediaList = @()
    foreach ($file in $files) {
        $rel = $file.FullName.Substring($dir.FullName.Length + 1).Replace('\', '/')
        $ext = $file.Extension.TrimStart('.').ToLower()
        $sizeStr = Format-FileSize $file.Length

        $existingItem = $existingMediaMap[$rel]

        $title = if ($existingItem -and $existingItem.title) { $existingItem.title } else { Get-HumanTitle $file.Name }
        $context = if ($existingItem -and $existingItem.context) { $existingItem.context } else { "Technical documentation and design artifact for $projTitle." }
        $category = if ($existingItem -and $existingItem.category) { $existingItem.category } else { Get-FileCategory $rel $ext }

        $mediaList += [PSCustomObject]@{
            file = $rel
            title = $title
            context = $context
            category = $category
            type = $ext
            size = $sizeStr
        }
        $totalFiles++
    }

    $projItem = [ordered]@{
        id = $projId
        title = $projTitle
    }
    if ($projOrg) {
        $projItem["organization"] = $projOrg
    }
    $projItem["date"] = $projDate
    $projItem["description"] = $projDesc
    $projItem["folder"] = $folderName
    $projItem["media"] = $mediaList

    $projectsList += [PSCustomObject]$projItem
}

# Serialize to clean formatted JavaScript
$jsonString = $projectsList | ConvertTo-Json -Depth 6
$finalJs = "// Portfolio Project Data`n// Automatically synced and editable`n`nwindow.PORTFOLIO_DATA = $jsonString;`n"

[System.IO.File]::WriteAllText($jsPath, $finalJs, [System.Text.Encoding]::UTF8)

Write-Host ">>> Done! Successfully synced $($projectsList.Count) projects and $totalFiles files to projects.js." -ForegroundColor Green
Write-Host ">>> You can now commit with: git commit -am 'Update projects' and git push" -ForegroundColor Yellow
