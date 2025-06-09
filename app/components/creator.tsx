import Image from 'next/image';
export default function Creator({ name, image }: { name: string; image: string; }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full overflow-hidden mb-2 bg-gray-200 flex items-center justify-center">
                <Image src={image} alt="Profile Picture" width = {64} height = {64}/>
            </div>
            <p className="text-sm font-medium text-center">{name}</p>
        </div>
    );
}