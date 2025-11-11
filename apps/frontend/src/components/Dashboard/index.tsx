import { SidebarSeparator } from "../ui/seperator";
import Sidebar, { SidebarAvatar, SidebarItem } from "../ui/sidebar";
import {
  LayoutDashboard,
  LineChart,
  Wallet,
  Bot,
  Settings,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen w-screen bg-[#0f0f11] text-white">
      {/* Sidebar */}
      <Sidebar className="w-[20%] bg-[#111214] border-r border-zinc-800 py-4">
        <SidebarAvatar
          User={{
            name: "Ayush",
            email: "ayush@signalist.ai",
            emailVerified: true,
            createdAt: "2023-01-01",
          }}
        />
        <SidebarSeparator />
        <div className="flex flex-col items-center gap-4">
          <SidebarItem active icon={LayoutDashboard} link="/dashboard">
            <span className="text-xs mt-1">Dashboard</span>
          </SidebarItem>
          <SidebarItem icon={LineChart} link="/markets">
            <span className="text-xs mt-1">Markets</span>
          </SidebarItem>
          <SidebarItem icon={Wallet} link="/portfolio">
            <span className="text-xs mt-1">Portfolio</span>
          </SidebarItem>
          <SidebarItem icon={Bot} link="/ai-chat">
            <span className="text-xs mt-1">AI Chat</span>
          </SidebarItem>
          <SidebarItem icon={Settings} link="/settings">
            <span className="text-xs mt-1">Settings</span>
          </SidebarItem>
        </div>
      </Sidebar>

      {/* Main Dashboard */}
      <main className="flex-1 p-6 overflow-y-auto grid grid-cols-12 gap-6">
        {/* AI Top Signal */}
        <section className="col-span-5 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            AI Top Signal of the Day
          </h2>
          <div className="flex flex-col gap-3">
            <span className="bg-green-600/20 text-green-400 px-2 py-1 rounded-md text-xs w-fit">
              STRONG BUY
            </span>
            <h3 className="text-lg font-bold">TSLA / Tesla Inc.</h3>
            <div className="text-sm text-zinc-400">Confidence: 95%</div>
            <div className="text-sm text-zinc-400">
              Target: $235 | Stop Loss: $205
            </div>
            <button className="mt-3 bg-green-500 hover:bg-green-600 text-black font-semibold py-2 px-4 rounded-lg">
              Execute Trade
            </button>
          </div>
        </section>

        {/* Portfolio Health */}
        <section className="col-span-3 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            Portfolio Health
          </h2>
          <div className="flex flex-col items-center justify-center h-full">
            <span className="text-green-400 text-3xl font-bold">+18.2%</span>
            <span className="text-zinc-400 text-sm mt-1">PBL</span>
          </div>
        </section>

        {/* AI Sector Sentiment */}
        <section className="col-span-4 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            AI Sector Sentiment
          </h2>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-blue-600/20 text-blue-400 p-2 rounded-md">
              Tech
            </div>
            <div className="bg-green-600/20 text-green-400 p-2 rounded-md">
              Finance
            </div>
            <div className="bg-red-600/20 text-red-400 p-2 rounded-md">
              Energy
            </div>
            <div className="bg-green-600/20 text-green-400 p-2 rounded-md">
              Strong Buy
            </div>
            <div className="bg-green-600/20 text-green-400 p-2 rounded-md">
              Buy
            </div>
            <div className="bg-yellow-600/20 text-yellow-400 p-2 rounded-md">
              Hold
            </div>
          </div>
        </section>

        {/* AI Sector Alerts & News */}
        <section className="col-span-5 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            AI Sector Alerts & News Feed
          </h2>
          <div className="space-y-2 text-sm text-zinc-400">
            <p>📈 Tesla surges after strong quarterly results.</p>
            <p>⚡ Green Energy Tech rises amid AI sector optimism.</p>
            <p>🏦 Finance sector shows steady recovery trend.</p>
          </div>
        </section>

        {/* AI Signal Breakdown */}
        <section className="col-span-3 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            AI Signal Breakdown
          </h2>
          <div className="text-sm text-zinc-400 space-y-1">
            <p>Technical Analysis ↑</p>
            <p>AAPL — Hold (7/10)</p>
            <p>GOOGL — Sell (8/10)</p>
          </div>
        </section>

        {/* AI Personalized Insights */}
        <section className="col-span-4 bg-[#151619] rounded-2xl p-5 border border-zinc-800">
          <h2 className="text-sm font-semibold mb-3 text-zinc-400">
            AI Personalized Insights
          </h2>
          <div className="text-sm text-zinc-400">
            <p>
              Based on your portfolio, consider focusing on Green Energy Tech
              and AI Growth Startups.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
