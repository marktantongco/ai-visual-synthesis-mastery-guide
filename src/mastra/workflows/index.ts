import { createWorkflow } from "@mastra/core/workflows";
import { z } from "zod";
import { gatherSkillsStep, evaluationStep } from "./assessment-steps";

export const assessmentWorkflow = createWorkflow({
  id: "skill-assessment",
  inputSchema: z.object({
    userId: z.string(),
    userResponse: z.string(),
  }),
  outputSchema: z.object({
    evaluation: z.string(),
  }),
})
  .then(gatherSkillsStep)
  .then(evaluationStep)
  .commit();
