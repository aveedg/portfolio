#!/usr/bin/env python3
"""
Portfolio Project Manager & Studio (Desktop GUI)
Aveed Gorji — Hardware Designer & Systems Engineer Portfolio

Allows viewing, editing, adding, and organizing portfolio projects,
attaching files, editing engineering descriptions, dates, and media context,
and saving directly to projects.js.
"""

import os
import re
import sys
import json
import shutil
import tkinter as tk
from tkinter import ttk, messagebox, filedialog

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
JS_PATH = os.path.join(SCRIPT_DIR, "projects.js")

def format_size(size_bytes):
    if size_bytes >= 1048576:
        return f"{size_bytes / 1048576:.1f} MB"
    elif size_bytes >= 1024:
        return f"{size_bytes / 1024:.0f} KB"
    return f"{size_bytes} B"

CATEGORIES = [
    "Architecture",
    "Wiring & Schematics",
    "PCB Design",
    "CAD & 3D Models",
    "Prototypes & Prints",
    "Hardware & Testing",
    "Lab Reports & Docs",
    "Reports & Documents",
    "Awards & Pitches",
    "Coursework Reports",
    "Source Files & Archives",
    "General"
]

def clean_title(filename):
    base = os.path.splitext(os.path.basename(filename))[0]
    return re.sub(r'\s+', ' ', base.replace('_', ' ')).strip()

def detect_category(rel_path, ext):
    lower = rel_path.lower()
    if any(k in lower for k in ['architecture', 'topology', 'block diagram', 'system diagram', 'system block']):
        return 'Architecture'
    if any(k in lower for k in ['schematic', 'wiring', 'routing', 'harness']):
        return 'Wiring & Schematics'
    if any(k in lower for k in ['pcb', 'layout', 'gerber', 'kicad']):
        return 'PCB Design'
    if any(k in lower for k in ['cad', 'fusion', '3d']) or ext in ['step', 'stp', 'f3d', 'stl', 'sldprt', 'sldasm']:
        return 'CAD & 3D Models'
    if any(k in lower for k in ['print', 'prototype', 'breadboard', 'mockup']):
        return 'Prototypes & Prints'
    if any(k in lower for k in ['pitch', 'award', 'hackathon', 'competition', 'place']):
        return 'Awards & Pitches'
    if ext in ['zip', 'tar', 'gz', '7z', 'rar']:
        return 'Source Files & Archives'
    if ext == 'pdf':
        if any(k in lower for k in ['course', 'inverter', 'adder', 'vlsi']):
            return 'Coursework Reports'
        return 'Lab Reports & Docs'
    if ext in ['png', 'jpg', 'jpeg', 'webp', 'gif']:
        return 'Hardware & Testing'
    return 'General'

def load_projects_data():
    if not os.path.exists(JS_PATH):
        return []
    try:
        with open(JS_PATH, "r", encoding="utf-8") as f:
            content = f.read()
        match = re.search(r'window\.PORTFOLIO_DATA\s*=\s*(\[[\s\S]*?\]);\s*$', content)
        if match:
            return json.loads(match.group(1))
    except Exception as e:
        messagebox.showerror("Error Loading Data", f"Could not parse projects.js:\n{e}")
    return []

def save_projects_data(data):
    try:
        json_str = json.dumps(data, indent=2, ensure_ascii=False)
        content = f"// Portfolio Project Data\n// Simple schema: id, title, date, description, folder, media\n\nwindow.PORTFOLIO_DATA = {json_str};\n"
        with open(JS_PATH, "w", encoding="utf-8") as f:
            f.write(content)
        return True
    except Exception as e:
        messagebox.showerror("Error Saving", f"Failed to save projects.js:\n{e}")
        return False


