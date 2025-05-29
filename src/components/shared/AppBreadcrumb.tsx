// src/components/custom/AppBreadcrumb.tsx
import React from "react";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BreadcrumbPath {
  label: string;
  href?: string;
}

interface AppBreadcrumbProps {
  paths: BreadcrumbPath[];
  wrapperDivClassName?: string;
  navClassName?: string;
  activeItemClassName?: string;
  linkClassName?: string;
}

const AppBreadcrumb: React.FC<AppBreadcrumbProps> = ({
  paths,
  wrapperDivClassName,
  navClassName,
  activeItemClassName,
  linkClassName,
}) => {
  if (!paths || paths.length === 0) {
    return null;
  }

  return (
    <div className={wrapperDivClassName}>
      <div className="max-w-7xl mx-auto px-4 text-black font-bold">
        <Breadcrumb className={navClassName}>
          <BreadcrumbList>
            {paths.map((path, index) => {
              const isLastItem = index === paths.length - 1;
              return (
                <React.Fragment key={path.label + index}>
                  <BreadcrumbItem>
                    {isLastItem ? (
                      <BreadcrumbPage className={activeItemClassName}>
                        {path.label}
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink
                        href={path.href || "#"}
                        className={linkClassName}
                      >
                        {path.label}
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                  {!isLastItem && <BreadcrumbSeparator />}
                </React.Fragment>
              );
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </div>
  );
};

export default AppBreadcrumb;
