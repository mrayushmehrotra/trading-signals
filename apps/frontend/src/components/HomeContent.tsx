import React, { useState, useCallback, useEffect } from "react";
import {
  Zap,
  Activity,
  Mail,
  Users,
  LogIn,
  Twitter,
  Linkedin,
  Aperture,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  PixelatedBackground,
  PixelatedLeft,
  PixelatedRight,
} from "./pixelated-bg";
import TradingViewWidget from "./TradingViewWidget";

import {
  HEATMAP_WIDGET_CONFIG,
  MARKET_DATA_WIDGET_CONFIG,
  TOP_STORIES_WIDGET_CONFIG,
  MARKET_OVERVIEW_WIDGET_CONFIG,
} from "../lib/constants";
import { Link } from "@tanstack/react-router";

// --- Types ---
interface MarketDataPoint {
  name: string;
  uv: number;
  pv: number;
  amt: number;
}

interface SimpleLineChartProps {
  data: MarketDataPoint[];
  color: string;
  filled?: boolean;
}

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

// --- Mock Data ---
const mockMarketData: MarketDataPoint[] = [
  { name: "Jan", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Feb", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Mar", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Apr", uv: 2780, pv: 3908, amt: 2000 },
  { name: "May", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Jun", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Jul", uv: 3490, pv: 4300, amt: 2100 },
];

// --- Utility Components ---

const SimpleLineChart: React.FC<SimpleLineChartProps> = ({
  data,
  color,
  filled = true,
}) => {
  const width = 300;
  const height = 80;
  const padding = 10;

  if (!data || data.length === 0)
    return (
      <div className="h-20 w-full bg-gray-700/50 rounded-lg animate-pulse"></div>
    );

  const values = data.map((d) => d.pv);
  const maxVal = Math.max(...values);
  const minVal = Math.min(...values);

  const scaleY = (val: number): number => {
    if (maxVal === minVal) return height / 2;
    return (
      height -
      padding -
      ((val - minVal) / (maxVal - minVal)) * (height - 2 * padding)
    );
  };

  const scaleX = (index: number): number =>
    padding + (index / (data.length - 1)) * (width - 2 * padding);

  // Create simple line path
  const pathData = data
    .map((d, i) => {
      const x = scaleX(i);
      const y = scaleY(d.pv);
      return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    })
    .join(" ");

  // Create area path for fill
  const areaPath =
    data.length > 0
      ? `${pathData} L ${scaleX(data.length - 1)} ${height - padding} L ${scaleX(0)} ${height - padding} Z`
      : "";

  const gradientId = `chartGradient-${Math.random().toString(36).substring(2, 9)}`;
  const colorMap: Record<string, string> = {
    "teal-400": "#2dd4bf",
    "cyan-400": "#22d3ee",
    "blue-400": "#60a5fa",
    "green-400": "#4ade80",
  };
  const strokeColor = colorMap[color] || "#2dd4bf";

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
    >
      {filled && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={strokeColor} stopOpacity={0.4} />
            <stop offset="95%" stopColor={strokeColor} stopOpacity={0} />
          </linearGradient>
        </defs>
      )}

      {/* Background Fill */}
      {filled && areaPath && (
        <path d={areaPath} fill={`url(#${gradientId})`} opacity="0.6" />
      )}

      {/* Line Path */}
      <path
        d={pathData}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Latest Point Dot */}
      {data.length > 0 && (
        <circle
          cx={scaleX(data.length - 1)}
          cy={scaleY(data[data.length - 1].pv)}
          r="3"
          fill={strokeColor}
        />
      )}
    </svg>
  );
};

// SVG for the abstract brain graphic in the hero section
const HeroRightVideo = () => (
  <video
    autoPlay
    muted
    loop
    className="hidden lg:block border-[10px] border-zinc-800 rounded-md "
  >
    <img
      src="/assets/fallback-brain.png"
      alt="AI Brain Visualization"
      className="w-full h-full object-cover"
    />
    <source src="../../public/assets/videos/hero.mp4" type="video/mp4" />
  </video>
);

const Card: React.FC<CardProps> = ({ title, children, className = "" }) => (
  <div
    className={`p-6 bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-700/50 ${className}`}
  >
    {title && (
      <h3 className="text-sm font-semibold text-gray-400 mb-4">{title}</h3>
    )}
    {children}
  </div>
);

// --- Main App Component ---

