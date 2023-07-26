"use client";

import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.sellerId}`,
      label: `Home`,
      active: pathname === `/${params.sellerId}`,
    },
    {
      href: `/${params.sellerId}/products`,
      label: "Products",
      active: pathname === `/${params.sellerId}/products`,
    },
    {
      href: `/${params.sellerId}/models3d`,
      label: "Models 3D",
      active: pathname === `/${params.sellerId}/models3d`,
    },
    {
      href: `/${params.sellerId}/settings`,
      label: `Settings`,
      active: pathname === `/${params.sellerId}/settings`,
    },
  ];
  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors duration-200 hover:text-primary",
            route.active ? "text-back dark:text-white" : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
}
