import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsCommand } from "@aws-sdk/client-s3";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: "AKIA6GBMDO6PFORHRRM2",
        secretAccessKey: "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",
    }
});

export async function UploadS3(mainImg: any) {
    try{
        if (mainImg) {
            const name = `Image:AF-${new Date().valueOf()}.JPG`
            const command = new PutObjectCommand({
                Bucket: "arty-facet-web",
                Key: name,
                Body: await mainImg.arrayBuffer(),
            });
            try {
                await client.send(command);
                revalidatePath('/dashboard/images')
                redirect('/dashboard/images')
            } catch (err) {
                console.log(err)
                return 
            }
        }
    } catch (error) {
        return mainImg
    }
}

export async function GetS3(){
    const command = new ListObjectsCommand({
        Bucket: "arty-facet-web",
    });
    try {
        const response = await client.send(command);
        return response.Contents
    } catch (err) {
        console.error(err);
    }
}

export async function DeleteS3(key: string){
    const command = new DeleteObjectCommand({
        Bucket: "arty-facet-web",  
        Key: key,
    });
    try {
        await client.send(command);
        revalidatePath('/dashboard/images')
        redirect('/dashboard/images')
    } catch (err) {
        console.error(err);
    }
}