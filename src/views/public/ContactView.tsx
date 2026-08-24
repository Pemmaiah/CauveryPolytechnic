import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { ContactEnquiry } from '../../types';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  MessageSquare,
  ShieldCheck,
  Building
} from 'lucide-react';

export const ContactView: React.FC = () => {
  const { settings, addEnquiry } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) {
      alert('Please fill name, phone and message.');
      return;
    }

    setIsSubmitting(true);
    try {
      await addEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject || 'General Enquiry',
        message: formData.message,
        status: 'unread'
      });
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Error submitting enquiry:', err);
      alert('Failed to send enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Banner */}
      <div className="bg-blue-950 text-white py-14 px-4 sm:px-6 lg:px-8 mb-12 shadow-md">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase tracking-widest mb-3 border border-amber-500/30">
            <MapPin className="w-3.5 h-3.5" />
            <span>Connect with Us</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-serif tracking-tight text-white">
            Contact College & Office
          </h1>
          <p className="mt-3 text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Get in touch with the admission desk, principal's office, examination branch, or departmental coordinators at Gonikoppal campus.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Details & Office Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-blue-950 font-serif">
                  {settings.collegeName || 'Cauvery Polytechnic'}
                </h3>
                <p className="text-xs font-semibold text-amber-700 uppercase mt-0.5">
                  Gonikoppal, Kodagu, Karnataka
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-blue-950 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Campus Address:</p>
                    <p className="text-slate-600 leading-relaxed mt-0.5">{settings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-blue-950 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Helpline / Office Telephone:</p>
                    <p className="text-slate-600 mt-0.5">{settings.phone} / {settings.mobile}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-blue-950 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Official Email:</p>
                    <p className="text-slate-600 mt-0.5">{settings.email}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-950 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">College & Office Timings:</p>
                    <p className="text-slate-600 mt-0.5">Monday to Saturday: 9:00 AM – 4:30 PM (2nd/4th Sat Holiday)</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 text-xs text-blue-950 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>DTE Karnataka Institution Code: {settings.dsaCode || '494'}</span>
                </p>
                <p className="text-slate-600">AICTE Permanent Institute ID: 1-475294821</p>
              </div>
            </div>
          </div>

          {/* Quick Enquiry Form */}
          <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
            <div className="flex items-center gap-2 pb-3 mb-6 border-b border-slate-100 text-blue-950 font-bold text-lg font-serif">
              <MessageSquare className="w-5 h-5 text-amber-600" />
              <span>Send an Instant Enquiry</span>
            </div>

            {success ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h4 className="text-lg font-bold text-emerald-900">Thank you for contacting us!</h4>
                <p className="text-xs text-emerald-700 max-w-md mx-auto">
                  Your enquiry has been securely logged. Our admissions and student relations team will contact you shortly.
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold uppercase"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Anand Gowda"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Mobile Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="10-digit number"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Enquiry Subject</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Admission 2026 / Fee Enquiry / Certificate"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message / Query *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your questions regarding admissions, branches, hostels, or campus visits..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-900/20 focus:border-blue-900"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-colors shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry...' : 'Submit Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Live Interactive Map */}
        <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
          <h4 className="text-sm font-bold text-blue-950 font-serif mb-3 px-2">Interactive Campus Map</h4>
          <div className="h-80 sm:h-96 rounded-2xl overflow-hidden bg-slate-100">
            <iframe
              title="Cauvery Polytechnic Gonikoppal Map Location"
              src={settings.googleMapEmbed || 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15604.83856554795!2d75.8872583871582!3d12.138760000000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba5b5505e60807b%3A0x6b4fb66904d9c733!2sGonikoppal%2C%20Karnataka%20571213!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin'}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
