import { StandardsDocument } from "@/components/standards-document";
import { getStandardsDocument } from "@/lib/standards";

const document = getStandardsDocument("evidence-standards")!;
export const metadata = { title: document.title, description: document.description };
export default function EvidenceStandardsPage() { return <StandardsDocument document={document} />; }
