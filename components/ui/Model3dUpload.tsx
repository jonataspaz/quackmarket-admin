"use client";

import { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import FormData from "form-data";

import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";

interface ModelUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  value: string[];
}

const ModelUpload: React.FC<ModelUploadProps> = ({
  disabled,
  onChange,
  value,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("modelFile", file);
    formData.append("name", file.name);

    const response = await axios.post(
      "https://api.sketchfab.com/v3/models",
      formData,
      {
        headers: {
          Authorization: `Token ${process.env.NEXT_PUBLIC_SKETCHFAB_TOKEN}`,
        },
      }
    );

    if (response.data && response.data.uid) {
      onChange(response.data.uid);
    }
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4">
        {value.map((modelId) => (
          <div key={modelId}>
            <p>Model ID: {modelId}</p>
            <a
              href={`https://sketchfab.com/models/${modelId}`}
              target="_blank"
              rel="noreferrer"
            >
              View on Sketchfab
            </a>
          </div>
        ))}
      </div>
      <input type="file" onChange={handleFileChange} />
      <Button
        type="button"
        disabled={disabled}
        variant="secondary"
        onClick={handleUpload}
      >
        <ImagePlus className="h-4 w-4 mr-2" />
        Upload a Model
      </Button>
    </div>
  );
};

export default ModelUpload;
