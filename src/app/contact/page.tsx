 "use client";
import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    organization: "",
    website: "",
    subject: "General Inquiry",
    message: "",
  });

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => prev.filter(err => err !== field));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const required = ["fullName", "email", "subject", "message"];
    const missing = required.filter(field => !formData[field as keyof typeof formData]);
    
    if (formData.email && !validateEmail(formData.email)) {
      missing.push("emailFormat");
    }
    
    if (missing.length > 0) {
      setErrors(missing);
      return;
    }
    
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setErrors([]);
      } else {
        const data = await response.json();
        alert(data.error || "Failed to send message");
      }
    } catch (error) {
      console.error("Contact error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-12 max-w-3xl mx-auto">
      {!submitted ? (
        <div className="animate-in fade-in duration-500">
          <div className="text-center mb-12">
            <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Get in Touch</span>
            <h1 className="text-4xl font-semibold text-ngo-dark mb-4">Partner With Us</h1>
            <p className="text-ngo-text">Whether you are an organization, a donor, or a collaborator, we would love to hear from you.</p>
          </div>

          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
                <input 
                  type="text" 
                  value={formData.fullName}
                  onChange={(e) => updateField("fullName", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("fullName") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                  placeholder="John Doe"
                  disabled={isSubmitting}
                />
                {errors.includes("fullName") && <span className="text-[10px] text-red-500 font-medium">Full name is required</span>}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email Address</label>
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => updateField("email", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("email") || errors.includes("emailFormat") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                  placeholder="john@example.com"
                  disabled={isSubmitting}
                />
                {errors.includes("email") && <span className="text-[10px] text-red-500 font-medium">Email address is required</span>}
                {errors.includes("emailFormat") && <span className="text-[10px] text-red-500 font-medium">Please enter a valid email address</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number</label>
                <input 
                  type="text" 
                  value={formData.phone}
                  onChange={(e) => updateField("phone", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-ngo-green" 
                  placeholder="+1 (555) 000-0000"
                  disabled={isSubmitting}
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Organization</label>
                <input 
                  type="text" 
                  value={formData.organization}
                  onChange={(e) => updateField("organization", e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-ngo-green" 
                  placeholder="Company Name"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Website / LinkedIn</label>
              <input 
                type="url" 
                value={formData.website}
                onChange={(e) => updateField("website", e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-ngo-green" 
                placeholder="https://..."
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Subject</label>
              <select 
                value={formData.subject}
                onChange={(e) => updateField("subject", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none transition bg-white ${errors.includes("subject") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`}
                disabled={isSubmitting}
              >
                <option>General Inquiry</option>
                <option>Corporate Partnership</option>
                <option>Grant Opportunity</option>
                <option>Other</option>
              </select>
              {errors.includes("subject") && <span className="text-[10px] text-red-500 font-medium">Please select a subject</span>}
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Message</label>
              <textarea 
                rows={5}
                value={formData.message}
                onChange={(e) => updateField("message", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("message") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                placeholder="Tell us about your proposal..."
                disabled={isSubmitting}
              ></textarea>
              {errors.includes("message") && <span className="text-[10px] text-red-500 font-medium">Message cannot be empty</span>}
            </div>

            <button 
              type="submit"
              className="w-full bg-ngo-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition shadow-lg shadow-ngo-green/20 disabled:opacity-50 flex items-center justify-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      ) : (
        <div className="text-center animate-in zoom-in duration-500">
          <div className="bg-white border border-gray-200 rounded-2xl p-12 shadow-sm max-w-md mx-auto">
            <div className="w-16 h-16 bg-ngo-lightGreen text-ngo-green rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-ngo-dark mb-2">Message Sent!</h2>
            <p className="text-ngo-text mb-8">Thank you for reaching out. Our partnerships team will get back to you within 2 business days.</p>
            <div className="bg-gray-50 p-4 rounded-lg text-left text-xs space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="text-gray-400">Reference No.</span>
                <span className="font-mono font-medium text-ngo-dark">NAL-PTR-{Math.floor(Math.random() * 9000 + 1000)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Est. Response</span>
                <span className="font-medium text-ngo-dark">48 Hours</span>
              </div>
            </div>
            <button 
              onClick={() => { setSubmitted(false); setErrors([]); setFormData({ fullName: "", email: "", phone: "", organization: "", website: "", subject: "General Inquiry", message: "" }); }} 
              className="text-sm font-medium text-ngo-green hover:underline"
            >
              Send another message
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
