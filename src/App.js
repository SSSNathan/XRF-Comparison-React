import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";

// Sorted elements data (name field omitted as not provided)
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

// Utility: returns a Tailwind background colour based on the comparison of spec vs requirement.
const getDynamicHeatmapColour = (value, requirement) => {
  if (requirement === undefined || requirement === null || requirement === "") return "bg-gray-200";
  if (value === undefined || value === null) return "bg-red-500";
  const parsedRequirement = parseFloat(requirement);
  if (isNaN(parsedRequirement)) return "bg-gray-200";
  if (value < parsedRequirement) return "bg-green-500";
  if (value <= parsedRequirement + 0.01) return "bg-yellow-400";
  return "bg-red-500";
};

// Mapping for instruments and their property keys.
const instrumentMapping = [
  { name: "JP500", waterKey: "jp500Water", solidKey: "jp500Food" },
  { name: "Z-Max", waterKey: "zMaxWater", solidKey: "zMaxFood" },
  { name: "E-Max 500", waterKey: "eMaxWater", solidKey: "eMaxSoil" },
  { name: "E-Lite", waterKey: "eLiteWater", solidKey: null } // Not available in Solid
];

// Recommendation Component (renamed and updated)
function Recommendation({ elementsData, requirements, selectedMatrix }) {
  // Calculate per-instrument scores.
  const results = instrumentMapping.map(instr => {
    let matches = 0, fails = 0, total = 0;
    const key = selectedMatrix === "Water" ? instr.waterKey : instr.solidKey;
    if (!key) {
      return { instrument: instr.name, matches: 0, fails: 0, total: 0, net: 0, notApplicable: true };
    }
    elementsData.forEach(e => {
      const reqObj = requirements.find(r => r.element === e.element);
      if (reqObj && reqObj.requirement) {
        total++;
        const reqVal = parseFloat(reqObj.requirement);
        const specVal = e[key];
        if (specVal === null || specVal === undefined) {
          fails++;
        } else if (parseFloat(specVal) <= reqVal) {
          matches++;
        } else {
          fails++;
        }
      }
    });
    return { instrument: instr.name, matches, fails, total, net: matches - fails, notApplicable: false };
  });

  // Determine the best (highest) net score.
  let bestScore = -Infinity;
  results.forEach(result => {
    if (!result.notApplicable && result.net > bestScore) {
      bestScore = result.net;
    }
  });
  // Recommended instruments are those whose net score equals bestScore.
  const recommendedInstruments = results.filter(
    result => !result.notApplicable && result.net === bestScore
  ).map(r => r.instrument);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-center">Recommendation</h2>
      <p className="text-lg text-center">
        Sample Matrix: <span className="font-semibold">{selectedMatrix}</span>
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {results.map(result => (
          <Card key={result.instrument} className="p-4 border rounded-lg bg-white shadow-lg">
            <CardContent>
              <h3 className="text-2xl font-semibold">{result.instrument}</h3>
              {result.notApplicable ? (
                <p className="text-gray-600">Not available for {selectedMatrix} samples.</p>
              ) : (
                <>
                  <p className="mt-2">
                    Matches: <span className="font-bold">{result.matches}</span> / {result.total}
                  </p>
                  <p className="mt-1">
                    Fails: <span className="font-bold">{result.fails}</span>
                  </p>
                  {recommendedInstruments.includes(result.instrument) && (
                    <div className="mt-2 bg-green-500 rounded p-2 text-white text-center font-bold">
                      Recommended!
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Main App Component
export default function App() {
  const [activeTab, setActiveTab] = useState("CustomerSpec");
  const [requirements, setRequirements] = useState([]);
  const [selectedMatrix, setSelectedMatrix] = useState("Water"); // "Water" or "Solid"

  // Update requirement value.
  const updateRequirement = (element, newRequirement) => {
    setRequirements(prev => {
      const existing = prev.find(req => req.element === element);
      if (existing) {
        return prev.map(req => (req.element === element ? { ...req, requirement: newRequirement } : req));
      } else {
        return [...prev, { element, requirement: newRequirement }];
      }
    });
  };

  // Dynamically build the tabs based on the selected matrix.
  const tabs = [];
  tabs.push({ key: "CustomerSpec", label: "Customer Spec" });
  instrumentMapping.forEach(instr => {
    if (selectedMatrix === "Water" && instr.waterKey) {
      tabs.push({ key: instr.waterKey, label: `${instr.name} (Water)` });
    }
    if (selectedMatrix === "Solid" && instr.solidKey) {
      tabs.push({ key: instr.solidKey, label: `${instr.name} (Solid)` });
    }
  });
  tabs.push({ key: "Recommendation", label: "Recommendation" });

  // Ensure activeTab is valid when the matrix selection changes.
  useEffect(() => {
    if (!tabs.find(tab => tab.key === activeTab)) {
      setActiveTab("CustomerSpec");
    }
  }, [selectedMatrix]);

  // Render content based on the active tab.
  const renderContent = () => {
    const commonGridClasses = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10";

    if (activeTab === "CustomerSpec") {
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Set Your LoD Requirements</h2>
          <div className="mb-4">
            <label className="mr-2 font-semibold">Select Sample Matrix:</label>
            <select
              value={selectedMatrix}
              onChange={e => setSelectedMatrix(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="Water">Water</option>
              <option value="Solid">Solid</option>
            </select>
          </div>
          <div className={commonGridClasses}>
            {elementsData.map(element => {
              const currentRequirement = requirements.find(req => req.element === element.element)?.requirement || "";
              return (
                <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-2">{element.element}</h3>
                    <input
                      type="number"
                      step="0.001"
                      value={currentRequirement}
                      onChange={e => updateRequirement(element.element, e.target.value)}
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
    } else if (activeTab === "Recommendation") {
      return (
        <Recommendation
          elementsData={elementsData}
          requirements={requirements}
          selectedMatrix={selectedMatrix}
        />
      );
    } else {
      // Instrument spec page: display cards with a heatmap showing spec vs customer requirement.
      return (
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">Instrument LoD vs Customer Requirement</h2>
          <div className={commonGridClasses}>
            {elementsData.map(element => {
              const requirement = requirements.find(req => req.element === element.element)?.requirement;
              const specValue = element[activeTab];
              return (
                <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
                  <CardContent>
                    <h3 className="text-2xl font-semibold mb-2">{element.element}</h3>
                    <div className={`h-12 w-full rounded ${getDynamicHeatmapColour(specValue, requirement)}`}>
                      <p className="text-center pt-2 text-white font-bold">
                        {specValue !== null && specValue !== undefined ? specValue : "N/A"}
                      </p>
                    </div>
                    {requirement && (
                      <p className="mt-2 text-sm text-gray-700">Requirement: {requirement}</p>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      );
    }
  };

  return (
    <div className="relative min-h-screen pb-24">
      {/* Top Right Image */}
      <img
        src={`${process.env.PUBLIC_URL}/topRightImage.png`}
        alt="Top Right"
        style={{
          width: "clamp(100px, 20vw, 200px)",
          height: "auto",
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 50,
        }}
        className="hidden sm:block"
      />

      {/* Main Content */}
      <div className="p-6 space-y-6">
        <h1 className="text-4xl font-bold" style={{ color: "#191919" }}>
          Z-Spec Instrument Sensitivity Comparison
        </h1>
        {/* Dynamic Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map(tab => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`capitalize ${activeTab === tab.key ? "text-white bg-purple-800" : "bg-gray-100"}`}
            >
              {tab.label}
            </Button>
          ))}
        </div>
        {/* Render Content */}
        {renderContent()}
      </div>

      {/* Footer Image */}
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/footerImage.png)`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "contain",
          backgroundPosition: "center bottom",
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          height: "300px",
          zIndex: -1,
        }}
      />
    </div>
  );
}
