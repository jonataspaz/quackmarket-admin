"use client";

import * as z from "zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Trash, Upload } from "lucide-react";
import { Model3d } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/Heading";
import { AlertModal } from "@/components/modals/AlertModal";
import UploadModel from "@/components/UploadModel";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { set } from "date-fns";

const formSchema = z.object({
  label: z.string().min(1),
  url: z.string(),
  iframeUrl: z.string(),
});

type Model3dFormValues = z.infer<typeof formSchema>;

interface Model3dFormProps {
  initialData: Model3d | null;
}

export const Model3dForm: React.FC<Model3dFormProps> = ({ initialData }) => {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [uploadModelDisplay, setUploadModelDisplay] = useState(false);
  const [iframeDisplay, setIframeDisplay] = useState(false);

  const toastMessage = initialData ? "Model 3D updated." : "Model 3D created.";
  const action = initialData ? "Save changes" : "Create";

  useEffect(() => {
    setLoading(true);
  }, []);

  const form = useForm<Model3dFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: "",
      url: "",
      iframeUrl: "",
    },
  });

  const verifyUrls = (iframeUrl: string, url: string) => {
    if (url.length && iframeUrl.length) {
      toast.error('Just one input is allowed: "URL" or "Iframe URL".');
      throw new Error('Just one input is allowed: "URL" or "Iframe URL".');
    }

    if (iframeUrl.length === 0) return true;
    if (
      iframeUrl.startsWith("https://lumalabs.ai/") ||
      iframeUrl.startsWith("https://sketchfab.com/")
    ) {
      return true;
    } else {
      toast.error(
        'Invalid URL: The URL must start with "https://lumalabs.ai/" or "https://sketchfab.com/".'
      );
      throw new Error(
        'Invalid URL: The URL must start with "https://lumalabs.ai/" or "https://sketchfab.com/".'
      );
    }
  };

  const onSubmit = async (data: Model3dFormValues) => {
    try {
      verifyUrls(data.iframeUrl, data.url);

      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.sellerId}/models3d/${params.model3dId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.sellerId}/models3d`, data);
      }
      router.refresh();
      router.push(`/${params.sellerId}/models3d`);
      toast.success(toastMessage);
    } catch (error: any) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleUploadComplete = (modelId: any) => {
    console.log("modelId", modelId);
    form.setValue("url", modelId);
  };

  const handleUploadStatusChange = (status: boolean) => {
    setLoading(status);
  };

  const handleUploadModelDisplay = () => {
    setUploadModelDisplay(!uploadModelDisplay);
    if (uploadModelDisplay) setLoading(false);
    if (!uploadModelDisplay) setLoading(true);
  };

  const handleiframeDisplay = () => {
    setIframeDisplay(true);
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <Button
          disabled={uploadModelDisplay}
          onClick={handleUploadModelDisplay}
        >
          Upload a 3D file
        </Button>
        <Button
          disabled={!uploadModelDisplay}
          onClick={handleUploadModelDisplay}
        >
          Iframe source link
        </Button>
      </div>
      <Separator />

      <div>
        {uploadModelDisplay ? (
          <UploadModel
            onUploadComplete={handleUploadComplete}
            onUploadStatusChange={handleUploadStatusChange}
          />
        ) : (
          "Upload using Iframe source link"
        )}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Model 3D Label"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="hidden">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Model 3D URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {!uploadModelDisplay ? (
              <FormField
                control={form.control}
                name="iframeUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Iframe URL</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="Iframe URL"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ) : (
              <div></div>
            )}
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
