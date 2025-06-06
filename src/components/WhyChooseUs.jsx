"use client";
import { useState, useEffect } from "react"; // Import useEffect
import { motion, AnimatePresence } from "framer-motion";

const WhyChooseUs = () => {
  const reasons = [
    "Proven Expertise: With 15+ years of combined experience, we are leaders in blockchain innovation and enterprise-grade solutions.",
    "Tailored Solutions: We don't believe in one-size-fits-all. Every solution is customized to your business goals and challenges.",
    "End-to-End Support: From concept to implementation, we're with you every step of the way.",
    "Cutting-Edge Technology: We leverage the latest advancements in blockchain, smart contracts, and decentralized systems to create future-proof solutions.",
    "Commitment to Excellence: Our team's dedication ensures that every project is executed flawlessly, delivering measurable impact.",
    "Global Reach: We have experience working with enterprises and governments worldwide, giving us diverse industry insights.",
  ];

  const sections = [
    {
      title: "Our Core Values",
      content: [
        "Innovation: Driving cutting-edge solutions that push the boundaries of blockchain technology.",
        "Integrity: Building trust through ethical practices, transparency, and honesty.",
        "Customer-Centricity: Prioritizing our clients' success by understanding their needs and delivering impactful solutions.",
        "Collaboration: Creating value through partnerships, teamwork, and open communication.",
        "Excellence: Upholding the highest standards of quality in every solution we deliver.",
        "Sustainability: Ensuring our work positively impacts businesses, society, and the environment.",
      ],
      color: "from-blue-400 to-blue-600",
    },
    {
      title: "Our Principles",
      content: [
        "Secure and Scalable Solutions: We design systems that prioritize security and can grow with our clients' needs.",
        "Transparency: Embracing blockchain's ethos by maintaining clarity in processes, communications, and data.",
        "Agility: Adapting quickly to industry trends and evolving client requirements.",
        "Knowledge-Driven Approach: Staying ahead of the curve by investing in research and thought leadership.",
        "Accountability: Taking full responsibility for our commitments, delivering on time, and exceeding expectations.",
      ],
      color: "from-purple-400 to-purple-600",
    },
    {
      title: "Our Team Values",
      content: [
        "Collaboration and Teamwork: We believe the best solutions come from working together and leveraging diverse perspectives.",
        "Continuous Learning: Our team is always evolving, learning new technologies, and staying updated on industry advancements.",
        "Empowerment: We foster a culture of trust and autonomy, enabling our team to take ownership and innovate fearlessly.",
        "Inclusivity: We thrive on diversity and inclusiveness, ensuring every voice is heard and valued.",
        "Passion for Technology: We are deeply passionate about blockchain and its potential to transform the world.",
      ],
      color: "from-indigo-400 to-indigo-600",
    },
  ];

  const [openIndex, setOpenIndex] = useState(0);
  const [isClient, setIsClient] = useState(false); // New state for client-side rendering

  // Set isClient to true once the component mounts on the client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const accordion = {
    hidden: { height: 0, opacity: 0 },
    show: { height: "auto", opacity: 1 },
    exit: { height: 0, opacity: 0 },
  };

  return (
    <section className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-indigo-600/20" />
        <div className="absolute left-10 top-10 h-[200px] w-[200px] rounded-full bg-blue-600/20 blur-3xl" />
        <div className="absolute right-10 bottom-10 h-[200px] w-[200px] rounded-full bg-purple-600/20 blur-3xl" />
      </div>

      {/* Floating particles - Conditionally rendered only on client */}
      {isClient && ( // Only render this block if isClient is true
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-10"
              style={{
                width: Math.random() * 10 + 5 + "px",
                height: Math.random() * 10 + 5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      )}

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Heading with animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Why Choose Us?
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            Discover what sets us apart in the blockchain industry
          </p>
        </motion.div>

        {/* Reasons grid with staggered animation */}
        <motion.ol
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
        >
          {reasons.map((reason, idx) => {
            const [title, description] = reason.split(": ");
            return (
              <motion.li
                key={idx}
                variants={item}
                className="flex flex-col rounded-2xl bg-gray-800/50 p-6 backdrop-blur-sm border border-gray-700 hover:border-blue-500 transition-all duration-300"
              >
                <div className="flex items-center gap-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white font-bold text-lg">
                    {idx + 1}
                  </div>
                  <h3 className="text-lg font-semibold leading-7 text-white">
                    {title}
                  </h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-300">
                  {description}
                </p>
              </motion.li>
            );
          })}
        </motion.ol>

        {/* Accordion sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto mt-24 max-w-4xl space-y-4"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              layout
              className="rounded-2xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
            >
              <motion.button
                layout
                onClick={() => setOpenIndex(openIndex === idx ? -1 : idx)}
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                whileHover={{ backgroundColor: "rgba(55, 65, 81, 0.5)" }}
              >
                <motion.span
                  layout
                  className="text-lg font-semibold text-white"
                >
                  {section.title}
                </motion.span>
                <motion.div
                  layout
                  className={`h-6 w-6 transform transition-transform ${
                    openIndex === idx ? "rotate-180" : ""
                  }`}
                >
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div
                    layout
                    variants={accordion}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="px-6 pb-6"
                  >
                    <ol className="space-y-3">
                      {section.content.map((item, i) => {
                        const [label, rest] = item.split(": ");
                        return (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.05 + 0.2 }}
                            className="flex"
                          >
                            <span className="font-semibold text-blue-400 mr-2">
                              {label}:
                            </span>
                            <span className="text-sm text-gray-300">
                              {rest}
                            </span>
                          </motion.li>
                        );
                      })}
                    </ol>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;