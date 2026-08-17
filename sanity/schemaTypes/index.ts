import type { SchemaTypeDefinition } from "sanity";
import { calloutType } from "./callout";
import { commentType } from "./comment";
import { horizontalRuleType } from "./horizontalRule";
import { newsletterSubscriberType } from "./newsletterSubscriber";
import { postType } from "./post";
import { statsRowType } from "./statsRow";
import { tableType } from "./table";

export const schemaTypes: SchemaTypeDefinition[] = [
  postType,
  newsletterSubscriberType,
  commentType,
  tableType,
  calloutType,
  horizontalRuleType,
  statsRowType,
];
