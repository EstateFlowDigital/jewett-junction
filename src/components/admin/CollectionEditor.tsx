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
  CheckCircle2,
  AlertCircle,
  Loader2,
  Upload,
  ImagePlus,
  CheckSquare,
  Eye,
  Copy,
  Megaphone,
  Link,
  Image,
  Users,
  MapPin,
  Sparkles,
} from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import type { FieldConfig, CollectionConfig } from './collections';
import { ICON_MAP, getIcon } from './icon-map';

const API_BASE = '/jewett-junction';

// Re-export types for backward compatibility
export type { FieldConfig, CollectionConfig };

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
  const [assetFileIds, setAssetFileIds] = React.useState<Record<string, string>>({});

  // Preview state
  const [showPreview, setShowPreview] = React.useState(false);

  // Bulk edit state
  const [bulkMode, setBulkMode] = React.useState(false);
  const [selectedItems, setSelectedItems] = React.useState<string[]>([]);
  const [bulkActionLoading, setBulkActionLoading] = React.useState(false);
  const [showBulkFieldModal, setShowBulkFieldModal] = React.useState(false);
  const [bulkFieldKey, setBulkFieldKey] = React.useState('');
  const [bulkFieldValue, setBulkFieldValue] = React.useState<any>('');

  const Icon = getIcon(config.icon) || Megaphone;

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
    const fileIds: Record<string, string> = {};
    config.fields.forEach(field => {
      if ((field.type === 'image' || field.type === 'file') && normalized[field.key]) {
        const val = normalized[field.key];
        if (typeof val === 'object' && val.fileId) {
          fileIds[field.key] = val.fileId;
        }
        normalized[field.key] = getImageUrl(val);
      }
      if (field.type === 'multi-image' && Array.isArray(normalized[field.key])) {
        // Normalize to array of { fileId, url, alt } so the editor can render thumbnails
        // and preserves accessibility alt text through save (was previously dropped).
        normalized[field.key] = normalized[field.key].map((item: any) => {
          if (typeof item === 'string') return { url: item };
          return { fileId: item?.fileId, url: item?.url, alt: item?.alt ?? null };
        });
      }
    });
    if (Object.keys(fileIds).length > 0) {
      setAssetFileIds(prev => ({ ...prev, ...fileIds }));
    }
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
    setAssetFileIds({});
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

    // Client-side required field validation
    const missingFields = config.fields
      .filter(f => f.required && (!formData[f.key] || formData[f.key].toString().trim() === ''))
      .map(f => f.label);

    if (missingFields.length > 0) {
      setError(`Required fields missing: ${missingFields.join(', ')}`);
      setIsLoading(false);
      return;
    }

    try {
      // Process asset fields: replace URLs with fileIds for Webflow API.
      // Webflow Image/File fields require a fileId (returned from the upload
      // endpoint), not a CDN URL — sending a URL silently drops the field
      // ("logo disappears after save"). Detect that mismatch and surface it.
      const processedFields = { ...formData };
      const orphanedImageFields: string[] = [];
      config.fields.forEach(field => {
        if ((field.type === 'image' || field.type === 'file') && processedFields[field.key]) {
          if (assetFileIds[field.key]) {
            // Send full { fileId, url } object — bare fileId strings get
            // silently dropped by Webflow's per-item PATCH on Image fields,
            // which is what was causing the 'logo disappears after save' bug.
            const url = typeof processedFields[field.key] === 'string'
              ? processedFields[field.key]
              : processedFields[field.key]?.url;
            processedFields[field.key] = url
              ? { fileId: assetFileIds[field.key], url, alt: null }
              : { fileId: assetFileIds[field.key] };
          } else if (typeof processedFields[field.key] === 'string' && /^https?:\/\//.test(processedFields[field.key])) {
            orphanedImageFields.push(field.label);
          }
        }
        if (field.type === 'multi-image' && Array.isArray(processedFields[field.key])) {
          // Send full { fileId, url, alt } objects so Webflow preserves the alt text
          // for each image. Passing bare fileId strings wipes alt on every save.
          processedFields[field.key] = processedFields[field.key]
            .map((item: any) => {
              if (typeof item === 'string') return { fileId: item };
              if (!item?.fileId) return null;
              return { fileId: item.fileId, url: item.url, alt: item.alt ?? null };
            })
            .filter(Boolean);
        }
      });
      if (orphanedImageFields.length > 0) {
        setError(`These image fields need to be re-uploaded (URL pasted instead of an upload won't save): ${orphanedImageFields.join(', ')}`);
        setIsLoading(false);
        return;
      }

      const method = editingItem ? 'PATCH' : 'POST';
      const body: any = {
        collection: collectionKey,
        fields: processedFields,
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

      if (data.publishWarning) {
        setError(data.publishWarning);
      } else {
        setSuccess(editingItem ? (publishLive ? 'Item updated & published!' : 'Item updated!') : (publishLive ? 'Item created & published!' : 'Item saved as draft'));
      }
      setIsEditing(false);
      setEditingItem(null);
      setFormData({});
      setAssetFileIds({});
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

  // Handle file upload (images + PDFs)
  const handleFileUpload = async (file: File, fieldKey: string) => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const allowedTypes = [...imageTypes, 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      setError('Invalid file type. Allowed: JPEG, PNG, GIF, WebP, SVG, PDF');
      return;
    }

    const isPdf = file.type === 'application/pdf';
    const maxSize = isPdf ? 5 * 1024 * 1024 : 4 * 1024 * 1024; // 5MB PDF, 4MB images
    if (file.size > maxSize) {
      const kb = Math.round(maxSize / 1024);
      setError(`File too large. Maximum size is ${kb} KB for ${isPdf ? 'PDFs' : 'images'}.`);
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
      if (data.id) {
        setAssetFileIds(prev => ({ ...prev, [fieldKey]: data.id }));
      }
      setSuccess(`${isPdf ? 'PDF' : 'Image'} uploaded successfully!`);

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

  // Multi-image: upload many files, append to the existing array for the field.
  const MULTI_IMAGE_MAX = 25;
  const handleMultiImageUpload = async (files: FileList | File[], fieldKey: string) => {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'];
    const maxSize = 4 * 1024 * 1024;
    const current: any[] = Array.isArray(formData[fieldKey]) ? formData[fieldKey] : [];
    const remaining = MULTI_IMAGE_MAX - current.length;
    if (remaining <= 0) {
      setError(`Already at ${MULTI_IMAGE_MAX}-image limit for ${fieldKey}. Remove some before adding more.`);
      return;
    }
    const incoming = Array.from(files).slice(0, remaining);
    const rejected: string[] = [];
    const accepted: File[] = [];
    for (const f of incoming) {
      if (!imageTypes.includes(f.type)) {
        rejected.push(`${f.name} (unsupported type)`);
        continue;
      }
      if (f.size > maxSize) {
        rejected.push(`${f.name} (over 4 MB)`);
        continue;
      }
      accepted.push(f);
    }
    if (rejected.length > 0) {
      setError(`Skipped: ${rejected.slice(0, 3).join(', ')}${rejected.length > 3 ? `, +${rejected.length - 3} more` : ''}`);
    }
    if (accepted.length === 0) return;

    setUploadingField(fieldKey);
    setUploadProgress(0);
    const uploaded: Array<{ fileId: string; url: string; alt: string | null }> = [];
    for (let i = 0; i < accepted.length; i++) {
      const file = accepted[i];
      try {
        const buf = await file.arrayBuffer();
        const base64 = btoa(new Uint8Array(buf).reduce((s, b) => s + String.fromCharCode(b), ''));
        const res = await fetch(`${API_BASE}/api/admin/upload`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${getToken()}`,
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
          body: JSON.stringify({ fileName: file.name, fileType: file.type, fileSize: file.size, fileData: base64 }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Upload failed');
        if (data.url && data.id) uploaded.push({ fileId: data.id, url: data.url, alt: null });
      } catch (err: any) {
        setError(`Upload failed for ${file.name}: ${err?.message || 'Unknown error'}`);
      }
      setUploadProgress(Math.round(((i + 1) / accepted.length) * 100));
    }
    const next = [...current, ...uploaded];
    setFormData({ ...formData, [fieldKey]: next });
    setUploadingField(null);
    setUploadProgress(0);
    if (uploaded.length > 0) setSuccess(`Added ${uploaded.length} image${uploaded.length === 1 ? '' : 's'}.`);
  };

  const removeMultiImageAt = (fieldKey: string, index: number) => {
    const current: any[] = Array.isArray(formData[fieldKey]) ? formData[fieldKey] : [];
    const next = current.filter((_, i) => i !== index);
    setFormData({ ...formData, [fieldKey]: next });
  };

  const reorderMultiImage = (fieldKey: string, from: number, to: number) => {
    const current: any[] = Array.isArray(formData[fieldKey]) ? formData[fieldKey] : [];
    if (from === to || to < 0 || to >= current.length) return;
    const next = [...current];
    const [moved] = next.splice(from, 1);
    next.splice(to, 0, moved);
    setFormData({ ...formData, [fieldKey]: next });
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
    const FieldIcon = getIcon(field.icon);
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
                    onClick={() => {
                      setFormData({ ...formData, [field.key]: '' });
                      setAssetFileIds((prev) => {
                        const next = { ...prev };
                        delete next[field.key];
                        return next;
                      });
                    }}
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
                      JPEG, PNG, GIF, WebP, SVG - Max 4 MB
                    </p>
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Multi-image gallery field */}
        {field.type === 'multi-image' && (() => {
          const items: any[] = Array.isArray(formData[field.key]) ? formData[field.key] : [];
          const inputId = `multi-${field.key}`;
          const isUploading = uploadingField === field.key;
          return (
            <div className="space-y-3">
              <input
                id={inputId}
                type="file"
                accept="image/jpeg,image/png,image/gif,image/webp,image/svg+xml"
                multiple
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files.length > 0) {
                    handleMultiImageUpload(e.target.files, field.key);
                    e.target.value = '';
                  }
                }}
              />
              <div
                onDrop={(e) => {
                  e.preventDefault();
                  setDragOverField(null);
                  if (e.dataTransfer.files.length > 0) handleMultiImageUpload(e.dataTransfer.files, field.key);
                }}
                onDragOver={(e) => { e.preventDefault(); setDragOverField(field.key); }}
                onDragLeave={() => setDragOverField(null)}
                className={`relative border-2 border-dashed rounded-xl p-5 transition-all ${
                  dragOverField === field.key ? 'border-blue-500 bg-blue-500/10' : 'border-slate-600/50 hover:border-slate-500 bg-slate-900/30'
                } ${isUploading ? 'pointer-events-none' : ''}`}
              >
                {isUploading ? (
                  <div className="text-center">
                    <Loader2 className="h-10 w-10 text-blue-400 animate-spin mx-auto mb-3" />
                    <p className="text-sm text-white font-medium mb-2">Uploading… {uploadProgress}%</p>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 transition-all" style={{ width: `${uploadProgress}%` }} />
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <ImagePlus className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                    <p className="text-sm text-white font-medium mb-1">
                      Drag &amp; drop images here, or{' '}
                      <label htmlFor={inputId} className="text-blue-400 hover:text-blue-300 underline cursor-pointer">browse</label>
                    </p>
                    <p className="text-xs text-slate-500">
                      {items.length}/{MULTI_IMAGE_MAX} images • Max 4&nbsp;MB each • JPEG, PNG, GIF, WebP, SVG
                    </p>
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.map((item: any, i: number) => {
                    const url = typeof item === 'string' ? item : item?.url;
                    return (
                      <div key={`${url}-${i}`} className="group relative aspect-square rounded-xl overflow-hidden border border-slate-700/50 bg-slate-800">
                        {url ? (
                          <img src={url} alt={`${field.label} ${i + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-500 text-xs">No preview</div>
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-end justify-between p-1.5 opacity-0 group-hover:opacity-100">
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => reorderMultiImage(field.key, i, i - 1)}
                              disabled={i === 0}
                              aria-label="Move left"
                              className="w-7 h-7 bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 text-white rounded-md flex items-center justify-center text-xs"
                            >
                              ‹
                            </button>
                            <button
                              type="button"
                              onClick={() => reorderMultiImage(field.key, i, i + 1)}
                              disabled={i === items.length - 1}
                              aria-label="Move right"
                              className="w-7 h-7 bg-slate-900/80 hover:bg-slate-800 disabled:opacity-30 text-white rounded-md flex items-center justify-center text-xs"
                            >
                              ›
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeMultiImageAt(field.key, i)}
                            aria-label="Remove image"
                            className="w-7 h-7 bg-rose-600 hover:bg-rose-500 text-white rounded-md flex items-center justify-center"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <div className="absolute top-1 left-1 bg-slate-900/80 text-white text-[10px] font-medium rounded px-1.5 py-0.5">
                          {i + 1}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {field.helpText && <p className="text-xs text-slate-500">{field.helpText}</p>}
            </div>
          );
        })()}

        {/* File (PDF) field */}
        {field.type === 'file' && (() => {
          const fileUrl = getImageUrl(formData[field.key]);
          return (
            <div className="space-y-3">
              <input
                type="file"
                accept="application/pdf"
                id={`file-${field.key}`}
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFileUpload(f, field.key);
                  e.target.value = '';
                }}
              />
              {fileUrl ? (
                <div className="border border-slate-700/50 rounded-xl overflow-hidden bg-slate-900/50">
                  <iframe
                    src={fileUrl}
                    title={field.label}
                    className="w-full h-64 bg-slate-950"
                  />
                  <div className="p-3 bg-slate-900/80 border-t border-slate-700/50 flex items-center gap-2 flex-wrap">
                    <a
                      href={fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white rounded-lg text-xs font-medium transition-all shadow-lg shadow-blue-500/20"
                    >
                      Download
                    </a>
                    <label
                      htmlFor={`file-${field.key}`}
                      className="px-3 py-2 border border-slate-600/50 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg text-xs font-medium text-slate-300 cursor-pointer transition-colors"
                    >
                      Replace
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, [field.key]: '' });
                        setAssetFileIds((prev) => {
                          const next = { ...prev };
                          delete next[field.key];
                          return next;
                        });
                      }}
                      className="px-3 py-2 bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium rounded-lg transition-colors flex items-center gap-1"
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
                    <label
                      htmlFor={`file-${field.key}`}
                      className="flex flex-col items-center justify-center gap-2 cursor-pointer"
                    >
                      <div className="w-14 h-14 bg-slate-800 rounded-xl flex items-center justify-center mb-1 border border-slate-700">
                        <Upload className="h-7 w-7 text-slate-400" />
                      </div>
                      <p className="text-sm text-white font-medium">Upload PDF</p>
                      <p className="text-xs text-slate-500">Drag & drop or click to browse (max 5 MB)</p>
                    </label>
                  )}
                </div>
              )}
            </div>
          );
        })()}

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

        {/* Color picker — stores hex string (#RRGGBB) */}
        {field.type === 'color' && (() => {
          const raw = (formData[field.key] || '').toString();
          const hex = /^#[0-9a-fA-F]{6}$/.test(raw) ? raw : '#3b82f6';
          return (
            <div className="flex items-center gap-3">
              <input
                id={fieldId}
                type="color"
                value={hex}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                aria-label={field.label}
                className="h-12 w-16 rounded-lg border border-slate-600/50 bg-slate-900/50 cursor-pointer p-1"
              />
              <input
                type="text"
                value={raw}
                onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                placeholder="#3b82f6"
                pattern="^#[0-9a-fA-F]{6}$"
                className="flex-1 px-4 py-2.5 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder:text-slate-500 font-mono focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 focus-visible:outline-none transition-all"
              />
              {raw && (
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, [field.key]: '' })}
                  className="px-3 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          );
        })()}

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
              <option key={opt} value={opt}>{opt}</option>
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
          <div className="bg-slate-900 rounded-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden shadow-2xl border border-slate-700/50">
            <div className="p-4 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5 text-slate-300" aria-hidden="true" />
                <h2 id="preview-modal-title" className="text-lg font-semibold text-white">
                  Preview: {formData.name || 'Untitled'}
                </h2>
              </div>
              <button
                onClick={() => setShowPreview(false)}
                aria-label="Close preview"
                className="min-h-[44px] min-w-[44px] p-2 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)] bg-slate-900 space-y-5">
              {formData.name && (
                <h1 className="text-2xl font-bold text-white border-b border-slate-700/50 pb-3">{formData.name}</h1>
              )}
              {config.fields.filter((f) => f.key !== 'name').map((field) => {
                const raw = formData[field.key];
                // Normalize: Webflow asset objects → .url; arrays of assets → array of urls
                let value: any = raw;
                if (Array.isArray(raw)) {
                  value = raw.map((v: any) => (typeof v === 'object' && v?.url ? v.url : v));
                } else if (typeof raw === 'object' && raw !== null && 'url' in raw) {
                  value = (raw as any).url;
                }
                const isEmpty = value === undefined || value === null || value === '' || (Array.isArray(value) && value.length === 0);
                if (isEmpty) return null;

                const label = <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1">{field.label}</div>;

                if (field.type === 'image') {
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50 p-3">
                        <img src={String(value)} alt={field.label} className="max-w-full max-h-[400px] object-contain mx-auto rounded-lg" />
                      </div>
                    </div>
                  );
                }

                if (field.type === 'multi-image' && Array.isArray(value)) {
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {value.map((url: string, i: number) => (
                          <div key={i} className="aspect-square rounded-lg overflow-hidden bg-slate-800/50 border border-slate-700/50">
                            <img src={url} alt={`${field.label} ${i + 1}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                      <div className="text-xs text-slate-500 mt-1">{value.length} image{value.length === 1 ? '' : 's'}</div>
                    </div>
                  );
                }

                if (field.type === 'file') {
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="rounded-xl overflow-hidden bg-slate-800/50 border border-slate-700/50">
                        <iframe src={String(value)} title={field.label} className="w-full h-80 bg-slate-950" />
                        <div className="p-3 border-t border-slate-700/50">
                          <a href={String(value)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium text-sm">
                            <Link className="h-4 w-4" /> Open in new tab
                          </a>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (field.type === 'richtext') {
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="prose prose-invert max-w-none border border-slate-700/50 rounded-xl p-4 bg-slate-800/30 [&_h1]:text-white [&_h2]:text-white [&_h3]:text-white [&_p]:text-slate-200 [&_a]:text-blue-400 [&_ul]:text-slate-200 [&_ol]:text-slate-200" dangerouslySetInnerHTML={{ __html: String(value) }} />
                    </div>
                  );
                }

                if (field.type === 'url') {
                  return (
                    <div key={field.key}>
                      {label}
                      <a href={String(value)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 underline break-all">
                        <Link className="h-3.5 w-3.5 flex-shrink-0" /> {String(value)}
                      </a>
                    </div>
                  );
                }

                if (field.type === 'email') {
                  return (
                    <div key={field.key}>
                      {label}
                      <a href={`mailto:${value}`} className="text-blue-400 hover:text-blue-300 underline">{String(value)}</a>
                    </div>
                  );
                }

                if (field.type === 'tel') {
                  return (
                    <div key={field.key}>
                      {label}
                      <a href={`tel:${value}`} className="text-blue-400 hover:text-blue-300 underline">{String(value)}</a>
                    </div>
                  );
                }

                if (field.type === 'datetime') {
                  const d = new Date(String(value));
                  const display = isNaN(d.getTime()) ? String(value) : d.toLocaleString('en-US', { dateStyle: 'long', timeStyle: 'short' });
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="text-slate-200">{display}</div>
                    </div>
                  );
                }

                if (field.type === 'boolean') {
                  return (
                    <div key={field.key}>
                      {label}
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${value ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-700/50 text-slate-400 border border-slate-600/50'}`}>
                        {value ? <CheckCircle2 className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5" />}
                        {value ? 'Yes' : 'No'}
                      </span>
                    </div>
                  );
                }

                if (field.type === 'select') {
                  return (
                    <div key={field.key}>
                      {label}
                      <span className="inline-block px-2.5 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30 rounded-full text-xs font-medium">{String(value)}</span>
                    </div>
                  );
                }

                if (field.type === 'textarea') {
                  return (
                    <div key={field.key}>
                      {label}
                      <div className="text-slate-200 whitespace-pre-wrap">{String(value)}</div>
                    </div>
                  );
                }

                return (
                  <div key={field.key}>
                    {label}
                    <div className="text-slate-200 break-words">{String(value)}</div>
                  </div>
                );
              })}
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
        <div className="bg-slate-800/30 backdrop-blur-sm rounded-2xl border border-slate-700/50">
          <div className="p-5 border-b border-slate-700/50 flex items-center justify-between bg-slate-800/50 rounded-t-2xl">
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

          <div className="p-5 border-t border-slate-700/50 flex items-center justify-end gap-3 bg-slate-800/50 rounded-b-2xl">
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
                const f = item.fieldData || {};
                const imageUrl = getImageUrl(f.image)
                  || getImageUrl(f['blog-body-image'])
                  || getImageUrl(f['main-image'])
                  || getImageUrl(f['main-image-file'])
                  || getImageUrl(f['banner-image'])
                  || getImageUrl(f['featured-image'])
                  || getImageUrl(f.photo)
                  || getImageUrl(f.thumbnail)
                  || getImageUrl(f['preview-image'])
                  || getImageUrl(f.icon);
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
                        item.isArchived
                          ? 'bg-slate-500/10 text-slate-400 border border-slate-500/30'
                          : item.isDraft
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.isArchived ? 'Archived' : item.isDraft ? 'Draft' : 'Published'}
                      </span>
                      <button
                        onClick={() => {
                          setFormData(normalizeFieldData(item.fieldData || {}));
                          setShowPreview(true);
                        }}
                        aria-label={`Preview ${item.fieldData?.name || item.fieldData?.title || 'item'}`}
                        title="Preview"
                        className="min-h-[44px] min-w-[44px] p-2.5 inline-flex items-center justify-center text-slate-400 hover:text-amber-400 hover:bg-amber-500/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500"
                      >
                        <Eye className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        aria-label={`Edit ${item.fieldData?.name || item.fieldData?.title || 'item'}`}
                        title="Edit"
                        className="min-h-[44px] min-w-[44px] p-2.5 inline-flex items-center justify-center text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                      >
                        <Edit className="h-4 w-4" aria-hidden="true" />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        aria-label={`Delete ${item.fieldData?.name || item.fieldData?.title || 'item'}`}
                        className="min-h-[44px] min-w-[44px] p-2.5 inline-flex items-center justify-center text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500"
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
