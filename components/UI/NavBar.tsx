import Link from "next/link";

interface NavBarProps {
    route: string;
}

const NavBar = ({ route }: NavBarProps) => {
  return (
    <nav className="pl-5 dark:text-dm-light-primary dark:bg-dm-dark-primary p-2 flex items-center">
      <div className="flex items-center">
        <Link href="/">
          <h1 className="text-3xl font-bold">Ñumi.xyz <span className="text-xl">/{route}</span></h1>
        </Link>
        <button></button>
      </div>
    </nav>
  );
};

export default NavBar;
