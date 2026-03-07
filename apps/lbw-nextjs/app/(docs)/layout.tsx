import Link from "next/link";

import { DocsSearch } from "@/components/docs/search";
import { DocsSidebarNav } from "@/components/docs/sidebar-nav";
import Navbar from "@/components/layout/navbar";
import { SiteFooter } from "@/components/layout/footer";
import { Icons } from "@/components/shared/icons";
import { docsConfig } from "@/config/docs";

interface DocsLayoutProps {
  children: React.ReactNode;
}

const rightHeader = () => (
  <div className="flex flex-1 items-center space-x-4 sm:justify-end">
    <div className="hidden lg:flex lg:grow-0">
      <DocsSearch />
    </div>
    <div className="flex lg:hidden">
      <Icons.search className="size-6 text-muted-foreground" />
    </div>
    <nav className="flex space-x-4">
      {/* <Link
        href={siteConfig.links.github}
        target="_blank"
        rel="noreferrer"
      >
        <Icons.gitHub className="size-7" />
        <span className="sr-only">GitHub</span>
      </Link> */}
    </nav>
  </div>
);

export default async function DocsLayout({ children }: DocsLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar items={docsConfig.mainNav} rightElements={rightHeader()}>
        <DocsSidebarNav items={docsConfig.sidebarNav} />
      </Navbar>
      <div className="container flex-1">{children}</div>
      <SiteFooter className="border-t" />
    </div>
  );
}
