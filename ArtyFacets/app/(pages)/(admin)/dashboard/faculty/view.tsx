import Image from 'next/image';
import Link from 'next/link';
import DeleteButton from './DeleteButton'; // Assuming this component exists

export default function FacultyView({
    data,
    adm,
}: {
    data: any;
    adm?: Boolean;
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 px-4 sm:px-6 lg:px-10 gap-6 mt-8">
            {data.map((i: any) => {
                return (
                    <div
                        className="bg-orange-100 rounded-lg shadow-lg p-4 sm:p-6 border-2 border-orange-200 transition-all hover:shadow-xl"
                        key={i._id.toString()}
                    >
                        <div className="flex flex-col sm:flex-row items-center">
                            {/* Mobile: Image on top, text below */}
                            <div className="mb-4 sm:hidden w-full flex justify-center">
                                <div className="relative w-40 h-48">
                                    <Image
                                        src={i.image}
                                        alt={`${i.name} Photo`}
                                        fill
                                        sizes="(max-width: 768px) 160px, 100px"
                                        className="object-contain"
                                        priority
                                    />
                                </div>
                            </div>
                            
                            <div className="flex-grow w-full">
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between">
                                    <div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-orange-500 text-center sm:text-left">
                                            {i.name}
                                        </h3>
                                        <p className="text-sm font-bold text-gray-500 text-center sm:text-left">
                                            {i.role}
                                        </p>
                                    </div>
                                    
                                    {/* Desktop: Image on right */}
                                    <div className="hidden sm:block relative w-32 h-40 lg:w-36 lg:h-44 flex-shrink-0 ml-4">
                                        <Image
                                            src={i.image}
                                            alt={`${i.name} Photo`}
                                            fill
                                            sizes="(max-width: 1024px) 128px, 144px"
                                            className="object-contain rounded-md border-2 border-orange-300 shadow-md"
                                            priority
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-4 text-black text-sm sm:text-base leading-relaxed">
                                    {i.bio}
                                </div>
                            </div>
                        </div>
                        
                        {adm && (
                            <div className="flex flex-col sm:flex-row justify-around gap-3 mt-5">
                                <Link
                                    href={`/dashboard/faculty/edit/${i._id}`}
                                    className="text-center py-2 text-base sm:text-lg bg-green-400 hover:bg-green-500 rounded-md w-full font-semibold transition-colors"
                                >
                                    Edit
                                </Link>
                                <DeleteButton id={i._id.toString()} />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}