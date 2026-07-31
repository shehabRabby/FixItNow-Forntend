import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa6";

export function SocialCTA() {
  return (
    <div className="bg-blue-600 text-white py-14 px-4 text-center space-y-6 rounded-3xl max-w-7xl mx-auto">
      <div className="space-y-4">
        <h3 className="text-2xl sm:text-3xl font-extrabold">
          Follow Our Journey
        </h3>
        <div className="flex justify-center items-center space-x-3">
          <a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Facebook"
          >
            <FaFacebookF className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Twitter"
          >
            <FaTwitter className="w-4 h-4" />
          </a>
          <a
            href="#"
            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
            aria-label="Instagram"
          >
            <FaInstagram className="w-4 h-4" />
          </a>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <p className="text-xs text-blue-100 font-medium">
          Want to work with us?
        </p>
        <Link
          href="/careers"
          className="inline-flex items-center space-x-1.5 font-extrabold text-sm hover:underline"
        >
          <span>See Open Positions</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
