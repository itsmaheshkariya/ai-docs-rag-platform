"use client";

import { Send, Plus, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function ChatUI({ sendMessage }: { sendMessage: (value: string) => void }) {
  const [chatMessage, setChatMessage] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [strategies, setStrategies] = useState<{ name: string; description: string; id: string }[]>([]);
  const [newStrategy, setNewStrategy] = useState({ name: "", description: "" });
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);

  useEffect(() => {
    const fetchStrategies = async () => {
      try {
        const response = await fetch("/api/prompts");
        const data: any = await response.json();
        setStrategies(data);
      } catch (error) {
        console.error("Error fetching strategies:", error);
      }
    };
    fetchStrategies();
  }, []);

  const addStrategy = async () => {
    if (!newStrategy.name.trim() || !newStrategy.description.trim()) return;

    try {
      const response = await fetch("/api/prompts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStrategy),
      });

      if (response.ok) {
        const addedStrategy: { name: string; description: string; id: string } = await response.json();
        setStrategies((prev: { name: string; description: string; id: string }[]) => [...prev, addedStrategy]);
        setNewStrategy({ name: "", description: "" });
        setIsDialogOpen(false);
      } else {
        console.error("Failed to add strategy");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteStrategy = async (id: string) => {
    try {
      const response = await fetch(`/api/prompts?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setStrategies((prev: { name: string; description: string; id: string }[]) => prev.filter((strategy) => strategy.id !== id));
      } else {
        console.error("Failed to delete strategy");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const applyStrategy = (description: string) => {
    setChatMessage(description);
    sendMessage(description);
  };

  return (
    <div className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 border-t border-gray-700 p-4">
      {/* Strategy Selector and Actions */}
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between flex-nowrap space-x-2 sm:space-x-4 overflow-x-auto">
          <select
            className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-3 py-2 rounded flex-grow shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            defaultValue=""
            onChange={(e) => {
              const selected = strategies.find((s) => s.name === e.target.value);
              if (selected) applyStrategy(selected.description);
            }}
          >
            <option value="" disabled>
              Select Strategy
            </option>
            {strategies && strategies.length > 0 && strategies?.map((strategy) => (
              <option key={strategy.id} value={strategy.name}>
                {strategy.name}
              </option>
            ))}
          </select>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-indigo-600 text-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-indigo-700 flex-shrink-0 items-center justify-center h-10 sm:h-12 w-10 sm:w-12 transform transition-transform hover:scale-110">
                <Plus className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl font-bold">Add Strategy</DialogTitle>
              </DialogHeader>
              <div className="space-y-6">
                <input
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Strategy Name"
                  value={newStrategy.name}
                  onChange={(e) => setNewStrategy({ ...newStrategy, name: e.target.value })}
                />
                <textarea
                  className="w-full bg-gray-800 text-white px-4 py-3 rounded shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Strategy Description"
                  value={newStrategy.description}
                  onChange={(e) => setNewStrategy({ ...newStrategy, description: e.target.value })}
                />
              </div>
              <DialogFooter className="space-x-4">
                <button
                  onClick={addStrategy}
                  className="bg-indigo-600 text-white px-6 py-3 rounded shadow-lg hover:bg-indigo-700 transform transition-transform hover:scale-105"
                >
                  Add Strategy
                </button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isTableDialogOpen} onOpenChange={setIsTableDialogOpen}>
            <DialogTrigger asChild>
              <button className="bg-gray-800 text-white px-4 py-2 rounded shadow-lg hover:bg-gray-700 flex-shrink-0 items-center justify-center h-12 transform transition-transform hover:scale-110">
                <Eye className="w-6 h-6" />
              </button>
            </DialogTrigger>
            <DialogContent className="bg-gradient-to-b from-gray-900 to-gray-800 border border-gray-700 shadow-xl rounded-xl">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl font-bold">Strategies</DialogTitle>
              </DialogHeader>
              <div className="overflow-y-auto max-h-96">
                <table className="w-full text-white table-fixed border-collapse">
                  <thead>
                    <tr className="bg-gray-800">
                      <th className="text-left px-6 py-3">Name</th>
                      <th className="text-left px-6 py-3">Description</th>
                      <th className="text-left px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {strategies && strategies.length > 0 && strategies?.map((strategy) => (
                      <tr key={strategy.id} className="border-t border-gray-700 hover:bg-gray-700 transition-colors">
                        <td className="px-6 py-3 truncate">{strategy.name}</td>
                        <td className="px-6 py-3 truncate hover:whitespace-normal hover:bg-gray-800 transition-all">
                            {strategy.description}
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => deleteStrategy(strategy.id)}
                            className="bg-red-600 text-white px-3 py-2 rounded shadow-lg hover:bg-red-700 transform transition-transform hover:scale-105"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}