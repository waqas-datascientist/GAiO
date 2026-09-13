import { defineField, defineType } from "sanity";

export const assessmentLeadType = defineType({
  name: "assessmentLead",
  title: "AI visibility audit request",
  type: "document",
  fields: [
    defineField({ name: "website", title: "Website", type: "url", validation: (rule) => rule.required() }),
    defineField({ name: "industry", title: "Industry", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "market", title: "Target market", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "competitors", title: "Competitors", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "questions", title: "Priority customer questions", type: "array", of: [{ type: "string" }], validation: (rule) => rule.required().min(1).max(5) }),
    defineField({ name: "objective", title: "Priority outcome", type: "text", validation: (rule) => rule.required() }),
    defineField({ name: "name", title: "Contact name", type: "string", validation: (rule) => rule.required() }),
    defineField({ name: "email", title: "Work email", type: "string", validation: (rule) => rule.required().email() }),
    defineField({ name: "status", title: "Status", type: "string", options: { list: ["new", "reviewing", "contacted", "closed"] }, initialValue: "new", validation: (rule) => rule.required() }),
    defineField({ name: "submittedAt", title: "Submitted at", type: "datetime", validation: (rule) => rule.required() }),
  ],
  preview: { select: { title: "website", subtitle: "email" } },
});
