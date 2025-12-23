"use client"

import Image from "next/image"
import Stripe from "stripe"
import { Button } from "./ui/button"
import { useCartStore } from "@/store/cart-store"

interface Props {
    product: Stripe.Product
}

export const ProductDetail = ({ product }: Props) => {
    const { items, addItem, removeItem } = useCartStore()
    const price = product.default_price as Stripe.Price
    const cartItem = items.find((item) => item.id === product.id)
    const quantity = cartItem ? cartItem.quantity : 0

    const onAddItem = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: price.unit_amount as number,
            imageUrl: product.images ? product.images[0] : null,
            quantity: 1
        })
    }

    return (
        <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 items-center">
            {product.images && product.images[0] && (
                <div className="relative h-96 w-full md:w-1/3 rounded-lg overflow-hidden">
                    <Image
                        alt={product.name}
                        src={product.images[0]}
                        fill
                        objectFit="cover"
                        className="hover:opacity-90 transition duration-300"
                        unoptimized
                    />
                </div>
            )}

            <div className="md:w-1/2 space-y-4">
                <h1 className="text-3xl font-bold">{product.name}</h1>
                {product.description &&
                    <p className="text-gray-700">{product.description}</p>}

                {price && price.unit_amount &&
                    <p className="text-gray-900 text-lg font-bold">
                        ¥ {(price.unit_amount / 1000).toFixed(3)}
                    </p>}

                <div className="flex items-center gap-4">
                    <Button variant={"outline"} onClick={() => removeItem(product.id)}>-</Button>
                    <span className="text-lg font-semibold">{quantity}</span>
                    <Button variant={"default"} onClick={onAddItem}>+</Button>
                </div>
            </div>
        </div>
    )
}