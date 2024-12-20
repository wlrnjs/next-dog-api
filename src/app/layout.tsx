import Searchbar from "@/app/_components/searchbar";
import Footer from "@/app/_components/footer";
import {ReactNode} from "react";

export default function RootLayout({children}: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
      <div>
        <header>
          <Searchbar/>
        </header>
        <main>{children}</main>
        <Footer/>
      </div>
        <div id="modal-root"></div>
      </body>
    </html>
  )
}