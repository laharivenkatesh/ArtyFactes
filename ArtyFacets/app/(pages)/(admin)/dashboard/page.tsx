import { GetRequests, getStudents, getWorkshops } from "@/app/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/ui/components/ui/card";
import { Suspense } from "react";
import Loading from "./Loading";
import StudentTable from "./students/table/Table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/ui/components/ui/accordion";
import CardWithForm from "./workshops/workshops";
import ReqTab from "./requests/ReqTab";
import ImagesAWS from "./images/LoadImages";
import { GetS3 } from "@/app/utils/s3";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="pb-12">
        <div className="mb-10">
          <h1 className="text-5xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Manage your Arty Facets platform
          </p>
        </div>
        <DashboardItems />
      </div>
    </div>
  );
}

function DashboardItems() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <DashboardCard title="Students" Component={CardStudent} />
        <DashboardCard title="Requests" Component={CardRequests} />
        <DashboardCard title="Workshops" Component={CardWorkshop} />
        <DashboardCard title="Images" Component={CardImages} />
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  Component,
}: {
  title: string;
  Component: React.ComponentType;
}) {
  return (
    <div className="w-full rounded-2xl h-full bg-gradient-to-br from-white to-gray-50 border-2 border-indigo-200 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-indigo-400 hover:-translate-y-1">
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    </div>
  );
}

async function CardStudent() {
  const data = await getStudents();
  return (
    <Card className="w-full h-full border-0">
      <CardHeader className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-t-2xl pb-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Students</span>
          <span className="text-4xl font-bold text-indigo-100">
            {data.length}
          </span>
        </CardTitle>
        <CardDescription className="text-indigo-100">Total students registered</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold hover:text-indigo-600">
              View All Students
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <StudentTable />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

async function CardWorkshop() {
  const data = await getWorkshops();
  return (
    <Card className="w-full h-full border-0">
      <CardHeader className="bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-2xl pb-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Workshops</span>
          <span className="text-4xl font-bold text-green-100">
            {data.length}
          </span>
        </CardTitle>
        <CardDescription className="text-green-100">Active workshops</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold hover:text-green-600">
              View All Workshops
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <CardWithForm />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

async function CardRequests() {
  const data = await GetRequests();
  return (
    <Card className="w-full h-full border-0">
      <CardHeader className="bg-gradient-to-r from-amber-600 to-orange-600 text-white rounded-t-2xl pb-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Requests</span>
          <span className="text-4xl font-bold text-amber-100">
            {data.length}
          </span>
        </CardTitle>
        <CardDescription className="text-amber-100">Pending approval</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold hover:text-amber-600">
              View Requests
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <ReqTab />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

async function CardImages() {
  const data = await GetS3();
  return (
    <Card className="w-full h-full border-0">
      <CardHeader className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-t-2xl pb-4">
        <CardTitle className="flex justify-between items-center">
          <span className="text-2xl">Images</span>
          <span className="text-4xl font-bold text-purple-100">
            {data?.length || 0}
          </span>
        </CardTitle>
        <CardDescription className="text-purple-100">S3 Bucket storage</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <Accordion type="single" collapsible className="mt-2">
          <AccordionItem value="item-1">
            <AccordionTrigger className="font-semibold hover:text-purple-600">
              View Gallery
            </AccordionTrigger>
            <AccordionContent className="pt-4">
              <ImagesAWS content={data} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
