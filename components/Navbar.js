import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav id="main-nav">
      <div className="row">
        <div>
          <Link href="/" id="logo">
            <Image src="/logo.png" width={50} height={50} />
          </Link>
        </div>
        <div className="links">
          <Link href="/" className="try">
            Try
          </Link>
          <Link href="/restaurants">Restaurants</Link>
        </div>
      </div>
    </nav>
  );
}
