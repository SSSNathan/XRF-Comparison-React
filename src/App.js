import React, { useState } from "react";
import { Card, CardContent } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Canvas } from "@react-three/fiber";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Sorted elements data (name field omitted as it's not provided)
const elementsData = [
  { element: "Al", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 20 },
  { element: "As", eMaxSoil: 0.4,  eMaxWater: 0.15, jp500Food: 0.015, jp500Water: 0.03, zMaxFood: 0.015, zMaxWater: 0.03, eLiteWater: null },
  { element: "Ba", eMaxSoil: null, eMaxWater: 5,    jp500Food: null, jp500Water: 5,    zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Bi", eMaxSoil: 0.4,  eMaxWater: 0.2,  jp500Food: 0.015, jp500Water: 0.04, zMaxFood: 0.015, zMaxWater: null, eLiteWater: null },
  { element: "Br", eMaxSoil: null, eMaxWater: 0.05, jp500Food: null, jp500Water: 0.015, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Ca", eMaxSoil: null, eMaxWater: 200, jp500Food: null, jp500Water: 15,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.05 },
  { element: "Cd", eMaxSoil: 0.06, eMaxWater: 0.04, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Cl", eMaxSoil: null, eMaxWater: 500, jp500Food: null, jp500Water: 30,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.3 },
  { element: "Co", eMaxSoil: 16,   eMaxWater: 0.5,  jp500Food: 0.03, jp500Water: 0.07, zMaxFood: 0.03, zMaxWater: 0.05, eLiteWater: null },
  { element: "Cr", eMaxSoil: 4,    eMaxWater: 4,    jp500Food: 0.1,  jp500Water: 0.3,  zMaxFood: 0.1,  zMaxWater: 0.2,  eLiteWater: null },
  { element: "Cu", eMaxSoil: 1,    eMaxWater: 1,    jp500Food: 0.025, jp500Water: 0.05, zMaxFood: 0.025, zMaxWater: 0.1,  eLiteWater: null },
  { element: "Fe", eMaxSoil: null, eMaxWater: 2,    jp500Food: null, jp500Water: 0.1,  zMaxFood: null, zMaxWater: 0.1,  eLiteWater: null },
  { element: "Hg", eMaxSoil: 0.5,  eMaxWater: 0.2,  jp500Food: 0.015, jp500Water: 0.04, zMaxFood: 0.02, zMaxWater: 0.03, eLiteWater: null },
  { element: "K",  eMaxSoil: null, eMaxWater: 300,  jp500Food: null, jp500Water: 20,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.1 },
  { element: "Mg", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 40 },
  { element: "Mn", eMaxSoil: 3,    eMaxWater: 3,    jp500Food: 0.1,  jp500Water: 0.2,  zMaxFood: 0.1,  zMaxWater: 0.2,  eLiteWater: null },
  { element: "Mo", eMaxSoil: null, eMaxWater: 0.04, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Na", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 100 },
  { element: "Ni", eMaxSoil: 1,    eMaxWater: 1,    jp500Food: 0.03, jp500Water: 0.05, zMaxFood: 0.03, zMaxWater: 0.05, eLiteWater: null },
  { element: "P",  eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: 100, zMaxFood: null, zMaxWater: null, eLiteWater: 1.5 },
  { element: "Pb", eMaxSoil: 0.8,  eMaxWater: 0.15, jp500Food: 0.03, jp500Water: 0.04, zMaxFood: 0.03, zMaxWater: 0.03, eLiteWater: null },
  { element: "Sb", eMaxSoil: 0.4,  eMaxWater: 0.2,  jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Se", eMaxSoil: 0.3,  eMaxWater: 0.3,  jp500Food: 0.009, jp500Water: 0.015, zMaxFood: 0.009, zMaxWater: 0.01, eLiteWater: null },
  { element: "Si", eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: 5 },
  { element: "Sn", eMaxSoil: null, eMaxWater: 0.08, jp500Food: null, jp500Water: null, zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "S",  eMaxSoil: null, eMaxWater: null, jp500Food: null, jp500Water: 50,  zMaxFood: null, zMaxWater: null, eLiteWater: 0.6 },
  { element: "Ti", eMaxSoil: null, eMaxWater: 20,   jp500Food: null, jp500Water: 1,   zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "Tl", eMaxSoil: 0.4,  eMaxWater: 0.2,  jp500Food: 0.015, jp500Water: 0.04, zMaxFood: 0.015, zMaxWater: 0.03, eLiteWater: null },
  { element: "V",  eMaxSoil: null, eMaxWater: 8,    jp500Food: null, jp500Water: 0.5,  zMaxFood: null, zMaxWater: null, eLiteWater: null },
  { element: "W",  eMaxSoil: null, eMaxWater: 0.2,  jp500Food: null, jp500Water: 0.1,  zMaxFood: null, zMaxWater: 0.1, eLiteWater: null },
  { element: "Zn", eMaxSoil: 0.7,  eMaxWater: 0.3,  jp500Food: 0.025, jp500Water: 0.04, zMaxFood: 0.025, zMaxWater: 0.05, eLiteWater: null },
];

// Utility to determine heatmap colour
const getDynamicHeatmapColour = (value, requirement) => {
  if (requirement === undefined || requirement === null || requirement === "") return "bg-gray-200";
  if (value === undefined || value === null) return "bg-red-500";
  const parsedRequirement = parseFloat(requirement);
  if (isNaN(parsedRequirement)) return "bg-gray-200";
  if (value < parsedRequirement) return "bg-green-500";
  if (value <= parsedRequirement + 0.01) return "bg-yellow-400";
  return "bg-red-500";
};

// --- New Components ---

// Comparison Chart using react-chartjs-2
function ComparisonChart({ elementsData, requirements }) {
  const [selectedInstrument, setSelectedInstrument] = useState("jp500Food");
  const labels = elementsData.map((e) => e.element);
  const instrumentData = elementsData.map((e) => {
    const value = e[selectedInstrument];
    return value !== null && value !== undefined ? parseFloat(value) : 0;
  });
  const requirementData = elementsData.map((e) => {
    const req = requirements.find((r) => r.element === e.element);
    return req && req.requirement ? parseFloat(req.requirement) : 0;
  });
  const data = {
    labels,
    datasets: [
      {
        label: selectedInstrument,
        data: instrumentData,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
      {
        label: "Requirement",
        data: requirementData,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <div>
      <div className="mb-4">
        <label className="mr-2">Select Instrument:</label>
        <select
          value={selectedInstrument}
          onChange={(e) => setSelectedInstrument(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="jp500Food">JP500 (Food)</option>
          <option value="jp500Water">JP500 (Water)</option>
          <option value="zMaxFood">Z-Max (Food)</option>
          <option value="zMaxWater">Z-Max (Water)</option>
          <option value="eMax500Soil">E-Max 500 (Soil)</option>
          <option value="eMax500Water">E-Max 500 (Water)</option>
          <option value="eLiteWater">E-Lite (Water)</option>
        </select>
      </div>
      <Bar
        data={data}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: { display: true, text: `Comparison Chart - ${selectedInstrument}` },
          },
        }}
      />
    </div>
  );
}

// 3D Visualisation using react-three-fibre
function ThreeDVisualisation() {
  return (
    <Canvas style={{ height: "400px", background: "#272727" }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    </Canvas>
  );
}

// AI-Driven Recommendations
function AIRecommendations({ elementsData, requirements }) {
  const instruments = [
    "jp500Food",
    "jp500Water",
    "zMaxFood",
    "zMaxWater",
    "eMax500Soil",
    "eMax500Water",
    "eLiteWater",
  ];
  const scores = instruments.map((instr) => {
    let score = 0;
    elementsData.forEach((e) => {
      const reqObj = requirements.find((r) => r.element === e.element);
      if (reqObj && reqObj.requirement) {
        const reqVal = parseFloat(reqObj.requirement);
        const specVal = e[instr];
        if (specVal !== null && specVal !== undefined && specVal < reqVal) {
          score += 1;
        }
      }
    });
    return { instrument: instr, score };
  });
  scores.sort((a, b) => b.score - a.score);
  const recommendation = scores[0] ? scores[0].instrument : "N/A";

  return (
    <div className="p-4 bg-white shadow-lg rounded">
      <h2 className="text-xl font-semibold mb-2">AI Recommendation</h2>
      <p>
        Based on your requirements, we recommend the <strong>{recommendation}</strong> instrument.
      </p>
      <ul className="mt-2">
        {scores.map((item) => (
          <li key={item.instrument}>
            {item.instrument}: {item.score} matches
          </li>
        ))}
      </ul>
    </div>
  );
}

// --- Main App Component ---
export default function App() {
  const [activeTab, setActiveTab] = useState("CustomerSpec");
  const [requirements, setRequirements] = useState([]);

  // Update a requirement for an element
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

  // Define the tabs (removed AR Viewer)
  const tabs = [
    { key: "CustomerSpec", label: "Customer Spec" },
    { key: "ComparisonChart", label: "Comparison Chart" },
    { key: "ThreeDVisualisation", label: "3D Visualisation" },
    { key: "AIRecommendations", label: "AI Recommendations" },
  ];

  // Render content based on the active tab
  const renderContent = () => {
    if (activeTab === "CustomerSpec") {
      return (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Set Your LoD Requirements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
            {elementsData.map((element) => {
              const currentRequirement =
                requirements.find((req) => req.element === element.element)?.requirement || "";
              return (
                <Card key={element.element} className="p-4 border rounded-lg bg-white shadow-lg">
                  <CardContent>
                    <h2 className="text-xl font-semibold mb-2">
                      {element.element}
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
    } else if (activeTab === "ComparisonChart") {
      return <ComparisonChart elementsData={elementsData} requirements={requirements} />;
    } else if (activeTab === "ThreeDVisualisation") {
      return <ThreeDVisualisation />;
    } else if (activeTab === "AIRecommendations") {
      return <AIRecommendations elementsData={elementsData} requirements={requirements} />;
    }
    return null;
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
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold" style={{ color: "#191919" }}>
          Z-Spec Instrument Sensitivity Comparison
        </h1>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`capitalize ${activeTab === tab.key ? "text-white bg-purple-800" : "bg-gray-100"}`}
            >
              {tab.label}
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
