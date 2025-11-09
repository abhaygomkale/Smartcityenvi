import { useState } from "react";
import { TreeDeciduous, Car, Factory, Wind, Sparkles, TrendingDown, Activity, X, Zap, Target, Award, DollarSign, ChevronRight, Play, RotateCcw, BarChart2, Maximize2, Minimize2, CheckCircle, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Separator } from "./ui/separator";
import { motion, AnimatePresence } from "motion/react";

interface SimulationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SimulationPanel({ isOpen, onClose }: SimulationPanelProps) {
  const [treeCount, setTreeCount] = useState([100]);
  const [trafficReduction, setTrafficReduction] = useState([20]);
  const [scrubberCount, setScrubberCount] = useState([5]);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationRun, setSimulationRun] = useState(false);
  const [activeInterventions, setActiveInterventions] = useState<string[]>([]);
  const [isMaximized, setIsMaximized] = useState(true);

  const runSimulation = () => {
    setSimulationActive(true);
    const interventions = [];
    if (treeCount[0] > 0) interventions.push('trees');
    if (trafficReduction[0] > 0) interventions.push('traffic');
    if (scrubberCount[0] > 0) interventions.push('tech');
    setActiveInterventions(interventions);
    
    setTimeout(() => {
      setSimulationActive(false);
      setSimulationRun(true);
    }, 3000);
  };

  const resetSimulation = () => {
    setSimulationRun(false);
    setActiveInterventions([]);
  };

  const calculateImpact = () => {
    const treeImpact = treeCount[0] * 0.05;
    const trafficImpact = trafficReduction[0] * 0.8;
    const scrubberImpact = scrubberCount[0] * 2;
    return Math.round(treeImpact + trafficImpact + scrubberImpact);
  };

  const calculateCost = () => {
    const treeCost = treeCount[0] * 500;
    const trafficCost = trafficReduction[0] * 10000;
    const scrubberCost = scrubberCount[0] * 2500000;
    return (treeCost + trafficCost + scrubberCost) / 100000;
  };

  const calculateTimeline = () => {
    const maxTime = Math.max(treeCount[0] / 10, trafficReduction[0] / 5, scrubberCount[0] * 2);
    return Math.ceil(maxTime);
  };

  const calculateROI = () => {
    const impact = calculateImpact();
    const cost = calculateCost();
    return cost > 0 ? ((impact / cost) * 10).toFixed(1) : '0';
  };

  const beforeAfterData = [
    { month: "Month 1", current: 1200, projected: 1200 - (calculateImpact() * 12 * 0.2), target: 900 },
    { month: "Month 2", current: 1180, projected: 1180 - (calculateImpact() * 12 * 0.4), target: 900 },
    { month: "Month 3", current: 1150, projected: 1150 - (calculateImpact() * 12 * 0.6), target: 900 },
    { month: "Month 4", current: 1120, projected: 1120 - (calculateImpact() * 12 * 0.8), target: 900 },
    { month: "Month 5", current: 1100, projected: 1100 - (calculateImpact() * 12), target: 900 },
    { month: "Month 6", current: 1080, projected: 1080 - (calculateImpact() * 12), target: 900 },
  ];

  const interventionBreakdown = [
    { name: "Trees", impact: Math.round(treeCount[0] * 0.05), color: "#10b981" },
    { name: "Traffic", impact: Math.round(trafficReduction[0] * 0.8), color: "#3b82f6" },
    { name: "Tech", impact: Math.round(scrubberCount[0] * 2), color: "#0891b2" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="absolute inset-4 bg-gradient-to-br from-slate-50 via-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-r from-[#1e40af] via-[#3b82f6] to-[#0891b2] px-8 py-6 shadow-lg">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDEyYzMuMzE0IDAgNiAyLjY4NiA2IDZzLTIuNjg2IDYtNiA2LTYtMi42ODYtNi02IDIuNjg2LTYgNi02eiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjEiLz48L2c+PC9zdmc+')] opacity-10"></div>
              
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <motion.div
                    initial={{ rotate: -180, scale: 0 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{ type: "spring", duration: 0.8 }}
                    className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-xl"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h2 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-white text-3xl mb-1"
                    >
                      🌍 Environmental Simulation Center
                    </motion.h2>
                    <motion.p 
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="text-white/90"
                    >
                      Advanced AI-powered intervention modeling for Nagpur City
                    </motion.p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="text-white hover:bg-white/20 w-10 h-10"
                  >
                    {isMaximized ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="text-white hover:bg-white/20 w-10 h-10"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-8">
              <div className="max-w-[1600px] mx-auto space-y-6">
                {/* Impact Dashboard */}
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="grid grid-cols-4 gap-4"
                >
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                          <TrendingDown className="h-5 w-5 text-blue-700" />
                        </div>
                        <p className="text-slate-600">CO₂ Reduction</p>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-5xl text-blue-700">{calculateImpact()}</p>
                        <span className="text-2xl text-blue-700">%</span>
                      </div>
                      <Badge className="bg-green-500 text-white">Estimated Impact</Badge>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-teal-400/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center">
                          <Award className="h-5 w-5 text-teal-700" />
                        </div>
                        <p className="text-slate-600">Impact Score</p>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-5xl text-teal-700">{calculateROI()}</p>
                        <span className="text-xl text-teal-700">/10</span>
                      </div>
                      <Badge className="bg-teal-600 text-white">ROI Rating</Badge>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-amber-700" />
                        </div>
                        <p className="text-slate-600">Total Cost</p>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-5xl text-amber-700">₹{calculateCost().toFixed(1)}</p>
                        <span className="text-xl text-amber-700">L</span>
                      </div>
                      <Badge className="bg-amber-600 text-white">Investment</Badge>
                    </div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 relative overflow-hidden hover:shadow-lg transition-all">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/10 rounded-full -mr-16 -mt-16"></div>
                    <div className="relative">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center">
                          <Target className="h-5 w-5 text-green-700" />
                        </div>
                        <p className="text-slate-600">Confidence</p>
                      </div>
                      <div className="flex items-baseline gap-2 mb-2">
                        <p className="text-5xl text-green-700">92</p>
                        <span className="text-2xl text-green-700">%</span>
                      </div>
                      <Badge className="bg-green-600 text-white">AI Accuracy</Badge>
                    </div>
                  </Card>
                </motion.div>

                {/* Intervention Controls */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-6 shadow-lg bg-white">
                    <h3 className="text-xl mb-4 flex items-center gap-2">
                      <Zap className="h-6 w-6 text-blue-600" />
                      Configure Interventions
                    </h3>
            
                    <Tabs defaultValue="trees" className="w-full">
                      <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-100">
                        <TabsTrigger value="trees" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white">
                          <TreeDeciduous className="h-4 w-4" />
                          <span>Green Cover</span>
                        </TabsTrigger>
                        <TabsTrigger value="traffic" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                          <Car className="h-4 w-4" />
                          <span>Traffic Mgmt</span>
                        </TabsTrigger>
                        <TabsTrigger value="tech" className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white">
                          <Factory className="h-4 w-4" />
                          <span>Technology</span>
                        </TabsTrigger>
                      </TabsList>

                      <TabsContent value="trees" className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Number of Trees</span>
                          <Badge className="bg-green-500">{treeCount[0]} units</Badge>
                        </div>
                        <Slider
                          value={treeCount}
                          onValueChange={setTreeCount}
                          max={500}
                          step={10}
                          className="w-full"
                        />
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
                            <p className="text-xs text-slate-600 mb-1">CO₂ Cut</p>
                            <p className="text-lg text-green-600">{Math.round(treeCount[0] * 0.05)}%</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
                            <p className="text-xs text-slate-600 mb-1">Cost</p>
                            <p className="text-lg text-green-600">₹{(treeCount[0] * 0.5).toFixed(1)}L</p>
                          </div>
                          <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
                            <p className="text-xs text-slate-600 mb-1">Timeline</p>
                            <p className="text-lg text-green-600">{Math.ceil(treeCount[0] / 10)}mo</p>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm mb-2 flex items-center gap-2">
                            <Wind className="h-4 w-4 text-blue-600" />
                            <span>Environmental Benefits</span>
                          </p>
                          <ul className="text-xs text-slate-600 space-y-1 ml-6">
                            <li>• Improved air quality through photosynthesis</li>
                            <li>• Urban heat island effect reduction</li>
                            <li>• Enhanced biodiversity in urban areas</li>
                            <li>• Natural CO₂ sequestration</li>
                          </ul>
                        </div>
                      </TabsContent>

                      <TabsContent value="traffic" className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Traffic Reduction Target</span>
                          <Badge className="bg-blue-500">{trafficReduction[0]}%</Badge>
                        </div>
                        <Slider
                          value={trafficReduction}
                          onValueChange={setTrafficReduction}
                          max={50}
                          step={5}
                          className="w-full"
                        />
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
                            <p className="text-xs text-slate-600 mb-1">CO₂ Cut</p>
                            <p className="text-lg text-blue-600">{Math.round(trafficReduction[0] * 0.8)}%</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
                            <p className="text-xs text-slate-600 mb-1">Cost</p>
                            <p className="text-lg text-blue-600">₹{(trafficReduction[0] / 10).toFixed(1)}L</p>
                          </div>
                          <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
                            <p className="text-xs text-slate-600 mb-1">Timeline</p>
                            <p className="text-lg text-blue-600">{Math.ceil(trafficReduction[0] / 5)}mo</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm">Recommended Measures:</p>
                          {trafficReduction[0] >= 10 && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                              <ChevronRight className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Promote public transport usage</span>
                            </div>
                          )}
                          {trafficReduction[0] >= 20 && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                              <ChevronRight className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Implement odd-even vehicle policy</span>
                            </div>
                          )}
                          {trafficReduction[0] >= 30 && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                              <ChevronRight className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Establish car-free zones in CBD</span>
                            </div>
                          )}
                          {trafficReduction[0] >= 40 && (
                            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                              <ChevronRight className="h-4 w-4 text-blue-600" />
                              <span className="text-sm">Congestion pricing implementation</span>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="tech" className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>CO₂ Scrubber Units</span>
                          <Badge className="bg-teal-500">{scrubberCount[0]} units</Badge>
                        </div>
                        <Slider
                          value={scrubberCount}
                          onValueChange={setScrubberCount}
                          max={20}
                          step={1}
                          className="w-full"
                        />
                        
                        <div className="grid grid-cols-3 gap-3">
                          <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
                            <p className="text-xs text-slate-600 mb-1">CO₂ Cut</p>
                            <p className="text-lg text-teal-600">{Math.round(scrubberCount[0] * 2)}%</p>
                          </div>
                          <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
                            <p className="text-xs text-slate-600 mb-1">Cost</p>
                            <p className="text-lg text-teal-600">₹{(scrubberCount[0] * 25).toFixed(0)}L</p>
                          </div>
                          <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
                            <p className="text-xs text-slate-600 mb-1">Timeline</p>
                            <p className="text-lg text-teal-600">{scrubberCount[0] * 2}mo</p>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                          <p className="text-sm mb-3">Technical Specifications:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span>Capacity: 1 ton CO₂/day</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span>Coverage: ~2 km²</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span>Maintenance: ₹50K/mo</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                              <span>Lifespan: 10-15 years</span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </Card>
                </motion.div>

                {/* Run Simulation Button */}
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex gap-3"
                >
                  <Button
                    className="flex-1 h-14 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-700 hover:via-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all"
                    onClick={runSimulation}
                    disabled={simulationActive || calculateImpact() === 0}
                  >
                    {simulationActive ? (
                      <>
                        <Activity className="h-5 w-5 mr-2 animate-spin" />
                        Running Advanced Simulation...
                      </>
                    ) : (
                      <>
                        <Play className="h-5 w-5 mr-2" />
                        Run AI-Powered Simulation
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    className="h-14 px-6 border-2"
                    onClick={resetSimulation}
                    disabled={!simulationRun}
                  >
                    <RotateCcw className="h-5 w-5 mr-2" />
                    Reset
                  </Button>
                </motion.div>

                {/* Simulation Progress */}
                {simulationActive && (
                  <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                  >
                    <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                          <p className="text-blue-700">Processing simulation parameters...</p>
                        </div>
                        <Progress value={33} className="h-2" />
                        <div className="grid grid-cols-3 gap-2 text-xs text-center">
                          {activeInterventions.includes('trees') && (
                            <div className="p-3 bg-green-50 rounded-lg animate-in fade-in border border-green-200">
                              <TreeDeciduous className="h-5 w-5 mx-auto mb-1 text-green-600" />
                              <span>Trees</span>
                            </div>
                          )}
                          {activeInterventions.includes('traffic') && (
                            <div className="p-3 bg-blue-50 rounded-lg animate-in fade-in delay-100 border border-blue-200">
                              <Car className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                              <span>Traffic</span>
                            </div>
                          )}
                          {activeInterventions.includes('tech') && (
                            <div className="p-3 bg-teal-50 rounded-lg animate-in fade-in delay-200 border border-teal-200">
                              <Factory className="h-5 w-5 mx-auto mb-1 text-teal-600" />
                              <span>Technology</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* Results */}
                {simulationRun && !simulationActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                  >
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl flex items-center gap-3">
                        <Badge className="bg-green-500 text-white px-4 py-2 text-base">
                          <Sparkles className="h-4 w-4 mr-2" />
                          Simulation Results
                        </Badge>
                      </h3>
                    </div>

                    {/* Charts - Full Width Layout */}
                    <div className="grid grid-cols-3 gap-6">
                      <Card className="p-6 bg-gradient-to-br from-green-50 to-white shadow-lg border-2 border-green-200">
                        <h3 className="mb-4 flex items-center gap-2">
                          <BarChart2 className="h-5 w-5 text-green-600" />
                          Impact Breakdown
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                          <BarChart data={interventionBreakdown}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "12px", border: "2px solid #e5e7eb" }} />
                            <Bar dataKey="impact" radius={[8, 8, 0, 0]}>
                              {interventionBreakdown.map((entry, index) => (
                                <Bar key={`bar-${index}`} dataKey="impact" fill={entry.color} />
                              ))}
                            </Bar>
                          </BarChart>
                        </ResponsiveContainer>
                      </Card>

                      <Card className="p-6 bg-gradient-to-br from-blue-50 to-white shadow-lg border-2 border-blue-200 col-span-2">
                        <h3 className="mb-4 flex items-center gap-2">
                          <Activity className="h-5 w-5 text-blue-600" />
                          6-Month Emission Projection
                        </h3>
                        <ResponsiveContainer width="100%" height={280}>
                          <LineChart data={beforeAfterData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip contentStyle={{ backgroundColor: "white", borderRadius: "12px", border: "2px solid #e5e7eb" }} />
                            <Legend />
                            <Line type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" name="Without Intervention" />
                            <Line type="monotone" dataKey="projected" stroke="#10b981" strokeWidth={3} name="With Intervention" dot={{ r: 4 }} />
                            <Line type="monotone" dataKey="target" stroke="#3b82f6" strokeWidth={2} strokeDasharray="3 3" name="Target" />
                          </LineChart>
                        </ResponsiveContainer>
                      </Card>
                    </div>

                    {/* Summary - Better Layout */}
                    <div className="grid grid-cols-2 gap-6">
                      <Card className="p-6 bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-blue-200 shadow-lg">
                        <h3 className="mb-4 text-xl flex items-center gap-2">
                          <Sparkles className="h-5 w-5 text-blue-600" />
                          Intervention Summary
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-green-200">
                            <p className="text-sm text-slate-600 mb-1">Trees Planted</p>
                            <p className="text-3xl text-green-600">{treeCount[0]}</p>
                            <p className="text-xs text-slate-600 mt-1">units</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-blue-200">
                            <p className="text-sm text-slate-600 mb-1">Traffic Reduced</p>
                            <p className="text-3xl text-blue-600">{trafficReduction[0]}</p>
                            <p className="text-xs text-slate-600 mt-1">percent</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-teal-200">
                            <p className="text-sm text-slate-600 mb-1">Scrubbers</p>
                            <p className="text-3xl text-teal-600">{scrubberCount[0]}</p>
                            <p className="text-xs text-slate-600 mt-1">units installed</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-2 border-green-500">
                            <p className="text-sm text-slate-600 mb-1">Total Reduction</p>
                            <div className="flex items-baseline gap-1">
                              <p className="text-3xl text-green-600">{calculateImpact()}</p>
                              <span className="text-xl text-green-600">%</span>
                            </div>
                            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                              <TrendingDown className="h-3 w-3" />
                              CO₂ Impact
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
                        <h3 className="mb-4 text-xl flex items-center gap-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          Financial & Timeline
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-amber-200">
                            <p className="text-sm text-slate-600 mb-1">Investment</p>
                            <p className="text-3xl text-amber-600">₹{calculateCost().toFixed(1)}</p>
                            <p className="text-xs text-slate-600 mt-1">Lakhs</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-blue-200">
                            <p className="text-sm text-slate-600 mb-1">Timeline</p>
                            <p className="text-3xl text-blue-600">{calculateTimeline()}</p>
                            <p className="text-xs text-slate-600 mt-1">months</p>
                          </div>
                          <div className="p-4 bg-white rounded-lg hover:shadow-md transition-all border-2 border-purple-200">
                            <p className="text-sm text-slate-600 mb-1">ROI Score</p>
                            <p className="text-3xl text-purple-600">{calculateROI()}</p>
                            <p className="text-xs text-slate-600 mt-1">out of 10</p>
                          </div>
                          <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border-2 border-blue-500">
                            <p className="text-sm text-slate-600 mb-1">Confidence</p>
                            <p className="text-3xl text-blue-600">92</p>
                            <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                              <Zap className="h-3 w-3" />
                              AI Accuracy
                            </p>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="grid grid-cols-4 gap-3">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white col-span-2 h-12">
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Apply to City Plan
                      </Button>
                      <Button variant="outline" className="border-2 h-12">
                        <Activity className="h-4 w-4 mr-2" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="border-2 h-12">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share Results
                      </Button>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
