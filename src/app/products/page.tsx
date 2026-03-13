import ProductsPage from "@/(pages)/products";
import TestiComponent from "@/components/testimonialcta";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const ProductsView = () => {
  return (
    <div>
      <Navbar />
      <ProductsPage />
      <TestiComponent />
      <Footer />
    </div>
  );
};

export default ProductsView;
