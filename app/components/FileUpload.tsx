"use client"; // This component must be a client component

import { upload } from "@imagekit/next";
import { useState, useRef } from "react";
import { UploadCloud, Loader2, FileVideo, Image as ImageIcon } from "lucide-react";

interface FileUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSuccess: (res: any) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

const FileUpload = ({ onSuccess, onProgress, fileType }: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  //optional validation
  const validateFile = (file: File) => {
    if (fileType === "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please upload a valid video file");
        return false;
      }
    }
    if (file.size > 100 * 1024 * 1024) {
      setError("File size must be less than 100 MB");
      return false;
    }
    return true;
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file || !validateFile(file)) return;

    setUploading(true);
    setError(null);
    setProgress(0);

    try {
      const authRes = await fetch("/api/auth/imagekit-auth");
      const auth = await authRes.json();

      const res = await upload({
        file,
        fileName: file.name,
        publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
        signature: auth.signature,
        expire: auth.expire,
        token: auth.token,
        onProgress: (event) => {
          if (event.lengthComputable) {
            const percent = Math.round((event.loaded / event.total) * 100);
            setProgress(percent);
            if (onProgress) onProgress(percent);
          }
        },
      });
      onSuccess(res);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Upload failed", err);
      setError("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div 
        onClick={() => !uploading && inputRef.current?.click()}
        className={`relative group cursor-pointer border-2 border-dashed rounded-2xl p-8 transition-all duration-300 flex flex-col items-center justify-center text-center
          ${error ? 'border-red-500/50 bg-red-500/5' : 'border-white/10 hover:border-cyan-500/50 bg-white/5 hover:bg-white/10'}
          ${uploading ? 'pointer-events-none opacity-80' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={fileType === "video" ? "video/*" : "image/*"}
          onChange={handleFileChange}
          className="hidden"
        />

        {uploading ? (
          <div className="flex flex-col items-center max-w-xs w-full">
            <Loader2 className="h-12 w-12 text-cyan-400 animate-spin mb-4" />
            <div className="w-full bg-black/40 rounded-full h-2 mb-2 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-cyan-500 to-violet-500 h-2 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-slate-300 font-medium">Uploading... {progress}%</p>
          </div>
        ) : (
          <>
            <div className="bg-white/5 p-4 rounded-full mb-4 group-hover:scale-110 group-hover:bg-cyan-500/10 transition-all duration-300">
              {fileType === "video" ? (
                <FileVideo className="h-10 w-10 text-cyan-400" />
              ) : fileType === "image" ? (
                <ImageIcon className="h-10 w-10 text-cyan-400" />
              ) : (
                <UploadCloud className="h-10 w-10 text-cyan-400" />
              )}
            </div>
            <h3 className="text-lg font-semibold text-white mb-1">
              Click to upload {fileType ? fileType : "file"}
            </h3>
            <p className="text-sm text-slate-400">
              Maximum file size: 100 MB
            </p>
          </>
        )}
      </div>

      {error && (
        <div className="mt-4 bg-red-500/10 border border-red-500/30 text-red-500 text-sm px-4 py-3 rounded-xl flex items-center justify-between">
          <p>{error}</p>
          <button onClick={() => setError(null)} className="text-red-500 hover:text-white transition-colors">
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;