# -*- coding: utf-8 -*-
"""
Cleanup Management Command

Usage:
    python manage.py cleanup
    python manage.py cleanup --older-than 90
    python manage.py cleanup --status rejected --dry-run
"""

from django.core.management.base import BaseCommand, CommandError
import argparse
from datetime import datetime, timedelta


class Command(BaseCommand):
    help = 'Clean up old rejected/expired bounties'

    def add_arguments(self, parser):
        parser.add_argument(
            '--older-than',
            type=int,
            default=90,
            help='Clean up bounties older than N days (default: 90)'
        )
        parser.add_argument(
            '--status',
            type=str,
            choices=['rejected', 'expired', 'abandoned', 'all'],
            default='all',
            help='Clean up specific status (default: all)'
        )
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='Show what would be cleaned up without actually deleting'
        )

    def handle(self, *args, **options):
        older_than = options['older_than']
        status = options['status']
        dry_run = options['dry_run']
        
        cutoff_date = datetime.now() - timedelta(days=older_than)
        
        self.stdout.write(self.style.SUCCESS(f'🧽 Running cleanup...'))
        self.stdout.write(f'Older than: {older_than} days')
        self.stdout.write(f'Cutoff date: {cutoff_date.strftime("%Y-%m-%d")}')
        self.stdout.write(f'Status filter: {status}')
        self.stdout.write(f'Dry run: {dry_run}')
        
        # TODO: Implement actual cleanup logic
        # This should:
        # 1. Find old rejected/expired bounties
        # 2. Display what will be deleted (dry run)
        # 3. Confirm deletion
        # 4. Delete and log
        
        self.stdout.write(self.style.SUCCESS(f'✅ Cleanup completed! (placeholder - implement cleanup logic)'))