export const HomeContent = () => {
  const [tslaData, setTslaData] = useState(mockMarketData);
  const [spData, setSpData] = useState(
    mockMarketData.map((d) => ({ ...d, pv: d.pv * 0.8 })),
  );
  const [marketData, setMarketData] = useState(
    mockMarketData.map((d) => ({ ...d, pv: d.pv * 1.2 })),
  );

  const updateCharts = useCallback(() => {
    // Update TSLA chart
    setTslaData((prev) => {
      const lastVal = prev[prev.length - 1].pv;
      const newVal = lastVal + (Math.random() - 0.5) * 800;
      return [
        ...prev.slice(1),
        { name: `T-${prev.length}`, uv: newVal, pv: newVal, amt: newVal },
      ];
    });

    // Update S&P 500 chart
    setSpData((prev) => {
      const lastVal = prev[prev.length - 1].pv;
      const newVal = lastVal + (Math.random() - 0.5) * 400;
      return [
        ...prev.slice(1),
        { name: `S-${prev.length}`, uv: newVal, pv: newVal, amt: newVal },
      ];
    });

    // Update Market Overview chart
    setMarketData((prev) => {
      const lastVal = prev[prev.length - 1].pv;
      const newVal = lastVal + (Math.random() - 0.5) * 600;
      return [
        ...prev.slice(1),
        { name: `M-${prev.length}`, uv: newVal, pv: newVal, amt: newVal },
      ];
    });
  }, []);

  const scriptUrl = `https://s3.tradingview.com/external-embedding/embed-widget-`;

  useEffect(() => {
    const interval = setInterval(updateCharts, 3000);
    return () => clearInterval(interval);
  }, [updateCharts]);

  return (
    <div className="min-h-screen bg-[#101010] text-gray-50 overflow-hidden font-inter antialiased p-4 sm:p-8">
      <PixelatedBackground
        className="z-1 absolute left-1/2 top-[-40px] h-auto w-fit min-w-[920px] -translate-x-1/2 object-cover"
        style={{
          mixBlendMode: "screen",
          maskImage: "linear-gradient(to bottom, black, transparent)",
        }}
      />
      <div className="max-w-7xl mx-auto">
        {/* Header/Navigation */}
        <header className="flex justify-between items-center p-4 bg-gray-900/50 rounded-2xl border border-gray-800 shadow-2xl shadow-gray-900/50">
          <div className="flex items-center space-x-2">
            <div className="bg-white p-2 rounded-full">
              <img
                src="favicon-32x32.png"
                alt="Signalist logo"
                width={140}
                height={32}
                className="h-8 w-auto cursor-pointer"
              />
            </div>
            <span className="text-xl font-bold text-gray-50">
              AI-Powered Signals
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-gray-300">
            <a
              href="mailto:support@signalist.ai"
              className="hover:text-cyan-400 space-x-2 flex items-center justify-center transition"
            >
              <Mail className="w-5 h-5" />
              <h1> Contact Us</h1>
            </a>

            <Link to="/sign-up">
              <Button
                size="lg"
                className="px-6 py-4 ml-4 text-white font-semibold bg-[#6BDE90] rounded-lg hover:bg-teal-300 transition shadow-md shadow-teal-400/30 flex items-center  "
              >
                Log In
                <LogIn className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </nav>
        </header>
        {/* Hero Section */}
        <div className="mt-16 mb-20 md:mb-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight tracking-tighter text-gray-50">
              Unlock Smarter Trades with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-500">
                AI-Driven
              </span>{" "}
              Insights
            </h1>
            <p className="text-lg text-gray-400 max-w-lg">
              Predict Market Trends, Maximize Your Portfolio, and Execute Trades
              Effortlessly with Cutting-Edge Intelligence.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link to="/sign-up">
                <Button
                  size="lg"
                  className="px-8 py-3 bg-[#6BDE90] text-white font-semibold rounded-xl hover:bg-teal-400 transition shadow-lg shadow-teal-500/50"
                >
                  Get Started Free
                </Button>
              </Link>
              <a href="#demodata">
                <Button
                  size="lg"
                  className="px-8 py-3 border border-gray-600 text-gray-50 font-semibold rounded-xl hover:bg-gray-700 transition"
                >
                  View More
                </Button>
              </a>
            </div>
          </div>

          <div className="relative h-64 lg:h-96 flex items-center justify-center">
            <div className="absolute inset-0 z-0 bg-cyan-900/10 rounded-full blur-3xl opacity-50 transform scale-150"></div>
            <div className="relative z-10 w-4/5">
              <HeroRightVideo />
            </div>
          </div>
        </div>
        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {/* Card 1: AI Real-Time Signal */}
          <PixelatedLeft
            className="absolute left-0 top-0 -z-10 hidden h-full w-auto -translate-x-full opacity-50 md:block"
            style={{ mixBlendMode: "screen" }}
          />
          <Card
            title="AI Real-Time Signal"
            className="md:col-span-2 lg:col-span-1"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-bold text-teal-400 uppercase">
                  STRONG BUY
                </p>
                <h4 className="text-2xl font-bold text-gray-50">
                  TSLA / Tesla Inc.
                </h4>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-teal-400">+0.86%</p>
                <p className="text-sm text-gray-400">Today</p>
              </div>
            </div>
            <div className="h-24 mt-4 -mx-2">
              <SimpleLineChart data={tslaData} color="teal-400" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Latest update: 10 seconds ago
            </p>
          </Card>

          {/* Card 2: Market Position Pulse */}
          <Card title="Market Position Pulse">
            <h4 className="text-2xl font-bold text-gray-50 mb-1">S&P 500</h4>
            <p className="text-lg text-gray-400 mb-4">5,000</p>
            <div className="h-24 -mx-2">
              <SimpleLineChart data={spData} color="cyan-400" />
            </div>
          </Card>

          <PixelatedRight
            className="absolute left-0 top-0 -z-10 hidden h-full w-auto -translate-x-full opacity-50 md:block"
            style={{ mixBlendMode: "screen" }}
          />
          {/* Card 3: Market Overview */}
          <Card title="Market Overview">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-2xl font-bold text-gray-50">88,331</h4>
              <p className="text-base font-semibold text-teal-400 flex items-center">
                <span className="text-xs mr-1">&#9650;</span> +0.28%
              </p>
            </div>
            <div className="h-24 -mx-2">
              <SimpleLineChart data={marketData} color="blue-400" />
            </div>
            <div className="flex justify-between text-sm mt-4 text-gray-400">
              <p>+62.39%</p>
              <p>-1.34%</p>
              <p>+2.90%</p>
            </div>
          </Card>

          {/* Card 4: Real-Time AI Signals (Tags) */}
          <Card title="Real-Time AI Signals" className="md:col-span-1">
            <div className="flex flex-wrap gap-2">
              <span className="tag bg-teal-600/50 text-teal-300 border border-teal-500/50">
                TSLA (Strong Buy)
              </span>
              <span className="tag bg-green-600/50 text-green-300 border border-green-500/50">
                TGT (Buy)
              </span>
              <span className="tag bg-yellow-600/50 text-yellow-300 border border-yellow-500/50">
                BABA (Hold)
              </span>
              <span className="tag bg-red-600/50 text-red-300 border border-red-500/50">
                AMC (Sell)
              </span>
              <span className="tag bg-indigo-600/50 text-indigo-300 border border-indigo-500/50">
                MSFT (Buy)
              </span>
              <span className="tag bg-red-800/50 text-red-300 border border-red-600/50">
                RIVN (Strong Sell)
              </span>
            </div>
          </Card>

          {/* Card 5: Personalized Insights (Chart Focus) */}
          <Card title="Personalized Insights">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-full bg-cyan-700/50 flex items-center justify-center p-2">
                <Activity className="w-full h-full text-cyan-300" />
              </div>
              <p className="text-sm text-gray-300">
                Weekly volatility data exceeds typical thresholds for your
                tracked sectors.
              </p>
              <button className="text-xs px-3 py-1 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg">
                Review
              </button>
            </div>
          </Card>

          {/* Card 6: Personalized Insights (User Focus) */}
          <Card title="Personalized Insights">
            <div className="flex items-start space-x-4">
              <img
                src="https://placehold.co/60x60/38bdf8/ffffff?text=U"
                alt="User Avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-cyan-500"
              />
              <div>
                <p className="text-gray-200 font-semibold">
                  Financial Planning Tool
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  Your portfolio rebalancing recommendation is ready for review.
                </p>
              </div>
              <div className="ml-auto p-2 bg-gray-700 rounded-lg text-cyan-400">
                <Users className="w-5 h-5" />
              </div>
            </div>
          </Card>
        </div>
        <main id="demodata" className="min-h-screen text-gray-400">
          <div className="container py-10">
            <div className="flex min-h-screen home-wrapper">
              <section className="grid w-full gap-8 home-section">
                <div className="md:col-span-1 xl:col-span-1">
                  <TradingViewWidget
                    title="AI-Powered Graphs"
                    scriptUrl={`${scriptUrl}market-overview.js`}
                    config={MARKET_OVERVIEW_WIDGET_CONFIG}
                    className="custom-chart"
                    height={600}
                  />
                </div>
                <div className="md-col-span xl:col-span-2">
                  <TradingViewWidget
                    title="AI based Stocks Selection"
                    scriptUrl={`${scriptUrl}stock-heatmap.js`}
                    config={HEATMAP_WIDGET_CONFIG}
                    height={600}
                  />
                </div>
              </section>
              <section className="grid w-full gap-8 home-section">
                <div className="h-full md:col-span-1 xl:col-span-1">
                  <TradingViewWidget
                    scriptUrl={`${scriptUrl}timeline.js`}
                    config={TOP_STORIES_WIDGET_CONFIG}
                    height={600}
                  />
                </div>
                <div className="h-full md:col-span-1 xl:col-span-2">
                  <TradingViewWidget
                    scriptUrl={`${scriptUrl}market-quotes.js`}
                    config={MARKET_DATA_WIDGET_CONFIG}
                    height={600}
                  />
                </div>
              </section>
            </div>
          </div>
        </main>
        {/* Footer */}
        <footer className="pt-10 border-t border-gray-800/70">
          <div className="flex flex-row md:flex-row justify-between items-center text-gray-400 text-sm">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Zap className="w-5 h-5 text-cyan-400" />
              <span className="text-gray-300">
                AI-Powered Signals to maximize your portfolio
              </span>
            </div>
          </div>
          <p className="text-center text-xs text-gray-600 mt-6 pb-4">
            &copy; 2025 AI-Powered Signals. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};
