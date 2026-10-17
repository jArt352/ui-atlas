import { PageHeader } from "@/components/atlas/app-shell";
import { CartView } from "@/components/atlas/cart-view";

export default function CarritoPage() {
  return (
    <>
      <PageHeader
        title="Mi dashboard"
        description="Aquí están las piezas que elegiste. Con ellas se generan el prompt para tu agente, la documentación del proyecto y los comandos para instalarlas."
      />
      <CartView />
    </>
  );
}
