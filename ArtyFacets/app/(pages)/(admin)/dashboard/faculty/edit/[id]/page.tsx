import { GetFaculty } from "@/app/lib/students"
import FacultyLinkForm from "../../form"
import { redirect } from "next/navigation"

export default async function Edit({params}: {params: any}){
    const data = await GetFaculty(params.id.toString()) 
    if(data != undefined)
    return (
        <FacultyLinkForm Faculty={{_id: data._id.toString(), name: data.name, image: data.image, role: data.role, bio: data.bio}} />
    )
    
    redirect('/')
    
}