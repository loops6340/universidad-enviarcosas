import NavBar from "@/components/UI/NavBar"
import Link from "next/link"

const page = () => {
  return (
    <div className="w-screen text-darkmode-light-primary">
        <NavBar route="Kasita"/>
        <div className="p-2">
          ola despies ago la pagina prinsipal aki esta el /chat {":'v"}
          <br />
          <Link className="font-bold text-4xl" href="/chat">/Chat</Link>
        </div>
    </div>
  )
}

export default page