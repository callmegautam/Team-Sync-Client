import { ZardIcon } from '../components/icon/icons';

interface MenuItem {
  icon: ZardIcon;
  label: string;
  link?: string;
  submenu?: { label: string; icon: ZardIcon }[];
}

export const menuItems: MenuItem[] = [
  { icon: 'layout-dashboard', label: 'Dashboard', link: '/dashboard' },
  {
    icon: 'folder',
    label: 'Projects',
    submenu: [
      { icon: 'folder', label: 'Design System' },
      { icon: 'folder', label: 'Mobile App' },
      { icon: 'folder', label: 'Website' },
    ],
  },
  { icon: 'circle-check', label: 'Tasks', link: 'dashboard/tasks' },
  { icon: 'users', label: 'Members', link: 'dashboard/members' },
  { icon: 'settings', label: 'Settings', link: 'dashboard/settings' },
];
