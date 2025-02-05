function Header() {
  return (
    <header className="bg-white p-4 shadow-md">
      <h1 className="text-2xl font-bold">1 EUR to USD Exchange Rate</h1>
      {/* Last updated will have to ba variable */}
      <p className="text-sm text-gray-500">Last updated: 17.04.2023</p>
    </header>
  );
}

export default Header;