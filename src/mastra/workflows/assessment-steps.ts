import { createStep } from "@mastra/core/workflows";
import { z } from "zod";

export const gatherSkillsStep = createStep({
  id: "gather-skills",
  description: "Gathers skills from the local database for the assessment",
  inputSchema: z.object({
    userId: z.string(),
  }),
  outputSchema: z.object({
    skills: z.array(z.string()),
  }),
  execute: async () => {
    // In a real app, this would fetch from a database or use the data we have
    // For now, we'll return a subset of keys from our agentSkills data
    return {
      skills: ["prompt-engineering", "gen-z-ui", "mastra-framework", "brutalist-design"],
    };
  },
});

export const evaluationStep = createStep({
  id: "evaluate",
  description: "User evaluation step performed by the Assessor Agent",
  inputSchema: z.object({
    skills: z.array(z.string()),
  }),
  execute: async (params: any) => {
    const { mastra, getStepResult, getInitData } = params;
    const agent = mastra?.getAgent("assessorAgent");
    if (!agent) throw new Error("Assessor Agent not found");

    const gatherSkillsResult = getStepResult("gather-skills") as { skills: string[] } | undefined;
    const initData = getInitData() as { userResponse: string } | undefined;

    const response = await agent.generate(
      `Evaluate the user's proficiency in these skills: ${gatherSkillsResult?.skills.join(", ")}. 
       User response: "${initData?.userResponse}"`
    );

    return {
        evaluation: response.text
    };
  },
});
