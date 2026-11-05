#!/usr/bin/env python3
"""
JAIN SET Digital Portal - Automated Python Backup Script
Author: Student Presentation Project
Description: Archives the full frontend/backend source code, components, public assets, 
             configurations, and generates a structured manifest report for evaluation.
"""

import os
import sys
import json
import zipfile
from datetime import datetime

# Configuration
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKUP_OUTPUT_DIR = os.path.join(WORKSPACE_DIR, 'backups')
EXCLUDE_DIRS = {'node_modules', '.git', 'dist', '.cache', '__pycache__', 'backups'}
EXCLUDE_FILES = {'.DS_Store', 'package-lock.json'}

def get_project_stats():
    """Calculates statistics of the codebase files."""
    total_files = 0
    total_lines = 0
    total_bytes = 0
    file_breakdown = {}

    for root, dirs, files in os.walk(WORKSPACE_DIR):
        dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
        for file in files:
            if file in EXCLUDE_FILES or file.endswith('.zip'):
                continue
            filepath = os.path.join(root, file)
            relpath = os.path.relpath(filepath, WORKSPACE_DIR)
            ext = os.path.splitext(file)[1] or 'other'
            
            size = os.path.getsize(filepath)
            total_bytes += size
            total_files += 1

            lines = 0
            if ext in ['.tsx', '.ts', '.js', '.jsx', '.json', '.css', '.html', '.py', '.md']:
                try:
                    with open(filepath, 'r', encoding='utf-8', errors='ignore') as f:
                        lines = len(f.readlines())
                except Exception:
                    lines = 0
            total_lines += lines

            if ext not in file_breakdown:
                file_breakdown[ext] = {'count': 0, 'size_bytes': 0, 'lines': 0}
            file_breakdown[ext]['count'] += 1
            file_breakdown[ext]['size_bytes'] += size
            file_breakdown[ext]['lines'] += lines

    return {
        'total_files': total_files,
        'total_lines': total_lines,
        'total_bytes': total_bytes,
        'total_size_mb': round(total_bytes / (1024 * 1024), 2),
        'breakdown': file_breakdown
    }

def create_backup():
    """Executes full Python backup and outputs zip file + JSON manifest."""
    os.makedirs(BACKUP_OUTPUT_DIR, exist_ok=True)
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    zip_filename = f"jain_set_portal_backup_{timestamp}.zip"
    zip_filepath = os.path.join(BACKUP_OUTPUT_DIR, zip_filename)

    print("=" * 60)
    print("🚀 JAIN SET PORTAL - PYTHON BACKUP ENGINE")
    print("=" * 60)
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Destination: {zip_filepath}\n")

    archived_files = []
    with zipfile.ZipFile(zip_filepath, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(WORKSPACE_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                if file in EXCLUDE_FILES or file.endswith('.zip'):
                    continue
                filepath = os.path.join(root, file)
                arcname = os.path.relpath(filepath, WORKSPACE_DIR)
                zipf.write(filepath, arcname)
                archived_files.append(arcname)
                print(f"  [+ Archived] {arcname}")

    stats = get_project_stats()
    manifest = {
        'project_name': 'JAIN SET Digital Portal & Orientation Experience',
        'backup_timestamp': timestamp,
        'backup_file': zip_filename,
        'statistics': stats,
        'tech_stack': {
            'frontend': ['React 19', 'TypeScript', 'Tailwind CSS v4', 'Motion (Framer Motion)', 'Lucide Icons', 'Vite 6'],
            'backend_scripting': ['Python 3 (Zipfile, OS, JSON, Datetime)', 'Node.js / Express Engine', 'Vite Build System'],
            'architecture': 'Single-Page Interactive Application with Spotlight Shaders & Dynamic Orientation Portal'
        },
        'archived_file_list': archived_files
    }

    manifest_path = os.path.join(BACKUP_OUTPUT_DIR, f"manifest_{timestamp}.json")
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(manifest, f, indent=2)

    zip_size_mb = round(os.path.getsize(zip_filepath) / (1024 * 1024), 2)

    print("\n" + "=" * 60)
    print("✅ BACKUP COMPLETED SUCCESSFULLY!")
    print("=" * 60)
    print(f"📦 Total Files Compressed: {len(archived_files)}")
    print(f"📊 Total Code Lines: {stats['total_lines']}")
    print(f"💾 Zip Archive Size: {zip_size_mb} MB")
    print(f"📄 Manifest File: {manifest_path}")
    print("=" * 60 + "\n")

if __name__ == '__main__':
    create_backup()
