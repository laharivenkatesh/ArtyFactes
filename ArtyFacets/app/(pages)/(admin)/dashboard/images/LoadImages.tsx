import { GetS3 } from "@/app/utils/s3";
import { AlertDialogDemo } from "./alert";

export default async function ImagesAWS({ content }: { content?: any }) {
    var data
    if (!content) {
        data = await GetS3()
    } else {
        data = content
    }

    return (
        <div className="grid lg:grid-cols-3 grid-cols-1 ">
            {data?.map((im: any) => {
                return (
                    <>
                        {im.Key ? <AlertDialogDemo link={im.Key} /> : null}
                    </>
                )
            })}
        </div>
    )
}