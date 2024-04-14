import { Pencil } from "lucide-react";
import { Separator } from "../ui/separator";
import Image from "next/image";
import { InfoModal } from "./info-modal";

interface Props {
  hostIdentity: string;
  viewerIdentity: string;
  thumbnailUrl: string | null;
  name: string;
}

export const InfoCard = ({
  hostIdentity,
  viewerIdentity,
  thumbnailUrl,
  name,
}: Props) => {
  const hostAsViewer = `host-${hostIdentity}`;
  const isHost = viewerIdentity === hostAsViewer;

  if (!isHost) return null;
  return (
    <div className="px-4">
      <div className="rounded-xl bg-background">
        <div className="flex items-center p-4 gap-x-2.5">
          <div className="rounded-md p-2 h-auto w-auto bg-blue-600">
            <Pencil className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-sm lg:text-lg font-semibold capitalize">
              Edit your stream info
            </h2>
            <p className="text-xs text-muted-foreground lg:text-sm">
              Maximize your visibility
            </p>
          </div>
          <InfoModal initialName={name} initialThumbnail={thumbnailUrl} />
        </div>
        <Separator />
        <div className="p-4 lg:p-6 space-y-4">
          <div>
            <div className="text-sm text-muted-foreground mb-2">Name</div>
            <p className="text-sm font-semibold">{name}</p>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-2">Thumbnail</div>
            {thumbnailUrl && (
              <div className="relative aspect-video rounded-md overflow-hidden border border-white/10 w-[200px]">
                <Image
                  className="object-cover"
                  fill
                  alt={name}
                  src={thumbnailUrl}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
