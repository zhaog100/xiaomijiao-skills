# -*- coding: utf-8 -*-
"""
List Bounties Management Command

Usage:
    python manage.py list_bounties
    python manage.py list_bounties --status evaluated --min-roi 50
    python manage.py list_bounties --platform github
"""

from django.core.management.base import BaseCommand, CommandError
import argparse


class Command(BaseCommand):
    help = 'Filter and list bounties'

    def add_arguments(self, parser):
        parser.add_argument(
            '--status',
            type=str,
            choices=['new', 'evaluated', 'selected', 'solving', 'submitted', 'paid', 'all'],
            default='all',
            help='Filter by status (default: all)'
        )
        parser.add_argument(
            '--platform',
            type=str,
            choices=['github', 'algora', 'opire', 'all'],
            default='all',
            help='Filter by platform (default: all)'
        )
        parser.add_argument(
            '--min-roi',
            type=int,
            default=0,
            help='Minimum ROI score (default: 0)'
        )
        parser.add_argument(
            '--limit',
            type=int,
            default=20,
            help='Maximum number of bounties to list (default: 20)'
        )

    def handle(self, *args, **options):
        status = options['status']
        platform = options['platform']
        min_roi = options['min_roi']
        limit = options['limit']
        
        self.stdout.write(self.style.SUCCESS(f'📋 Listing bounties...'))
        self.stdout.write(f'Status: {status}')
        self.stdout.write(f'Platform: {platform}')
        self.stdout.write(f'Min ROI: {min_roi}')
        self.stdout.write(f'Limit: {limit}')
        
        # TODO: Implement actual listing logic
        # This should:
        # 1. Get all bounties from database
        # 2. Filter by status, platform, min_roi
        # 3. Sort by ROI/payout/date
        # 4. Display formatted list
        
        self.stdout.write(self.style.SUCCESS(f'✅ Listed 0 bounties (placeholder - implement listing logic)'))
