import { db } from "@/lib/db"
import { deleteProduct } from "../../actions/product-actions"
import Link from "next/link"

export default async function ProductsPage() {
  const products = await db.product.findMany({
    include: { category: true }
  })

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create Product
        </Link>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Price</th>
              <th className="px-4 py-2 text-left">Stock</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">${product.price.toString()}</td>
                <td className="px-4 py-2">{product.stock}</td>
                <td className="px-4 py-2">
                  <form action={deleteProduct.bind(null, product.id)} className="inline">
                    <button type="submit" className="bg-red-500 text-white px-3 py-1 rounded">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}