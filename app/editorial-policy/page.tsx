import { StandardsDocument } from "@/components/standards-document";
import { getStandardsDocument } from "@/lib/standards";

const document = getStandardsDocument("editorial-policy")!;
export const metadata = { title: document.title, description: document.description };
export default function EditorialPolicyPage() { return <StandardsDocument document={document} />; }
