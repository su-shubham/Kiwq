export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  badge?: string;
  subItems?: {
    id: string;
    label: string;
    path: string;
  }[];
}

export interface SidebarSection {
  title: string;
  items: MenuItem[];
}