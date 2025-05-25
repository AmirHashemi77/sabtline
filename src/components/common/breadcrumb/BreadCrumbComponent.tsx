import { Slash } from "lucide-react";
import { Fragment, type FC } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../../ui/breadcrumb";

interface PropsType {
  items: {
    label: string;
    link: string;
  }[];
}

const BreadCrumbComponent: FC<PropsType> = ({ items }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, indx) => {
          return (
            <Fragment key={item.label}>
              <BreadcrumbItem>
                {indx < items.length - 1 && <BreadcrumbLink href={item.link}>{item.label}</BreadcrumbLink>}
                {indx === items.length - 1 && <BreadcrumbPage>{item.label}</BreadcrumbPage>}
              </BreadcrumbItem>
              {indx < items.length - 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
export default BreadCrumbComponent;
