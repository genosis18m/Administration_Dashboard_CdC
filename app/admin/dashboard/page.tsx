import { db } from "@/lib/db"
import OverviewChart from "../../components/charts/OverviewChart"

export default async function DashboardPage() {
  const totalProducts = await db.product.count()

  const totalStockResult = await db.product.aggregate({
    _sum: { stock: true }
  })

  const totalStock = totalStockResult._sum.stock || 0

  const products = await db.product.findMany({
    include: { category: true }
  })

  const stockByCategory = products.reduce((acc, product) => {
    const catName = product.category.name
    if (!acc[catName]) acc[catName] = 0
    acc[catName] += product.stock
    return acc
  }, {} as Record<string, number>)

  const chartData = Object.entries(stockByCategory).map(([name, stock]) => ({ name, stock }))

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Products</h2>
          <p className="text-2xl">{totalProducts}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold">Total Stock</h2>
          <p className="text-2xl">{totalStock}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Stock by Category</h2>
        <OverviewChart data={chartData} />
      </div>
    </div>
  )
}