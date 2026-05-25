import { useState } from "react";

type Screen = "dashboard" | "add" | "detail";
type Sub = { name: string; cost: string; cycle: string; next: string };

const SUBSCRIPTIONS: Sub[] = [
  { name: "Netflix", cost: "$15.99", cycle: "Monthly", next: "Jun 10" },
  { name: "Spotify", cost: "$9.99", cycle: "Monthly", next: "Jun 15" },
  { name: "iCloud+", cost: "$2.99", cycle: "Monthly", next: "Jun 22" },
];

function Box({ children, className = "", onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className={`border border-gray-400 bg-gray-100 ${onClick ? "cursor-pointer hover:bg-gray-200 active:bg-gray-300 transition-colors" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function Divider({ dashed = false }: { dashed?: boolean }) {
  return <div className={`border-t ${dashed ? "border-dashed" : ""} border-gray-300 my-2`} />;
}

function WireBtn({
  children,
  onClick,
  className = "",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full border-2 border-gray-500 bg-gray-200 py-2.5 text-xs font-mono font-bold text-gray-700 tracking-widest hover:bg-gray-300 active:bg-gray-400 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

function DashboardScreen({ onNav }: { onNav: (s: Screen, sub?: Sub) => void }) {
  const total = SUBSCRIPTIONS.reduce((acc, s) => acc + parseFloat(s.cost.replace("$", "")), 0).toFixed(2);

  return (
    <div className="flex flex-col h-full font-mono overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-600 px-4 pt-4 pb-3 text-center">
        <div className="text-base font-bold text-gray-800 tracking-[0.2em]">[ SPENDORA ]</div>
        <div className="text-[10px] text-gray-400 tracking-widest mt-0.5">SUBSCRIPTION TRACKER</div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 flex-1">
        {/* Total spend */}
        <Box className="p-4 text-center">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">Total Monthly Spend</div>
          <div className="text-3xl font-bold text-gray-800 mt-1 tracking-tight">${total}</div>
          <div className="text-[10px] text-gray-400 mt-1">3 active subscriptions</div>
        </Box>

        <Divider dashed />

        {/* Subscriptions list */}
        <div className="text-[10px] text-gray-500 uppercase tracking-widest">Subscriptions</div>

        <div className="flex flex-col gap-2">
          {SUBSCRIPTIONS.map((sub) => (
            <Box
              key={sub.name}
              className="px-3 py-2.5"
              onClick={() => onNav("detail", sub)}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="text-sm font-bold text-gray-800">{sub.name}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">{sub.cost} / month</div>
                </div>
                <div className="text-[10px] text-gray-400 text-right pt-0.5">
                  Next: {sub.next}
                </div>
              </div>
            </Box>
          ))}
        </div>

        <Divider dashed />

        <WireBtn onClick={() => onNav("add")}>[ + ADD SUBSCRIPTION ]</WireBtn>
      </div>
    </div>
  );
}

function AddScreen({ onNav }: { onNav: (s: Screen) => void }) {
  return (
    <div className="flex flex-col h-full font-mono overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-600 px-4 pt-4 pb-3 flex items-center">
        <button
          onClick={() => onNav("dashboard")}
          className="text-[10px] text-gray-500 hover:text-gray-700 transition-colors mr-2 tracking-wider"
        >
          ← BACK
        </button>
        <div className="text-xs font-bold text-gray-800 tracking-[0.15em] flex-1 text-center pr-8">
          [ ADD SUBSCRIPTION ]
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-4 flex-1">
        {/* Name field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest">Name</label>
          <Box className="px-3 py-2.5 bg-white">
            <div className="text-gray-300 text-xs italic">[ __________________________ ]</div>
          </Box>
        </div>

        {/* Cost field */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest">Cost</label>
          <Box className="px-3 py-2.5 bg-white">
            <div className="text-gray-300 text-xs italic">[ $ _______________________ ]</div>
          </Box>
        </div>

        {/* Billing cycle */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest">Billing Cycle</label>
          <Box className="px-3 py-3">
            <div className="flex gap-6 text-xs text-gray-700">
              <span className="flex items-center gap-1.5">
                <span className="text-gray-700">◉</span> Monthly
              </span>
              <span className="flex items-center gap-1.5">
                <span className="text-gray-400">○</span>
                <span className="text-gray-500">Yearly</span>
              </span>
            </div>
          </Box>
        </div>

        {/* Next billing date */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-gray-500 uppercase tracking-widest">Next Billing Date</label>
          <Box className="px-3 py-2.5 bg-white">
            <div className="text-gray-300 text-xs italic">[ MM / DD / YYYY __________ ]</div>
          </Box>
        </div>

        <Divider dashed />

        <div className="flex flex-col gap-2 mt-auto">
          <WireBtn onClick={() => onNav("dashboard")}>[ SAVE ]</WireBtn>
          <button
            onClick={() => onNav("dashboard")}
            className="text-[10px] text-gray-400 hover:text-gray-600 transition-colors tracking-widest text-center py-1"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailScreen({ sub, onNav }: { sub: Sub; onNav: (s: Screen) => void }) {
  const rows = [
    { label: "Cost", value: sub.cost },
    { label: "Billing", value: sub.cycle },
    { label: "Next Billing", value: sub.next + ", 2025" },
    { label: "Category", value: "Entertainment" },
    { label: "Status", value: "Active" },
  ];

  return (
    <div className="flex flex-col h-full font-mono overflow-y-auto">
      {/* Header */}
      <div className="border-b-2 border-gray-600 px-4 pt-4 pb-3 flex items-center">
        <button
          onClick={() => onNav("dashboard")}
          className="text-[10px] text-gray-500 hover:text-gray-700 transition-colors mr-2 tracking-wider"
        >
          ← BACK
        </button>
        <div className="text-xs font-bold text-gray-800 tracking-[0.15em] flex-1 text-center pr-8">
          [ DETAIL ]
        </div>
      </div>

      <div className="flex flex-col gap-3 px-4 py-4 flex-1">
        {/* Service name block */}
        <Box className="p-5 text-center">
          <div className="text-[10px] text-gray-400 tracking-widest uppercase mb-1">Service</div>
          <div className="text-2xl font-bold text-gray-800 tracking-wide">{sub.name}</div>
        </Box>

        <Divider dashed />

        {/* Detail rows */}
        <div className="flex flex-col">
          {rows.map(({ label, value }) => (
            <div
              key={label}
              className="flex justify-between items-center py-2.5 border-b border-dashed border-gray-200 last:border-0"
            >
              <span className="text-[10px] text-gray-400 uppercase tracking-widest">{label}</span>
              <span className="text-xs font-bold text-gray-700">{value}</span>
            </div>
          ))}
        </div>

        <Divider dashed />

        {/* Edit placeholder */}
        <Box className="px-3 py-2.5 cursor-pointer hover:bg-gray-200 transition-colors text-center">
          <span className="text-[10px] text-gray-500 tracking-widest">[ EDIT ]</span>
        </Box>

        <WireBtn
          className="border-gray-600"
          onClick={() => onNav("dashboard")}
        >
          [ DELETE SUBSCRIPTION ]
        </WireBtn>
      </div>
    </div>
  );
}

function PhoneShell({
  label,
  screenIndex,
  active,
  children,
  onClick,
}: {
  label: string;
  screenIndex: number;
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* Screen label */}
      <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.2em]">
        Screen {screenIndex} — {label}
      </div>

      {/* Phone frame */}
      <div
        onClick={onClick}
        className={`relative border-[3px] rounded-[2rem] overflow-hidden transition-all cursor-pointer ${
          active ? "border-gray-700 shadow-lg shadow-gray-300" : "border-gray-300 opacity-70 hover:opacity-90"
        }`}
        style={{ width: 260, height: 560 }}
      >
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-4 bg-gray-300 rounded-b-xl z-10" />

        {/* Status bar */}
        <div className="bg-gray-100 border-b border-gray-300 h-8 flex items-center justify-between px-4 pt-2">
          <span className="text-[8px] font-mono text-gray-500">9:41</span>
          <div className="flex items-center gap-1">
            <div className="flex gap-px items-end h-2">
              {[2, 3, 4, 5].map((h, i) => (
                <div key={i} className="w-0.5 bg-gray-400 rounded-sm" style={{ height: h }} />
              ))}
            </div>
            <div className="w-3 h-1.5 border border-gray-400 rounded-sm relative">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-0.5 w-0.5 h-1 bg-gray-400 rounded-r" />
              <div className="h-full w-2/3 bg-gray-400 rounded-sm" />
            </div>
          </div>
        </div>

        {/* Screen content */}
        <div className="bg-white" style={{ height: "calc(100% - 56px)" }}>
          {children}
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-14 h-1 bg-gray-400 rounded-full" />
      </div>
    </div>
  );
}

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>("dashboard");
  const [selectedSub, setSelectedSub] = useState<Sub>(SUBSCRIPTIONS[0]);

  function handleNav(screen: Screen, sub?: Sub) {
    if (sub) setSelectedSub(sub);
    setActiveScreen(screen);
  }

  const screenLabels: Record<Screen, string> = {
    dashboard: "Dashboard",
    add: "Add Subscription",
    detail: "Detail View",
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top bar */}
      <div className="border-b-2 border-gray-300 bg-white px-8 py-5">
        <div className="max-w-5xl mx-auto">
          <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.25em] mb-1">
            Lo-Fi Wireframe · Week 1
          </div>
          <h1 className="font-mono text-xl font-bold text-gray-700 tracking-wider">
            Spendora — Subscription Tracker
          </h1>
          <div className="font-mono text-[10px] text-gray-400 mt-1">
            Mobile (390 × 844) · 3 screens · Grayscale
          </div>
        </div>
      </div>

      {/* Desktop: all 3 phones side by side */}
      <div className="hidden lg:flex flex-1 items-center justify-center gap-10 py-12 px-8">
        <PhoneShell
          label="Dashboard"
          screenIndex={1}
          active={activeScreen === "dashboard"}
          onClick={() => setActiveScreen("dashboard")}
        >
          <DashboardScreen onNav={handleNav} />
        </PhoneShell>

        {/* Arrow connector */}
        <div className="flex flex-col items-center gap-1 text-gray-300 font-mono text-xs">
          <div className="w-px h-8 bg-gray-200" />
          <span>→</span>
          <div className="w-px h-8 bg-gray-200" />
        </div>

        <PhoneShell
          label="Add Subscription"
          screenIndex={2}
          active={activeScreen === "add"}
          onClick={() => setActiveScreen("add")}
        >
          <AddScreen onNav={handleNav} />
        </PhoneShell>

        <div className="flex flex-col items-center gap-1 text-gray-300 font-mono text-xs">
          <div className="w-px h-8 bg-gray-200" />
          <span>→</span>
          <div className="w-px h-8 bg-gray-200" />
        </div>

        <PhoneShell
          label="Detail View"
          screenIndex={3}
          active={activeScreen === "detail"}
          onClick={() => setActiveScreen("detail")}
        >
          <DetailScreen sub={selectedSub} onNav={handleNav} />
        </PhoneShell>
      </div>

      {/* Mobile: one phone + screen tabs */}
      <div className="lg:hidden flex flex-col flex-1 items-center gap-5 py-8 px-4">
        <div className="flex gap-1">
          {(["dashboard", "add", "detail"] as Screen[]).map((s, i) => (
            <button
              key={s}
              onClick={() => setActiveScreen(s)}
              className={`px-3 py-1.5 text-[10px] font-mono border tracking-widest transition-colors ${
                activeScreen === s
                  ? "border-gray-700 bg-gray-700 text-white"
                  : "border-gray-300 text-gray-500 hover:border-gray-500"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <PhoneShell
          label={screenLabels[activeScreen]}
          screenIndex={["dashboard", "add", "detail"].indexOf(activeScreen) + 1}
          active
          onClick={() => {}}
        >
          {activeScreen === "dashboard" && <DashboardScreen onNav={handleNav} />}
          {activeScreen === "add" && <AddScreen onNav={handleNav} />}
          {activeScreen === "detail" && <DetailScreen sub={selectedSub} onNav={handleNav} />}
        </PhoneShell>
      </div>

      {/* Legend bar */}
      <div className="border-t border-gray-200 bg-white py-3 px-8">
        <div className="max-w-5xl mx-auto flex flex-wrap gap-x-8 gap-y-1 font-mono text-[10px] text-gray-400 uppercase tracking-widest">
          <span>▣  Card / container</span>
          <span>- - -  Divider</span>
          <span>[ ]  Button / input field</span>
          <span>◉ / ○  Radio option</span>
          <span>Click phones to focus</span>
        </div>
      </div>
    </div>
  );
}
