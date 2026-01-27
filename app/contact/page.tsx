import { siteConfig } from "@/lib/config";
import { Mail, MessageSquare, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the Connector Live team.",
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <h1 className="text-4xl font-bold mb-8 text-center text-slate-900">Get in Touch</h1>
      <p className="text-center text-slate-600 mb-12 max-w-2xl mx-auto">
        Have a question about our ranking methodology or need help finding a product? We&apos;re here to help.
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Mail className="w-6 h-6 mr-3 text-blue-600" />
            Email Us
          </h2>
          <p className="text-slate-600 mb-4">
            For general inquiries, partnership opportunities, or press:
          </p>
          <a
            href={`mailto:${siteConfig.company.email}`}
            className="text-xl font-medium text-blue-600 hover:underline"
          >
            {siteConfig.company.email}
          </a>
        </div>

        <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-3 text-blue-600" />
            Location
          </h2>
          <p className="text-slate-600 mb-2 font-medium">
            {siteConfig.company.name} HQ
          </p>
          <p className="text-slate-500">
            {siteConfig.company.address || "Prague, Czech Republic"}
          </p>
          <p className="text-xs text-slate-400 mt-4">
            Note: We do not accept physical returns at this address.
          </p>
        </div>
      </div>

      <div className="mt-12 text-center bg-blue-50 p-8 rounded-2xl">
        <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Feedback</h3>
        <p className="text-slate-600">
          We value your input. If you spot an error in our data, please let us know immediately so our autonomous agents can correct it.
        </p>
      </div>
    </div>
  );
}
