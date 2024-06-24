import Link from "next/link";
import { settingsSideBar } from "~/server/queries";

interface TieredItem {
  id: number;
  label: string;
  href: string;
  children?: TieredItem[]; // array of children
};

async function getData() {
  let data = await settingsSideBar(2);
  let list = data[0];
  for (const item of list) {
    if (item.children) {
      item.children = JSON.parse(item.children).children;
    };
  };
  return list;
};

// ListItem component
const ListItem: React.FC<{ item: TieredItem }> = ({ item }) => {
  return (
    <li>
      
      <Link href={item.href}>{item.label}</Link>
      {/* Recursively render children if they exist */}
      {item.children && item.children?.length >= 1 && (
        <ul className = " ml-5">
          {item.children.map((child: any) => (
            <ListItem key={child.id} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

// Nav component
const Nav: React.FC = async () => {
  const data = await getData()

  return (
    <ul>
      {data.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
};

export default async function Sidebar() {

  return (
    <nav className="items-center justify-between border-b p-2 m-5 text-xl font-semibold bg-muted/40 rounded-lg w-60">
      <div>
        
      </div>
      <Nav />
    </nav>
  );
};