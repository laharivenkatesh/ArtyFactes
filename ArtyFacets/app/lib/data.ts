"use server"
import clientPromise from "./db";

export async function clidb() {
    const cl = await clientPromise;
    return cl.db();
}

export async function getWorkshops(number?: number, slug?: string) {
    // noStore()
    const db = await clidb();

    const dbBlog = db.collection("workshops");
    if (number) {
        var data = JSON.stringify(
            await dbBlog.find({}).limit(number).sort({ _id: -1 }).toArray(),
        );
    } else if (slug) {
        var data = JSON.stringify(
            await dbBlog.find({ slug: slug }).sort({ _id: -1 }).toArray(),
        );
    } else {
        var data = JSON.stringify(
            await dbBlog.find({}).sort({ _id: -1 }).toArray(),
        );
    }

    return JSON.parse(data);
}

export async function GetImages() {
    const db = await clidb();
    const blogdb = db.collection("images");
    var data = await blogdb
        .find({})
        .sort({ _id: -1 })
        .project({ link: 1, _id: 0 })
        .toArray();
    return data;
}

export async function GetYoutubeLinks(number: number) {
    const db = await clidb();
    const blogdb = db.collection("youtube");
    var data = blogdb.find({}).sort({ _id: -1 }).limit(number).toArray();
    return data;
}

export async function GetAllFaculty() {
    const db = await clidb();
    const blogdb = db.collection("faculty");
    var data = blogdb.find({}).sort({ _id: -1 }).toArray();
    return data;
}

export async function GetMailIds() {
    const db = await clidb();
    var dbBlog = db.collection("students");
    var data = await dbBlog
        .find({})
        .project({ email: 1 })
        .sort({ _id: -1 })
        .toArray();
    dbBlog = db.collection("requests");
    var data2 = await dbBlog
        .find({})
        .project({ email: 1 })
        .sort({ _id: 1 })
        .toArray();
    data.push(data2);
    dbBlog = db.collection("workshops");
    var data3 = await dbBlog
        .find({})
        .project({ "enrolled.email": 1 })
        .toArray();
    for (var i in data3) {
        data.push(data3[i].enrolled);
    }
    return data;
}

export async function GetRequests() {
    const db = await clidb();
    const dbBlog = db.collection("requests");
    var data = JSON.stringify(
        await dbBlog.find({}).sort({ _id: -1 }).toArray(),
    );
    return JSON.parse(data);
}

export async function getStudents(email?: string) {
    // noStore()
    const db = await clidb();
    const dbBlog = db.collection("students");
    if (email) {
        var data = JSON.stringify(
            await dbBlog.find({ email: email }).sort({ _id: -1 }).toArray(),
        );
    } else {
        var data = JSON.stringify(
            await dbBlog.find({}).sort({ _id: -1 }).toArray(),
        );
    }

    return JSON.parse(data);
}
