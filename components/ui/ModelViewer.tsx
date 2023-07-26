"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Box } from "lucide-react";
import { useEffect, useState } from "react";

type ModelViewerProps = {
  modelUrl: string;
  modelIframe: string;
};
const ModelViewer = ({ modelUrl, modelIframe }: ModelViewerProps) => {
  const [iframeOn, setIframeOn] = useState("");
  const sketchfabUrl = `https://sketchfab.com/models/${modelUrl}/embed`;
  const lumaUrl = `${modelIframe}`;

  useEffect(() => {
    if (modelUrl.length > 0) {
      setIframeOn(sketchfabUrl);
    } else {
      setIframeOn(lumaUrl);
    }
  }, [modelUrl, modelIframe, sketchfabUrl, lumaUrl]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Box />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <div>
          <iframe
            title="model viewer"
            src={iframeOn}
            width="640"
            height="480"
            allowFullScreen={true}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModelViewer;
