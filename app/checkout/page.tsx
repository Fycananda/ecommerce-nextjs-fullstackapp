"use client"

import { Button } from "@/components/ui/button"
import { useCartStore } from "@/store/cart-store"
import { TrashIcon } from "@heroicons/react/24/outline"
import { CheckoutAction } from "./checkout-action"
import Link from "next/link"

export default function CheckoutPage() {
    const { items, removeItem, addItem, clearCart } = useCartStore()

    // Total dihitung berdasarkan harga asli (asumsi store menyimpan dalam satuan standar atau sudah dibagi 100)
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0)

    const formatJPY = (number: number) => {
        return new Intl.NumberFormat("ja-JP", {
            style: "currency",
            currency: "JPY",
        }).format(number)
    }

    if (items.length === 0) {
        return (
            <div className="p-20 text-center">
                <h1 className="text-xl text-gray-500">Your Cart is Empty</h1>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-10">
            <h1 className="text-3xl font-bold mb-8 pb-4 border-b">Checkout</h1>

            {/* Kontainer Utama List Item */}
            <div className="space-y-6">
                {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-2 items-center pb-6 border-b">

                        {/* Kolom 1: Info Produk */}
                        <div>
                            <h2 className="text-lg font-medium">{item.name}</h2>
                            <p className="text-sm text-gray-500">Unit Price: {formatJPY(item.price)}</p>
                        </div>

                        {/* Kolom 2: Kontrol Quantity & Subtotal Harga */}
                        <div className="flex items-center justify-between">

                            <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-lg">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeItem(item.id)}
                                >
                                    -
                                </Button>
                                <span className="w-8 text-center font-bold">{item.quantity}</span>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addItem({ ...item, quantity: 1 })}
                                >
                                    +
                                </Button>
                            </div>

                            <div className="text-right">
                                <p className="font-semibold text-lg">
                                    {formatJPY(item.price * item.quantity)}
                                </p>
                            </div>

                        </div>
                    </div>
                ))}
            </div>

            {/* Baris Bawah: Total Amount */}
            <div className="mt-10 flex justify-end ">
                <div className="w-full md:w-1/2 bg-gray-50 p-6 rounded-2xl border ">

                    <div className="flex justify-between items-center border-b p-4">
                        <span className="text-gray-600 font-medium">Total Summary</span>
                        <span className="text-3xl font-bold text-red-600">
                            {formatJPY(total)}
                        </span>
                    </div>

                    <form action={CheckoutAction}>

                        <input type="hidden" name="items" value={JSON.stringify(items)} />

                        <Button
                            type="submit"
                            variant={"default"}
                            className="w-full mt-6 text-white hover:bg-gray-800 py-6 text-lg"
                        >
                            Proceed to Payment
                        </Button>
                        <div className="w-full mt-6 flex justify-end">
                            <Link href={"/products"}>
                                <Button
                                    onClick={clearCart}
                                    variant={"destructive"}
                                    className=" text-white rounded-br-2xl w-16 hover:bg-red-800 py-6 text-lg"
                                >
                                    <TrashIcon />
                                </Button>
                            </Link>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}
