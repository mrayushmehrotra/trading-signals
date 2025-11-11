import { Link } from "@tanstack/react-router";
import NavItems from "./NavItems";
import UserDropdown from "./UserDropdown";
import { apiClient } from "../lib/api";
import { useEffect, useState } from "react";

const Header = ({ user }: { user: User }) => {
  const [initialStocks, setInitialStocks] = useState<
    StockWithWatchlistStatus[]
  >([]);

  useEffect(() => {
    const loadStocks = async () => {
      try {
        const stocks = await apiClient.searchStocks();
        setInitialStocks(stocks);
      } catch (error) {
        console.error("Failed to load stocks:", error);
      }
    };
    loadStocks();
  }, []);

  return (
    <header className="sticky top-0 header">
      <div className="container header-wrapper">
        <div className="bg-white rounded-full p-2">
          <Link to="/">
            <img
              src="favicon-32x32.png"
              alt="Signalist logo"
              width={140}
              height={32}
              className="h-8 w-auto cursor-pointer"
            />
          </Link>
        </div>

        <nav className="hidden sm:block">
          <NavItems initialStocks={initialStocks} />
        </nav>

        <UserDropdown user={user} initialStocks={initialStocks} />
      </div>
    </header>
  );
};
export default Header;
