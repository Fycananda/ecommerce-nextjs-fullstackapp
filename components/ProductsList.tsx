"use client"
import Stripe from "stripe"
import { ProductCard } from "./ProductsCard"
import { useState } from "react"

interface Props {
    products: Stripe.Product[]
}

export const ProductList = ({ products }: Props) => {
    const [search, setSearch] = useState<string>("")

    const filteredProduct = products.filter((product) => {
        const filter = search.toLowerCase()
        const filterMatch = product.name.toLowerCase().includes(filter)
        const descriptionMatch = product.description
            ? product.description.toLowerCase().includes(filter)
            : false

        return filterMatch || descriptionMatch
    })

    return (
        <div className="space-y-8">
            <div className="flex justify-center">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    placeholder="Search Products..."
                    className="w-full max-w-md rounded border border-gray-300 py-2 px-4 focus:outline-none"
                />
            </div>

            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProduct.map((product, i) => {
                    return <li key={i}>
                        <ProductCard product={product} />
                    </li>
                })}
            </ul>
        </div>
    )
}