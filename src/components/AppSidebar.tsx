import { Fuel, Truck, Home } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
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
import LogoImage from '@/assets/images/Prancheta-4@4x-1030x229.png'

const items = [
	{ title: "Dashboard Principal", url: "/", icon: Home },
	{ title: "Posto de Combustível", url: "/posto", icon: Fuel },
	{ title: "Distribuidora", url: "/distribuidora", icon: Truck },
];

export function AppSidebar() {
	const { state } = useSidebar();
	const location = useLocation();
	const currentPath = location.pathname;

	const getNavCls = ({ isActive }: { isActive: boolean }) => 
		isActive
			? "text-primary font-medium bg-red-900"
			: "hover:bg-accent";


	const isCollapsed = state === "collapsed";

	return (
		<Sidebar className={isCollapsed ? "w-14" : "w-64"} collapsible="icon">
			<SidebarContent className="bg-card border-r">
				<div className="p-4 border-b">
					<div className="flex items-center gap-4 align-center">
						<img src={LogoImage} alt="Logo marca da empresa" className="w-32" />
					</div>
				</div>

				<SidebarGroup>
					<SidebarGroupContent className="m-1">
						<SidebarMenu className="space-y-1">
							{items.map((item) => (
								<SidebarMenuItem key={item.title}  >
									<SidebarMenuButton asChild >
										<NavLink to={item.url} end className={getNavCls}>
											<item.icon className="h-4 w-4" />
											{!isCollapsed && <span>{item.title}</span>}
										</NavLink>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
		</Sidebar>
	);
}
