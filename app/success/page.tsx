// app/success/page.tsx
import Link from "next/link"
import { CheckCircle2 } from "lucide-react" // Pastikan sudah install lucide-react
import { Button } from "@/components/ui/button"
import ClearCart from "./ClearCart"


export default function SuccessPage() {

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
            {/* Jalankan pembersihan keranjang */}

            <ClearCart />

            <div className="bg-white p-8 rounded-2xl shadow-xl border max-w-md w-full text-center space-y-6">
                <div className="flex justify-center">
                    <CheckCircle2 className="w-20 h-20 text-green-500 animate-bounce" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>

                <p className="text-gray-600">
                    Thank you for your purchase. Your order is being processed and will be shipped soon.
                </p>

                <div className="pt-6">
                    <Link href="/products">
                        <Button className="w-full bg-black text-white hover:bg-gray-800 py-6 text-lg">
                            Continue Shopping
                        </Button>
                    </Link>
                </div>

                <p className="text-xs text-gray-400">
                    A confirmation email has been sent to your inbox.
                </p>
            </div>
        </div>
    )
}