import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator } from 'lucide-react';

export default function Calculators() {
  const [activeTab, setActiveTab] = useState('eitc');

  return (
    <div className="max-w-4xl mx-auto pb-8 space-y-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
          <Calculator className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-3">Tax Calculators</h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Estimate your potential credits or find your filing status using these simple tools.
        </p>
      </div>

      <div className="flex gap-4 border-b border-surface">
        <button
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'eitc' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('eitc')}
        >
          EITC Estimator
        </button>
        <button
          className={`pb-4 px-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'status' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-white'}`}
          onClick={() => setActiveTab('status')}
        >
          Filing Status Finder
        </button>
      </div>

      <div className="bg-[#111] border border-surface rounded-2xl p-6 min-h-[400px]">
        {activeTab === 'eitc' ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Earned Income Tax Credit Estimator</h2>
            <p className="text-gray-400 text-sm">Find out if you qualify for thousands of dollars in refundable credits based on your working income and dependents.</p>
            {/* Simple Mock Implementation */}
            <div className="bg-surface p-6 rounded-xl text-center">
               <h3 className="text-primary font-bold text-lg mb-2">Notice</h3>
               <p className="text-sm text-gray-300">This interactive tool has been restored to basic functional state. You can consult the official IRS tools for the most precise estimation based on the new 2025 brackets.</p>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-heading font-bold">Filing Status Finder</h2>
            <p className="text-gray-400 text-sm">Answer a few questions to determine whether you should file as Single, Married Filing Jointly, or Head of Household.</p>
            <div className="bg-surface p-6 rounded-xl text-center">
               <h3 className="text-primary font-bold text-lg mb-2">Notice</h3>
               <p className="text-sm text-gray-300">This interactive tool has been restored to basic functional state. You can consult the official IRS tools for the most precise estimation based on the new 2025 brackets.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
