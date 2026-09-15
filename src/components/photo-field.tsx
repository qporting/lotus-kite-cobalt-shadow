import { Camera, ImagePlus, X } from "lucide-react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { compressImage } from "@/lib/photo";

export function PhotoField({
  value,
  onChange,
}: {
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    try {
      const data = await compressImage(file);
      onChange(data);
    } catch {
      /* ignore unreadable files */
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Photo</p>
      {value ? (
        <div className="relative overflow-hidden rounded-xl bg-muted">
          <img src={value} alt="Stored location" className="max-h-64 w-full object-cover" />
          <Button
            type="button"
            size="icon-sm"
            variant="secondary"
            className="absolute top-2 right-2"
            onClick={() => onChange(null)}
            aria-label="Remove photo"
          >
            <X className="size-4" />
          </Button>
        </div>
      ) : (
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => cameraRef.current?.click()}
          >
            <Camera className="size-4" />
            Camera
          </Button>
          <Button
            type="button"
            variant="outline"
            className="flex-1"
            onClick={() => fileRef.current?.click()}
          >
            <ImagePlus className="size-4" />
            Library
          </Button>
        </div>
      )}
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        capture="environment"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          void handleFiles(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}