class MediaEditDialog(tk.Toplevel):
    """Dialog to edit media file details (title, category, context)."""
    def __init__(self, parent, media_item):
        super().__init__(parent)
        self.title("Edit Media Item")
        self.geometry("540x360")
        self.resizable(False, False)
        self.transient(parent)
        self.grab_set()

        self.media_item = media_item
        self.result = None

        container = ttk.Frame(self, padding=20)
        container.pack(fill=tk.BOTH, expand=True)

        ttk.Label(container, text=f"File: {media_item.get('file', '')}", font=("Segoe UI", 9, "bold")).pack(anchor="w", pady=(0, 10))

        ttk.Label(container, text="Media Title:").pack(anchor="w")
        self.title_var = tk.StringVar(value=media_item.get("title", ""))
        ttk.Entry(container, textvariable=self.title_var, width=60).pack(fill=tk.X, pady=(2, 10))

        ttk.Label(container, text="Category:").pack(anchor="w")
        self.cat_var = tk.StringVar(value=media_item.get("category", "General"))
        categories = list(CATEGORIES)
        current_cat = self.cat_var.get().strip()
        if current_cat and current_cat not in categories:
            categories.insert(0, current_cat)
        cat_combo = ttk.Combobox(container, textvariable=self.cat_var, values=categories, state="normal")
        cat_combo.pack(fill=tk.X, pady=(2, 10))

        ttk.Label(container, text="Engineering Context Note:").pack(anchor="w")
        self.context_text = tk.Text(container, height=5, font=("Segoe UI", 9), wrap=tk.WORD)
        self.context_text.insert("1.0", media_item.get("context", ""))
        self.context_text.pack(fill=tk.BOTH, expand=True, pady=(2, 15))

        btn_box = ttk.Frame(container)
        btn_box.pack(fill=tk.X)
        ttk.Button(btn_box, text="Save", command=self.on_save).pack(side=tk.RIGHT, padx=5)
        ttk.Button(btn_box, text="Cancel", command=self.destroy).pack(side=tk.RIGHT)

    def on_save(self):
        self.media_item["title"] = self.title_var.get().strip()
        self.media_item["category"] = self.cat_var.get().strip()
        self.media_item["context"] = self.context_text.get("1.0", tk.END).strip()
        self.result = self.media_item
        self.destroy()


