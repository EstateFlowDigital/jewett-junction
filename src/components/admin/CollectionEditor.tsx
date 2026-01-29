import * as React from 'react';
import {
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  RefreshCw,
  Send,
  Check,
  AlertCircle,
  Loader2,
  Image,
  Link,
  MapPin,
  Upload,
  ImagePlus,
  CheckSquare,
  Eye,
  Copy,
  Users,
  Calendar,
  Sparkles
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';

const API_BASE = '/jewett-junction';

// Field configuration type
export interface FieldConfig {
  key: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'url' | 'number' | 'textarea' | 'richtext' | 'datetime' | 'select' | 'boolean' | 'image';
  required?: boolean;
  placeholder?: string;
  helpText?: string;
  options?: string[];
  icon?: any;
}

// Collection configuration type
export interface CollectionConfig {
  name: string;
  icon: any;
  color: string;
  gradient: string;
  description?: string;
  slug?: string;
  fields: FieldConfig[];
}

interface CollectionEditorProps {
  collectionKey: string;
  config: CollectionConfig;
}

export function CollectionEditor({ collectionKey, config }: CollectionEditorProps) {
  const [items, setItems] = React.useState<any[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState('');
  const [success, setSuccess] = React.useState('');

  const [isEditing, setIsEditing] = React.useState(false);
  const [editingItem, setEditingItem] = React.useState<any>(null);
  const [formData, setFormData] = React.useState<Record<string, any>>({});

  // Upload state
  const [uploadingField, setUploadingField] = React.useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const [dragOverField, setDragOverField] = React.useState<string | null>(null);

  // Preview state
  const [showPreview, setShowPreview] = React.useState(false);

  // Bulk edit state
  const [bulkMode, setBulkMode] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [bulkActionLoading, setBulkActionLoading] = React.useState(false);
  const [showBulkFieldModal, setShowBulkFieldModal] = React.useState(false);
  const [bulkFieldKey, setBulkFieldKey] = React.useState('');
  const [bulkFieldValue, setBulkFieldValue] = React.useState<any>('');

  const Icon = config.icon;

  const getToken = () => localStorage.getItem('admin_token') || '';

  // Load items on mount
  React.useEffect(() => {
    loadItems();
  }, [collectionKey]);

  // Auto-dismiss success toast after 4 seconds
  React.useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(''), 4000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Auto-dismiss error toast after 6 seconds
  React.useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(''), 6000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  // Helper to extract URL from image field
  const getImageUrl = (value: any): string => {
    if (!value) return '';
    if (typeof value === 'string') return value;
    if (typeof value === 'object' && value.url) return value.url;
    return '';
  };

  // Normalize field data for editing
  const normalizeFieldData = (fieldData: Record<string, any>): Record<string, any> => {
    const normalized = { ...fieldData };
    config.fields.forEach(field => {
      if (field.type === 'image' && normalized[field.key]) {
        normalized[field.key] = getImageUrl(normalized[field.key]);
      }
    });
    return normalized;
  };

  const loadItems = async () => {
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE}/api/admin/items?collection=${collectionKey}`, {
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'X-Requested-With': 'XMLHttpRequest'
        }
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/jewett-junction/admin';
          return;
        }
        throw new Error('Failed to load items');
      }

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error('Server returned invalid response');
      }
      setItems(data.items || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingItem(null);
    setFormData({});
    setIsEditing(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData(normalizeFieldData(item.fieldData || {}));
    setIsEditing(true);
  };

  const handleDelete = async (itemId: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE}/api/admin/items`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ collection: collectionKey, itemId })
      });

      if (!response.ok) throw new Error('Failed to delete item');

      setSuccess('Item deleted successfully');
      loadItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async (publishLive: boolean = false) => {
    setIsLoading(true);
    setError('');

    try {
      const method = editingItem ? 'PATCH' : 'POST';
      const body: any = {
        collection: collectionKey,
        fields: formData,
        isLive: publishLive
      };

      if (editingItem) {
        body.itemId = editingItem.id;
      }

      const response = await fetch(`${API_BASE}/api/admin/items`, {
        method,
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(body)
      });

      const responseText = await response.text();
      let data: any = {};
      try {
        data = JSON.parse(responseText);
      } catch {
        if (!response.ok) {
          throw new Error(`Server error (${response.status})`);
        }
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save item');
      }

      setSuccess(editingItem ? 'Item updated!' : 'Item created!');
      setIsEditing(false);
      setEditingItem(null);
      setFormData({});
      loadItems();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Bulk edit functions
  const toggleBulkMode = () => {
    setBulkMode(!bulkMode);
    setSelectedItems([]);
  };

  const toggleItemSelection = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const selectAllItems = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedItems.length === 0) return;
    if (!confirm(`Delete ${selectedItems.length} item(s)? This cannot be undone.`)) return;

    setBulkActionLoading(true);
    setError('');
    let successCount = 0;
    let errorCount = 0;

    for (const itemId of selectedItems) {
      try {
        const response = await fetch(`${API_BASE}/api/admin/items`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({ collection: collectionKey, itemId })
        });
        if (response.ok) successCount++;
        else errorCount++;
      } catch {
        errorCount++;
      }
    }

    setBulkActionLoading(false);
    setSelectedItems([]);
    setSuccess(`Deleted ${successCount} item(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`);
    loadItems();
  };

  const handleBulkPublish = async (publishLive: boolean) => {
    if (selectedItems.length === 0) return;
    if (!confirm(`${publishLive ? 'Publish' : 'Save as draft'} ${selectedItems.length} item(s)?`)) return;

    setBulkActionLoading(true);
    setError('');
    let successCount = 0;
    let errorCount = 0;

    for (const itemId of selectedItems) {
      const item = items.find(i => i.id === itemId);
      if (!item) continue;

      try {
        const response = await fetch(`${API_BASE}/api/admin/items`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            collection: collectionKey,
            itemId,
            fields: item.fieldData || {},
            isLive: publishLive
          })
        });
        if (response.ok) successCount++;
        else errorCount++;
      } catch {
        errorCount++;
      }
    }

    setBulkActionLoading(false);
    setSelectedItems([]);
    setSuccess(`${publishLive ? 'Published' : 'Saved as draft'} ${successCount} item(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`);
    loadItems();
  };

  const handleBulkSetField = async () => {
    if (selectedItems.length === 0 || !bulkFieldKey) return;

    setBulkActionLoading(true);
    setError('');
    let successCount = 0;
    let errorCount = 0;

    for (const itemId of selectedItems) {
      const item = items.find(i => i.id === itemId);
      if (!item) continue;

      const updatedFields = {
        ...(item.fieldData || {}),
        [bulkFieldKey]: bulkFieldValue
      };

      try {
        const response = await fetch(`${API_BASE}/api/admin/items`, {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: JSON.stringify({
            collection: collectionKey,
            itemId,
            fields: updatedFields,
            isLive: false
          })
        });
        if (response.ok) successCount++;
        else errorCount++;
      } catch {
        errorCount++;
      }
    }

    setBulkActionLoading(false);
    setShowBulkFieldModal(false);
    setBulkFieldKey('');
    setBulkFieldValue('');
    setSelectedItems([]);
    setSuccess(`Updated ${successCount} item(s)${errorCount > 0 ? `, ${errorCount} failed` : ''}`);
    loadItems();
  };

  // Handle file upload
  const handleFileUpload = async (file: File, fieldKey: string) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG');
      return;
    }

    const maxSize = 750 * 1024;
    if (file.size > maxSize) {
      setError('File too large. Maximum size is 750KB. Please compress your image before uploading.');
      return;
    }

    setUploadingField(fieldKey);
    setUploadProgress(0);
    setError('');

    try {
      const arrayBuffer = await file.arrayBuffer();
      const base64 = btoa(
        new Uint8Array(arrayBuffer).reduce((data, byte) => data + String.fromCharCode(byte), '')
      );

      const progressInterval = setInterval(() => {
        setUploadProgress(prev => Math.min(prev + 10, 90));
      }, 200);

      const response = await fetch(`${API_BASE}/api/admin/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${getToken()}`,
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          fileName: file.name,
          fileType: file.type,
          fileSize: file.size,
          fileData: base64
        })
      });

      clearInterval(progressInterval);

      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch {
        throw new Error(response.status === 0
          ? 'Network error - please check your connection'
          : `Server error (${response.status}): ${responseText.substring(0, 100)}`);
      }

      if (!response.ok) {
        throw new Error(data.error || `Upload failed with status ${response.status}`);
      }

      setUploadProgress(100);
      setFormData({ ...formData, [fieldKey]: data.url });
      setSuccess('Image uploaded successfully!');

      setTimeout(() => {
        setUploadProgress(0);
        setUploadingField(null);
      }, 500);

    } catch (err: any) {
      setError(err.message);
      setUploadingField(null);
      setUploadProgress(0);
    }
  };

  const handleDrop = (e: React.DragEvent, fieldKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileUpload(files[0], fieldKey);
    }
  };

  const handleDragOver = (e: React.DragEvent, fieldKey: string) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(fieldKey);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragOverField(null);
  };

  // Render field based on type
  const renderField = (field: FieldConfig) => {
    const FieldIcon = field.icon;
    const fieldId = `field-${field.key}`;

    return (
      <div key={field.key} className="group">
        <label htmlFor={fieldId} className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-2">
          {FieldIcon && <FieldIcon className="h-4 w-4 text-slate-500" aria-hidden="true" />}
          {field.label}
          {field.required && <span className="text-rose-400 ml-1" aria-label="required">*</span>}
        </label>

        {/* Image field */}
        {field.type === 'image' && (
          <div className="space-y-3">
            {getImageUrl(formData[field.key]) ? (
              <div className="relative rounded-xl overflow-hidden border border-slate-700/50 bg-slate-900/50">
                <div className="bg-slate-800/50 p-4 flex items-center justify-center min-h-[200px]">
                  <img
                    src={getImageUrl(formData[field.key])}
                    alt="Preview"
                    className="max-w-full max-h-[300px] object-contain rounded-lg"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%236b7280" stroke-width="1"%3E%3Crect x="3" y="3" width="18" height="18" rx="2"/%3E%3Ccircle cx="8.5" cy="8.5" r="1.5"/%3E%3Cpath d="M21 15l-5-5L5 21"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <div className="p-3 bg-slate-900/80 border-t border-slate-700/50 flex items-center justify-between">
                  <span className="text-slate-400 text-xs truncate max-w-[60%]">{getImageUrl(formData[field.key]).split('/').pop()}</span>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, [field.key]: '' })}
                    className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <div
                onDrop={(e) => handleDrop(e, field.key)}
                onDragOver={(e) => handleDragOver(e, field.key)}
                onDragLeave={handleDragLeave}
                className={`relative border-2 border-dashed rounded-xl p-6 transition-all ${
                  dragOverField === field.key
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-slate-600/50 hover:border-slate-500 bg-slate-900/30'
                } ${uploadingField === field.key ? 'pointer-events-none' : ''}`}
              >
                {uploadingField === field.key ? (
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 text-blue-400 animate-spin mx-auto mb-3" />
                    <p className="text-sm text-white font-medium mb-2">Uploading...</p>
                    <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-slate-400 mt-2">{uploadProgress}%</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-3 border border-slate-700">
                      <ImagePlus className="h-7 w-7 text-slate-400" />
                    </div>
                    <p className="text-sm text-white font-medium mb-1">
                      Drag & drop an image here
                    </p>
                    <p className="text-xs text-slate-500 mb-4">or</p>
                    <label className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-sm font-medium rounded-xl cursor-pointer transition-all shadow-lg shadow-blue-500/20">
                      <Upload className="h-4 w-4" />
                      Choose File
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(file, field.key);
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                    </label>
                    <p className="text-xs text-slate-500 mt-3">
                      JPEG, PNG, GIF, WebP, SVG - Max 750KB
                    </p>
                  </div>
                )}
              </div>
            )}

            {!formData[field.key] && !uploadingField && (
              <div className="border-t border-slate-700/50 pt-3">
                <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
                  <Link className="h-3 w-3" />
                  Or paste image URL (no size limit)
                </p>
                <div className="relative">
                  <input
                    type="url"
                    value={formData[field.key] || ''}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="w-full px-4 py-2.5 pr-10 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white text-sm placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all"
                  />
                  <Image className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Text, email, tel, url fields */}
        {(field.type === 'text' || field.type === 'email' || field.type === 'tel' || field.type === 'url') && (
          <input
            id={fieldId}
            type={field.type === 'url' ? 'url' : field.type === 'email' ? 'email' : field.type === 'tel' ? 'tel' : 'text'}
            value={formData[field.key] || ''}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            placeholder={field.placeholder}
            aria-required={field.required}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all"
          />
        )}

        {/* Number field */}
        {field.type === 'number' && (
          <input
            id={fieldId}
            type="number"
            value={formData[field.key] || ''}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value ? parseInt(e.target.value) : '' })}
            placeholder={field.placeholder}
            aria-required={field.required}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all"
          />
        )}

        {/* Textarea */}
        {field.type === 'textarea' && (
          <textarea
            id={fieldId}
            value={formData[field.key] || ''}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            rows={3}
            placeholder={field.placeholder}
            aria-required={field.required}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all resize-none"
          />
        )}

        {/* Rich text */}
        {field.type === 'richtext' && (
          <RichTextEditor
            value={formData[field.key] || ''}
            onChange={(html) => setFormData({ ...formData, [field.key]: html })}
            placeholder={field.placeholder || "Start typing your content..."}
          />
        )}

        {/* Datetime */}
        {field.type === 'datetime' && (
          <input
            id={fieldId}
            type="datetime-local"
            value={formData[field.key]?.slice(0, 16) || ''}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value ? new Date(e.target.value).toISOString() : '' })}
            aria-required={field.required}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all"
          />
        )}

        {/* Select dropdown */}
        {field.type === 'select' && (
          <select
            id={fieldId}
            value={formData[field.key] || ''}
            onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
            aria-required={field.required}
            className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all appearance-none cursor-pointer"
          >
            <option value="">Select {field.label.toLowerCase()}...</option>
            {field.options?.map((opt) => (
              <option key={opt} value={opt.toLowerCase().replace(/\s+/g, '-')}>{opt}</option>
            ))}
          </select>
        )}

        {/* Boolean toggle */}
        {field.type === 'boolean' && (
          <label className="flex items-center gap-3 cursor-pointer group/toggle">
            <div className="relative">
              <input
                type="checkbox"
                checked={formData[field.key] || false}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-12 h-6 bg-slate-700 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500 transition-all"></div>
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow peer-checked:translate-x-6 transition-transform"></div>
            </div>
            <span className="text-slate-400 group-hover/toggle:text-white transition-colors">
              {formData[field.key] ? 'Enabled' : 'Disabled'}
            </span>
          </label>
        )}

        {/* Help text */}
        {field.helpText && (
          <p className="mt-1.5 text-xs text-slate-500">{field.helpText}</p>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Toast Notifications */}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm" role="region" aria-label="Notifications">
        {success && (
          <div role="alert" aria-live="polite" className="flex items-center gap-3 p-4 bg-slate-800/95 border border-emerald-500/40 rounded-xl backdrop-blur-sm shadow-lg shadow-emerald-500/10">
            <div className="w-8 h-8 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="h-4 w-4 text-emerald-400" aria-hidden="true" />
            </div>
            <span className="text-emerald-300 text-sm flex-1">{success}</span>
            <button onClick={() => setSuccess('')} aria-label="Dismiss success message" className="min-h-[44px] min-w-[44px] p-2 text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
        {error && (
          <div role="alert" aria-live="assertive" className="flex items-center gap-3 p-4 bg-slate-800/95 border border-rose-500/40 rounded-xl backdrop-blur-sm shadow-lg shadow-rose-500/10">
            <div className="w-8 h-8 bg-rose-500/20 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertCircle className="h-4 w-4 text-rose-400" aria-hidden="true" />
            </div>
            <span className="text-rose-300 text-sm flex-1">{error}</span>
            <button onClick={() => setError('')} aria-label="Dismiss error message" className="min-h-[44px] min-w-[44px] p-2 text-slate-500 hover:text-slate-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 rounded">
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-modal-title"
        >
          <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-gray-600" aria-hidden="true" />
                <h2 id="preview-modal-title" className="text-lg font-semibold text-gray-900">
                  Preview: {formData.name || 'Untitled'}
                </h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
                className="min-h-[44px] min-w-[44px] p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] bg-white">
              {formData.name && (
                <h1 className="text-2xl font-bold text-gray-900 mb-4">{formData.name}</h1>
              )}
              {(formData.image || formData['banner-image'] || formData['featured-image'] || formData.thumbnail) && (
                <div className="mb-6 rounded-xl overflow-hidden bg-gray-100 p-4 flex items-center justify-center">
                  <img
                    src={formData.image || formData['banner-image'] || formData['featured-image'] || formData.thumbnail}
                    alt={formData.name || 'Preview'}
                    className="max-w-full max-h-[400px] object-contain rounded-lg"
                  />
                </div>
              )}
              <div className="flex flex-wrap gap-3 mb-6 text-sm text-gray-600">
                {formData.author && (
                  <span className="flex items-center gap-1">
                    <Users className="h-4 w-4" /> {formData.author}
                  </span>
                )}
                {formData.category && (
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {formData.category}
                  </span>
                )}
                {formData.location && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {formData.location}
                  </span>
                )}
              </div>
              {(formData.content || formData.description) && (
                <div
                  className="prose prose-gray max-w-none"
                  dangerouslySetInnerHTML={{ __html: formData.content || formData.description || '' }}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Bulk Set Field Modal */}
      {showBulkFieldModal && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bulk-field-modal-title"
          aria-describedby="bulk-field-modal-desc"
        >
          <div className="bg-slate-800 rounded-2xl max-w-md w-full border border-slate-700/50 shadow-2xl">
            <div className="p-5 border-b border-slate-700/50">
              <h3 id="bulk-field-modal-title" className="text-lg font-semibold text-white">Set Field for {selectedItems.length} Items</h3>
              <p id="bulk-field-modal-desc" className="text-sm text-slate-400 mt-1">Update a field value across all selected items</p>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Field</label>
                <select
                  value={bulkFieldKey}
                  onChange={(e) => {
                    setBulkFieldKey(e.target.value);
                    setBulkFieldValue('');
                  }}
                  className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none"
                >
                  <option value="">Choose a field...</option>
                  {config.fields.map(field => (
                    <option key={field.key} value={field.key}>{field.label}</option>
                  ))}
                </select>
              </div>
              {bulkFieldKey && (
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">New Value</label>
                  {(() => {
                    const field = config.fields.find(f => f.key === bulkFieldKey);
                    if (!field) return null;

                    if (field.type === 'boolean') {
                      return (
                        <select
                          value={bulkFieldValue ? 'true' : 'false'}
                          onChange={(e) => setBulkFieldValue(e.target.value === 'true')}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none"
                        >
                          <option value="true">Yes / Enabled</option>
                          <option value="false">No / Disabled</option>
                        </select>
                      );
                    }

                    if (field.type === 'select' && field.options) {
                      return (
                        <select
                          value={bulkFieldValue || ''}
                          onChange={(e) => setBulkFieldValue(e.target.value)}
                          className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none"
                        >
                          <option value="">Select an option...</option>
                          {field.options.map((opt) => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      );
                    }

                    return (
                      <input
                        type={field.type === 'number' ? 'number' : 'text'}
                        value={bulkFieldValue || ''}
                        onChange={(e) => setBulkFieldValue(field.type === 'number' && e.target.value ? parseInt(e.target.value) : e.target.value)}
                        placeholder={`Enter ${field.label.toLowerCase()}...`}
                        className="w-full px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 focus:border-violet-500/50 focus:ring-2 focus:ring-violet-500/20 outline-none"
                      />
                    );
                  })()}
                </div>
              )}
            </div>
            <div className="p-5 border-t border-slate-700/50 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowBulkFieldModal(false);
                  setBulkFieldKey('');
                  setBulkFieldValue('');
                }}
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkSetField}
                disabled={!bulkFieldKey || bulkActionLoading}
                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 disabled:from-slate-700 disabled:to-slate-700 text-white rounded-xl text-sm font-medium transition-all"
              >
                {bulkActionLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Apply to All'}
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditing ? (
        // Edit/Create Form
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center`}>
                <Icon className="h-5 w-5 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {editingItem ? `Edit ${config.name.slice(0, -1)}` : `New ${config.name.slice(0, -1)}`}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowPreview(true)}
                className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors"
              >
                <Eye className="h-4 w-4" />
                <span className="text-sm">Preview</span>
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingItem(null);
                  setFormData({});
                }}
                aria-label="Close editor"
                className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {config.fields.map(renderField)}
          </div>

          <div className="p-5 border-t border-slate-700/50 flex items-center justify-end gap-3 bg-slate-800/50">
            <button
              onClick={() => handleSave(false)}
              disabled={isLoading}
              className="px-5 py-2.5 bg-slate-700/80 hover:bg-slate-600/80 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-colors border border-slate-600/50"
            >
              <Save className="h-4 w-4" />
              Save as Draft
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={isLoading}
              className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg shadow-blue-500/20"
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Save & Publish
            </button>
          </div>
        </div>
      ) : (
        // Items List
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50 overflow-hidden">
          {/* Header */}
          <div className={`p-5 border-b border-slate-700/50 bg-gradient-to-r ${config.gradient}/10`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{config.name}</h2>
                  <p className="text-sm text-slate-400">{items.length} items in collection</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={loadItems}
                  disabled={isLoading}
                  aria-label="Refresh items"
                  className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <RefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} aria-hidden="true" />
                </button>
                {items.length > 0 && (
                  <button
                    onClick={toggleBulkMode}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2 transition-all border ${
                      bulkMode
                        ? 'bg-violet-500/20 text-violet-400 border-violet-500/50'
                        : 'bg-slate-700/50 text-slate-300 border-slate-600/50 hover:bg-slate-700'
                    }`}
                  >
                    <CheckSquare className="h-4 w-4" />
                    {bulkMode ? 'Exit Bulk' : 'Bulk Edit'}
                  </button>
                )}
                <button
                  onClick={handleCreate}
                  className={`px-5 py-2.5 bg-gradient-to-r ${config.gradient} text-white rounded-xl text-sm font-medium flex items-center gap-2 transition-all shadow-lg hover:shadow-xl`}
                >
                  <Plus className="h-4 w-4" />
                  Add New
                </button>
              </div>
            </div>
          </div>

          {/* Bulk Action Toolbar */}
          {bulkMode && items.length > 0 && (
            <div className="px-5 py-3 border-b border-slate-700/50 bg-violet-500/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === items.length && items.length > 0}
                    onChange={selectAllItems}
                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-violet-500 focus:ring-violet-500/20"
                  />
                  <span className="text-sm text-slate-300">
                    {selectedItems.length === items.length ? 'Deselect All' : 'Select All'}
                  </span>
                </label>
                {selectedItems.length > 0 && (
                  <span className="text-sm text-violet-400 font-medium">
                    {selectedItems.length} selected
                  </span>
                )}
              </div>
              {selectedItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowBulkFieldModal(true)}
                    disabled={bulkActionLoading}
                    className="px-3 py-1.5 text-sm bg-slate-700/80 hover:bg-slate-600/80 text-slate-200 rounded-lg flex items-center gap-1.5 transition-colors border border-slate-600/50"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    Set Field
                  </button>
                  <button
                    onClick={() => handleBulkPublish(false)}
                    disabled={bulkActionLoading}
                    className="px-3 py-1.5 text-sm bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 rounded-lg flex items-center gap-1.5 transition-colors border border-amber-500/30"
                  >
                    <Save className="h-3.5 w-3.5" />
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleBulkPublish(true)}
                    disabled={bulkActionLoading}
                    className="px-3 py-1.5 text-sm bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 rounded-lg flex items-center gap-1.5 transition-colors border border-emerald-500/30"
                  >
                    <Send className="h-3.5 w-3.5" />
                    Publish
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={bulkActionLoading}
                    className="px-3 py-1.5 text-sm bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg flex items-center gap-1.5 transition-colors border border-rose-500/30"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                  {bulkActionLoading && (
                    <Loader2 className="h-4 w-4 text-violet-400 animate-spin ml-2" />
                  )}
                </div>
              )}
            </div>
          )}

          {/* Items list */}
          {isLoading && items.length === 0 ? (
            <div className="p-16 text-center">
              <Loader2 className="h-10 w-10 text-slate-500 animate-spin mx-auto mb-4" />
              <p className="text-slate-400">Loading items...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="p-16 text-center">
              <div className={`w-20 h-20 bg-gradient-to-br ${config.gradient}/20 rounded-2xl flex items-center justify-center mx-auto mb-5`}>
                <Icon className="h-10 w-10 text-slate-500" />
              </div>
              <h3 className="text-lg font-medium text-white mb-2">No {config.name.toLowerCase()} yet</h3>
              <p className="text-slate-400 mb-6">Get started by creating your first item</p>
              <button
                onClick={handleCreate}
                className={`px-6 py-3 bg-gradient-to-r ${config.gradient} text-white rounded-xl font-medium inline-flex items-center gap-2 shadow-lg`}
              >
                <Sparkles className="h-4 w-4" />
                Create First {config.name.slice(0, -1)}
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-700/50">
              {items.map((item) => {
                const imageUrl = getImageUrl(item.fieldData?.image) || getImageUrl(item.fieldData?.['banner-image']) || getImageUrl(item.fieldData?.['featured-image']) || getImageUrl(item.fieldData?.photo) || getImageUrl(item.fieldData?.thumbnail);
                const subtitle = item.fieldData?.department || item.fieldData?.category || item.fieldData?.type || item.fieldData?.role;
                const location = item.fieldData?.location || item.fieldData?.['office-location'];
                const isSelected = selectedItems.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`p-5 flex items-center justify-between hover:bg-slate-700/20 transition-colors group ${
                      bulkMode && isSelected ? 'bg-violet-500/10' : ''
                    }`}
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {bulkMode && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleItemSelection(item.id)}
                          className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-violet-500 focus:ring-violet-500/20 cursor-pointer flex-shrink-0"
                        />
                      )}
                      {imageUrl ? (
                        <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 border border-slate-700/50">
                          <img
                            src={imageUrl}
                            alt=""
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        </div>
                      ) : (
                        <div className={`w-12 h-12 bg-gradient-to-br ${config.gradient}/20 rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`h-5 w-5 text-${config.color}-400`} />
                        </div>
                      )}
                      <div className="min-w-0 flex-1">
                        <h3 className="font-medium text-white truncate">
                          {item.fieldData?.name || item.fieldData?.title || 'Untitled'}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          {subtitle && <span className="truncate">{subtitle}</span>}
                          {subtitle && location && <span>-</span>}
                          {location && (
                            <span className="truncate flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {location}
                            </span>
                          )}
                          {!subtitle && !location && (
                            <span className="truncate">ID: {item.id.slice(0, 12)}...</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                        item.isDraft
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.isDraft ? 'Draft' : 'Published'}
                      </span>
                      <button
                        onClick={() => handleEdit(item)}
                        aria-label={`Edit ${item.fieldData?.name || item.fieldData?.title || 'item'}`}
                        className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Delete ${item.fieldData?.name || item.fieldData?.title || 'item'}`}
                        className="min-h-[44px] min-w-[44px] p-2.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
