import { products } from "@/lib/data/products";
import { ProductDetailClient } from "./ProductDetailClient";

// Generate static params for all products
export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const productId = parseInt(params.id);
  const product = products.find((p) => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h1>
          <p className="text-gray-600">
            Le produit que vous recherchez n&apos;existe pas.
          </p>
        </div>
      </div>
    );
  }

  return <ProductDetailClient product={product} />;
}
