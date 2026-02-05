"use server"

import { revalidatePath } from "next/cache"
import { IsAdmin } from "./auth/auth"
import { clidb } from "./data"
import { redirect } from "next/navigation"
import slugify from "slugify";
import { ObjectId } from "mongodb";

export async function PostWorkshop(data : { title: string, markdown: string, mainImg: string, date?: any}) {
    if (await IsAdmin()) {

        const db = await clidb()
        const blogdb = db.collection('workshops')

        const { title, markdown, mainImg } = data
        const slug = slugify(JSON.parse(JSON.stringify(title)), { lower: true, strict: true })
        const up = { title: title, fromdate: new Date(data.date.from).valueOf(), enrolled: [], todate: new Date(data.date.to).valueOf(), markdown: markdown, slug: slug, mainImg: mainImg }
        await blogdb.insertOne(up)

        revalidatePath('/dashboard/workshops')
        revalidatePath('/dashboard')
        revalidatePath('/')
        redirect(`/dashboard`)
    }
}

export async function JoinWorkshop(id : string, user: {name: string, phone: string, email: string}) {
    const db = await clidb()
    const blogdb = db.collection('workshops')

    const workshop = await blogdb.findOne({ _id: new ObjectId(id) })
    if (workshop) {
        const enrolled = workshop.enrolled || []
        if(!enrolled.find((u: any) => u.email === user.email)){
            enrolled.push(user)
            await blogdb.findOneAndUpdate({ _id: new ObjectId(id) }, { $set: { enrolled: enrolled } })
        }
    }
    redirect(`/`)
}

export async function EditWorkshop(data: { _id: string, title: string, markdown: string, mainImg: string, date?: any, enrolled: any[] }) {
    if (await IsAdmin()) {

        const db = await clidb()
        const blogdb = db.collection('workshops')

        const { title, markdown, mainImg, enrolled } = data
        const slug = slugify(JSON.parse(JSON.stringify(title)), { lower: true, strict: true })
        const up = { title: title, enrolled: enrolled, fromdate: new Date(data.date.from).valueOf(), todate: new Date(data.date.to).valueOf(), markdown: markdown, slug: slug, mainImg: mainImg }
        await blogdb.findOneAndUpdate({ _id: new ObjectId(data._id) }, { $set: up })

        revalidatePath('/dashboard/workshops')
        revalidatePath('/dashboard')
        revalidatePath('/')
        redirect(`/dashboard/workshops`)
    }
}

export async function DeleteWorkshop(id: any) {
    if (await IsAdmin()) {
        const db = await clidb()
        const blogdb = db.collection('workshops')
        console.log(id)
        await blogdb.findOneAndDelete({ _id: new ObjectId(id)})
        revalidatePath('/dashboard/workshops')
        revalidatePath('/dashboard/')
        revalidatePath('/')
        redirect(`/dashboard/workshops`)
    }
}