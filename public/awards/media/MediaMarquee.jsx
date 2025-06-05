import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import MediaArticle from "../../../src/components/MediaArticle";

// Data for media articles - ENSURE THESE FILENAMES EXACTLY MATCH those in public/media/
const mediaArticlesData = [
  {
    imageName: "toi_logo.webp",
    articleLink:
      "https://timesofindia.indiatimes.com/city/nagpur/organ-transplant-hosps-made-aware-of-movement/articleshow/71157661.cms",
    title: "Organ transplant: Hospitals made aware of movement",
  },
  {
    imageName: "loksatta_logo.png",
    articleLink:
      "https://www.loksatta.com/mumbai-news/organ-transplants-registration-online-in-government-hospitals-zws-70-1930058/",
    title: "अवयवदान आणि प्रत्यारोपण करणाऱ्या रुग्णालयांची नोंदणी ऑनलाइन",
  },
  {
    imageName: "dailyhunt_logo.png",
    articleLink:
      "https://m.dailyhunt.in//news/india/english/my+medical+mantra+english-epaper-medmanen/hospitals+to+now+register+online+for+licenses+to+conduct+organ+transplants+retrieval-newsid-125131062",
    title:
      "Hospitals to now register online for licenses to conduct organ transplants, retrieval",
  },
  {
    imageName: "yahoonews_logo.png",
    articleLink:
      "https://in.news.yahoo.com/hospitals-register-online-conduct-organ-072117204.html",
    title:
      "Hospitals will have to register online to conduct organ transplant: Directorate of Health Services",
  },
  {
    imageName: "maritimegw_logo.png",
    articleLink:
      "http://www.maritimegateway.com/odex-launches-first-blockchain-based-ekyc-platform-indian-shipping-industry-2/",
    title:
      "ODEX LAUNCHES THE FIRST BLOCKCHAIN BASED EKYC PLATFORM IN THE INDIAN SHIPPING INDUSTRY",
  },
  // Add other images you see in public/media/ for the marquee. For example:
  {
    imageName: "mahashrunkhala.png",
    articleLink: "https://example.com/mahashrunkala-article",
    title: "Mahashrunkala Feature",
  }, 
  {
    imageName: "newsarticle.jpg",
    articleLink: "https://example.com/newsarticle",
    title: "General News Article",
  },
  {
    imageName: "nidhi.jpg",
    articleLink: "https://example.com/nidhi-article",
    title: "Nidhi Project Feature",
  },
  {
    imageName: "nttdata.png",
    articleLink: "https://example.com/nttdata-feature",
    title: "NTT Data Collaboration",
  },
  {
    imageName: "sine.png",
    articleLink: "https://example.com/sine-article",
    title: "SINE Incubator News",
  },
  {
    imageName: "smart50.png",
    articleLink: "https://example.com/smart50-feature",
    title: "Smart50 Recognition",
  },
  // Duplicate the entire set for continuous scroll without gaps
  {
    imageName: "toi_logo.webp",
    articleLink:
      "https://timesofindia.indiatimes.com/city/nagpur/organ-transplant-hosps-made-aware-of-movement/articleshow/71157661.cms",
    title: "Organ transplant: Hospitals made aware of movement",
  },
  {
    imageName: "loksatta_logo.png",
    articleLink:
      "https://www.loksatta.com/mumbai-news/organ-transplants-registration-online-in-government-hospitals-zws-70-1930058/",
    title: "अवयवदान आणि प्रत्यारोपण करणाऱ्या रुग्णालयांची नोंदणी ऑनलाइन",
  },
  {
    imageName: "dailyhunt_logo.png",
    articleLink:
      "https://m.dailyhunt.in//news/india/english/my+medical+mantra+english-epaper-medmanen/hospitals+to+now+register+online+for+licenses+to+conduct+organ+transplants+retrieval-newsid-125131062",
    title:
      "Hospitals to now register online for licenses to conduct organ transplants, retrieval",
  },
  {
    imageName: "yahoonews_logo.png",
    articleLink:
      "https://in.news.yahoo.com/hospitals-register-online-conduct-organ-072117204.html",
    title:
      "Hospitals will have to register online to conduct organ transplant: Directorate of Health Services",
  },
  {
    imageName: "maritimegw_logo.png",
    articleLink:
      "http://www.maritimegateway.com/odex-launches-first-blockchain-based-ekyc-platform-indian-shipping-industry-2/",
    title:
      "ODEX LAUNCHES THE FIRST BLOCKCHAIN BASED EKYC PLATFORM IN THE INDIAN SHIPPING INDUSTRY",
  },
 
  {
    imageName: "newsarticle.jpg",
    articleLink: "https://example.com/newsarticle",
    title: "General News Article",
  },
  {
    imageName: "nidhi.jpg",
    articleLink: "https://example.com/nidhi-article",
    title: "Nidhi Project Feature",
  },
  {
    imageName: "nttdata.png",
    articleLink: "https://example.com/nttdata-feature",
    title: "NTT Data Collaboration",
  },
  {
    imageName: "sine.png",
    articleLink: "https://example.com/sine-article",
    title: "SINE Incubator News",
  },
  {
    imageName: "smart50.png",
    articleLink: "https://example.com/smart50-feature",
    title: "Smart50 Recognition",
  },
];

const MediaMarquee = () => {
  const controls = useAnimation();
  const marqueeRef = useRef(null);
  const contentRef = useRef(null);
  const tickerSpeed = 20; // Pixels per second

  const animateMarquee = async () => {
    if (!marqueeRef.current || !contentRef.current) return;

    const marqueeWidth = marqueeRef.current.offsetWidth;
    const contentWidth = contentRef.current.scrollWidth;

    if (contentWidth > marqueeWidth) {
      const duration = contentWidth / tickerSpeed; // Time to scroll one full content width

      await controls.start({
        x: -contentWidth,
        transition: {
          x: {
            from: 0,
            to: -contentWidth,
            duration: duration,
            ease: "linear",
            repeat: Infinity,
          },
        },
      });
    } else {
        controls.start({ x: 0 });
    }
  };

  const pauseMarquee = () => {
    controls.stop();
  };

  const playMarquee = () => {
    animateMarquee();
  };

  useEffect(() => {
    const handleResize = () => {
      controls.stop();
      animateMarquee();
    };

    const timeoutId = setTimeout(() => {
        animateMarquee();
    }, 100);

    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      controls.stop();
    };
  }, []);

  return (
    <div
      ref={marqueeRef}
      className="relative w-full overflow-hidden whitespace-nowrap py-4"
      onMouseEnter={pauseMarquee}
      onMouseLeave={playMarquee}
    >
      <motion.div
        ref={contentRef}
        className="inline-flex gap-4"
        animate={controls}
      >
        {mediaArticlesData.map((article, index) => (
          <MediaArticle
            key={index}
            // Constructing image path directly from public/media/
            imageSrc={`awards/media/${article.imageName}`}
            articleLink={article.articleLink}
            title={article.title}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default MediaMarquee;