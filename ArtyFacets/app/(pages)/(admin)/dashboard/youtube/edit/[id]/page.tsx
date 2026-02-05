import { GetYoutube } from "@/app/lib/students"
import YoutubeLinkForm from "../../form"

export default async function Edit({params}: {params: any}){
    const data = await GetYoutube(params.id.toString()) 
    if(data != undefined)
    return (
        <YoutubeLinkForm Youtube={{_id: data._id.toString(), title: data.title, link: data.link}} />
    )
    
}