import { defineField, defineType } from "sanity";

export const newsletterSubscriberType = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter subscriber",
  type: "document",
  fields: [
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["subscribed", "unsubscribed"] },
      initialValue: "subscribed",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "source",
      title: "Signup source",
      type: "string",
      description: "Where the signup form appeared, such as topic-hub or article-end.",
    }),
    defineField({
      name: "consentedAt",
      title: "Consent recorded at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "lastSubscribedAt",
      title: "Last subscribed at",
      type: "datetime",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: { title: "email", subtitle: "source" },
  },
});
