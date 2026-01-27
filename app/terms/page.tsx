export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="mb-4">Last Updated: {new Date().toLocaleDateString()}</p>
      <div className="prose prose-slate">
        <p>By using Connector Reviews, you agree to the following terms.</p>
        <h3>1. Content Disclaimer</h3>
        <p>All content is for informational purposes only. We do not provide financial or professional advice.</p>
        <h3>2. Affiliate Disclosure</h3>
        <p>We participate in various affiliate programs. We earn commissions on purchases made through our links at no extra cost to you.</p>
        <h3>3. Intellectual Property</h3>
        <p>All content is owned by Imperial Bohemia.</p>
      </div>
    </div>
  );
}
