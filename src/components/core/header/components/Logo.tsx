import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCode } from "@fortawesome/free-solid-svg-icons";

export function Logo() {
  return (
    <Link
      href="/"
      aria-label="devlog home"
      className="hover:text-accent focus:text-accent outline-0 transition-colors duration-300"
    >
      <FontAwesomeIcon icon={faCode} size="lg" className="mr-1" />
      <strong className="text-xl/5 font-extrabold tracking-tight">
        devlog
      </strong>
    </Link>
  );
}
