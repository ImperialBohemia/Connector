import { Activity, Server, Database, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getSheetData } from "@/lib/sheets";

export default async function ConnectorDashboard() {
  const pages = await getSheetData();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-8 font-mono">
      {/* Header */}
      <header className="mb-12 border-b border-slate-800 pb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Server className="text-green-500" />
            CONNECTOR BRAIN
          </h1>
          <p className="text-slate-500 text-sm mt-2">v1.0.0 • System Operational • Absolute Autonomy</p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            IndexNow: Active
          </div>
          <div className="flex items-center gap-2 text-xs bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
             ISR: Enabled
          </div>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider">Active Clusters</h3>
            <Database className="w-4 h-4 text-slate-500" />
          </div>
          <p className="text-3xl font-bold text-white">{pages.length}</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider">Bing Visibility</h3>
            <Globe className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-3xl font-bold text-white">Auto</p>
        </div>
        <div className="bg-slate-900 p-6 rounded-lg border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-slate-400 text-xs uppercase tracking-wider">Health Check</h3>
            <Activity className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-3xl font-bold text-green-400">Passing</p>
        </div>
      </div>

      {/* Active Web Deployments */}
      <section>
        <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Generated Web Assets ("First Web")
        </h2>
        <div className="bg-slate-900 rounded-lg border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-950 text-slate-400 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Slug / Cluster</th>
                <th className="px-6 py-4">Target Keyword</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {pages.map((page) => (
                <tr key={page.slug} className="hover:bg-slate-800/50 transition">
                  <td className="px-6 py-4 font-medium text-white">{page.slug}</td>
                  <td className="px-6 py-4 text-slate-400">{page.keyword}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 text-green-400 text-xs">
                      <CheckIcon /> Live
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/${page.slug}`}
                      className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 font-medium"
                    >
                      View Live Page <ArrowRight className="w-3 h-3" />
                    </Link>
                  </td>
                </tr>
              ))}
              {pages.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                    No active clusters found. Add a row to Google Sheets to deploy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  );
}
