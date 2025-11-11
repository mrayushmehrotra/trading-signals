declare global {
  interface User {
    id: string;
    email: string;
    name: string;
    country?: string;
    investmentGoals?: string;
    riskTolerance?: string;
    preferredIndustry?: string;
  }

  interface SignUpFormData {
    email: string;
    password: string;
    fullName: string;
    country: string;
    investmentGoals: string;
    riskTolerance: string;
    preferredIndustry: string;
  }

  interface SignInFormData {
    email: string;
    password: string;
  }

  interface Stock {
    symbol: string;
    description: string;
    displaySymbol: string;
    type: string;
  }

  interface StockWithWatchlistStatus {
    symbol: string;
    name: string;
    exchange: string;
    type: string;
    isInWatchlist: boolean;
  }

  interface WatchlistItem {
    _id: string;
    userId: string;
    symbol: string;
    addedAt: Date;
  }

  interface SearchCommandProps {
    renderAs?: "button" | "text";
    label?: string;
    initialStocks: StockWithWatchlistStatus[];
  }

  interface StockDetailsPageProps {
    params: Promise<{ symbol: string }>;
  }
}

export {};

