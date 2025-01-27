import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card"; // Adjusted import paths
import { Tooltip, TooltipProvider } from "./components/ui/tooltip";
import { Button } from "./components/ui/button";

const elementsData = [
  { element: "As", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.07 },
  { element: "Hg", zMax: 0.02, jp500: 0.015, eMax500Soil: 0.5, eMax500Water: 0.1 },
  { element: "Pb", zMax: 0.03, jp500: 0.03, eMax500Soil: 0.8, eMax500Water: 0.1 },
  { element: "Cr", zMax: 0.1, jp500: 0.1, eMax500Soil: 4, eMax500Water: 3 },
  { element: "Cu", zMax: 0.025, jp500: 0.025, eMax500Soil: 1, eMax500Water: 0.5 },
  { element: "Ni", zMax: 0.03, jp500: 0.03, eMax500Soil: 1, eMax500Water: 2 },
  { element: "Zn", zMax: 0.025, jp500: 0.025, eMax500Soil: 0.7, eMax500Water: 0.5 },
  { element: "Mn", zMax: 0.1, jp500: 0.1, eMax500Soil: 3, eMax500Water: 2 },
  { element: "Co", zMax: 0.03, jp500: 0.03, eMax500Soil: 16, eMax500Water: 16 },
  { element: "Se", zMax: 0.009, jp500: 0.009, eMax500Soil: 0.3, eMax500Water: 0.2 },
  { element: "Tl", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "Bi", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "Cd", zMax: null, jp500: null, eMax500Soil: 0.06, eMax500Water: 0.05 },
  { element: "Sn", zMax: null, jp500: null, eMax500Soil: 0.15, eMax500Water: 0.1 },
  { element: "V", zMax: null, jp500: null, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "Mo", zMax: null, jp500: null, eMax500Soil: 0.5, eMax500Water: 0.05 },
];

const defaultRequirements = [
  { element: "As", requirement: 0.02 },
  { element: "Hg", requirement: 0.03 },
  { element: "Pb", requirement: 0.04 },
  { element: "Cr", requirement: 0.2 },
  { element: "Cu", requirement: 0.05 },
  { element: "Ni", requirement: 0.05 },
  { element: "Zn", requirement: 0.05 },
  { element: "Mn", requirement: 0.2 },
  { element: "Co", requirement: 0.05 },
  { element: "Se", requirement: 0.02 },
  { element: "Tl", requirement: 0.03 },
  { element: "Bi", requirement: 0.03 },
  { element: "Cd", requirement: 0.07 },
  { element: "Sn", requirement: 0.2 },
  { element: "V", requirement: 0.2 },
  { element: "Mo", requirement: 0.2 },
];

const getDynamicHeatmapColour = (value, requirement) => {
  if (value === null) return "bg-gray-200";
  if (value < requirement) return "bg-green-500";
  if (value <= requirement + 0.01) return "bg-yellow-400";
  return "bg-red-500";
};

export default function App() {
  const [activeTab, setActiveTab] = useState("CustomerSpec");
  const [requirements, setRequirements] = useState(defaultRequirements);

  const updateRequirement = (element, newRequirement) => {
    setRequirements((prev) =>
      prev.map((req) =>
        req.element === element ? { ...req, requirement: parseFloat(newRequirement) } : req
      )
    );
  };

  const renderContent = () => {
    if (activeTab === "CustomerSpec") {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Set Your LoD Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {requirements.map((req) => (
              <Card key={req.element} className="p-4 border rounded-lg">
                <CardContent>
                  <label className="font-semibold mb-1 block">{req.element}</label>
                  <input
                    type="number"
                    step="0.001"
                    value={req.requirement}
                    onChange={(e) => updateRequirement(req.element, e.target.value)}
                    className="border p-1 rounded w-full"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {elementsData.map((element) => {
          const requirement = requirements.find(
            (req) => req.element === element.element
          )?.requirement;
          return (
            <Card key={element.element} className="p-4 border rounded-lg">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">{element.element}</h2>
                <Tooltip content={`Value: ${element[activeTab] ?? "N/A"}`}>
                  <div
                    className={`h-12 w-full rounded ${getDynamicHeatmapColour(
                      element[activeTab],
                      requirement
                    )}`}
                  >
                    <p className="text-center pt-2 text-white font-bold">
                      {element[activeTab] ?? "N/A"}
                    </p>
                  </div>
                </Tooltip>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "#191919" }}>Z-Spec Instrument Sensitivity Comparison</h1>
        <div className="flex space-x-4">
          {["CustomerSpec", "zMax", "jp500", "eMax500Soil", "eMax500Water"].map((tab) => (
            <Button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize ${
                activeTab === tab ? "text-white" : "bg-gray-100"
              }`}
              style={activeTab === tab ? { backgroundColor: "#45038F" } : {}}
            >
              {tab.replace(/([A-Z])/g, " $1").trim()}
            </Button>
          ))}
        </div>

        {renderContent()}

        {activeTab !== "CustomerSpec" && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Heatmap Scale</h2>
            <div className="flex justify-between">
              <span className="text-sm">High Sensitivity (Green)</span>
              <span className="text-sm">Near Limit (Yellow)</span>
              <span className="text-sm">Low Sensitivity (Red)</span>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
}

