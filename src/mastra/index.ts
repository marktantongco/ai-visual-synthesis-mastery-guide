import { Mastra } from "@mastra/core";
import { assessorAgent } from "./agents/assessor-agent";
import { assessmentWorkflow } from "./workflows";

export const mastra = new Mastra({
  agents: { assessorAgent },
  workflows: { assessmentWorkflow },
});
