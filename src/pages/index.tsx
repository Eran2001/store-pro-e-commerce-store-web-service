import { DefaultLayout } from "@/layouts/DefaultLayout";

import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { PromoBanner } from "@/components/home/PromoBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { CategoriesSection } from "@/components/home/CategoriesSection";

const Index = () => {
  return (
    <DefaultLayout>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <PromoBanner />
      <TestimonialsSection />
    </DefaultLayout>
  );
};

export default Index;
