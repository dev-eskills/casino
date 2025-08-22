import React, { useCallback, useMemo, useState } from "react";
import Header from "../components/header";
import RouletteBoard from "./RouletteBoard";
import RouletteGame from "./roulette-game";
import ChipSelector from "../components/ui/ChipSelector";

const AutoRoulette = () => {
  const [selectedCoin, setSelectedCoin] = useState(10);
  const [bets, setBets] = useState([]);

  const handleCellClick = useCallback(
    (position) => {
      if (!selectedCoin) return;
      setBets((prev) => {
        const index = prev.findIndex((b) => b.position === position);
        if (index === -1) {
          return [...prev, { position, amount: selectedCoin }];
        }
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          amount: updated[index].amount + selectedCoin,
        };
        return updated;
      });
    },
    [selectedCoin]
  );

  const handleCellDrop = useCallback((position, coinValue) => {
    if (!coinValue) return;
    setBets((prev) => {
      const index = prev.findIndex((b) => b.position === position);
      if (index === -1) {
        return [...prev, { position, amount: coinValue }];
      }
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        amount: updated[index].amount + coinValue,
      };
      return updated;
    });
  }, []);

  const totalBet = useMemo(
    () => bets.reduce((sum, b) => sum + (b?.amount || 0), 0),
    [bets]
  );

  return (
    <div className="relative w-full flex flex-col items-">
      <Header />

      {/* Wheel on top */}
      <div className="relative w-full flex justify-center">
        <div className="absolute  left-0 z-20">
          <RouletteGame />
        </div>
      </div>

      {/* Chip selector docked at bottom */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30">
        <div className="bg-black/50 backdrop-blur-md px-3 py-2 rounded-full shadow-lg">
          <ChipSelector selectedCoin={selectedCoin} onSelect={setSelectedCoin} />
        </div>
      </div>

      {/* Board below */}
      <div className="w-full z-10">
        <RouletteBoard onCellClick={handleCellClick} onCellDrop={handleCellDrop} />
      </div>

      {/* Optional: show current total in the corner */}
      <div className="fixed bottom-4 left-4 bg-black/60 text-white px-3 py-1.5 rounded-md text-xs z-30">
        Total Bet: ₹{totalBet}
      </div>
    </div>
  );
};

export default AutoRoulette;
