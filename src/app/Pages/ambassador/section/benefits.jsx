// src/components/BenefitsSection.jsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Crown, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

const benefitsData = [
  {
    icon: <Award size={28} className="text-orange-400" />,
    title: "For All CAs",
    points: [
      "Certificate of Appreciation",
      "Exclusive Merchandise",
      "Group recognition on official channels",
      "Special perks during the fest",
    ],
  },
  {
    icon: <Crown size={28} className="text-yellow-400" />,
    title: "For Top Performers",
    points: [
      "Attractive Cash Prizes",
      "Monetary prizes or Vouchers",
      "Spotlight feature during the Fest",
      "Special access to Artists & Speakers",
    ],
  },
  {
    icon: <Zap size={28} className="text-cyan-400" />,
    title: "Engagement & Motivation",
    points: [
      "Live leaderboard for weekly top performers",
      "Complete tasks to maintain your rank",
      "Points system to reward all contributions",
      "Unlock surprise prizes and bonuses",
    ],
  },
  {
    icon: <TrendingUp size={28} className="text-green-400" />,
    title: "Professional Growth",
    points: [
      "Gain leadership & event management experience",
      "Enhance your portfolio for future roles",
      "Chance for exclusive internships & LORs",
      "Access mentorship from industry experts",
    ],
  },
];

// Animation variants for Framer Motion
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // This will make each card animate one after the other
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const BenefitsSection = () => {
  return (
    <section id="benefits" className="bg-black text-white w-full py-20 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-serif mb-4">
            <span className="text-white">Benefits</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto font-['Montserrat']">
            Being a Campus Ambassador comes with its own set of exclusive
            rewards and opportunities.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} // Animation triggers when 20% of the grid is in view
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {benefitsData.map((benefit, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-gray-500/10 backdrop-blur-lg border border-white/10 rounded-xl p-6 flex flex-col items-start hover:bg-white/10 hover:border-orange-500/50 transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="p-3 bg-white/5 rounded-lg mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-4">{benefit.title}</h3>
              <ul className="space-y-3 text-gray-300">
                {benefit.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start font-['Montserrat'] gap-3"
                  >
                    <CheckCircle2
                      size={20}
                      className="text-[#FF931E] flex-shrink-0 mt-1"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
