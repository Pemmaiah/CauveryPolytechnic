import React, { useState } from 'react';
import { useCMS } from '../../context/CMSContext';
import { MenuItem } from '../../types';
import { ConfirmationModal } from '../../components/common/ConfirmationModal';
import { 
  Menu as MenuIcon, 
  Plus, 
  Edit2, 
  Trash2, 
  CornerDownRight, 
  Move, 
  Check, 
  X, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const AdminMenuManager: React.FC = () => {
  const { menus, addMenu, updateMenu, deleteMenu } = useCMS();
  const [editingMenu, setEditingMenu] = useState<Partial<MenuItem> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const activeMenus = [...menus].sort((a, b) => a.order - b.order);
  const rootMenus = activeMenus.filter((m) => !m.parentId);

  const getChildren = (parentId: string): MenuItem[] => {
    return activeMenus.filter((m) => m.parentId === parentId).sort((a, b) => a.order - b.order);
  };

  const handleAddNew = (parentId?: string) => {
    setIsNew(true);
    setEditingMenu({
      title: '',
      url: '/',
      parentId: parentId || undefined,
      order: menus.length + 1,
      active: true
    });
  };

  const handleEdit = (menu: MenuItem) => {
    setIsNew(false);
    setEditingMenu({ ...menu });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu || !editingMenu.title || !editingMenu.url) {
      alert('Please provide menu title and URL.');
      return;
    }

    setSaving(true);
    try {
      if (isNew) {
        await addMenu(editingMenu as Omit<MenuItem, 'id'>);
      } else if (editingMenu.id) {
        await updateMenu(editingMenu.id, editingMenu);
      }
      setEditingMenu(null);
    } catch (err) {
      console.error('Error saving menu:', err);
      alert('Failed to save menu.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (deleteTargetId) {
      await deleteMenu(deleteTargetId);
      setDeleteTargetId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <MenuIcon className="w-6 h-6 text-indigo-600" />
            <h2 className="text-xl font-bold text-slate-900 font-serif">WordPress-Style Menu Tree Manager</h2>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Build multi-level hierarchical navigation trees (Root Menu, Dropdown Sub-menus, and Sub-sub items).
          </p>
        </div>

        <button
          onClick={() => handleAddNew()}
          className="px-4 py-2.5 bg-blue-950 hover:bg-blue-900 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center gap-2 shadow-sm shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Add Root Menu</span>
        </button>
      </div>

      {/* Menu Tree List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xs p-6 space-y-4">
        {rootMenus.map((root) => {
          const l2Children = getChildren(root.id);

          return (
            <div key={root.id} className="border border-slate-200 rounded-2xl p-4 bg-slate-50/50 space-y-3">
              {/* Level 1 (Root Item) */}
              <div className="flex items-center justify-between gap-4 bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-blue-950 text-amber-400 font-mono text-xs font-bold flex items-center justify-center">
                    {root.order}
                  </span>
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{root.title}</span>
                    <span className="text-xs text-slate-400 font-mono ml-2">({root.url})</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAddNew(root.id)}
                    className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold flex items-center gap-1"
                    title="Add Child Submenu"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Submenu</span>
                  </button>
                  <button
                    onClick={() => handleEdit(root)}
                    className="p-1.5 text-slate-500 hover:text-blue-950 hover:bg-slate-100 rounded-lg"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setDeleteTargetId(root.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Level 2 Sub-items */}
              {l2Children.length > 0 && (
                <div className="pl-6 space-y-2 border-l-2 border-indigo-200 ml-3">
                  {l2Children.map((sub) => {
                    const l3Children = getChildren(sub.id);

                    return (
                      <div key={sub.id} className="space-y-2">
                        <div className="flex items-center justify-between gap-4 bg-white p-3 rounded-xl border border-slate-200 text-xs">
                          <div className="flex items-center gap-2">
                            <CornerDownRight className="w-4 h-4 text-indigo-400" />
                            <span className="font-bold text-slate-800">{sub.title}</span>
                            <span className="text-slate-400 font-mono text-[11px]">({sub.url})</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAddNew(sub.id)}
                              className="px-2 py-0.5 bg-slate-100 hover:bg-indigo-50 text-slate-700 text-[11px] font-bold rounded"
                              title="Add Level 3 Item"
                            >
                              + Sub-item
                            </button>
                            <button
                              onClick={() => handleEdit(sub)}
                              className="p-1 text-slate-500 hover:text-blue-950"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => setDeleteTargetId(sub.id)}
                              className="p-1 text-slate-400 hover:text-red-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Level 3 Items */}
                        {l3Children.length > 0 && (
                          <div className="pl-6 space-y-1.5 border-l-2 border-amber-300 ml-3">
                            {l3Children.map((subSub) => (
                              <div
                                key={subSub.id}
                                className="flex items-center justify-between gap-4 bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                                  <span className="font-semibold text-slate-700">{subSub.title}</span>
                                  <span className="text-slate-400 font-mono text-[10px]">({subSub.url})</span>
                                </div>

                                <div className="flex items-center gap-1.5">
                                  <button
                                    onClick={() => handleEdit(subSub)}
                                    className="p-1 text-slate-500 hover:text-blue-950"
                                  >
                                    <Edit2 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteTargetId(subSub.id)}
                                    className="p-1 text-slate-400 hover:text-red-600"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Menu Edit Modal */}
      {editingMenu && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 font-serif">
                {isNew ? 'Create Navigation Menu Item' : 'Edit Menu Item'}
              </h3>
              <button
                onClick={() => setEditingMenu(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Menu Label / Title *</label>
                <input
                  type="text"
                  required
                  value={editingMenu.title || ''}
                  onChange={(e) => setEditingMenu({ ...editingMenu, title: e.target.value })}
                  placeholder="e.g. About Us / Programmes / Contact"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Navigation Target URL *</label>
                <input
                  type="text"
                  required
                  value={editingMenu.url || ''}
                  onChange={(e) => setEditingMenu({ ...editingMenu, url: e.target.value })}
                  placeholder="e.g. /programmes or /pages/principals-desk"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Parent Menu Item</label>
                <select
                  value={editingMenu.parentId || ''}
                  onChange={(e) =>
                    setEditingMenu({
                      ...editingMenu,
                      parentId: e.target.value === '' ? undefined : e.target.value
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-50 border rounded-xl font-medium"
                >
                  <option value="">(None - Top Level Root Menu)</option>
                  {menus
                    .filter((m) => m.id !== editingMenu.id)
                    .map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.parentId ? `↳ Sub: ${m.title}` : `Root: ${m.title}`}
                      </option>
                    ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Display Order</label>
                  <input
                    type="number"
                    value={editingMenu.order ?? 1}
                    onChange={(e) => setEditingMenu({ ...editingMenu, order: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 bg-slate-50 border rounded-xl"
                  />
                </div>

                <div className="flex items-center pt-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editingMenu.active ?? true}
                      onChange={(e) => setEditingMenu({ ...editingMenu, active: e.target.checked })}
                      className="w-4 h-4 rounded text-blue-950"
                    />
                    <span className="font-bold text-slate-800">Menu is Visible</span>
                  </label>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingMenu(null)}
                  className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-white font-bold uppercase tracking-wider"
                >
                  {saving ? 'Saving...' : 'Save Menu'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      <ConfirmationModal
        isOpen={deleteTargetId !== null}
        title="Delete Menu Item"
        message="Are you sure you want to delete this menu item and its submenus?"
        confirmText="Delete Menu"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteTargetId(null)}
      />
    </div>
  );
};
