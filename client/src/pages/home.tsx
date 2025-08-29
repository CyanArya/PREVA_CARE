import FeatureShowcase from "@/components/feature-showcase";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Context section before feature showcase */}
      <section className="py-16 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Revolutionary Features</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover how our innovative features transform the way you work, connect, and achieve your goals.
          </p>
        </div>
      </section>

      <FeatureShowcase />

      {/* Section after feature showcase */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Join thousands of teams already using our platform to boost productivity and collaboration.
          </p>
          <button 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            data-testid="button-start-trial"
          >
            Start Free Trial
          </button>
        </div>
      </section>
    </div>
  );
}
