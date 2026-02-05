import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/ui/components/ui/card"
import { getWorkshops } from "@/app/lib/data"
import Image from "next/legacy/image"
import { marked } from "marked"
import DeleteButton from "./deleteBtn"
import EditButton from "./EditBtn"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/app/ui/components/ui/accordion"
import WorkshopUserTable from "./usertables/reqTable"

export default async function CardWithForm() {
    const data = await getWorkshops();
    return (
        <>
            {
                data.map((workshop: any) => {
                    return (
                        <div key={workshop.id}>
                            <Card className="w-full" key={workshop.id}>
                                <CardHeader>
                                    <CardTitle>{workshop.title}</CardTitle>
                                    <CardDescription>Details of the Workshop.</CardDescription>
                                </CardHeader>
                                <div className="px-10 pb-10">
                                    <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger>Quick View</AccordionTrigger>
                                            <AccordionContent>
                                                <CardContent className="flex flex-col">
                                                    <Image unoptimized={true} src={workshop.mainImg} height={400} width={500} className="rounded-xl" alt={workshop.title} />
                                                    <CardDescription className="prose mx-5">
                                                        <article dangerouslySetInnerHTML={{ __html: marked(workshop.markdown, { breaks: true }) }} />
                                                    </CardDescription>
                                                    <WorkshopUserTable data={workshop.enrolled} />
                                                </CardContent>
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </div>
                                <CardFooter className="flex justify-between">
                                    <DeleteButton workshop={workshop._id as string} />
                                    <EditButton workshop={workshop} />
                                </CardFooter>
                            </Card>
                        </div>
                    )
                })
            }
        </>
    )
}