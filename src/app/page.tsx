import type { NextPage } from 'next';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import Overview from '@/components/overview';
import ProductsPage from '@/components/products';
import TestiComponent from '@/components/testimonial';
import Footer from '@/components/footer';

const Home: NextPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <Overview />
      <ProductsPage />
      <TestiComponent />
      <Footer />
    </div>
  );
};

export default Home;
