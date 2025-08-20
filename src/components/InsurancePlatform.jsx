import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft, Shield, Clock, CheckCircle, Upload, Camera, Mic, User, MapPin, Phone, Mail, Stethoscope, Building2, IndianRupee, FileText, Star, AlertCircle } from 'lucide-react';

const InsurancePlatform = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Doctor Information
    fullName: '',
    email: '',
    phone: '',
    registrationNumber: '',
    specialty: '',
    yearsExperience: '',
    
    // Practice Information
    practiceType: '',
    clinicName: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    
    // Coverage Information
    coverageAmount: '1000000',
    additionalCoverage: [],
    
    // Quote Information
    quote: null
  });

  const steps = [
    { title: 'Doctor Info', subtitle: 'Basic details' },
    { title: 'Practice Info', subtitle: 'Your practice' },
    { title: 'Coverage', subtitle: 'Select coverage' },
    { title: 'Quote', subtitle: 'Get quote' }
  ];

  const specialties = [
    'General Practice', 'Cardiology', 'Dermatology', 'Endocrinology',
    'Gastroenterology', 'Neurology', 'Orthopedics', 'Pediatrics',
    'Psychiatry', 'Radiology', 'Surgery', 'Gynecology', 'Ophthalmology',
    'ENT', 'Anesthesiology', 'Emergency Medicine'
  ];

  const practiceTypes = [
    'Solo Practice', 'Group Practice', 'Hospital Employee', 
    'Clinic Chain', 'Telemedicine', 'Consulting'
  ];

  const coverageOptions = [
    { id: 'legal_defense', label: 'Legal Defense Costs', price: 50000 },
    { id: 'cyber_liability', label: 'Cyber Liability', price: 75000 },
    { id: 'personal_injury', label: 'Personal Injury Claims', price: 100000 },
    { id: 'regulatory_defense', label: 'Regulatory Defense', price: 60000 }
  ];

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateQuote = () => {
    // Mock quote calculation based on specialty and coverage
    const baseRate = {
      'General Practice': 15000,
      'Cardiology': 35000,
      'Surgery': 50000,
      'Orthopedics': 45000,
      'Gynecology': 40000,
      'Pediatrics': 20000,
      'Dermatology': 18000,
      'Psychiatry': 25000
    };

    const experienceDiscount = {
      '0-2': 1.2,
      '3-5': 1.1,
      '6-10': 1.0,
      '11-15': 0.9,
      '16+': 0.8
    };

    const coverageMultiplier = {
      '500000': 0.7,
      '1000000': 1.0,
      '2000000': 1.6,
      '5000000': 3.2
    };

    const base = baseRate[formData.specialty] || 20000;
    const expMultiplier = experienceDiscount[formData.yearsExperience] || 1.0;
    const covMultiplier = coverageMultiplier[formData.coverageAmount] || 1.0;
    const additionalCost = formData.additionalCoverage.reduce((sum, id) => {
      const option = coverageOptions.find(opt => opt.id === id);
      return sum + (option ? option.price : 0);
    }, 0);

    const premium = Math.round(base * expMultiplier * covMultiplier) + additionalCost;
    
    setFormData(prev => ({ 
      ...prev, 
      quote: {
        premium,
        breakdown: {
          basePremium: Math.round(base * expMultiplier * covMultiplier),
          additionalCoverage: additionalCost,
          gst: Math.round(premium * 0.18)
        }
      }
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      if (currentStep === 2) {
        calculateQuote();
      }
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return formData.fullName && formData.email && formData.phone && 
               formData.registrationNumber && formData.specialty && formData.yearsExperience;
      case 1:
        return formData.practiceType && formData.address && formData.city && 
               formData.state && formData.pincode;
      case 2:
        return formData.coverageAmount;
      default:
        return true;
    }
  };

  // Step Components
  const DoctorInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <User className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Doctor Information</h2>
        <p className="text-gray-600">Help us know you better</p>
      </div>

      {/* OCR/Voice Placeholders */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <button 
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 transition-colors"
          disabled
        >
          <Camera className="w-5 h-5 mr-2" />
          <span className="text-sm">Photo Upload</span>
          <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
        </button>
        <button 
          className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-blue-400 transition-colors"
          disabled
        >
          <Mic className="w-5 h-5 mr-2" />
          <span className="text-sm">Voice Input</span>
          <span className="ml-2 text-xs bg-gray-200 px-2 py-1 rounded">Soon</span>
        </button>
      </div>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Full Name *"
          value={formData.fullName}
          onChange={(e) => updateFormData('fullName', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email Address *"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="tel"
            placeholder="Mobile Number *"
            value={formData.phone}
            onChange={(e) => updateFormData('phone', e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <input
          type="text"
          placeholder="Medical Registration Number *"
          value={formData.registrationNumber}
          onChange={(e) => updateFormData('registrationNumber', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <select
          value={formData.specialty}
          onChange={(e) => updateFormData('specialty', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Specialty *</option>
          {specialties.map(specialty => (
            <option key={specialty} value={specialty}>{specialty}</option>
          ))}
        </select>

        <select
          value={formData.yearsExperience}
          onChange={(e) => updateFormData('yearsExperience', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Years of Experience *</option>
          <option value="0-2">0-2 years</option>
          <option value="3-5">3-5 years</option>
          <option value="6-10">6-10 years</option>
          <option value="11-15">11-15 years</option>
          <option value="16+">16+ years</option>
        </select>
      </div>
    </div>
  );

  const PracticeInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <Building2 className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Practice Information</h2>
        <p className="text-gray-600">Tell us about your practice</p>
      </div>

      <div className="space-y-4">
        <select
          value={formData.practiceType}
          onChange={(e) => updateFormData('practiceType', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Practice Type *</option>
          {practiceTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Clinic/Hospital Name"
          value={formData.clinicName}
          onChange={(e) => updateFormData('clinicName', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />

        <textarea
          placeholder="Practice Address *"
          value={formData.address}
          onChange={(e) => updateFormData('address', e.target.value)}
          rows={3}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="City *"
            value={formData.city}
            onChange={(e) => updateFormData('city', e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="State *"
            value={formData.state}
            onChange={(e) => updateFormData('state', e.target.value)}
            className="p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <input
          type="text"
          placeholder="PIN Code *"
          value={formData.pincode}
          onChange={(e) => updateFormData('pincode', e.target.value)}
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );

  const CoverageStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Coverage Selection</h2>
        <p className="text-gray-600">Choose your protection level</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Professional Indemnity Coverage Amount *
          </label>
          <div className="grid grid-cols-2 gap-3">
            {[
              { value: '500000', label: '?5 Lakh', popular: false },
              { value: '1000000', label: '?10 Lakh', popular: true },
              { value: '2000000', label: '?20 Lakh', popular: false },
              { value: '5000000', label: '?50 Lakh', popular: false }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => updateFormData('coverageAmount', option.value)}
                className={`relative p-4 border-2 rounded-lg transition-all ${
                  formData.coverageAmount === option.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-300 hover:border-blue-300'
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="text-lg font-semibold text-gray-900">{option.label}</div>
                <div className="text-sm text-gray-500">Coverage Amount</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Additional Coverage (Optional)
          </label>
          <div className="space-y-3">
            {coverageOptions.map(option => (
              <label key={option.id} className="flex items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.additionalCoverage.includes(option.id)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateFormData('additionalCoverage', [...formData.additionalCoverage, option.id]);
                    } else {
                      updateFormData('additionalCoverage', formData.additionalCoverage.filter(id => id !== option.id));
                    }
                  }}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mr-4"
                />
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{option.label}</div>
                  <div className="text-sm text-gray-500">+?{option.price.toLocaleString('en-IN')}/year</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">Why Professional Indemnity Insurance?</p>
              <ul className="space-y-1 text-blue-700">
                <li> Protects against negligence claims</li>
                <li> Covers legal defense costs</li>
                <li> Peace of mind for your practice</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const QuoteStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Quote is Ready!</h2>
        <p className="text-gray-600">Comprehensive coverage tailored for you</p>
      </div>

      {formData.quote && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg">
          <div className="text-center mb-6">
            <div className="text-4xl font-bold text-blue-600 mb-2">
              ?{formData.quote.premium.toLocaleString('en-IN')}
            </div>
            <div className="text-sm text-gray-600">per year (including GST)</div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">Base Premium</span>
              <span className="font-medium">?{formData.quote.breakdown.basePremium.toLocaleString('en-IN')}</span>
            </div>
            {formData.quote.breakdown.additionalCoverage > 0 && (
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Additional Coverage</span>
                <span className="font-medium">?{formData.quote.breakdown.additionalCoverage.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between py-2 border-b border-gray-100">
              <span className="text-gray-600">GST (18%)</span>
              <span className="font-medium">?{formData.quote.breakdown.gst.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between py-2 font-bold text-lg">
              <span>Total Premium</span>
              <span className="text-blue-600">?{formData.quote.premium.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-3">Your Coverage Includes:</h3>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Professional Indemnity up to ?{parseInt(formData.coverageAmount).toLocaleString('en-IN')}
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                Legal Defense Costs Coverage
              </div>
              <div className="flex items-center text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                24/7 Claims Support
              </div>
              {formData.additionalCoverage.map(covId => {
                const coverage = coverageOptions.find(opt => opt.id === covId);
                return coverage ? (
                  <div key={covId} className="flex items-center text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                    {coverage.label}
                  </div>
                ) : null;
              })}
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all transform hover:scale-105 shadow-lg">
              Buy Now - ?{formData.quote.premium.toLocaleString('en-IN')}
            </button>
            <button className="w-full border-2 border-blue-600 text-blue-600 py-3 px-6 rounded-lg font-medium hover:bg-blue-50 transition-colors">
              Download Quote PDF
            </button>
          </div>

          <div className="text-center mt-6">
            <p className="text-sm text-gray-500">
              Policy can be issued instantly upon payment completion
            </p>
          </div>
        </div>
      )}
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return <DoctorInfoStep />;
      case 1: return <PracticeInfoStep />;
      case 2: return <CoverageStep />;
      case 3: return <QuoteStep />;
      default: return <DoctorInfoStep />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700">
      {/* Header */}
      <div className="bg-white/10 backdrop-blur-sm border-b border-white/20">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-white p-2 rounded-lg">
                <div className="text-blue-600 font-bold text-lg">SF</div>
              </div>
              <div className="text-white">
                <div className="font-semibold">Professional Indemnity</div>
                <div className="text-sm opacity-90">for Doctors & Medical Practitioners</div>
              </div>
            </div>
            <div className="text-white text-right">
              <div className="text-sm opacity-90">Step {currentStep + 1} of {steps.length}</div>
              <div className="font-medium">{steps[currentStep].title}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-2">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                index <= currentStep 
                  ? 'bg-white text-blue-600 shadow-lg' 
                  : 'bg-white/20 text-white/70'
              }`}>
                {index < currentStep ? <CheckCircle className="w-5 h-5" /> : index + 1}
              </div>
              {index < steps.length - 1 && (
                <div className={`w-20 h-1 mx-2 rounded-full transition-all ${
                  index < currentStep ? 'bg-white' : 'bg-white/20'
                }`} />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-white text-sm">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className={`font-medium ${index <= currentStep ? 'opacity-100' : 'opacity-60'}`}>
                {step.title}
              </div>
              <div className={`text-xs ${index <= currentStep ? 'opacity-90' : 'opacity-50'}`}>
                {step.subtitle}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 pb-24">
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          {renderStep()}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              currentStep === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
            }`}
          >
            <ChevronLeft className="w-5 h-5 mr-2" />
            Previous
          </button>

          <div className="text-center">
            <div className="text-sm text-gray-500">
              {currentStep === 3 ? 'Ready to proceed' : 'Continue to next step'}
            </div>
          </div>

          <button
            onClick={nextStep}
            disabled={!isStepValid() || currentStep === steps.length - 1}
            className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              !isStepValid() || currentStep === steps.length - 1
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg transform hover:scale-105'
            }`}
          >
            {currentStep === steps.length - 1 ? 'Complete' : 'Continue'}
            {currentStep !== steps.length - 1 && <ChevronRight className="w-5 h-5 ml-2" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsurancePlatform;
