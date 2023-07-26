"use client";
import React, { useState } from "react";
import axios from "axios";

const VideoUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadResponse, setUploadResponse] = useState<any>(null);
  const API_KEY =
    "u_YD_TsWwOiP77Q.cudtaRvK8HSqCQkPSVfc7KQuIPVGS1juiKTe45apGAuRQ"; // replace with your API key
  const baseURL = "https://api.3dpresso.ai/prod/api/v2/task";

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleUpload = async () => {
    if (file) {
      const fileSize = file.size;

      const params = {
        engineName: "video_to_3d",
        fileName: file.name,
        fileSize: fileSize,
        description: "uploading a video for 3d model conversion",
      };

      const config = {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      };

      const response = await axios.put(baseURL, params, config);
      if (response.data) {
        setUploadResponse(response.data);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {uploadResponse && (
        <p>
          Upload successful, saved response: {JSON.stringify(uploadResponse)}
        </p>
      )}
    </div>
  );
};

export default VideoUpload;
