'use client';

import { useState, useRef } from 'react';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  disabled?: boolean;
}

export default function ImageUpload({ value, onChange, disabled }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string>(value || '');
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    await processFile(file);
  };

  const processFile = async (file: File) => {
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
    if (!allowedTypes.includes(file.type)) {
      alert('Invalid file type. Only JPEG, PNG, WebP, and SVG are allowed.');
      return;
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert('File too large. Maximum size is 5MB.');
      return;
    }

    setUploading(true);

    try {
      // Create preview
      const previewUrl = URL.createObjectURL(file);
      setPreview(previewUrl);

      // Upload file
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Upload failed');
      }

      // Clean up preview URL
      URL.revokeObjectURL(previewUrl);
      
      // Set the uploaded image URL
      setPreview(result.url);
      onChange(result.url);

    } catch (error) {
      console.error('Upload error:', error);
      alert(error instanceof Error ? error.message : 'Failed to upload image');
      setPreview(value || '');
    } finally {
      setUploading(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled && !uploading) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragOver(false);

    if (disabled || uploading) return;

    const files = event.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      await processFile(file);
    }
  };

  const handleRemove = () => {
    setPreview('');
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleClick = () => {
    if (!disabled && !uploading) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Product Image
      </label>
      
      <div className="flex items-start space-x-4">
        {/* Upload Area */}
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all duration-200
            ${uploading || disabled 
              ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
              : isDragOver
                ? 'border-blue-500 bg-blue-50 scale-102'
                : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
            }
            ${preview ? 'w-32 h-32' : 'w-full min-h-[120px]'}
          `}
        >
          {uploading ? (
            <div className="flex flex-col items-center justify-center h-full">
              <Loader2 className="w-8 h-8 text-blue-500 animate-spin mb-2" />
              <p className="text-sm text-gray-500">Uploading...</p>
            </div>
          ) : preview ? (
            <div className="relative w-full h-full">
              <Image
                src={preview}
                alt="Preview"
                fill
                className="object-cover rounded-md"
                sizes="128px"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove();
                }}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                disabled={disabled}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <Upload className={`w-8 h-8 mb-2 transition-colors ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
              <p className={`text-sm mb-1 transition-colors ${isDragOver ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>
                {isDragOver ? 'Drop image here' : 'Click or drag to upload'}
              </p>
              <p className="text-xs text-gray-500">PNG, JPG, WebP or SVG (max 5MB)</p>
            </div>
          )}
        </div>

        {/* Image Info */}
        {preview && !uploading && (
          <div className="flex-1 min-w-0">
            <div className="flex items-start space-x-3">
              <ImageIcon className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  Image uploaded successfully
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {preview}
                </p>
                <div className="mt-2">
                  <button
                    type="button"
                    onClick={handleClick}
                    className="text-xs text-blue-600 hover:text-blue-700"
                    disabled={disabled || uploading}
                  >
                    Change image
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={disabled || uploading}
      />
    </div>
  );
}
