import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button"; 

// Sorted elements data
const elementsData = [
  { element: "Na", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 100 },
  { element: "Mg", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 40 },
  { element: "Al", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 20 },
  { element: "Si", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 5 },
  { element: "P",  eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: 100, zMaxFood: null, zMaxWater: null, eLiteWater: 1.5 },
  { element: "S",  eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: 50,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.6 },
  { element: "Cl", eMaxSoil: null, eMaxWater: 500, jp500Food: null, jp500Water: 30,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.3 },
  { element: "K",  eMaxSoil: null, eMaxWater: 300, jp500Food: null, jp500Water: 20,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.1 },
  { element: "Ca", eMaxSoil: null, eMaxWater: 200, jp500Food: null, jp500Water: 15,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.05 },
  { element: "Ti", eMaxSoil: null, eMaxWater: 20,  jp500Food: null, jp500Water: 1,   zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "V",  eMaxSoil: null, eMaxWater: 8,   jp500Food: null, jp500Water: 0.5, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Cr", eMaxSoil: 4,    eMaxWater: 4,   jp500Food: 0.1,  jp500Water: 0.3, zMaxFood: 0.1,  zMaxWater: 0.2,  eLiteWater: null },
  { element: "Mn", eMaxSoil: 3,    eMaxWater: 3,   jp500Food: 0.1,  jp500Water: 0.2, zMaxFood: 0.1,  zMaxWater: 0.2,  eLiteWater: null },
  { element: "Fe", eMaxSoil: null, eMaxWater: 2,   jp500Food: null, jp500Water: 0.1, zMaxFood: null, zMaxWater: 0.1,  eLiteWater: null },
  { element: "Co", eMaxSoil: 16,   eMaxWater: 0.5, jp500Food: 0.03, jp500Water: 0.07,zMaxFood: 0.03, zMaxWater: 0.05, eLiteWater: null },
  { element: "Ni", eMaxSoil: 1,    eMaxWater: 1,   jp500Food: 0.03, jp500Water: 0.05,zMaxFood: 0.03, zMaxWater: 0.05, eLiteWater: null },
  { element: "Cu", eMaxSoil: 1,    eMaxWater: 1,   jp500Food: 0.025,jp500Water: 0.05,zMaxFood: 0.025,zMaxWater: 0.1,  eLiteWater: null },
  { element: "Zn", eMaxSoil: 0.7,  eMaxWater: 0.3, jp500Food: 0.025,jp500Water: 0.04,zMaxFood: 0.025,zMaxWater: 0.05, eLiteWater: null },
  { element: "Ge", eMaxSoil: null, eMaxWater: 0.3, jp500Food: null, jp500Water: 0.04,zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "As", eMaxSoil: 0.4,  eMaxWater: 0.15,jp500Food: 0.015,jp500Water: 0.03,zMaxFood: 0.015,zMaxWater: 0.03, eLiteWater: null },
  { element: "Se", eMaxSoil: 0.3,  eMaxWater: 0.3, jp500Food: 0.009,jp500Water: 0.015,zMaxFood: 0.009,zMaxWater: 0.01, eLiteWater: null },
  { element: "Br", eMaxSoil: null, eMaxWater: 0.05,jp500Food: null, jp500Water: 0.015,zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Mo", eMaxSoil: null, eMaxWater: 0.04,jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Pd", eMaxSoil: null, eMaxWater: 0.03,jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Ag", eMaxSoil: null, eMaxWater: 0.06,jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Cd", eMaxSoil: 0.06, eMaxWater: 0.04,jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Sn", eMaxSoil: null, eMaxWater: 0.08,jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Sb", eMaxSoil: 0.4,  eMaxWater: 0.2, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Ba", eMaxSoil: null, eMaxWater: 5,   jp500Food: null, jp500Water: 5,   zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "W",  eMaxSoil: null, eMaxWater: 0.2, jp500Food: null, jp500Water: 0.1, zMaxFood: null, zMaxWater: 0.1,  eLiteWater: null },
  { element: "Hg", eMaxSoil: 0.5,  eMaxWater: 0.2, jp500Food: 0.015,jp500Water: 0.04,zMaxFood: 0.02, zMaxWater: 0.03, eLiteWater: null },
  { element: "Tl", eMaxSoil: 0.4,  eMaxWater: 0.2, jp500Food: 0.015,jp500Water: 0.04,zMaxFood: 0.015,zMaxWater: 0.03, eLiteWater: null },
  { element: "Pb", eMaxSoil: 0.8,  eMaxWater: 0.15,jp500Food: 0.03, jp500Water: 0.04,zMaxFood: 0.03, zMaxWater: 0.03, eLiteWater: null },
  { element: "Bi", eMaxSoil: 0.4,  eMaxWater: 0.2, jp500Food: 0.015,jp500Water: 0.04,zMaxFood: 0.015,zMaxWater: null, eLiteWater: null }
].sort((a, b) => a.element.localeCompare(b.element));

// Function to determine heatmap color based on value and requirement
const getDynamicHeatmapColour = (value, requirement) => {
  if (value === null || value === undefined) return "bg-gray-200";
  if (requirement === undefined || requirement === null || requirement === "") return "bg-gray-200";

  const parsedRequirement = parseFloat(requirement);
  if (isNaN(parsedRequirement)) return "bg-gray-200";

  if (value < parsedRequirement) return "bg-green-500";
  if (value <= parsedRequirement + 0.01) return "bg-yellow-400";
  return "bg-red-500";
};

export default function App() {
  // State to manage the active tab (stores the key)
  const [activeTab, setActiveTab] = useState("CustomerSpec");

  // State to manage user requirements (stored as strings)
  const [requirements, setRequirements] = useState([]);

  // Function to update requirements
  const updateRequirement = (element, newRequirement) => {
    setRequirements((prev) => {
      const existing = prev.find((req) => req.element === element);
      if (existing) {
        return prev.map((req) =>
          req.element === element ? { ...req, requirement: newRequirement } : req
        );
      } else {
        return [...prev, { element, requirement: newRequirement }];
      }
    });
  };

  // Define tabs with keys and labels
  const tabs = [
    { key: "CustomerSpec", label: "Customer Spec" },
    { key: "zMaxFood", label: "Z-Max (Food)" },
    { key: "zMaxWater", label: "Z-Max (Water)" },
    { key: "jp500Food", label: "JP500 (Food)" },
    { key: "jp500Water", label: "JP500 (Water)" },
    { key: "eMax500Soil", label: "E-Max 500 (Soil)" },
    { key: "eMax500Water", label: "E-Max 500 (Water)" },
    { key: "eLiteWater", label: "E-Lite (Water)" }
  ];

  // Function to render content based on active tab
  const renderContent = () => {
    const commonGridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10";

    // If active tab is "CustomerSpec", render input fields
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
                      className="border p-2 rounded w-full h-12"
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

    // If active tab is an instrument spec, render heatmap
    return (
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Instrument LoD Vs Customer Requirement</h2>
        <div className={commonGridClasses}>
          {elementsData.map((element) => {
            const requirement = requirements.find((req) => req.element === element.element)?.requirement;
            const specValue = element[activeTab];

            return (
              <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
                <CardContent>
                  <h2 className="text-xl font-semibold mb-2">
                    {element.element} - {element.name}
                  </h2>
                  <div className={`h-12 w-full rounded ${getDynamicHeatmapColour(specValue, requirement)}`}>
                    <p className="text-center pt-2 text-white font-bold">
                      {specValue !== null && specValue !== undefined ? specValue : "N/A"}
                    </p>
                  </div>
                  {requirement && (
                    <p className="mt-2 text-sm text-gray-700">
                      Requirement: {requirement}
                    </p>
                  )}
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
      {/* Top Right Image */}
      <img
        src={`${process.env.PUBLIC_URL}/topRightImage.png`}
        alt="Top Right"
        style={{
          width: "clamp(100px, 20vw, 200px)", // Responsive width
          height: "auto", // Maintain aspect ratio
          margin: "0 auto", // Center horizontally
          display: "block", // Ensure it's treated as a block element
          position: "relative", // Ensure proper stacking context
          zIndex: 50, // Higher than other elements
        }}
        className="mt-4"
      />

      {/* Main Content */}
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "#191919" }}>
          Z-Spec Instrument Sensitivity Comparison
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)} // Store the key, not the label
              className={`capitalize ${
                activeTab === tab.key ? "text-white bg-purple-800" : "bg-gray-100"
              }`}
            >
              {tab.label} {/* Use human-readable name */}
            </Button>
          ))}
        </div>

        {/* Render Content Based on Active Tab */}
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
