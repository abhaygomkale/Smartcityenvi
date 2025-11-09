import { useState } from "react";
import { TreeDeciduous, Car, Factory, Wind, Sparkles, TrendingDown, Activity, Zap, Target, Award, DollarSign, ChevronRight, Play, RotateCcw, BarChart2, Leaf, CloudRain, Users, Building, TrendingUp, CheckCircle2, AlertCircle, XCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Slider } from "./ui/slider";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";
import { Separator } from "./ui/separator";
import { motion } from "motion/react";

export function SimulationPage() {
  const [treeCount, setTreeCount] = useState([100]);
  const [trafficReduction, setTrafficReduction] = useState([20]);
  const [scrubberCount, setScrubberCount] = useState([5]);
  const [simulationActive, setSimulationActive] = useState(false);
  const [simulationRun, setSimulationRun] = useState(false);
  const [activeInterventions, setActiveInterventions] = useState<string[]>([]);

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
    { name: "Trees", impact: Math.round(treeCount[0] * 0.05), fill: "#10b981" },
    { name: "Traffic", impact: Math.round(trafficReduction[0] * 0.8), fill: "#3b82f6" },
    { name: "Tech", impact: Math.round(scrubberCount[0] * 2), fill: "#0891b2" },
  ];

  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-slate-50 via-white to-blue-50 relative">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-blue-400 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-teal-400 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -40, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgwLDAsMCwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40" />
      </div>

      {/* Compact Header */}
      <div className="relative bg-gradient-to-r from-blue-700 via-blue-600 to-teal-500 px-6 py-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", duration: 0.8 }}
              className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-xl flex items-center justify-center border border-white/30 shadow-2xl"
            >
              <Sparkles className="h-6 w-6 text-white" />
            </motion.div>
            <div>
              <motion.h1 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl text-white"
              >
                🌍 Environmental Simulation Center
              </motion.h1>
              <motion.p 
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm text-white/90"
              >
                Advanced AI-powered intervention modeling for Nagpur City
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Main Content */}
      <div className="relative p-4">
        <div className="max-w-7xl mx-auto space-y-4">
          {/* Impact Dashboard - Compact */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3"
          >
            <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-400/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <TrendingDown className="h-5 w-5 text-blue-700" />
                  </div>
                  <p className="text-sm text-slate-600">CO₂ Reduction</p>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-4xl text-blue-700">{calculateImpact()}</p>
                  <span className="text-xl text-blue-700">%</span>
                </div>
                <Badge className="bg-green-500 text-white text-xs">Estimated Impact</Badge>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-2 border-teal-200 relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-400/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-teal-500/20 flex items-center justify-center">
                    <Award className="h-5 w-5 text-teal-700" />
                  </div>
                  <p className="text-sm text-slate-600">Impact Score</p>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-4xl text-teal-700">{calculateROI()}</p>
                  <span className="text-lg text-teal-700">/10</span>
                </div>
                <Badge className="bg-teal-600 text-white text-xs">ROI Rating</Badge>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200 relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-400/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-amber-700" />
                  </div>
                  <p className="text-sm text-slate-600">Total Cost</p>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-4xl text-amber-700">₹{calculateCost().toFixed(1)}</p>
                  <span className="text-lg text-amber-700">L</span>
                </div>
                <Badge className="bg-amber-600 text-white text-xs">Investment</Badge>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-2 border-green-200 relative overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1">
              <div className="absolute top-0 right-0 w-24 h-24 bg-green-400/10 rounded-full -mr-12 -mt-12"></div>
              <div className="relative">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Target className="h-5 w-5 text-green-700" />
                  </div>
                  <p className="text-sm text-slate-600">Confidence</p>
                </div>
                <div className="flex items-baseline gap-1 mb-1">
                  <p className="text-4xl text-green-700">92</p>
                  <span className="text-xl text-green-700">%</span>
                </div>
                <Badge className="bg-green-600 text-white text-xs">AI Accuracy</Badge>
              </div>
            </Card>
          </motion.div>

          {/* Compact Intervention Controls */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-4 shadow-lg bg-white">
              <h3 className="text-xl mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Configure Interventions
              </h3>
      
              <Tabs defaultValue="trees" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4 bg-slate-100 h-12">
                  <TabsTrigger value="trees" className="flex items-center gap-2 data-[state=active]:bg-green-500 data-[state=active]:text-white text-base">
                    <TreeDeciduous className="h-5 w-5" />
                    <span>Green Cover</span>
                  </TabsTrigger>
                  <TabsTrigger value="traffic" className="flex items-center gap-2 data-[state=active]:bg-blue-500 data-[state=active]:text-white text-base">
                    <Car className="h-5 w-5" />
                    <span>Traffic Mgmt</span>
                  </TabsTrigger>
                  <TabsTrigger value="tech" className="flex items-center gap-2 data-[state=active]:bg-teal-500 data-[state=active]:text-white text-base">
                    <Factory className="h-5 w-5" />
                    <span>Technology</span>
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="trees" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Number of Trees</span>
                    <Badge className="bg-green-500 px-3">{treeCount[0]} units</Badge>
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
                      <p className="text-xl text-green-600">{Math.round(treeCount[0] * 0.05)}%</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
                      <p className="text-xs text-slate-600 mb-1">Cost</p>
                      <p className="text-xl text-green-600">₹{(treeCount[0] * 0.5).toFixed(1)}L</p>
                    </div>
                    <div className="p-3 bg-green-50 rounded-lg text-center border border-green-200">
                      <p className="text-xs text-slate-600 mb-1">Timeline</p>
                      <p className="text-xl text-green-600">{Math.ceil(treeCount[0] / 10)}mo</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="mb-2 flex items-center gap-2 text-sm">
                      <Wind className="h-4 w-4 text-blue-600" />
                      <span>Environmental Benefits</span>
                    </p>
                    <ul className="text-xs text-slate-600 space-y-1 ml-5">
                      <li>• Improved air quality through photosynthesis</li>
                      <li>• Urban heat island effect reduction</li>
                      <li>• Enhanced biodiversity in urban areas</li>
                      <li>• Natural CO₂ sequestration</li>
                    </ul>
                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Traffic Reduction Target</span>
                    <Badge className="bg-blue-500 px-3">{trafficReduction[0]}%</Badge>
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
                      <p className="text-xl text-blue-600">{Math.round(trafficReduction[0] * 0.8)}%</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
                      <p className="text-xs text-slate-600 mb-1">Cost</p>
                      <p className="text-xl text-blue-600">₹{(trafficReduction[0] / 10).toFixed(1)}L</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg text-center border border-blue-200">
                      <p className="text-xs text-slate-600 mb-1">Timeline</p>
                      <p className="text-xl text-blue-600">{Math.ceil(trafficReduction[0] / 5)}mo</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm">Recommended Measures:</p>
                    {trafficReduction[0] >= 10 && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Promote public transport usage</span>
                      </div>
                    )}
                    {trafficReduction[0] >= 20 && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Implement odd-even vehicle policy</span>
                      </div>
                    )}
                    {trafficReduction[0] >= 30 && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Establish car-free zones in CBD</span>
                      </div>
                    )}
                    {trafficReduction[0] >= 40 && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer border border-blue-200">
                        <ChevronRight className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Congestion pricing implementation</span>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="tech" className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>CO₂ Scrubber Units</span>
                    <Badge className="bg-teal-500 px-3">{scrubberCount[0]} units</Badge>
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
                      <p className="text-xl text-teal-600">{Math.round(scrubberCount[0] * 2)}%</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
                      <p className="text-xs text-slate-600 mb-1">Cost</p>
                      <p className="text-xl text-teal-600">₹{(scrubberCount[0] * 25).toFixed(0)}L</p>
                    </div>
                    <div className="p-3 bg-teal-50 rounded-lg text-center border border-teal-200">
                      <p className="text-xs text-slate-600 mb-1">Timeline</p>
                      <p className="text-xl text-teal-600">{scrubberCount[0] * 2}mo</p>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                    <p className="mb-2 text-sm">Technical Specifications:</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Capacity: 1 ton CO₂/day</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Coverage: ~2 km²</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Maintenance: ₹50K/mo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                        <span>Lifespan: 10-15 years</span>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </motion.div>

          {/* Compact Run Simulation Button */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-2"
          >
            <Button
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 via-blue-500 to-teal-500 hover:from-blue-700 hover:via-blue-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transition-all"
              onClick={runSimulation}
              disabled={simulationActive || calculateImpact() === 0}
            >
              {simulationActive ? (
                <>
                  <Activity className="h-5 w-5 mr-2 animate-spin" />
                  Running Simulation...
                </>
              ) : (
                <>
                  <Play className="h-5 w-5 mr-2" />
                  Run AI Simulation
                </>
              )}
            </Button>
            <Button
              variant="outline"
              className="h-12 px-6 border-2"
              onClick={resetSimulation}
              disabled={!simulationRun}
            >
              <RotateCcw className="h-5 w-5 mr-2" />
              Reset
            </Button>
          </motion.div>

          {/* Compact Simulation Progress */}
          {simulationActive && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 shadow-lg">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                    <p className="text-blue-700">Processing simulation parameters...</p>
                  </div>
                  <Progress value={33} className="h-2" />
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {activeInterventions.includes('trees') && (
                      <div className="p-3 bg-green-50 rounded-lg animate-in fade-in border border-green-200">
                        <TreeDeciduous className="h-5 w-5 mx-auto mb-1 text-green-600" />
                        <span className="text-sm">Trees</span>
                      </div>
                    )}
                    {activeInterventions.includes('traffic') && (
                      <div className="p-3 bg-blue-50 rounded-lg animate-in fade-in delay-100 border border-blue-200">
                        <Car className="h-5 w-5 mx-auto mb-1 text-blue-600" />
                        <span className="text-sm">Traffic</span>
                      </div>
                    )}
                    {activeInterventions.includes('tech') && (
                      <div className="p-3 bg-teal-50 rounded-lg animate-in fade-in delay-200 border border-teal-200">
                        <Factory className="h-5 w-5 mx-auto mb-1 text-teal-600" />
                        <span className="text-sm">Technology</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Compact Results */}
          {simulationRun && !simulationActive && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-4"
            >
              <Separator />
              
              <div className="flex items-center justify-between">
                <Badge className="bg-green-500 text-white px-4 py-2">
                  <Sparkles className="h-4 w-4 mr-2" />
                  Simulation Results
                </Badge>
              </div>

              {/* Compact Results Summary Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Card className="p-3 bg-gradient-to-br from-green-50 to-green-100 border border-green-300 relative overflow-hidden">
                    <motion.div
                      className="absolute -top-8 -right-8 w-24 h-24 bg-green-400/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <div className="relative">
                      <CheckCircle2 className="h-8 w-8 text-green-600 mb-2" />
                      <p className="text-xs text-slate-600 mb-1">Success Rate</p>
                      <p className="text-3xl text-green-700">94.5%</p>
                      <Badge className="bg-green-600 text-white mt-1 text-xs">High Confidence</Badge>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <Card className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 relative overflow-hidden">
                    <motion.div
                      className="absolute -top-8 -right-8 w-24 h-24 bg-blue-400/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1], rotate: [0, -180, -360] }}
                      transition={{ duration: 8, repeat: Infinity }}
                    />
                    <div className="relative">
                      <Users className="h-8 w-8 text-blue-600 mb-2" />
                      <p className="text-xs text-slate-600 mb-1">People Benefited</p>
                      <p className="text-3xl text-blue-700">{(calculateImpact() * 12500).toLocaleString()}</p>
                      <Badge className="bg-blue-600 text-white mt-1 text-xs">Estimated</Badge>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Card className="p-3 bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-300 relative overflow-hidden">
                    <motion.div
                      className="absolute -top-8 -right-8 w-24 h-24 bg-teal-400/20 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 6, repeat: Infinity }}
                    />
                    <div className="relative">
                      <Leaf className="h-8 w-8 text-teal-600 mb-2" />
                      <p className="text-xs text-slate-600 mb-1">CO₂ Saved/Year</p>
                      <p className="text-3xl text-teal-700">{(calculateImpact() * 850).toLocaleString()}</p>
                      <p className="text-xs text-teal-600">tons</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Card className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-300 relative overflow-hidden">
                    <motion.div
                      className="absolute -top-8 -right-8 w-24 h-24 bg-purple-400/20 rounded-full"
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="relative">
                      <CloudRain className="h-8 w-8 text-purple-600 mb-2" />
                      <p className="text-xs text-slate-600 mb-1">AQI Improvement</p>
                      <p className="text-3xl text-purple-700">-{Math.round(calculateImpact() * 1.8)}</p>
                      <Badge className="bg-purple-600 text-white mt-1 text-xs">Points</Badge>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* Compact Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="p-4 bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                    <h3 className="mb-3 flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-green-600" />
                      Impact Breakdown by Intervention
                    </h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <BarChart data={interventionBreakdown}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                        <Bar dataKey="impact" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Card className="p-4 bg-white shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
                    <h3 className="mb-3 flex items-center gap-2">
                      <TrendingDown className="h-5 w-5 text-blue-600" />
                      6-Month CO₂ Projection
                    </h3>
                    <ResponsiveContainer width="100%" height={240}>
                      <LineChart data={beforeAfterData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip contentStyle={{ backgroundColor: "white", border: "1px solid #e5e7eb", borderRadius: "8px" }} />
                        <Legend />
                        <Line type="monotone" dataKey="current" stroke="#94a3b8" strokeWidth={2} name="Current Trend" dot={{ r: 4 }} />
                        <Line type="monotone" dataKey="projected" stroke="#3b82f6" strokeWidth={3} name="With Intervention" dot={{ r: 5 }} />
                        <Line type="monotone" dataKey="target" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" name="Target Goal" dot={{ r: 4 }} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Card>
                </motion.div>
              </div>

              {/* Compact Impact Analysis */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="p-4 bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 shadow-lg">
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Comprehensive Impact Analysis
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-green-700 text-sm">
                        <CheckCircle2 className="h-4 w-4" />
                        Environmental Benefits
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-green-200">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Air Quality</p>
                            <p className="text-xs text-slate-600">AQI: -{Math.round(calculateImpact() * 1.8)} points</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-green-200">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Temperature</p>
                            <p className="text-xs text-slate-600">Heat: -{(calculateImpact() * 0.15).toFixed(1)}°C</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-green-200">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Green Cover</p>
                            <p className="text-xs text-slate-600">+{(treeCount[0] * 2.5).toFixed(0)} acres</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-blue-700 text-sm">
                        <Building className="h-4 w-4" />
                        Socioeconomic Impact
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-blue-200">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Health Benefits</p>
                            <p className="text-xs text-slate-600">₹{((calculateImpact() * 25000) / 100000).toFixed(1)}Cr/year</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-blue-200">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Jobs Created</p>
                            <p className="text-xs text-slate-600">{Math.round(calculateImpact() * 45)} positions</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-blue-200">
                          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Quality of Life</p>
                            <p className="text-xs text-slate-600">+{(calculateImpact() * 0.8).toFixed(1)}% improvement</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <h4 className="flex items-center gap-2 text-amber-700 text-sm">
                        <AlertCircle className="h-4 w-4" />
                        Implementation Risks
                      </h4>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-amber-200">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Budget Variance</p>
                            <p className="text-xs text-slate-600">±{Math.round(calculateCost() * 12)}% potential</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-amber-200">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Timeline Delays</p>
                            <p className="text-xs text-slate-600">{calculateTimeline() + 2}-{calculateTimeline() + 4} months buffer</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-amber-200">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full mt-1"></div>
                          <div>
                            <p className="text-xs">Maintenance</p>
                            <p className="text-xs text-slate-600">₹{((calculateCost() * 0.15) / 100000).toFixed(2)}L/month</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Compact Action Plan Timeline */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Card className="p-4 bg-white border border-slate-200 shadow-lg">
                  <h3 className="text-lg mb-4 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-yellow-600" />
                    Implementation Roadmap
                  </h3>
                  
                  <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-teal-500 to-green-500"></div>
                    
                    <div className="space-y-4">
                      {/* Phase 1 */}
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white z-10 shadow-lg border-2 border-white text-sm">
                          <span>Q1</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="mb-1">Planning & Setup</h4>
                          <p className="text-xs text-slate-600 mb-2">Site selection, permits, stakeholder engagement</p>
                          <div className="flex gap-2">
                            <Badge className="bg-blue-100 text-blue-700 text-xs">1-2 months</Badge>
                            <Badge className="bg-blue-100 text-blue-700 text-xs">₹{(calculateCost() * 0.15).toFixed(1)}L</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Phase 2 */}
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center text-white z-10 shadow-lg border-2 border-white text-xs">
                          <span>Q2-3</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="mb-1">Deployment Phase</h4>
                          <p className="text-xs text-slate-600 mb-2">Installation of interventions, training programs</p>
                          <div className="flex gap-2">
                            <Badge className="bg-teal-100 text-teal-700 text-xs">{calculateTimeline()} months</Badge>
                            <Badge className="bg-teal-100 text-teal-700 text-xs">₹{(calculateCost() * 0.65).toFixed(1)}L</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Phase 3 */}
                      <div className="relative flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white z-10 shadow-lg border-2 border-white text-sm">
                          <span>Q4</span>
                        </div>
                        <div className="flex-1 pt-2">
                          <h4 className="mb-1">Monitoring & Optimization</h4>
                          <p className="text-xs text-slate-600 mb-2">Data collection, impact assessment, adjustments</p>
                          <div className="flex gap-2">
                            <Badge className="bg-green-100 text-green-700 text-xs">Ongoing</Badge>
                            <Badge className="bg-green-100 text-green-700 text-xs">₹{(calculateCost() * 0.2).toFixed(1)}L</Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
