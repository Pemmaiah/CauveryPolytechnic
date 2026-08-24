import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { AdmissionApplication } from '../../types';
import confetti from 'canvas-confetti';
import { 
  GraduationCap, 
  CheckCircle2, 
  Send, 
  Printer, 
  Calendar, 
  Phone, 
  Mail, 
  User, 
  BookOpen, 
  MapPin, 
  FileText,
  Award,
  Sparkles
} from 'lucide-react';

export const AdmissionView: React.FC = () => {
  const { programmes, addAdmission, settings } = useCMS();
  const activeProgrammes = programmes.filter((p) => p.active);

  const [formData, setFormData] = useState({
    fullName: '',
    parentName: '',
    email: '',
    phone: '',
    alternatePhone: '',
    dateOfBirth: '',
    gender: 'Male',
    category: 'General',
    address: '',
    city: '',
    state: 'Karnataka',
    pincode: '',
    sslcSchool: '',
    sslcPercentage: '',
    sslcPassingYear: '2026',
    firstChoiceCourseId: activeProgrammes[0]?.id || '',
    secondChoiceCourseId: activeProgrammes[1]?.id || '',
    hostelRequired: false,
    transportRequired: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedApp, setSubmittedApp] = useState<AdmissionApplication | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.firstChoiceCourseId) {
      alert('Please fill all mandatory fields (Full Name, Phone, and Course Preference).');
      return;
    }

    setIsSubmitting(true);
    try {
      // Generate Unique Application Number: CPG-2026-XXXXX
      const randomFive = Math.floor(10000 + Math.random() * 90000);
      const appNumber = `CPG-2026-${randomFive}`;

      const selectedCourse1 = activeProgrammes.find((p) => p.id === formData.firstChoiceCourseId)?.name || 'Diploma';
      const selectedCourse2 = activeProgrammes.find((p) => p.id === formData.secondChoiceCourseId)?.name || '';

      const newApp: Omit<AdmissionApplication, 'id' | 'createdAt'> = {
        applicationNumber: appNumber,
        fullName: formData.fullName,
        parentName: formData.parentName,
        email: formData.email,
        phone: formData.phone,
        alternatePhone: formData.alternatePhone,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender as any,
        category: formData.category,
        address: `${formData.address}, ${formData.city}, ${formData.state} - ${formData.pincode}`,
        sslcPercentage: Number(formData.sslcPercentage) || 0,
        sslcSchool: formData.sslcSchool,
        sslcPassingYear: Number(formData.sslcPassingYear) || 2026,
        coursePreference1: selectedCourse1,
        coursePreference2: selectedCourse2,
        hostelRequired: formData.hostelRequired,
        transportRequired: formData.transportRequired,
        status: 'pending'
      };

      const id = await addAdmission(newApp);

      const created: AdmissionApplication = {
        id,
        createdAt: new Date().toISOString(),
        ...newApp
      };

      setSubmittedApp(created);

      // Trigger Confetti
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {
        // Safe fallback
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Error submitting application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Year 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Online Admission & Seat Reservation
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Apply online for 3-Year Diploma Engineering seats at Cauvery Polytechnic, Gonikoppal. Admissions are offered on merit basis with scholarship facilities.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {submittedApp ? (
          /* Success Receipt Card */
          <div className="bg-white rounded-3xl border border-emerald-200 shadow-xl overflow-hidden p-8 sm:p-12 text-slate-800 animate-in zoom-in-95 duration-300 print:border-none print:shadow-none">
            <div className="text-center pb-8 border-b border-slate-200">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
                Application Submitted Successfully
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-blue-950 font-serif mt-3">
                Cauvery Polytechnic, Gonikoppal
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                AICTE Approved • DTE Karnataka Affiliated • College Code: 494
              </p>

              {/* Unique ID Badge */}
              <div className="mt-6 inline-block bg-slate-900 text-amber-400 px-6 py-3 rounded-2xl border-2 border-amber-500 shadow-md">
                <span className="text-xs uppercase tracking-wider text-slate-300 block font-sans">Application Ref ID</span>
                <span className="text-2xl sm:text-3xl font-mono font-extrabold tracking-wider">{submittedApp.applicationNumber}</span>
              </div>
            </div>

            {/* Applicant Summary */}
            <div className="py-8 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Candidate Full Name</p>
                <p className="font-bold text-slate-900 text-base">{submittedApp.fullName}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Parent / Guardian</p>
                <p className="font-bold text-slate-900">{submittedApp.parentName || 'N/A'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">1st Choice Diploma Branch</p>
                <p className="font-bold text-blue-950">{submittedApp.coursePreference1}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">2nd Choice Branch</p>
                <p className="font-bold text-slate-700">{submittedApp.coursePreference2 || 'None'}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">Registered Contact</p>
                <p className="font-semibold text-slate-800">{submittedApp.phone} {submittedApp.email ? `• ${submittedApp.email}` : ''}</p>
              </div>
              <div>
                <p className="text-slate-400 font-semibold uppercase text-[10px]">SSLC / 10th Score</p>
                <p className="font-semibold text-slate-800">{submittedApp.sslcPercentage}% (Year: {submittedApp.sslcPassingYear})</p>
              </div>
            </div>

            {/* Next Steps */}
            <div className="py-6 bg-slate-50 rounded-2xl p-6 my-6 border border-slate-200 text-xs text-slate-600 space-y-2">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>Next Instructions for Candidate:</span>
              </h4>
              <p>1. Please quote Application Reference Number <strong>{submittedApp.applicationNumber}</strong> during all campus visits.</p>
              <p>2. Keep original SSLC Marks Card, Transfer Certificate (TC), Study Certificate (7 years), and 4 passport-size photographs ready for document verification.</p>
              <p>3. Our admission desk will call you within 24–48 hours to confirm seat availability and scholarship eligibility.</p>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 print:hidden">
              <button
                onClick={() => setSubmittedApp(null)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase rounded-xl transition-colors"
              >
                Submit Another Application
              </button>

              <button
                onClick={handlePrint}
                className="px-6 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors flex items-center gap-2 shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Application Slip</span>
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 space-y-8">
            {/* Step 1: Personal Details */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100 text-blue-950 font-bold text-base font-serif">
                <User className="w-5 h-5 text-amber-600" />
                <span>1. Personal & Family Information</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Candidate Full Name (As per SSLC) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="e.g. Ramesh Kumar K"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Father's / Mother's / Guardian's Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="parentName"
                    value={formData.parentName}
                    onChange={handleChange}
                    placeholder="e.g. Kariappa B"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Mobile Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Category / Caste
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    <option value="General">General (GM)</option>
                    <option value="OBC">OBC (Category 1, 2A, 2B, 3A, 3B)</option>
                    <option value="SC">SC (Scheduled Caste)</option>
                    <option value="ST">ST (Scheduled Tribe)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Alternate / WhatsApp Phone
                  </label>
                  <input
                    type="tel"
                    name="alternatePhone"
                    value={formData.alternatePhone}
                    onChange={handleChange}
                    placeholder="Alternate phone number"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Academic Background */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100 text-blue-950 font-bold text-base font-serif">
                <Award className="w-5 h-5 text-amber-600" />
                <span>2. Academic Background (SSLC / 10th / ITI)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    School / Board Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    name="sslcSchool"
                    value={formData.sslcSchool}
                    onChange={handleChange}
                    placeholder="e.g. Govt High School, Gonikoppal (KSEEB / CBSE / ICSE)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Total Percentage / Marks (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="35"
                    max="100"
                    required
                    name="sslcPercentage"
                    value={formData.sslcPercentage}
                    onChange={handleChange}
                    placeholder="e.g. 78.50"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Programme Preferences */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100 text-blue-950 font-bold text-base font-serif">
                <BookOpen className="w-5 h-5 text-amber-600" />
                <span>3. Course / Discipline Preferences</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    First Preference Branch <span className="text-red-500">*</span>
                  </label>
                  <select
                    required
                    name="firstChoiceCourseId"
                    value={formData.firstChoiceCourseId}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    {activeProgrammes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Second Preference Branch
                  </label>
                  <select
                    name="secondChoiceCourseId"
                    value={formData.secondChoiceCourseId}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  >
                    <option value="">-- Optional Second Choice --</option>
                    {activeProgrammes.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.code})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Amenities checkboxes */}
              <div className="mt-5 flex flex-wrap items-center gap-6 text-xs text-slate-700">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="hostelRequired"
                    checked={formData.hostelRequired}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-950 focus:ring-blue-900"
                  />
                  <span className="font-semibold">Hostel Accommodation Required</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="transportRequired"
                    checked={formData.transportRequired}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-blue-950 focus:ring-blue-900"
                  />
                  <span className="font-semibold">College Bus Transport Required</span>
                </label>
              </div>
            </div>

            {/* Step 4: Address Details */}
            <div>
              <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100 text-blue-950 font-bold text-base font-serif">
                <MapPin className="w-5 h-5 text-amber-600" />
                <span>4. Residential Address</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
                <div className="sm:col-span-3">
                  <label className="block font-bold text-slate-700 mb-1.5">
                    Permanent Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House No, Village/Street, Post"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Town / City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="e.g. Gonikoppal / Virajpet"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">State</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1.5">Pincode</label>
                  <input
                    type="text"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    placeholder="e.g. 571213"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>
              </div>
            </div>

            {/* Declaration & Submit Button */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-slate-500 max-w-md text-center sm:text-left">
                By submitting this form, I hereby declare that all information furnished is authentic to the best of my knowledge.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Processing Application...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-slate-950" />
                    <span>Submit Online Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
