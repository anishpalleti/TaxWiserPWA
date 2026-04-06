import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';

export default function FindHelp() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-8 h-full flex flex-col">
      <div className="text-center shrink-0">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <MapPin className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Find Free Tax Prep</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Use the official IRS VITA (Volunteer Income Tax Assistance) Locator tool below to find a free, certified tax preparation site near you.
        </p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-1 bg-white rounded-2xl overflow-hidden border border-surface min-h-[600px] relative mt-4 shadow-2xl shadow-primary/5"
      >
        <iframe
          src="https://irs.treasury.gov/freetaxprep/"
          title="IRS Free Tax Prep Locator"
          className="absolute inset-0 w-full h-full border-0"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      </motion.div>
    </div>
  );
}
