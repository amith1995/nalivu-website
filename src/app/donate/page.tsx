"use client";
import { useState } from "react";

export default function DonatePage() {
  const [amount, setAmount] = useState("500");
  const [customAmount, setCustomAmount] = useState("");
  const [frequency, setFrequency] = useState("once");

  const impacts: Record<string, string> = {
    "500": "₹500 can provide educational supplies for one child for a month.",
    "1000": "₹1,000 can fund clean water access for a family for 3 months.",
    "2500": "₹2,500 can support a smallholder farmer with seeds and training.",
    "5000": "₹5,000 can fund a community health camp for 50 people.",
    "10000": "₹10,000 can sponsor a child's education for an entire year.",
    "custom": "Your custom amount will go directly to our highest-need programs.",
  };

  return (
    <div className="py-20 px-12 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Support Our Cause</span>
        <h1 className="text-4xl font-semibold text-ngo-dark mb-4">Make a Difference Today</h1>
        <p className="text-ngo-text">Your contribution directly impacts the lives of thousands in rural communities.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        <div>
          <h3 className="text-lg font-medium text-ngo-dark mb-6">Select Donation Amount</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
            {["500", "1000", "2500", "5000", "10000", "custom"].map((val) => (
              <button
                key={val}
                onClick={() => setAmount(val)}
                className={`py-3 px-4 rounded-lg border transition text-sm font-medium ${
                  amount === val 
                    ? "bg-ngo-green text-white border-ngo-green" 
                    : "border-gray-200 text-ngo-text hover:border-ngo-green"
                }`}
              >
                {val === "custom" ? "Custom Amount" : `₹${parseInt(val).toLocaleString("en-IN")}`}
              </button>
            ))}
          </div>

          {amount === "custom" && (
            <div className="mb-6">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Enter Amount (₹)</label>
              <input 
                type="number" 
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-ngo-green"
                placeholder="e.g. 1500"
              />
            </div>
          )}

          <h3 className="text-lg font-medium text-ngo-dark mb-6">Frequency</h3>
          <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
            {["once", "monthly"].map((f) => (
              <button
                key={f}
                onClick={() => setFrequency(f)}
                className={`flex-1 py-2 rounded-md text-sm font-medium transition ${
                  frequency === f ? "bg-white text-ngo-green shadow-sm" : "text-gray-500 hover:text-ngo-text"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-ngo-lightGreen rounded-xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-ngo-dark mb-4">Your Impact</h3>
            <div className="p-4 bg-white rounded-lg border border-ngo-green text-ngo-text text-sm leading-relaxed italic">
              "{impacts[amount]}"
            </div>
          </div>

          <div className="mt-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">Total Amount</span>
              <span className="text-2xl font-bold text-ngo-dark">
                ₹{amount === "custom" ? (customAmount || "0") : parseInt(amount).toLocaleString("en-IN")}
              </span>
            </div>
            <button className="w-full bg-ngo-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-ngo-green/20">
              Proceed to Secure Payment
            </button>
            <p className="text-center text-[10px] text-gray-400 mt-4 uppercase tracking-widest">
              Securely processed by Stripe
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
