import { ZardIcon } from '../components/icon/icons';

interface ProjectSubMenu {
  label: string;
  imageUrl: string; // image for submenu item
}
interface MenuItem {
  icon: ZardIcon;
  label: string;
  link?: string;
  projectsMenu?: ProjectSubMenu[];
}

export const menuItems: MenuItem[] = [
  { icon: 'layout-dashboard', label: 'Dashboard', link: '/dashboard' },
  {
    icon: 'folder',
    label: 'Projects',
    projectsMenu: [],
  },
  { icon: 'circle-check', label: 'Tasks', link: 'dashboard/tasks' },
  { icon: 'users', label: 'Members', link: 'dashboard/members' },
  { icon: 'settings', label: 'Settings', link: 'dashboard/settings' },
];
