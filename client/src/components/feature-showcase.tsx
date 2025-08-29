import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Signal, Wifi, Battery } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Feature {
  title: string;
  description: string;
  listLabel: string;
}

const features: Feature[] = [
  {
    title: "TEXT HEADING DISPLAY",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim, veniam quis nostrud exercitation ullamco laboris nisi ut aliquip. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque. Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit.",
    listLabel: "Lorem ipsum dolor"
  },
  {
    title: "TEAM COLLABORATION",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim, veniam quis nostrud exercitation ullamco laboris nisi ut aliquip. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    listLabel: "Lorem ipsum dolor"
  },
  {
    title: "AI-POWERED AUTOMATION",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim, veniam quis nostrud exercitation ullamco laboris nisi ut aliquip. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    listLabel: "Lorem ipsum dolor"
  },
  {
    title: "ADVANCED SECURITY",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim, veniam quis nostrud exercitation ullamco laboris nisi ut aliquip. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    listLabel: "Lorem ipsum dolor"
  },
  {
    title: "CUSTOM INTEGRATIONS",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim minim, veniam quis nostrud exercitation ullamco laboris nisi ut aliquip. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque.",
    listLabel: "Lorem ipsum dolor"
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start lg:items-center max-w-7xl mx-auto">
          
          {/* Left Side: Feature Content + Navigation */}
          <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
            {/* Feature Number */}
            <div className="text-primary font-medium text-lg">
              Feature No.{activeFeatureIndex + 1} -
            </div>

            {/* Feature Title */}
            <h3 
              className={`text-2xl lg:text-3xl font-bold transition-all duration-400 ${imageLoading ? 'opacity-70 transform translate-x-[-10px]' : 'opacity-100 transform translate-x-0'}`}
              data-testid="feature-heading"
            >
              {currentFeature.title}
            </h3>

            {/* Feature Description */}
            <div 
              className={`text-muted-foreground leading-relaxed transition-all duration-400 ${imageLoading ? 'opacity-70 transform translate-x-[-10px]' : 'opacity-100 transform translate-x-0'}`}
              data-testid="feature-description"
            >
              <ul className="space-y-2 text-sm lg:text-base">
                {currentFeature.description.split('. ').map((sentence, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-muted-foreground mr-2">•</span>
                    <span>{sentence}{index < currentFeature.description.split('. ').length - 1 ? '.' : ''}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Navigation Arrows */}
            <div className="flex gap-4 pt-4">
              <button 
                onClick={handlePrevFeature}
                className="nav-arrow w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border flex items-center justify-center shadow-sm bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200"
                data-testid="button-prev-feature"
              >
                <ChevronLeft className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
              </button>
              <button 
                onClick={handleNextFeature}
                className="nav-arrow w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-border flex items-center justify-center shadow-sm bg-white/90 backdrop-blur-sm hover:bg-white hover:scale-105 transition-all duration-200"
                data-testid="button-next-feature"
              >
                <ChevronRight className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* Center: iPhone Mockup */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative w-full max-w-xs lg:max-w-sm">
              {/* iPhone Frame */}
              <div className="phone-mockup relative w-full aspect-[9/19] rounded-[2.5rem] p-2 bg-gradient-to-br from-slate-50 to-slate-200 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-white/80">
                {/* Screen Content */}
                <div className="w-full h-full bg-gradient-to-br from-pink-400 via-purple-500 to-purple-600 rounded-[2rem] overflow-hidden relative">
                  {/* Gradient Background */}
                  <div className="relative w-full h-full">
                    {/* Status Bar Overlay */}
                    <div className="absolute top-0 left-0 right-0 h-6 lg:h-8 bg-gradient-to-b from-black/20 to-transparent flex items-center justify-between px-4 lg:px-6 text-white text-xs lg:text-sm">
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
          </div>

          {/* Right Side: Feature Showcase List */}
          <div className="space-y-4 lg:space-y-6 order-3">
            <h2 className="text-lg lg:text-xl font-bold text-foreground">
              Feature Showcase
            </h2>
            
            <div className="space-y-3 lg:space-y-4">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  onClick={() => handleFeatureClick(index)}
                  className="flex items-center gap-3 lg:gap-4 cursor-pointer group py-1 lg:py-2"
                  data-testid={`feature-point-${index}`}
                >
                  <div 
                    className={`feature-point w-3 h-3 lg:w-4 lg:h-4 rounded-full border-2 border-border flex-shrink-0 transition-all duration-300 ${
                      index === activeFeatureIndex 
                        ? 'bg-primary border-primary shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' 
                        : 'bg-muted hover:bg-accent'
                    }`}
                    data-testid={`feature-indicator-${index}`}
                  />
                  <div className="flex-1">
                    <h4 className={`text-sm lg:text-base font-medium transition-colors ${
                      index === activeFeatureIndex ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                    }`}>
                      Feature {index + 1}: {feature.listLabel}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
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
