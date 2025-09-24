import { faCode } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      rel="home"
      className="hover:text-accent transition-colors duration-500"
    >
      <FontAwesomeIcon icon={faCode} size="lg" className="mr-1" />
      <strong className="text-xl/5 font-extrabold tracking-tight">
        devlog
      </strong>
    </Link>
  );
}
