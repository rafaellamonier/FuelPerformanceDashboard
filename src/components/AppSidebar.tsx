import { Fuel, Truck, Home } from "lucide-react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import LogoImage from "@/assets/images/Prancheta-4@4x-1030x229.png";

const items = [
  { title: "Dashboard Principal", url: "/", icon: Home },
  { title: "Posto de Combustível", url: "/posto", icon: Fuel },
  { title: "Distribuidora", url: "/distribuidora", icon: Truck },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const pathname = location.pathname;
  const isCollapsed = state === "collapsed";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
      <SidebarContent className="bg-card border-r">
        <Link className="p-4 border-b" to="/">
          <div
            className={isCollapsed ? "" : "flex items-center justify-center"}
          >
            <img src={LogoImage} alt="Logo marca da empresa" className="w-32" />
          </div>
        </Link>

        <SidebarGroup>
          <SidebarGroupContent className="m-1">
            <SidebarMenu className="space-y-1">
              {items.map((item) => {
                const isActive = pathname === item.url;

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        end
                        className={`
                          flex items-center gap-2 px-3 py-2 rounded-md transition-all
                          ${isActive ? "bg-accent text-primary font-medium" : "hover:bg-accent"}
                        `}
                      >
                        <item.icon className="h-4 w-4" />
                        {!isCollapsed && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
