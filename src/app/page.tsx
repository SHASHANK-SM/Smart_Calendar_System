import Calendar from "../components/Calendar";

export default function Home() {
    return (
        <main className="min-h-screen w-full 
flex items-center justify-center 
bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 
px-4 sm:px-6 md:px-10 py-6">

  <div className="w-full flex justify-center scale-175 md:scale-125 lg:scale-140 origin-center">
    <Calendar />
  </div>

</main>
    );
}