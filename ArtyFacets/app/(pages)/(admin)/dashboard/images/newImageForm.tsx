"use client"
import { Button } from '@/app/ui/components/ui/button';
import { Input } from '@/app/ui/components/ui/input';
import { UploadS3 } from '@/app/utils/s3';
import Image from "next/legacy/image";
import React, { useState } from 'react';

export default function ImagesPageForm() {
    const [selectedImage, setSelectedImage] = useState<any>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setSelectedImage(file || null);
    };

    async function handleSubmit() {
        if (selectedImage) {
            await UploadS3(selectedImage);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='max-w-md'>
            <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input id="picture" type="file" onChange={handleImageChange} accept="image/*" />
            </div>
            {selectedImage && <Image unoptimized={true} src={URL.createObjectURL(selectedImage)} alt="Selected Image" height={450} width={300} />}
            <br />
            <Button type="submit">Submit</Button>
        </form>
    );
}