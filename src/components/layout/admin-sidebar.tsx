import React, { useState } from 'react';
import { MAIN_NAVIGATION, NavigationItem } from '../../config/navigation';
import { cn } from '../../lib/utils';
import { 
  LayoutDashboard, 
  Globe, 
  Users, 
  LayoutGrid, 
  FileText, 
  BookOpen, 
  HelpCircle, 
  Compass, 
  Search, 
  Image, 
  ListTodo, 
  ChevronDown, 
  ChevronRight, 
  Zap, 
  Cpu,
  Building2,
  ShieldCheck,
  Package,
  Settings,
  Terminal
} from 'lucide-react';

// Dynamic icon lookup map to maintain standard imports
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  Globe,
  Users,
  LayoutGrid,
  FileText,
  BookOpen,
  HelpCircle,
  Compass,
  Search,
  Image,
  ListTodo,
  Cpu,
  Building2,
  ShieldCheck,
  Package,
  Settings,
  Terminal,
};

interface AdminSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function AdminSidebar({ currentPath, onNavigate }: AdminSidebarProps) {
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({
    '/web': true, // Keep Web Management expanded by default
  });

  const toggleGroup = (path: string) => {
    setExpandedGroups((prev) => ({
      ...prev,
      [path]: !prev[path],
    }));
  };

  const renderNavIcon = (iconName: string, active: boolean) => {
    const IconComponent = ICON_MAP[iconName];
    if (!IconComponent) return null;
    return <IconComponent className={cn('h-4 w-4 transition-all', active ? 'text-indigo-600' : 'text-slate-400')} />;
  };

  return (
    <aside className="w-64 border-r border-slate-200 bg-white h-screen flex flex-col shrink-0 select-none">
      {/* Top Brand Block */}
      <div className="h-16 flex items-center px-6 border-b border-slate-100 justify-between shrink-0">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('/')}>
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xs italic shadow-[0_4px_12px_rgba(79,70,229,0.15)]">
            B
          </div>
          <span className="font-bold text-base text-slate-900 tracking-tight">Bortesoft <span className="text-indigo-600 text-sm">Admin</span></span>
        </div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
        <div className="space-y-1.5">
          {MAIN_NAVIGATION.map((item) => {
            const isGroup = !!item.children;
            const isGroupActive = currentPath.startsWith(item.path);
            const isExpanded = !!expandedGroups[item.path];
            const isDirectActive = currentPath === item.path;

            if (isGroup) {
              return (
                <div key={item.path} className="space-y-1">
                  {/* Parent trigger */}
                  <button
                    onClick={() => {
                      toggleGroup(item.path);
                      onNavigate(item.path); // Navigate to main page too
                    }}
                    className={cn(
                      'w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer',
                      isGroupActive && 'text-slate-900 bg-slate-50'
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      {renderNavIcon(item.iconName, isGroupActive)}
                      <span>{item.label}</span>
                    </div>
                    {isExpanded ? (
                      <ChevronDown className="h-3 w-3 text-slate-400" />
                    ) : (
                      <ChevronRight className="h-3 w-3 text-slate-400" />
                    )}
                  </button>

                  {/* Children Links */}
                  {isExpanded && (
                    <div className="pl-6 space-y-1 border-l border-slate-100 ml-5 mt-1">
                      {item.children?.map((child) => {
                        const isChildActive = currentPath === child.path;
                        return (
                          <button
                            key={child.path}
                            onClick={() => onNavigate(child.path)}
                            className={cn(
                              'w-full flex items-center justify-between px-3.5 py-1.5 rounded-md text-xs font-medium tracking-tight transition-all text-slate-400 hover:text-slate-900 hover:bg-slate-50 cursor-pointer',
                              isChildActive && 'text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100/10 shadow-[0_1px_2px_rgba(0,0,0,0.01)]'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              {renderNavIcon(child.iconName, isChildActive)}
                              <span>{child.label}</span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={cn(
                  'w-full flex items-center justify-between px-3.5 py-2 rounded-lg text-xs font-semibold tracking-tight transition-all text-slate-500 hover:text-slate-900 hover:bg-slate-50 cursor-pointer',
                  isDirectActive && 'text-indigo-700 font-semibold bg-indigo-50 border border-indigo-100/10 shadow-[0_1px_2px_rgba(0,0,0,0.01)]'
                )}
              >
                <div className="flex items-center gap-2.5">
                  {renderNavIcon(item.iconName, isDirectActive)}
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[9px] bg-indigo-600 text-white font-bold px-1.5 py-0.5 rounded-full uppercase scale-90">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Bottom Footer User Panel */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <div className="flex items-center gap-3 bg-slate-50 p-2 rounded-lg w-full">
          <div className="h-8 w-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 text-xs font-bold font-mono shrink-0">
            SY
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-semibold truncate text-slate-800 leading-tight">Admin Kullanıcı</p>
            <p className="text-[10px] text-slate-500 truncate mt-0.5">admin@bortesoft.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
