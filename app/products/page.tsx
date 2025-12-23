import { ProductList } from "@/components/ProductsList"
import { stripe } from "@/lib/stripe"


export default async function ProductsPage() {
    const products = await stripe.products.list({
        expand: ["data.default_price"],
    })


    return (
        <div className="my-8 relative z-0">
            <h1
                className="text-3xl text-center font-bold leading-none tracking-tight text-foreground mb-8"
            >
                All Products
            </h1>
            <ProductList products={products.data} />
        </div>
    )
}