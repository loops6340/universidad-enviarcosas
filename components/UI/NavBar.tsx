interface NavBarProps {
    route: string;
}

const NavBar = ({ route }: NavBarProps) => {
  return (
    <nav className="pl-5 text-darkmode-light-primary bg-darkmode-dark-primary p-2 flex items-center">
      <div className="flex items-center">
        <h1 className="text-3xl font-bold">Ñumi.xyz <span className="text-xl">/{route}</span></h1>
        <button></button>
      </div>
    </nav>
  );
};

export default NavBar;
