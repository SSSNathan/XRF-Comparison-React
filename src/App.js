import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

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
          req.element === element ? { ...req, requirement: parseFloat(newRequirement) || 0 } : req
        );
      } else {
        return [...prev, { element, requirement: parseFloat(newRequirement) || 0 }];
      }
    });
  };

  const renderContent = () => {
    const commonGridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10";

    if (activeTab === "CustomerSpec") {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Set Your LoD Requirements</h2>
          <div className={commonGridClasses}>
            {elementsData.map((element) => {
              const currentRequirement =
                requirements.find((req) => req.element === element.element)?.requirement || "";
              return (
                <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
                  <CardContent>
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
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instrument LoD Vs Customer Requirement</h2>
        <div className={commonGridClasses}>
          {elementsData.map((element) => {
            const requirement = requirements.find((req) => req.element === element.element)?.requirement;
            return (
              <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
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
      </div>
    );
  };

  return (
    <div className="relative min-h-screen pb-24">
      <img
        src={`${process.env.PUBLIC_URL}/topRightImage.png`}
        alt="Top Right"
        style={{
          width: "clamp(100px, 20vw, 200px)", // Responsive width
          height: "auto", // Maintain aspect ratio
        }}
        className="absolute top-4 right-4 sm:relative sm:top-0 sm:left-0 sm:mx-auto sm:block z-10"
      />
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
                activeTab === tab ? "text-white bg-purple-800" : "bg-gray-100"
              }`}
            >
              {tab
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase())
                .trim()}
            </Button>
          ))}
        </div>
        {renderContent()}
      </div>
      {/* Footer Image */}
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/footerImage.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain", // Scale the image naturally
          backgroundPosition: "center bottom", // Ensure it's at the bottom
          position: "absolute", // Anchors it relative to the parent
          bottom: 0, // Locks it to the bottom
          left: 0,
          right: 0,
          height: "300px", // Set the desired height of the footer image
          zIndex: -1, // Ensure it's behind everything
        }}
      />
    </div>
  );
}
