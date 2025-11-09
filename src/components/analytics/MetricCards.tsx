import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { TrendingDown, TrendingUp } from "lucide-react";

export const MetricCards = ({ metrics, onCardClick }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metrics.map((metric, idx) => {
        const Icon = metric.icon;
        const gradientColors = [
          'from-blue-50 to-blue-100 border-blue-200',
          'from-teal-50 to-teal-100 border-teal-200',
          'from-amber-50 to-amber-100 border-amber-200',
          'from-green-50 to-green-100 border-green-200',
          'from-purple-50 to-purple-100 border-purple-200',
          'from-cyan-50 to-cyan-100 border-cyan-200',
        ];
        return (
          <motion.div
            key={metric.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
          >
            <Card
              className={`p-6 cursor-pointer bg-gradient-to-br ${gradientColors[idx]} border-2 relative overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group`}
              onClick={() => onCardClick(metric.id)}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 opacity-20" style={{ backgroundColor: metric.color }}></div>
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg" style={{ backgroundColor: `${metric.color}30` }}>
                    <Icon className="h-7 w-7" style={{ color: metric.color }} />
                  </div>
                  <Badge className={metric.trend === 'down' ? 'bg-green-500 text-white shadow-md' : 'bg-blue-500 text-white shadow-md'}>
                    {metric.trend === 'down' ? <TrendingDown className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                    {metric.change}
                  </Badge>
                </div>
                <p className="text-sm text-slate-600 mb-3">{metric.title}</p>
                <div className="flex items-baseline gap-2 mb-3">
                  <p className="text-5xl" style={{ color: metric.color }}>{metric.value}</p>
                  {metric.unit && <span className="text-2xl" style={{ color: metric.color }}>{metric.unit}</span>}
                </div>
                <p className="text-xs text-slate-600 mb-3">{metric.description}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group-hover:bg-white hover:shadow-md transition-all border-2"
                  style={{ borderColor: metric.color, color: metric.color }}
                >
                  <span>View Details →</span>
                </Button>
              </div>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};