import Hero from '@/components/Hero';
import FeaturedProducts from '@/components/FeaturedProducts';
import NewsletterSignUp from '@/components/NewsletterSignUp';

export default function Home() {
  return (
    <div className="bg-white">
      <Hero />
      <FeaturedProducts />
      <NewsletterSignUp />
    </div>
  );
}
