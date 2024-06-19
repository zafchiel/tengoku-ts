import { ProgressRecordType } from "@/lib/server/db/schema";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

type EditSeriesCardProps = {
  progressInfo: ProgressRecordType;
};

export default function EditSeriesCard({ progressInfo }: EditSeriesCardProps) {
  return (
    <></>
    // <Card className="w-full max-w-md">
    //   <CardContent className="grid grid-cols-[100px_1fr] gap-4 p-4">
    //     <img src="/placeholder.svg" alt="Series Thumbnail" className="rounded-md" />
    //     <div className="space-y-2">
    //       <div>
    //         <h3 className="text-lg font-medium">Breaking Bad</h3>
    //         <p className="text-sm text-muted-foreground">Season 5, Episode 7</p>
    //       </div>
    //       <Progress value={75} className="w-full" />
    //       <div className="flex items-center justify-between">
    //         <Button variant="outline" size="sm">
    //           <ArrowLeftIcon className="w-4 h-4 mr-2" />
    //           Previous
    //         </Button>
    //         <Button variant="outline" size="sm">
    //           Next
    //           <ArrowRightIcon className="w-4 h-4 ml-2" />
    //         </Button>
    //         <Button variant="ghost" size="sm">
    //           <RefreshCwIcon className="w-4 h-4" />
    //         </Button>
    //         <Button variant="ghost" size="sm">
    //           <FilePenIcon className="w-4 h-4" />
    //           Edit
    //         </Button>
    //       </div>
    //     </div>
    //   </CardContent>
    // </Card>
  );
}
