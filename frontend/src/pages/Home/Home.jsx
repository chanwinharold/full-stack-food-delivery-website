import Button from "../../components/Button/Button";
import "./Home.css";

function Home() {
  return (
    <main className="px-6 py-8">
      <HeroSection />
    </main>
  );
}

export default Home;

const HeroSection = () => {
  return (
    <section className="min-w-full">
      <div className="section-hero">
        {/* Blur orangered backdrop */}
        <div className="bg-gradient"></div>

        <div className="hero-content">
          <h1>
            Order your favourite <br />
            food here
          </h1>
          <p>
            Choose from a diverse menu featuring a delectable array of dishes
            crafted with the finest ingredients and culinary expertise. Our
            mission is to satisfy your cravings and elevate your dining
            experience, one delicious meal at a time.
          </p>
          <Button link={"/menu"} className={"inline-flex gap-x-4 btn-primary-outlined rounded-xl bg-neutral-950 hover:text-neutral-950 hover:bg-primary-600"}>
            View Menu
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-move-right-icon lucide-move-right"><path d="M18 8L22 12L18 16" /><path d="M2 12H22" /></svg>
          </Button>
        </div>
      </div>
    </section>
  );
};