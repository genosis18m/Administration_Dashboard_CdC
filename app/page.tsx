import BarChartComponent from './components/BarChart';
import { BarChart3 } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center mb-8">
          <BarChart3 className="w-8 h-8 mr-2" />
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Monthly Data</h2>
          <BarChartComponent />
        </div>
      </div>
    </div>
  );
}
