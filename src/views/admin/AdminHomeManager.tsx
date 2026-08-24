import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { HomeSection, HomeSectionType } from '../../types';
import { 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  MoveUp, 
  MoveDown, 
  Eye, 
  EyeOff, 
  Sparkles, 
  Sliders, 
  UserCheck, 
  GraduationCap, 
  Award, 
  Calendar, 
  Newspaper, 
  Building2, 
  Images, 
  MapPin, 
  FileText, 
  Check, 
  X, 
  Image as ImageIcon, 
  Upload, 
  Link as LinkIcon, 
  RotateCcw, 
  TrendingUp, 
  Quote, 
  PlayCircle, 
  AlertCircle,
  HelpCircle,
  ExternalLink
} from 'lucide-react';

const SECTION_TYPE_INFO: Record<HomeSectionType, { label: string; icon: React.ElementType; description: string; defaultBg: string }> = {
  hero_slider: {
    label: 'Hero Slider Banner',
    icon: Sliders,
    description: 'Cinematic video-style hero slider with headline animations and call-to-action buttons.',
    defaultBg: 'dark'
  },
  principal_welcome: {
    label: "Principal's Welcome & Desk",
    icon: UserCheck,
    description: "Welcome narrative from the Principal, photo, qualifications, and core affiliation badges.",
    defaultBg: 'white'
  },
  why_us: {
    label: 'Why Choose Us / Key Advantages',
    icon: Award,
    description: 'Grid of institutional highlights, AICTE approval, placement track record, and scholarships.',
    defaultBg: 'slate'
  },
  programmes: {
    label: 'Academic Programmes Showcase',
    icon: GraduationCap,
    description: 'Diploma engineering courses grid with intake, duration, eligibility, and quick links.',
    defaultBg: 'white'
  },
  admission_cta: {
    label: 'Online Admission Banner Strip',
    icon: Sparkles,
    description: 'Prominent call-to-action strip inviting students to apply online or view fee structure.',
    defaultBg: 'gradient'
  },
  events: {
    label: 'Upcoming Events & Symposia',
    icon: Calendar,
    description: 'Calendar cards of upcoming technical workshops, sports, and cultural festivals.',
    defaultBg: 'slate'
  },
  news: {
    label: 'Latest News & Announcements',
    icon: Newspaper,
    description: 'Recent circulars, achievement stories, and examination notifications.',
    defaultBg: 'white'
  },
  facilities: {
    label: 'Campus & Infrastructure Facilities',
    icon: Building2,
    description: 'Dark-themed showcase of computer labs, mechanical workshops, smart classes, and library.',
    defaultBg: 'dark'
  },
  gallery: {
    label: 'Photo Gallery Preview',
    icon: Images,
    description: 'Filterable campus photography preview with lightbox modal.',
    defaultBg: 'slate'
  },
  map_contact: {
    label: 'Campus Location Map & Quick Contact',
    icon: MapPin,
    description: 'Interactive Google Map iframe and college contact details card.',
    defaultBg: 'white'
  },
  contact_map: {
    label: 'Campus Location Map & Quick Contact',
    icon: MapPin,
    description: 'Interactive Google Map iframe and college contact details card.',
    defaultBg: 'white'
  },
  custom_block: {
    label: 'Custom Content / Media Block',
    icon: FileText,
    description: 'Custom rich text section with featured image, custom buttons, checklist points, or banner layout.',
    defaultBg: 'white'
  },
  stats_counter: {
    label: 'Key Statistics & Achievements',
    icon: TrendingUp,
    description: 'Highlighted statistical numbers (e.g. 30+ Years, 100% Placement, 15+ Labs, 5000+ Alumni).',
    defaultBg: 'dark'
  },
  testimonials: {
    label: 'Alumni & Student Testimonials',
    icon: Quote,
    description: 'Student and graduate success stories with photos, batch details, and company placements.',
    defaultBg: 'slate'
  },
  video_showcase: {
    label: 'Campus Video Tour Showcase',
    icon: PlayCircle,
    description: 'Embedded YouTube video tour or institution documentary with custom thumbnail.',
    defaultBg: 'white'
  }
};

