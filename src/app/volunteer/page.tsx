 "use client";
import { useState } from "react";

export default function VolunteerPage() {
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    date: "",
    hours: "",
    location: "",
    about: "",
    interests: [] as string[],
  });

  const interestOptions = ["Education & Skills", "Health & Wellbeing", "Sustainability", "Community Outreach", "Admin & Ops"];

  const updateField = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setErrors(prev => prev.filter(err => err !== field));
  };

  const toggleInterest = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest) 
        : [...prev.interests, interest]
    }));
    setErrors(prev => prev.filter(err => err !== "interests"));
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[\d\s\-()]{7,15}$/.test(phone);
  };

  const validateStep1 = () => {
    const missing: string[] = [];
    if (!formData.firstName) missing.push("firstName");
    if (!formData.lastName) missing.push("lastName");
    if (!formData.email) {
      missing.push("email");
    } else if (!validateEmail(formData.email)) {
      missing.push("emailFormat");
    }
    if (!formData.phone) {
      missing.push("phone");
    } else if (!validatePhone(formData.phone)) {
      missing.push("phoneFormat");
    }
    
    if (missing.length > 0) {
      setErrors(missing);
      return false;
    }
    setErrors([]);
    return true;
  };

  const validateStep2 = () => {
    const missing: string[] = [];
    if (formData.interests.length === 0) missing.push("interests");
    if (!formData.date) missing.push("date");
    if (!formData.hours) {
      missing.push("hours");
    } else if (parseInt(formData.hours) <= 0) {
      missing.push("hoursZero");
    }
    
    if (missing.length > 0) {
      setErrors(missing);
      return false;
    }
    setErrors([]);
    return true;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) setStep(2);
    else if (step === 2 && validateStep2()) setStep(3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/volunteer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStep(4); // Success step
      } else {
        const data = await response.json();
        alert(data.error || "Failed to submit application");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="py-20 px-12 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <span className="text-xs tracking-widest uppercase text-ngo-green font-bold block mb-2">Join Our Mission</span>
        <h1 className="text-4xl font-semibold text-ngo-dark mb-4">Volunteer Application</h1>
        <p className="text-ngo-text">Help us create a sustainable future through your skills and time.</p>
      </div>

      {step < 4 && (
        <div className="mb-10 flex items-center justify-center gap-4">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === s ? "bg-ngo-green text-white" : step > s ? "bg-ngo-green text-white" : "bg-gray-200 text-gray-400"
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`h-px w-12 ${step > s ? "bg-ngo-green" : "bg-gray-200"}`} />}
            </div>
          ))}
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold text-ngo-dark mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">First Name</label>
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("firstName") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                />
                {errors.includes("firstName") && <span className="text-[10px] text-red-500 font-medium">First name is required</span>}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Last Name</label>
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("lastName") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                />
                {errors.includes("lastName") && <span className="text-[10px] text-red-500 font-medium">Last name is required</span>}
              </div>
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email Address</label>
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("email") || errors.includes("emailFormat") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
              />
              {errors.includes("email") && <span className="text-[10px] text-red-500 font-medium">Email address is required</span>}
              {errors.includes("emailFormat") && <span className="text-[10px] text-red-500 font-medium">Please enter a valid email address</span>}
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Phone Number</label>
              <input 
                type="text" 
                value={formData.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("phone") || errors.includes("phoneFormat") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
              />
              {errors.includes("phone") && <span className="text-[10px] text-red-500 font-medium">Phone number is required</span>}
              {errors.includes("phoneFormat") && <span className="text-[10px] text-red-500 font-medium">Please enter a valid phone number</span>}
            </div>
            <button 
              onClick={handleNext} 
              className="w-full bg-ngo-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition"
            >
              Continue to Preferences
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold text-ngo-dark mb-6">Volunteer Preferences</h3>
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase text-gray-400 mb-2">What are you passionate about?</label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleInterest(opt)}
                    className={`px-4 py-2 rounded-full text-xs font-medium border transition ${
                      formData.interests.includes(opt) 
                        ? "bg-ngo-green text-white border-ngo-green" 
                        : "border-gray-200 text-ngo-text hover:border-ngo-green"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {errors.includes("interests") && <span className="text-[10px] text-red-500 font-medium">Please select at least one interest</span>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Availability Date</label>
                <input 
                  type="date" 
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("date") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                />
                {errors.includes("date") && <span className="text-[10px] text-red-500 font-medium">Availability date is required</span>}
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Hours per Week</label>
                <input 
                  type="number" 
                  min="0"
                  value={formData.hours}
                  onChange={(e) => updateField("hours", e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:outline-none transition ${errors.includes("hours") || errors.includes("hoursZero") ? "border-red-500 bg-red-50" : "border-gray-200 focus:border-ngo-green"}`} 
                />
                {errors.includes("hours") && <span className="text-[10px] text-red-500 font-medium">Hours per week is required</span>}
                {errors.includes("hoursZero") && <span className="text-[10px] text-red-500 font-medium">Hours must be greater than 0</span>}
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setStep(1); setErrors([]); }} className="flex-1 py-4 rounded-xl border border-gray-200 font-medium text-gray-500 hover:bg-gray-50 transition">
                Back
              </button>
              <button onClick={handleNext} className="flex-1 bg-ngo-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition">
                Review Application
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-xl font-semibold text-ngo-dark mb-6">Review Your Application</h3>
            <div className="bg-gray-50 rounded-xl p-6 text-sm space-y-4">
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">Full Name</span>
                <span className="font-medium text-ngo-dark">{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">Contact</span>
                <span className="font-medium text-ngo-dark">{formData.email} | {formData.phone}</span>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">Interests</span>
                <div className="flex flex-wrap gap-1 justify-end">
                  {formData.interests.map(i => <span key={i} className="text-[10px] bg-ngo-lightGreen text-ngo-green px-2 py-0.5 rounded-full font-bold">{i}</span>)}
                </div>
              </div>
              <div className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-400">Commitment</span>
                <span className="font-medium text-ngo-dark">{formData.hours ? `${formData.hours} hours/week` : "Not specified"} starting {formData.date || "Not specified"}</span>
              </div>
            </div>
            <div className="flex gap-4">
              <button 
                onClick={() => { setStep(2); setErrors([]); }} 
                className="flex-1 py-4 rounded-xl border border-gray-200 font-medium text-gray-500 hover:bg-gray-50 transition disabled:opacity-50"
                disabled={isSubmitting}
              >
                Edit Details
              </button>
              <button 
                onClick={handleSubmit}
                className="flex-1 bg-ngo-green text-white py-4 rounded-xl font-bold hover:bg-opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-8 animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-ngo-lightGreen text-ngo-green rounded-full flex items-center justify-center text-2xl mx-auto mb-6">
              ✓
            </div>
            <h2 className="text-2xl font-semibold text-ngo-dark mb-2">Application Received!</h2>
            <p className="text-ngo-text mb-8">Thank you for your interest in volunteering. Our team will review your application and contact you soon.</p>
            <button 
              onClick={() => { setStep(1); setFormData({ firstName: "", lastName: "", email: "", phone: "", date: "", hours: "", location: "", about: "", interests: [] }); }} 
              className="text-sm font-medium text-ngo-green hover:underline"
            >
              Submit another application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
