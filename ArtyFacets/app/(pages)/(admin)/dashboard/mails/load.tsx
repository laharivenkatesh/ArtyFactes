import Image from "next/legacy/image";

export default function MailsPage({ data }: { data: { subject: string, message: string | Promise<string>, image: string } }) {
    return (
        <div className="prose lg:w-3/4 w-full">
            <div style={{ fontFamily: "sans-serif" }}>
                <div style={{ display: "block", margin: "auto", maxWidth: "600px", }} className="main">
                    <h1 style={{ fontSize: "20px", marginTop: "20px" }}>Arty Facets | {data.subject}</h1>
                    <div style={{ marginTop: "10px" }}>
                        <Image unoptimized={true} src={data.image} alt={data.subject} height={150} width={250} />
                        <article dangerouslySetInnerHTML={{__html: data.message}}/>
                    </div>
                    <hr style={{ color: "black", "marginTop": "25px" }} />
                    <p style={{ marginTop: "25px", color: "#686969" }}>Do not reply to this automated email.</p>
                </div>
            </div >
        </div>
    )
}