const SUGGESTED_IMAGES = [
  { url: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80', label: 'College Campus Building' },
  { url: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1200&q=80', label: 'Engineering Workshop / Lab' },
  { url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', label: 'Group of Polytechnic Students' },
  { url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80', label: 'Computer Programming Lab' },
  { url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80', label: 'Principal / HOD Portrait' },
  { url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80', label: 'Modern Smart Classroom' }
];

export const AdminHomeManager: React.FC = () => {
  const { 
    homeSections, 
    saveHomeSection, 
    addHomeSection, 
    deleteHomeSection, 
    toggleHomeSection, 
    reorderHomeSections,
    showToast 
  } = useCMS();

  const [editingSection, setEditingSection] = useState<Partial<HomeSection> | null>(null);
  const [isNewSectionModalOpen, setIsNewSectionModalOpen] = useState(false);
  const [selectedTypeForNew, setSelectedTypeForNew] = useState<HomeSectionType>('custom_block');
  const [showImagePicker, setShowImagePicker] = useState(false);
  const [activeImageField, setActiveImageField] = useState<'imageUrl' | 'bgImage' | 'principalPhoto'>('imageUrl');
  const [customDataPointsStr, setCustomDataPointsStr] = useState('');

  // Sorted list of sections
  const sortedSections = [...homeSections].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));

  const handleOpenEdit = (sec: HomeSection) => {
    setEditingSection({ ...sec });
    if (sec.customData && sec.customData.checklist) {
      setCustomDataPointsStr(sec.customData.checklist.join('\n'));
    } else if (sec.customData && sec.customData.stats) {
      setCustomDataPointsStr(JSON.stringify(sec.customData.stats, null, 2));
    } else {
      setCustomDataPointsStr('');
    }
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSection || !editingSection.title) {
      showToast('Validation Error', 'Section title is required.', 'warning');
      return;
    }

    try {
      const payload: Partial<HomeSection> = {
        ...editingSection,
        displayOrder: editingSection.displayOrder || sortedSections.length + 1,
        enabled: editingSection.enabled !== undefined ? editingSection.enabled : true
      };

      // Process customData if applicable
      if (editingSection.sectionType === 'principal_welcome' || editingSection.sectionType === 'custom_block') {
        const points = customDataPointsStr
          .split('\n')
          .map((p) => p.trim())
          .filter(Boolean);
        payload.customData = {
          ...(editingSection.customData || {}),
          checklist: points
        };
      }

      await saveHomeSection(payload);
      setEditingSection(null);
      setIsNewSectionModalOpen(false);
    } catch (err) {
      console.error('Failed to save home section:', err);
    }
  };

  const handleCreateNewSection = () => {
    const typeInfo = SECTION_TYPE_INFO[selectedTypeForNew];
    const newSec: Partial<HomeSection> = {
      id: `custom_${Date.now()}`,
      sectionType: selectedTypeForNew,
      title: typeInfo.label,
      subtitle: typeInfo.description,
      badgeText: 'Institutional Highlight',
      content: 'Enter compelling content and details for this section here.',
      enabled: true,
      displayOrder: sortedSections.length + 1,
      theme: typeInfo.defaultBg as any,
      buttonText: 'Learn More',
      buttonUrl: '/programmes',
      imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80',
      customData: {
        layout: 'image-right',
        checklist: [
          'AICTE Approved Diploma Engineering Curricula',
          'Industry-Aligned Hands-On Laboratories',
          'Dedicated Placement Assistance Cell'
        ]
      }
    };

    setEditingSection(newSec);
    setCustomDataPointsStr(
      'AICTE Approved Diploma Engineering Curricula\nIndustry-Aligned Hands-On Laboratories\nDedicated Placement Assistance Cell'
    );
    setIsNewSectionModalOpen(false);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to remove the "${title}" section from the Home Page? You can add it back anytime.`)) {
      await deleteHomeSection(id);
    }
  };

  const handleMoveUp = async (index: number) => {
    if (index === 0) return;
    const items = [...sortedSections];
    const temp = items[index - 1];
    items[index - 1] = items[index];
    items[index] = temp;
    await reorderHomeSections(items);
  };

  const handleMoveDown = async (index: number) => {
    if (index === sortedSections.length - 1) return;
    const items = [...sortedSections];
    const temp = items[index + 1];
    items[index + 1] = items[index];
    items[index] = temp;
    await reorderHomeSections(items);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-amber-700 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Public Home Page Customizer</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-serif">
            Home Page Sections & Content Manager
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Add, remove, reorder, and customize all content, text, media, and images across the public home page.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsNewSectionModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-900 hover:bg-blue-950 text-white rounded-xl text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Section</span>
          </button>
        </div>
      </div>

      {/* Sections List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800 text-sm">Active Page Layout</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-xs font-semibold">
              {sortedSections.length} Sections
            </span>
          </div>
          <span className="text-xs text-slate-500 hidden sm:inline">
            Use the Up/Down arrows to change the vertical display order on the home page.
          </span>
        </div>

        {sortedSections.length === 0 ? (
          <div className="p-12 text-center text-slate-400 space-y-3">
            <Layers className="w-12 h-12 mx-auto text-slate-300" />
            <p className="text-base font-semibold text-slate-600">No home sections configured.</p>
            <button
              onClick={() => setIsNewSectionModalOpen(true)}
              className="px-4 py-2 bg-blue-900 text-white rounded-xl text-xs font-bold uppercase"
            >
              Add First Section
            </button>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {sortedSections.map((sec, idx) => {
              const info = SECTION_TYPE_INFO[sec.sectionType] || {
                label: sec.title,
                icon: FileText,
                description: 'Home section',
                defaultBg: 'white'
              };
              const IconComp = info.icon;
              const isEnabled = sec.enabled !== false;

              return (
                <div
                  key={sec.id}
                  className={`p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors ${
                    isEnabled ? 'bg-white hover:bg-slate-50/70' : 'bg-slate-50/50 opacity-60'
                  }`}
                >
                  {/* Left: Drag / Order & Info */}
                  <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                    <div className="flex flex-col gap-1 shrink-0">
                      <button
                        onClick={() => handleMoveUp(idx)}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-blue-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move Up"
                      >
                        <MoveUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleMoveDown(idx)}
                        disabled={idx === sortedSections.length - 1}
                        className="p-1 text-slate-400 hover:text-blue-900 hover:bg-slate-100 rounded disabled:opacity-30 disabled:hover:bg-transparent"
                        title="Move Down"
                      >
                        <MoveDown className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 flex items-center justify-center shrink-0">
                      <IconComp className="w-5 h-5" />
                    </div>

                    {/* Section Thumbnail if image exists */}
                    {sec.imageUrl && (
                      <div className="hidden sm:block w-14 h-10 rounded-lg overflow-hidden border border-slate-200 shrink-0 bg-slate-100">
                        <img
                          src={sec.imageUrl}
                          alt={sec.title}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-bold text-slate-400">#{idx + 1}</span>
                        <h3 className="text-sm font-bold text-slate-900 truncate">{sec.title}</h3>
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                          {info.label}
                        </span>
                        {!isEnabled && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-700">
                            Hidden
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 truncate mt-0.5">
                        {sec.subtitle || sec.content || info.description}
                      </p>
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    {/* Toggle Visibility */}
                    <button
                      onClick={() => toggleHomeSection(sec.id, !isEnabled)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        isEnabled
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                          : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                      }`}
                      title={isEnabled ? 'Click to hide from home page' : 'Click to show on home page'}
                    >
                      {isEnabled ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      <span>{isEnabled ? 'Visible' : 'Hidden'}</span>
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => handleOpenEdit(sec)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-900 border border-blue-200 hover:bg-blue-100 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit Content</span>
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => handleDelete(sec.id, sec.title)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Remove section"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal: Select New Section Type */}
      {isNewSectionModalOpen && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl p-6 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-serif">Add New Home Page Section</h3>
                <p className="text-xs text-slate-500">Choose the type of component to insert onto your front page</p>
              </div>
              <button
                onClick={() => setIsNewSectionModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[55vh] overflow-y-auto pr-1">
              {(Object.keys(SECTION_TYPE_INFO) as HomeSectionType[]).map((type) => {
                const item = SECTION_TYPE_INFO[type];
                const IconComponent = item.icon;
                const isSelected = selectedTypeForNew === type;

                return (
                  <div
                    key={type}
                    onClick={() => setSelectedTypeForNew(type)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3 ${
                      isSelected
                        ? 'border-blue-900 bg-blue-50/50 ring-2 ring-blue-900/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-700'}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-900">{item.label}</h4>
                        {isSelected && <Check className="w-4 h-4 text-blue-900 shrink-0" />}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 leading-snug">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsNewSectionModalOpen(false)}
                className="px-4 py-2 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateNewSection}
                className="px-5 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-sm"
              >
                Configure & Insert Section
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal / Drawer: Edit Section Content & Media */}
      {editingSection && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full border border-slate-200 shadow-2xl overflow-hidden my-8 flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-900 text-white">
                  <Edit3 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 font-serif">
                    Edit Section: {editingSection.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Type: <span className="font-semibold text-blue-900">{SECTION_TYPE_INFO[editingSection.sectionType as HomeSectionType]?.label || editingSection.sectionType}</span>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingSection(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSaveSection} className="p-6 overflow-y-auto space-y-5 flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Section Heading / Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSection.title || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                    placeholder="e.g., World-Class Technical Education"
                  />
                </div>

                {/* Badge Label */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Header Badge / Eyebrow Text
                  </label>
                  <input
                    type="text"
                    value={editingSection.badgeText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, badgeText: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                    placeholder="e.g., Academic Excellence, Admissions Open"
                  />
                </div>
              </div>

              {/* Subtitle */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Section Subtitle / Tagline
                </label>
                <input
                  type="text"
                  value={editingSection.subtitle || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                  placeholder="e.g., Empowering youth with tactile engineering knowledge in Kodagu"
                />
              </div>

              {/* Main Content / Paragraph */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Description / Body Text
                </label>
                <textarea
                  rows={4}
                  value={editingSection.content || ''}
                  onChange={(e) => setEditingSection({ ...editingSection, content: e.target.value })}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden leading-relaxed"
                  placeholder="Enter detailed narrative, welcome message, or section explanation..."
                />
              </div>

              {/* Media / Image Management */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                    <ImageIcon className="w-4 h-4 text-blue-900" />
                    <span>Featured Image / Media URL</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveImageField('imageUrl');
                      setShowImagePicker(!showImagePicker);
                    }}
                    className="text-xs font-semibold text-blue-900 hover:text-blue-700 underline"
                  >
                    {showImagePicker ? 'Close Gallery Presets' : 'Choose Preset Image'}
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={editingSection.imageUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, imageUrl: e.target.value })}
                    className="flex-1 px-3.5 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-white"
                    placeholder="https://images.unsplash.com/..."
                  />
                  {editingSection.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setEditingSection({ ...editingSection, imageUrl: '' })}
                      className="p-2 text-rose-600 hover:bg-rose-50 rounded-xl"
                      title="Clear image"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Preset Image Gallery Picker */}
                {showImagePicker && (
                  <div className="pt-2 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SUGGESTED_IMAGES.map((img, i) => (
                      <div
                        key={i}
                        onClick={() => {
                          setEditingSection({ ...editingSection, [activeImageField]: img.url });
                          setShowImagePicker(false);
                        }}
                        className="group relative h-20 rounded-lg overflow-hidden border border-slate-200 cursor-pointer hover:border-blue-900 hover:ring-2 hover:ring-blue-900/20"
                      >
                        <img
                          src={img.url}
                          alt={img.label}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 p-1 flex items-end">
                          <span className="text-[10px] text-white font-medium leading-tight drop-shadow-xs">
                            {img.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Image Live Preview */}
                {editingSection.imageUrl && (
                  <div className="flex items-center gap-3 pt-2">
                    <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-300 bg-slate-200 shrink-0">
                      <img
                        src={editingSection.imageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-xs text-slate-500">Live preview of selected section image.</span>
                  </div>
                )}
              </div>

              {/* Custom Checklist / Key Points */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Checklist Bullet Points (One per line)
                </label>
                <textarea
                  rows={3}
                  value={customDataPointsStr}
                  onChange={(e) => setCustomDataPointsStr(e.target.value)}
                  className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                  placeholder="AICTE Approved Diploma Programs&#10;Affiliated to DTE Karnataka (Code: 494)&#10;Dedicated Placement Cell"
                />
                <p className="text-[11px] text-slate-400 mt-1">Each line appears as a verified bullet item with a green checkmark.</p>
              </div>

              {/* Button & Link Config */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Call-to-Action Button Label
                  </label>
                  <input
                    type="text"
                    value={editingSection.buttonText || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonText: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                    placeholder="e.g., Explore Courses, Apply Online"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Button Destination URL
                  </label>
                  <input
                    type="text"
                    value={editingSection.buttonUrl || ''}
                    onChange={(e) => setEditingSection({ ...editingSection, buttonUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden"
                    placeholder="e.g., /programmes, /admission, /contact"
                  />
                </div>
              </div>

              {/* Theme & Styling */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Section Theme / Background
                  </label>
                  <select
                    value={editingSection.theme || 'white'}
                    onChange={(e) => setEditingSection({ ...editingSection, theme: e.target.value as any })}
                    className="w-full px-3.5 py-2.5 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-900 focus:outline-hidden bg-white"
                  >
                    <option value="white">Clean White</option>
                    <option value="slate">Light Slate Grey</option>
                    <option value="dark">Executive Dark Blue (950)</option>
                    <option value="gradient">Deep Navy Gradient</option>
                    <option value="amber">Warm Gold Accent</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 pt-6">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingSection.enabled !== false}
                      onChange={(e) => setEditingSection({ ...editingSection, enabled: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    <span className="ml-3 text-xs font-bold text-slate-700">
                      {editingSection.enabled !== false ? 'Section is Enabled (Visible)' : 'Section is Hidden'}
                    </span>
                  </label>
                </div>
              </div>

              {/* Footer Modal Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingSection(null)}
                  className="px-4 py-2.5 text-slate-700 hover:bg-slate-100 text-xs font-semibold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-blue-900 hover:bg-blue-950 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow-md transition-all"
                >
                  Save Section Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
