import {
  LayoutDashboard,
  Users,
  Smartphone,
  FileText,
  BookOpen,
  UserCheck,
  Settings,
  Shield,
} from 'lucide-react';

const menuItems = [
  { title: 'Dashboard', url: '/admin', icon: LayoutDashboard },
  { title: 'Người dùng', url: '/admin/users', icon: Users },
  { title: 'Thiết bị', url: '/admin/devices', icon: Smartphone },
  { title: 'Hồ sơ', url: '/admin/profiles', icon: UserCheck },
  { title: 'Vai trò', url: '/admin/roles', icon: Shield },
  { title: 'Bài viết', url: '/admin/posts', icon: FileText },
  { title: 'Hướng dẫn', url: '/admin/tutorials', icon: BookOpen },
  { title: 'Cài đặt', url: '/admin/settings', icon: Settings },
];

export default function Navbar() {
  return (
    <div className="flex h-screen w-64 flex-col border-r bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center space-x-2 border-b border-white/10 px-4 py-4">
        <Shield className="h-6 w-6" />
        <span className="text-lg font-semibold">Admin Panel</span>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 pt-4 text-sm font-semibold text-gray-400">
          Quản lý
        </div>
        <nav className="mt-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.url}
                className="flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition hover:bg-white/10"
              >
                <Icon className="h-4 w-4" />
                <span>{item.title}</span>
              </a>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="border-t border-white/10 px-4 py-4 text-sm text-gray-500">
        Admin Dashboard v1.0
      </div>
    </div>
  );
}
