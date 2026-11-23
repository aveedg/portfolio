# Electrical Engineering Portfolio

A barebones, high-contrast engineering portfolio and artifact archive inspired by the **Physical Intelligence** design aesthetic. Built specifically for electrical engineering, robotics, PCB design, and embedded systems portfolios hosted statically on **GitHub Pages**.

---

## Architecture: How It Works Publicly vs. Locally

### 1. The Public Website (`index.html`)
- **Hosted Statically on GitHub Pages**: There is no database or backend server.
- **Pure Public View**: The public site has **no admin buttons or edit forms**. Visitors (recruiters, professors, engineers) only see your completed projects, interactive media viewer, schematics, and download links.
- **Data Source**: It reads cleanly from `projects.js`, which contains structured project metadata, file paths, and engineering context notes.

### 2. Private Desktop Studio GUI (`launch-studio.bat` / `update-projects.py`)
You have a full desktop GUI application on your machine to manage your portfolio:

* **View & Edit Projects**: Select any existing project to edit titles, date ranges, folder names, and bullet-point descriptions.
* **Add New Projects**: Click `+ Add Project` to create a new project card.
* **Reorder Projects**: Use `Move Up ↑` and `Move Down ↓` buttons to change the order projects appear on your website.
* **Attach Files**: Click `+ Attach Files...` to pick photos, schematics, PDFs, CAD models (`.step`, `.f3d`), or ZIP archives. Files are copied into the project folder, sized, and cataloged.
* **Auto-Scan Project Folder**: Click `Scan Project Folder` to automatically discover any files dropped into the repo folder.
* **Edit Media Context**: Double-click any file in the table to edit its human title, category, and engineering context note.
* **Save with 1-Click**: Click `Save to projects.js` in the top right to instantly update the website data.

---

## How to Launch the Desktop Studio

Simply double-click:
```text
launch-studio.bat
```
Or run in terminal:
```powershell
python update-projects.py
# Or using the local Python installation:
& "$env:LOCALAPPDATA\Python\bin\python.exe" update-projects.py
```

---

## Alternative: 1-Command PowerShell Auto-Sync (`update-projects.ps1`)

If you prefer using the terminal:
1. Drop your new project folder or new files (e.g. `.png`, `.pdf`, `.zip`, `.step`) into your repository folder.
2. In PowerShell, run:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\update-projects.ps1
   ```
3. The script automatically:
   - Detects all newly added folders and files.
   - Computes exact file sizes.
   - Assigns clean human titles and categories.
   - Preserves all your custom titles, descriptions, and dates in `projects.js`.

---

## Publishing to GitHub Pages

Once you click `Save to projects.js` in the Desktop Studio or run the sync script:

```powershell
git add .
git commit -m "Update portfolio projects and media"
git push origin main
```
GitHub Pages will automatically build and deploy your site globally within 30–60 seconds!

---

## File Structure

```text
portfolio/
├── index.html                   # Public portfolio (clean, no admin controls)
├── styles.css                   # Minimalist Physical Intelligence styling
├── script.js                    # Interactive explorer, drawers, and lightbox
├── projects.js                  # Structured portfolio data and media context
│
├── update-projects.py           # Desktop Studio GUI app (Tkinter)
├── launch-studio.bat            # 1-click launcher for the desktop studio
├── update-projects.ps1          # Windows PowerShell auto-sync script
├── README.md                    # Documentation
│
├── Autonomous Robot Bartender Academic Project/
├── BlindSpot (wearable for the blind)/
├── Digital IC Design Course/
├── Electrical Systems at Rivian and VW Group/
├── Gesture-Controlled Memory Game Using Ultrasonic Sensors Academic Project/
└── Lead Rear Low Voltage Electrical Engineer @ FSAE EV/
```

---

## GitHub Pages Deployment Setup

1. In your GitHub repository, navigate to **Settings** > **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch `main` and folder `/(root)`.
4. Click **Save**. Your site is live at `https://<your-username>.github.io/<repo-name>/`.
