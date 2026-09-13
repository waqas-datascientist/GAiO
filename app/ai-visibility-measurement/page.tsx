import { StandardsDocument } from "@/components/standards-document";
import { getStandardsDocument } from "@/lib/standards";

const document = getStandardsDocument("ai-visibility-measurement")!;
export const metadata = { title: document.title, description: document.description };
export default function AiVisibilityMeasurementPage() { return <StandardsDocument document={document} />; }
