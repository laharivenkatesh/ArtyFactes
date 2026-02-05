"use server";

import { revalidatePath } from "next/cache";
import { IsAdmin } from "./auth/auth";
import { clidb } from "./data";
import { redirect } from "next/navigation";
import { ObjectId } from "mongodb";

export async function JoinReq(data: {
    name: string;
    address: string;
    dob: string;
    phone: string;
    email: string;
    occupation: string;
    courses: string[];
    date: string;
    known: "" | "news" | "social" | "smone" | "board" | "mail";
    _id: string;
}) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("students");
        await blogdb.insertOne({
            name: data.name,
            address: data.address,
            dob: data.dob,
            phone: data.phone,
            email: data.email,
            occupation: data.occupation,
            courses: data.courses,
            date: data.date,
            known: data.known,
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/students");
        redirect(`/dashboard/students`);
    } else {
        const blogdb = db.collection("requests");
        await blogdb.insertOne({
            name: data.name,
            address: data.address,
            dob: data.dob,
            phone: data.phone,
            email: data.email,
            occupation: data.occupation,
            courses: data.courses,
            date: data.date,
            known: data.known,
        });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/requests");
        redirect("/");
    }
}

export async function EditStudent(data: {
    name: string;
    address: string;
    dob: string;
    phone: string;
    email: string;
    occupation: string;
    courses: string[];
    date: string;
    known: "" | "news" | "social" | "smone" | "board" | "mail";
    _id: string;
}) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("students");
        const det = {
            name: data.name,
            address: data.address,
            dob: data.dob,
            phone: data.phone,
            email: data.email,
            occupation: data.occupation,
            courses: data.courses,
            date: data.date,
            known: data.known,
        };
        await blogdb.findOneAndUpdate(
            { _id: new ObjectId(data._id) },
            { $set: det },
        );
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/students");
        redirect(`/dashboard/students`);
    }
}

export async function GetStudent(id: string) {
    const db = await clidb();
    const blogdb = db.collection("students");
    const student = await blogdb.findOne({ _id: new ObjectId(id) });
    if (student) {
        return {
            ...student,
            _id: student._id.toString(),
        };
    }
    return null;
}

export async function DeleteStudent(id: string) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("students");
        await blogdb.deleteOne({ _id: new ObjectId(id) });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/students");
        redirect(`/dashboard/students`);
    }
}

export async function AcceptReq(id: string) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("requests");
        const data = await blogdb.findOne({ _id: new ObjectId(id) });
        if (data) {
            const studb = db.collection("students");
            await studb.insertOne(data);
            await blogdb.deleteOne({ _id: new ObjectId(id) });
        }
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/students");
        revalidatePath("/dashboard/requests");
        redirect(`/dashboard`);
    }
}

export async function DeleteReq(id: string) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("requests");
        await blogdb.deleteOne({ _id: new ObjectId(id) });
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/requests");
        redirect(`/dashboard`);
    }
}

export async function AddYoutube(data: { title: string; link: string }) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("youtube");
        const det = {
            title: data.title,
            link: data.link,
        };
        await blogdb.insertOne(det);
        revalidatePath("/dashboard");
        revalidatePath("/")
        revalidatePath("/dashboard/youtube");
        redirect(`/dashboard/youtube`);
    }
}

export async function GetYoutube(id: string) {
    const db = await clidb();
    const blogdb = db.collection("youtube");
    return await blogdb.findOne({ _id: new ObjectId(id) });
}

export async function UpdateYoutube(data: {
    _id: string;
    title: string;
    link: string;
}) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("youtube");
        const det = {
            title: data.title,
            link: data.link,
        };
        await blogdb.findOneAndUpdate(
            { _id: new ObjectId(data._id) },
            { $set: det },
        );
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/youtube");
        revalidatePath("/")
        redirect(`/dashboard/youtube`);
    }
}

export async function DeleteYoutube(id: string) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("youtube");
        await blogdb.deleteOne({ _id: new ObjectId(id) });
        revalidatePath("/dashboard");
        revalidatePath("/");
        revalidatePath("/dashboard/youtube");
        redirect(`/dashboard/youtube`);
    }
}

export async function AddFaculty(data: { name: string; role: string, bio: string, image: string }) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("faculty");
        const det = {
            name: data.name,
            role: data.role,
            bio: data.bio,
            image: data.image,
        };
        await blogdb.insertOne(det);
        revalidatePath("/dashboard");
        revalidatePath("/")
        revalidatePath("/dashboard/faculty");
        redirect(`/dashboard/faculty`);
    }
}

export async function GetFaculty(id: string) {
    const db = await clidb();
    const blogdb = db.collection("faculty");
    return await blogdb.findOne({ _id: new ObjectId(id) });
}

export async function UpdateFaculty(data: {
    _id: string;
    name: string;
    bio: string;
    role: string;
    image: string
}) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("faculty");
        const det = {
            name: data.name,
            bio: data.bio,
            role: data.role,
            image: data.image
        };
        await blogdb.findOneAndUpdate(
            { _id: new ObjectId(data._id) },
            { $set: det },
        );
        revalidatePath("/dashboard");
        revalidatePath("/dashboard/faculty");
        revalidatePath("/")
        redirect(`/dashboard/faculty`);
    }
}

export async function DeleteFaculty(id: string) {
    const db = await clidb();
    if (await IsAdmin()) {
        const blogdb = db.collection("faculty");
        await blogdb.deleteOne({ _id: new ObjectId(id) });
        revalidatePath("/dashboard");
        revalidatePath("/");
        revalidatePath("/dashboard/faculty");
        redirect(`/dashboard/faculty`);
    }
}