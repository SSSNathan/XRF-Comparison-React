import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card"; // Adjusted import paths
import { Button } from "./components/ui/button";

// Mapping of element symbols to their full names
const elementNames = {
  As: "Arsenic",
  Hg: "Mercury",
  Pb: "Lead",
  Cr: "Chromium",
  Cu: "Copper",
  Ni: "Nickel",
  Zn: "Zinc",
  Mn: "Manganese",
  Co: "Cobalt",
  Se: "Selenium",
  Tl: "Thallium",
  Bi: "Bismuth",
  Cd: "Cadmium",
  Sn: "Tin",
  V: "Vanadium",
  Mo: "Molybdenum",
};

// Sorted elements data
const elementsData = [
  { element: "As", name: "Arsenic", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.07 },
  { element: "Bi", name: "Bismuth", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "Cd", name: "Cadmium", zMax: null, jp500: null, eMax500Soil: 0.06, eMax500Water: 0.05 },
  { element: "Co", name: "Cobalt", zMax: 0.03, jp500: 0.03, eMax500Soil: 16, eMax500Water: 16 },
  { element: "Cr", name: "Chromium", zMax: 0.1, jp500: 0.1, eMax500Soil: 4, eMax500Water: 3 },
  { element: "Cu", name: "Copper", zMax: 0.025, jp500: 0.025, eMax500Soil: 1, eMax500Water: 0.5 },
  { element: "Hg", name: "Mercury", zMax: 0.02, jp500: 0.015, eMax500Soil: 0.5, eMax500Water: 0.1 },
  { element: "Mn", name: "Manganese", zMax: 0.1, jp500: 0.1, eMax500Soil: 3, eMax500Water: 2 },
  { element: "Mo", name: "Molybdenum", zMax: null, jp500: null, eMax500Soil: 0.5, eMax500Water: 0.05 },
  { element: "Ni", name: "Nickel", zMax: 0.03, jp500: 0.03, eMax500Soil: 1, eMax500Water: 2 },
  { element: "Pb", name: "Lead", zMax: 0.03, jp500: 0.03, eMax500Soil: 0.8, eMax500Water: 0.1 },
  { element: "Se", name: "Selenium", zMax: 0.009, jp500: 0.009, eMax500Soil: 0.3, eMax500Water: 0.2 },
  { element: "Sn", name: "Tin", zMax: null, jp500: null, eMax500Soil: 0.15, eMax500Water: 0.1 },
  { element: "Tl", name: "Thallium", zMax: 0.015, jp500: 0.015, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "V", name: "Vanadium", zMax: null, jp500: null, eMax500Soil: 0.4, eMax500Water: 0.2 },
  { element: "Zn", name: "Zinc", zMax: 0.025, jp500: 0.025, eMax500Soil: 0.7, eMax500Water: 0.5 },
].sort((a, b) => a.element.localeCompare(b.element));

const defaultRequirements = [
  { element: "As", requirement: 0.02 },
  { element: "Bi", requirement: 0.03 },
  { element: "Cd", requirement: 0.07 },
  { element: "Co", requirement: 0.05 },
  { element: "Cr", requirement: 0.2 },
  { element: "Cu", requirement: 0.05 },
  { element: "Hg", requirement: 0.03 },
  { element: "Mn", requirement: 0.2 },
  { element: "Mo", requirement: 0.2 },
  { element: "Ni", requirement: 0.05 },
  { element: "Pb", requirement: 0.04 },
  { element: "Se", requirement: 0.02 },
  { element: "Sn", requirement: 0.2 },
  { element: "Tl", requirement: 0.03 },
  { element: "V", requirement: 0.2 },
  { element: "Zn", requirement: 0.05 },
].sort((a, b) => a.element.localeCompare(b.element));

const getDynamicHeatmapColour = (value, requirement) => {
  if (value === null) return "bg-gray-200";
  if (requirement === undefined || requirement === null) return "bg-gray-200";
  if (value < requirement) return "bg-green-500";
  if (value <= requirement + 0.01) return "bg-yellow-400";
  return "bg-red-500";
};

export default function App() {
  const [activeTab, setActiveTab] = useState("CustomerSpec");
  const [requirements, setRequirements] = useState([]);

  const updateRequirement = (element, newRequirement) => {
    setRequirements((prev) => {
      const existing = prev.find((req) => req.element === element);
      if (existing) {
        return prev.map((req) =>
          req.element === element ? { ...req, requirement: parseFloat(newRequirement) } : req
        );
      } else {
        return [...prev, { element, requirement: parseFloat(newRequirement) }];
      }
    });
  };

  const renderContent = () => {
    const commonGridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4";

    if (activeTab === "CustomerSpec") {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Set Your LoD Requirements</h2>
          <div className={commonGridClasses}>
            {elementsData.map((element) => {
              const currentRequirement =
                requirements.find((req) => req.element === element.element)?.requirement || "";
              return (
                <Card key={element.element} className="p-4 border rounded-lg">
                  <CardContent>
                    {/* Changed from label to h2 with consistent styling */}
                    <h2 className="text-xl font-semibold mb-2">
                      {element.element} - {element.name}
                    </h2>
                    <input
                      type="number"
                      step="0.001"
                      value={currentRequirement}
                      onChange={(e) => updateRequirement(element.element, e.target.value)}
                      className="border p-2 rounded w-full"
                      placeholder="Enter requirement"
                    />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }

    return (
      <div className={commonGridClasses}>
        {elementsData.map((element) => {
          const requirement = requirements.find((req) => req.element === element.element)?.requirement;
          return (
            <Card key={element.element} className="p-4 border rounded-lg">
              <CardContent>
                <h2 className="text-xl font-semibold mb-2">
                  {element.element} - {element.name}
                </h2>
                <div
                  className={`h-12 w-full rounded ${getDynamicHeatmapColour(
                    element[activeTab],
                    requirement
                  )}`}
                >
                  <p className="text-center pt-2 text-white font-bold">
                    {element[activeTab] !== null && element[activeTab] !== undefined
                      ? element[activeTab]
                      : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold" style={{ color: "#191919" }}>
        Z-Spec Instrument Sensitivity Comparison
      </h1>
      <div className="flex flex-wrap gap-2">
        {["CustomerSpec", "zMax", "jp500", "eMax500Soil", "eMax500Water"].map((tab) => (
          <Button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`capitalize ${
              activeTab === tab ? "text-white" : "bg-gray-100"
            }`}
            style={activeTab === tab ? { backgroundColor: "#45038F" } : {}}
          >
            {tab
              .replace(/([A-Z])/g, " $1")
              .replace(/^./, (str) => str.toUpperCase())
              .trim()}
          </Button>
        ))}
      </div>

      {renderContent()}

      {activeTab !== "CustomerSpec" && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Heatmap Scale</h2>
          <div className="flex justify-between items-center">
            <span className="flex items-center">
              <span className="inline-block w-4 h-4 bg-green-500 rounded mr-1"></span>
              Meets Specification
            </span>
            <span className="flex items-center">
              <span className="inline-block w-4 h-4 bg-yellow-400 rounded mr-1"></span>
              Near Specification
            </span>
            <span className="flex items-center">
              <span className="inline-block w-4 h-4 bg-red-500 rounded mr-1"></span>
              Fails Specification
            </span>
            <span className="flex items-center">
              <span className="inline-block w-4 h-4 bg-gray-200 rounded mr-1"></span>
              Not Available
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
