import { StandardsDocument } from "@/components/standards-document";
import { getStandardsDocument } from "@/lib/standards";

const document = getStandardsDocument("corrections-policy")!;
export const metadata = { title: document.title, description: document.description };
export default function CorrectionsPolicyPage() { return <StandardsDocument document={document} />; }
