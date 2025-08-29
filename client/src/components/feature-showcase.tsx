import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Signal, Wifi, Battery } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Feature {
  title: string;
  description: string;
  image: string;
}

const features: Feature[] = [
  {
    title: "Smart Analytics Dashboard",
    description: "Get real-time insights into your performance with our advanced analytics dashboard. Track metrics, identify trends, and make data-driven decisions effortlessly.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
  },
  {
    title: "Team Collaboration",
    description: "Seamless workflow management and team communication tools that keep everyone aligned and productive, no matter where they work.",
    image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
  },
  {
    title: "AI-Powered Automation",
    description: "Intelligent automation and smart recommendations that learn from your workflow to save time and reduce manual tasks.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
  },
  {
    title: "Advanced Security",
    description: "Enterprise-grade security with end-to-end encryption, multi-factor authentication, and comprehensive audit trails for peace of mind.",
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
  },
  {
    title: "Custom Integrations",
    description: "Connect with your favorite tools and platforms through our extensive API and pre-built integrations for a unified workflow experience.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=800"
  }
];

export default function FeatureShowcase() {
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const isMobile = useIsMobile();
  
  const showcaseRef = useRef<HTMLElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();
  const autoAdvanceTimeoutRef = useRef<NodeJS.Timeout>();
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  // Update feature content
  const updateFeatureContent = (index: number) => {
    if (index === activeFeatureIndex) return;
    
    setImageLoading(true);
    setActiveFeatureIndex(index);
    
    // Simulate image loading delay for smooth transition
    setTimeout(() => {
      setImageLoading(false);
    }, 200);
  };

  // Handle navigation
  const handlePrevFeature = () => {
    const prevIndex = activeFeatureIndex > 0 ? activeFeatureIndex - 1 : features.length - 1;
    updateFeatureContent(prevIndex);
    setIsAutoAdvancing(false);
  };

  const handleNextFeature = () => {
    const nextIndex = activeFeatureIndex < features.length - 1 ? activeFeatureIndex + 1 : 0;
    updateFeatureContent(nextIndex);
    setIsAutoAdvancing(false);
  };

  const handleFeatureClick = (index: number) => {
    updateFeatureContent(index);
    setIsAutoAdvancing(false);
  };

  // Intersection Observer for sticky behavior
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsSticky(true);
            setIsAutoAdvancing(true);
          } else {
            setIsSticky(false);
            setIsAutoAdvancing(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (showcaseRef.current) {
      observer.observe(showcaseRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Auto-advance on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!isAutoAdvancing) return;

      clearTimeout(scrollTimeoutRef.current);
      
      scrollTimeoutRef.current = setTimeout(() => {
        if (isAutoAdvancing && activeFeatureIndex < features.length - 1) {
          updateFeatureContent(activeFeatureIndex + 1);
        }
      }, 150);
    };

    if (isAutoAdvancing) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isAutoAdvancing, activeFeatureIndex]);

  // Auto-advance demo
  useEffect(() => {
    if (!isAutoAdvancing) return;

    autoAdvanceTimeoutRef.current = setTimeout(() => {
      if (isAutoAdvancing && document.visibilityState === 'visible') {
        const nextIndex = activeFeatureIndex < features.length - 1 ? activeFeatureIndex + 1 : 0;
        updateFeatureContent(nextIndex);
      }
    }, 4000);

    return () => {
      if (autoAdvanceTimeoutRef.current) {
        clearTimeout(autoAdvanceTimeoutRef.current);
      }
    };
  }, [isAutoAdvancing, activeFeatureIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSticky) return;
      
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevFeature();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNextFeature();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isSticky, activeFeatureIndex]);

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndXRef.current = e.changedTouches[0].screenX;
    handleSwipe();
  };

  const handleSwipe = () => {
    const swipeThreshold = 50;
    const diff = touchStartXRef.current - touchEndXRef.current;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        handleNextFeature();
      } else {
        handlePrevFeature();
      }
    }
  };

  const currentFeature = features[activeFeatureIndex];

  return (
    <section 
      ref={showcaseRef}
      className={`feature-showcase min-h-screen bg-background py-12 overflow-hidden ${isSticky ? 'sticky top-0' : ''}`}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      data-testid="feature-showcase"
    >
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center max-w-6xl mx-auto">
          
          {/* Left Side: iPhone Mockup + Navigation */}
          <div className="relative flex flex-col items-center lg:items-start">
            {/* Navigation Arrows */}
            <div className="flex gap-4 mb-8 lg:mb-12">
              <button 
                onClick={handlePrevFeature}
                className="nav-arrow w-12 h-12 rounded-full border border-border flex items-center justify-center shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200"
                data-testid="button-prev-feature"
              >
                <ChevronLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <button 
                onClick={handleNextFeature}
                className="nav-arrow w-12 h-12 rounded-full border border-border flex items-center justify-center shadow-lg bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200"
                data-testid="button-next-feature"
              >
                <ChevronRight className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* iPhone Mockup Container */}
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              {/* iPhone Frame */}
              <div className="phone-mockup relative w-full aspect-[9/19] rounded-[2.5rem] p-2 bg-gradient-to-br from-slate-50 to-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/80">
                {/* Screen Content */}
                <div className="w-full h-full bg-card rounded-[2rem] overflow-hidden relative">
                  {/* Dynamic iPhone Image */}
                  <div className="relative w-full h-full">
                    <img 
                      src={currentFeature.image}
                      alt="Feature demonstration" 
                      className={`w-full h-full object-cover transition-all duration-400 ${imageLoading ? 'opacity-70' : 'opacity-100'}`}
                      data-testid="feature-image"
                    />
                    
                    {/* Status Bar Overlay */}
                    <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent flex items-center justify-between px-6 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                        <div className="w-1 h-1 bg-white rounded-full"></div>
                      </div>
                      <div className="font-medium">9:41</div>
                      <div className="flex items-center gap-1">
                        <Signal className="w-3 h-3" />
                        <Wifi className="w-3 h-3" />
                        <Battery className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="mt-8 lg:mt-12 text-center lg:text-left max-w-md">
              <h3 
                className={`text-2xl lg:text-3xl font-bold mb-4 transition-all duration-400 ${imageLoading ? 'opacity-70 transform translate-x-[-10px]' : 'opacity-100 transform translate-x-0'}`}
                data-testid="feature-heading"
              >
                {currentFeature.title}
              </h3>
              <p 
                className={`text-muted-foreground text-lg leading-relaxed transition-all duration-400 ${imageLoading ? 'opacity-70 transform translate-x-[-10px]' : 'opacity-100 transform translate-x-0'}`}
                data-testid="feature-description"
              >
                {currentFeature.description}
              </p>
            </div>
          </div>

          {/* Right Side: Feature Points */}
          <div className="flex flex-col items-center lg:items-end space-y-8 lg:space-y-12">
            {features.map((feature, index) => (
              <div 
                key={index}
                onClick={() => handleFeatureClick(index)}
                className="flex items-center gap-6 lg:gap-8 cursor-pointer group"
                data-testid={`feature-point-${index}`}
              >
                <div className="text-right flex-1 max-w-xs lg:max-w-sm">
                  <h4 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                <div 
                  className={`feature-point w-4 h-4 rounded-full border-2 border-border flex-shrink-0 transition-all duration-300 ${
                    index === activeFeatureIndex 
                      ? 'bg-primary border-primary shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
                      : 'bg-muted hover:bg-accent'
                  }`}
                  data-testid={`feature-indicator-${index}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Indicator for Mobile */}
      {isMobile && (
        <div className="mt-12 flex justify-center">
          <div className="flex space-x-2">
            {features.map((_, index) => (
              <div 
                key={index}
                onClick={() => handleFeatureClick(index)}
                className={`w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
                  index === activeFeatureIndex ? 'bg-primary' : 'bg-muted'
                }`}
                data-testid={`progress-dot-${index}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
