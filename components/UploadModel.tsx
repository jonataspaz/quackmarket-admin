"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import FormData from "form-data";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const UploadModel = ({
  onUploadComplete,
  onUploadStatusChange,
  disabled,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [modelData, setModelData] = useState<any>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

  const handleUpload = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append("modelFile", file);
    formData.append("name", file.name);

    try {
      setLoading(true);
      if (onUploadStatusChange) {
        onUploadStatusChange(true);
      }

      const response = await axios.post(
        "https://api.sketchf.com/v3/models",
        formData,
        {
          headers: {
            Authorization: `Token ${process.env.NEXT_PUBLIC_SKETCHFAB_TOKEN}`,
          },
        }
      );

      setModelData(response.data);
      if (onUploadComplete) {
        onUploadComplete(response.data.uid);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      if (onUploadStatusChange) {
        onUploadStatusChange(false);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleUpload}>
        <Input
          className="mb-2 w-[14rem]"
          type="file"
          onChange={handleFileChange}
        />
        <Button disabled={loading} type="submit">
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </>
  );
};

export default UploadModel;
