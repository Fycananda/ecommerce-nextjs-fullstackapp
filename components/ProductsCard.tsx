import Link from "next/link"
import Stripe from "stripe"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"

interface Props {
    product: Stripe.Product
}

export const ProductCard = ({ product }: Props) => {
    const price = product.default_price as Stripe.Price


    return (
        <Link href={`products/${product.id}`} className="block h-full">
            <Card
                className="group flex flex-col border-gray-300 hover:shadow-2xl transition duration-300 py-0 h-full "
            >
                {product.images && product.images[0] && (
                    <div className="relative h-60 w-full">
                        <Image
                            alt={product.name}
                            src={product.images[0]}
                            fill
                            objectFit="cover"
                            className="group-hover:opacity-90 transition-opacity duration-300 rounded-t-lg shadow-lg"
                            unoptimized
                        />
                    </div>
                )}

                <CardHeader className="p-4 pb-0">
                    <CardTitle className="text-xl text-gray-800 font-bold line-clamp-1">
                        {product.name}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 flex flex-col gap-4 grow">
                    {product.description && (
                        <p
                            className="text-gray-600 text-sm line-clamp-2 italic"
                        >
                            {product.description}
                        </p>
                    )}

                    <div className="mt-auto space-y-3">
                        {price && price.unit_amount &&
                            <p className="text-gray-900 text-lg font-bold">
                                ¥ {(price.unit_amount / 1000).toFixed(3)}
                            </p>}

                        <Button
                            className="w-full bg-black text-white hover:bg-gray-800 transition-colors"
                        >
                            View Details
                        </Button>
                    </div>
                </CardContent>

            </Card>
        </Link>
    )
}