class PortfolioManagerApp(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("Portfolio Project Studio — Aveed Gorji")
        self.geometry("1100x750")
        self.minsize(950, 650)

        # Style configuration
        self.style = ttk.Style(self)
        try:
            self.style.theme_use("clam")
        except:
            pass

        self.projects = load_projects_data()
        self.current_idx = -1

        self.create_widgets()
        self.refresh_project_list()
        if self.projects:
            self.select_project(0)

    def create_widgets(self):
        # Top banner
        header = tk.Frame(self, bg="#111111", height=50)
        header.pack(fill=tk.X)
        tk.Label(header, text="PORTFOLIO PROJECT STUDIO", font=("Segoe UI", 11, "bold"), fg="#ffffff", bg="#111111").pack(side=tk.LEFT, padx=20, pady=12)
        tk.Label(header, text="Hardware Designer & Systems Engineer", font=("Segoe UI", 10), fg="#a0a0a0", bg="#111111").pack(side=tk.LEFT, pady=12)

        save_btn = tk.Button(header, text="Save to projects.js", bg="#10b981", fg="#ffffff", activebackground="#059669", activeforeground="#ffffff", font=("Segoe UI", 9, "bold"), relief="flat", padx=16, pady=4, cursor="hand2", command=self.save_all)
        save_btn.pack(side=tk.RIGHT, padx=20, pady=10)

        # Main Paned Window
        main_paned = ttk.PanedWindow(self, orient=tk.HORIZONTAL)
        main_paned.pack(fill=tk.BOTH, expand=True, padx=12, pady=12)

        # Left Panel: Project List
        left_frame = ttk.LabelFrame(main_paned, text=" Projects ", padding=10)
        main_paned.add(left_frame, weight=1)

        self.proj_listbox = tk.Listbox(left_frame, font=("Segoe UI", 10), selectmode=tk.SINGLE, activestyle="none", highlightthickness=1)
        self.proj_listbox.pack(fill=tk.BOTH, expand=True, pady=(0, 10))
        self.proj_listbox.bind("<<ListboxSelect>>", self.on_project_select)

        left_btn_grid = ttk.Frame(left_frame)
        left_btn_grid.pack(fill=tk.X)
        ttk.Button(left_btn_grid, text="+ Add Project", command=self.add_new_project).grid(row=0, column=0, sticky="ew", padx=2, pady=2)
        ttk.Button(left_btn_grid, text="Delete Project", command=self.delete_project).grid(row=0, column=1, sticky="ew", padx=2, pady=2)
        ttk.Button(left_btn_grid, text="Move Up ↑", command=lambda: self.move_project(-1)).grid(row=1, column=0, sticky="ew", padx=2, pady=2)
        ttk.Button(left_btn_grid, text="Move Down ↓", command=lambda: self.move_project(1)).grid(row=1, column=1, sticky="ew", padx=2, pady=2)
        left_btn_grid.columnconfigure(0, weight=1)
        left_btn_grid.columnconfigure(1, weight=1)

        # Right Panel: Project Details & Media
        right_frame = ttk.Frame(main_paned, padding=10)
        main_paned.add(right_frame, weight=3)

        # Metadata Section
        meta_box = ttk.LabelFrame(right_frame, text=" Project Details ", padding=10)
        meta_box.pack(fill=tk.X, pady=(0, 10))

        # Title
        ttk.Label(meta_box, text="Title (e.g. Job Role or Project Name):", font=("Segoe UI", 9, "bold")).grid(row=0, column=0, sticky="w", pady=(0, 2))
        self.title_var = tk.StringVar()
        self.title_entry = ttk.Entry(meta_box, textvariable=self.title_var, font=("Segoe UI", 10))
        self.title_entry.grid(row=1, column=0, columnspan=2, sticky="ew", pady=(0, 8))

        # Organization / Company (Optional)
        ttk.Label(meta_box, text="Company / Organization (optional — e.g. Rivian and VW Group, Bronco Racing FSAE):", font=("Segoe UI", 9, "bold")).grid(row=2, column=0, sticky="w", pady=(0, 2))
        self.org_var = tk.StringVar()
        self.org_entry = ttk.Entry(meta_box, textvariable=self.org_var, font=("Segoe UI", 10))
        self.org_entry.grid(row=3, column=0, columnspan=2, sticky="ew", pady=(0, 8))

        # Date & Folder row
        grid_row2 = ttk.Frame(meta_box)
        grid_row2.grid(row=4, column=0, columnspan=2, sticky="ew", pady=(0, 8))

        f_left = ttk.Frame(grid_row2)
        f_left.pack(side=tk.LEFT, fill=tk.X, expand=True, padx=(0, 10))
        ttk.Label(f_left, text="Date Range (e.g. 10/2024–06/2026):", font=("Segoe UI", 9, "bold")).pack(anchor="w")
        self.date_var = tk.StringVar()
        ttk.Entry(f_left, textvariable=self.date_var, font=("Segoe UI", 10)).pack(fill=tk.X, pady=(2, 0))

        f_right = ttk.Frame(grid_row2)
        f_right.pack(side=tk.LEFT, fill=tk.X, expand=True)
        ttk.Label(f_right, text="Folder Name in Repo:", font=("Segoe UI", 9, "bold")).pack(anchor="w")
        self.folder_var = tk.StringVar()
        ttk.Entry(f_right, textvariable=self.folder_var, font=("Segoe UI", 10)).pack(fill=tk.X, pady=(2, 0))

        # Description / Bullets
        ttk.Label(meta_box, text="Bullet Descriptions (one per line):", font=("Segoe UI", 9, "bold")).grid(row=5, column=0, sticky="w", pady=(0, 2))
        self.desc_text = tk.Text(meta_box, height=4, font=("Segoe UI", 9), wrap=tk.WORD)
        self.desc_text.grid(row=6, column=0, columnspan=2, sticky="ew")

        meta_box.columnconfigure(0, weight=1)

        # Media Section
        media_box = ttk.LabelFrame(right_frame, text=" Media Files & Engineering Artifacts ", padding=10)
        media_box.pack(fill=tk.BOTH, expand=True)

        # Media Toolbar
        media_bar = ttk.Frame(media_box)
        media_bar.pack(fill=tk.X, pady=(0, 8))
        ttk.Button(media_bar, text="+ Attach Files...", command=self.attach_files).pack(side=tk.LEFT, padx=(0, 6))
        ttk.Button(media_bar, text="Scan Project Folder", command=self.scan_folder_for_new_files).pack(side=tk.LEFT, padx=(0, 6))
        ttk.Button(media_bar, text="Edit Context / Title", command=self.edit_selected_media).pack(side=tk.LEFT, padx=(0, 6))
        ttk.Button(media_bar, text="Remove File", command=self.remove_selected_media).pack(side=tk.LEFT)

        # Treeview for media items
        columns = ("file", "title", "category", "size", "context")
        self.media_tree = ttk.Treeview(media_box, columns=columns, show="headings", selectmode="browse")
        self.media_tree.heading("file", text="File Name")
        self.media_tree.heading("title", text="Display Title")
        self.media_tree.heading("category", text="Category")
        self.media_tree.heading("size", text="Size")
        self.media_tree.heading("context", text="Context Note")

        self.media_tree.column("file", width=160, anchor="w")
        self.media_tree.column("title", width=180, anchor="w")
        self.media_tree.column("category", width=120, anchor="w")
        self.media_tree.column("size", width=70, anchor="center")
        self.media_tree.column("context", width=240, anchor="w")

        tree_scroll_y = ttk.Scrollbar(media_box, orient=tk.VERTICAL, command=self.media_tree.yview)
        self.media_tree.configure(yscrollcommand=tree_scroll_y.set)

        self.media_tree.pack(side=tk.LEFT, fill=tk.BOTH, expand=True)
        tree_scroll_y.pack(side=tk.RIGHT, fill=tk.Y)
        self.media_tree.bind("<Double-1>", lambda e: self.edit_selected_media())

        # Bottom Status Bar
        self.status_var = tk.StringVar(value="Ready. Loaded " + str(len(self.projects)) + " projects from projects.js")
        status_bar = ttk.Label(self, textvariable=self.status_var, relief=tk.SUNKEN, anchor=tk.W, font=("Segoe UI", 9))
        status_bar.pack(side=tk.BOTTOM, fill=tk.X)

    def refresh_project_list(self):
        self.proj_listbox.delete(0, tk.END)
        for p in self.projects:
            title = p.get("title", "Untitled")
            media_len = len(p.get("media", []))
            self.proj_listbox.insert(tk.END, f"{title} ({media_len} files)")

    def save_current_form_to_model(self):
        if 0 <= self.current_idx < len(self.projects):
            p = self.projects[self.current_idx]
            p["title"] = self.title_var.get().strip()

            org = self.org_var.get().strip()
            if org:
                p["organization"] = org
            elif "organization" in p:
                del p["organization"]

            p["date"] = self.date_var.get().strip()
            p["folder"] = self.folder_var.get().strip()

            raw_desc = self.desc_text.get("1.0", tk.END).strip()
            lines = [l.strip().lstrip("•-*— ") for l in raw_desc.split("\n") if l.strip()]
            p["description"] = lines

    def on_project_select(self, event=None):
        sel = self.proj_listbox.curselection()
        if not sel:
            return
        # Save before switching
        self.save_current_form_to_model()

        self.select_project(sel[0])

    def select_project(self, idx):
        if not (0 <= idx < len(self.projects)):
            return
        self.current_idx = idx
        p = self.projects[idx]

        self.title_var.set(p.get("title", ""))
        self.org_var.set(p.get("organization", ""))
        self.date_var.set(p.get("date", ""))
        self.folder_var.set(p.get("folder", ""))

        self.desc_text.delete("1.0", tk.END)
        desc = p.get("description", [])
        if isinstance(desc, list):
            self.desc_text.insert("1.0", "\n".join(desc))
        else:
            self.desc_text.insert("1.0", str(desc))

        self.refresh_media_tree(p.get("media", []))

        self.proj_listbox.selection_clear(0, tk.END)
        self.proj_listbox.selection_set(idx)
        self.proj_listbox.activate(idx)
        self.status_var.set(f"Editing: {p.get('title', '')}")

    def refresh_media_tree(self, media_list):
        for row in self.media_tree.get_children():
            self.media_tree.delete(row)
        for idx, m in enumerate(media_list):
            self.media_tree.insert("", tk.END, iid=str(idx), values=(
                m.get("file", ""),
                m.get("title", ""),
                m.get("category", ""),
                m.get("size", ""),
                m.get("context", "")
            ))

    def add_new_project(self):
        self.save_current_form_to_model()
        new_proj = {
            "id": f"project-{len(self.projects) + 1}",
            "title": "New Project Title",
            "date": "2026",
            "description": ["Project achievement and technical implementation detail"],
            "folder": "New Project Folder",
            "media": []
        }
        self.projects.insert(0, new_proj)
        self.refresh_project_list()
        self.select_project(0)
        self.status_var.set("Created new project. Fill in details and attach files.")

    def delete_project(self):
        if self.current_idx < 0 or self.current_idx >= len(self.projects):
            return
        title = self.projects[self.current_idx].get("title", "")
        if messagebox.askyesno("Confirm Delete", f"Are you sure you want to delete '{title}'?"):
            self.projects.pop(self.current_idx)
            self.current_idx = -1
            self.refresh_project_list()
            if self.projects:
                self.select_project(0)
            else:
                self.title_var.set("")
                self.date_var.set("")
                self.folder_var.set("")
                self.desc_text.delete("1.0", tk.END)
                self.refresh_media_tree([])

    def move_project(self, direction):
        if self.current_idx < 0:
            return
        new_idx = self.current_idx + direction
        if 0 <= new_idx < len(self.projects):
            self.save_current_form_to_model()
            self.projects[self.current_idx], self.projects[new_idx] = self.projects[new_idx], self.projects[self.current_idx]
            self.refresh_project_list()
            self.select_project(new_idx)

    def attach_files(self):
        if self.current_idx < 0:
            messagebox.showinfo("Select Project", "Please select or create a project first.")
            return

        file_paths = filedialog.askopenfilenames(
            title="Attach Media / Files to Project",
            filetypes=[
                ("All Supported Files", "*.png;*.jpg;*.jpeg;*.webp;*.pdf;*.zip;*.step;*.stp;*.f3d;*.stl"),
                ("Images", "*.png;*.jpg;*.jpeg;*.webp"),
                ("Documents", "*.pdf"),
                ("CAD & Archives", "*.step;*.stp;*.f3d;*.stl;*.zip"),
                ("All Files", "*.*")
            ]
        )
        if not file_paths:
            return

        project = self.projects[self.current_idx]
        folder_name = project.get("folder", "").strip()
        if not folder_name:
            folder_name = "New Project"
            project["folder"] = folder_name
            self.folder_var.set(folder_name)

        target_dir = os.path.join(SCRIPT_DIR, folder_name)
        os.makedirs(target_dir, exist_ok=True)

        media_list = project.setdefault("media", [])
        added_count = 0

        for path in file_paths:
            fname = os.path.basename(path)
            dest = os.path.join(target_dir, fname)

            # Copy file into project folder if not already there
            if os.path.abspath(path) != os.path.abspath(dest):
                shutil.copy2(path, dest)

            size_str = format_size(os.path.getsize(dest))
            ext = os.path.splitext(fname)[1].lstrip(".").lower()

            # Check if file is already in media list
            existing = next((m for m in media_list if m.get("file") == fname), None)
            if existing:
                existing["size"] = size_str
            else:
                media_list.append({
                    "file": fname,
                    "title": clean_title(fname),
                    "context": f"Artifact for {project.get('title', '')}.",
                    "category": detect_category(fname, ext),
                    "type": ext,
                    "size": size_str
                })
                added_count += 1

        self.refresh_media_tree(media_list)
        self.refresh_project_list()
        self.proj_listbox.selection_set(self.current_idx)
        self.status_var.set(f"Attached {added_count} new file(s) to {project.get('title', '')}.")

    def scan_folder_for_new_files(self):
        if self.current_idx < 0:
            return
        project = self.projects[self.current_idx]
        folder_name = project.get("folder", "").strip()
        target_dir = os.path.join(SCRIPT_DIR, folder_name)

        if not os.path.exists(target_dir):
            messagebox.showinfo("Folder Not Found", f"Folder '{folder_name}' does not exist on disk yet.")
            return

        valid_exts = {'.jpg', '.jpeg', '.png', '.gif', '.webp', '.pdf', '.zip', '.f3d', '.step', '.stp', '.stl'}
        media_list = project.setdefault("media", [])
        existing_files = {m.get("file") for m in media_list}

        found_count = 0
        for root, _, files in os.walk(target_dir):
            for f in sorted(files):
                ext = os.path.splitext(f)[1].lower()
                if ext in valid_exts:
                    full_p = os.path.join(root, f)
                    rel_p = os.path.relpath(full_p, target_dir).replace('\\', '/')
                    if rel_p not in existing_files:
                        ext_clean = ext.lstrip(".")
                        media_list.append({
                            "file": rel_p,
                            "title": clean_title(f),
                            "context": f"Technical artifact for {project.get('title', '')}.",
                            "category": detect_category(rel_p, ext_clean),
                            "type": ext_clean,
                            "size": format_size(os.path.getsize(full_p))
                        })
                        found_count += 1

        self.refresh_media_tree(media_list)
        self.refresh_project_list()
        self.proj_listbox.selection_set(self.current_idx)
        messagebox.showinfo("Scan Complete", f"Found and added {found_count} new file(s) from folder '{folder_name}'.")

    def edit_selected_media(self):
        if self.current_idx < 0:
            return
        sel = self.media_tree.selection()
        if not sel:
            messagebox.showinfo("Select File", "Please select a media file from the list to edit.")
            return

        m_idx = int(sel[0])
        media_list = self.projects[self.current_idx].get("media", [])
        if 0 <= m_idx < len(media_list):
            dialog = MediaEditDialog(self, media_list[m_idx])
            self.wait_window(dialog)
            if dialog.result:
                self.refresh_media_tree(media_list)

    def remove_selected_media(self):
        if self.current_idx < 0:
            return
        sel = self.media_tree.selection()
        if not sel:
            return
        m_idx = int(sel[0])
        media_list = self.projects[self.current_idx].get("media", [])
        if 0 <= m_idx < len(media_list):
            fname = media_list[m_idx].get("file", "")
            if messagebox.askyesno("Remove File", f"Remove '{fname}' from this project? (File on disk is not deleted)"):
                media_list.pop(m_idx)
                self.refresh_media_tree(media_list)
                self.refresh_project_list()
                self.proj_listbox.selection_set(self.current_idx)

    def save_all(self):
        self.save_current_form_to_model()
        if save_projects_data(self.projects):
            self.refresh_project_list()
            self.proj_listbox.selection_set(self.current_idx)
            messagebox.showinfo("Saved Successfully", "projects.js has been successfully updated!\n\nYour portfolio is now ready to preview or git commit & push.")
            self.status_var.set("Saved all changes to projects.js successfully!")


if __name__ == "__main__":
    app = PortfolioManagerApp()
    app.mainloop()
