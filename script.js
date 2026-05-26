let lastQuestion = "";
let currentMockQuestion = "";
let currentRound = "";

function pickRandom(items) {
  if (items.length === 1) return items[0];

  let selected = items[Math.floor(Math.random() * items.length)];

  while (selected === lastQuestion) {
    selected = items[Math.floor(Math.random() * items.length)];
  }

  lastQuestion = selected;
  return selected;
}

function getInputs() {
  return {
    role: document.getElementById("role").value,
    company: document.getElementById("company").value,
    targetCompany: document.getElementById("targetCompany").value,
    round: document.getElementById("round").value,
    difficulty: document.getElementById("difficulty").value,
    output: document.getElementById("output")
  };
}

function validateInputs(data) {
  return (
    data.role &&
    data.company &&
    data.targetCompany &&
    data.round &&
    data.difficulty
  );
}

function buildQuestionData(role, company, round) {
  const companyContexts = {
    "Big Tech": [
      "AI platform",
      "developer tool",
      "ads product",
      "enterprise workflow",
      "consumer product at scale"
    ],

    "Startup": [
      "MVP",
      "early user onboarding",
      "pricing model",
      "customer feedback loop",
      "0→1 product launch"
    ],

    "Fintech": [
      "loan approval flow",
      "underwriting platform",
      "fraud detection workflow",
      "member onboarding",
      "credit decisioning experience"
    ],

    "SaaS": [
      "admin dashboard",
      "workflow automation tool",
      "enterprise reporting product",
      "customer onboarding flow",
      "collaboration platform"
    ],

    "Marketplace": [
      "buyer experience",
      "seller onboarding",
      "matching algorithm",
      "trust and safety system",
      "pricing experience"
    ]
  };

  const roleContexts = {
    "AI Product Manager": [
      "AI assistant",
      "model evaluation workflow",
      "personalization engine",
      "human-in-the-loop review system",
      "recommendation system"
    ],

    "Platform PM": [
      "API platform",
      "metadata governance workflow",
      "shared data platform",
      "internal tooling system",
      "developer experience"
    ],

    "Growth PM": [
      "activation funnel",
      "referral loop",
      "conversion flow",
      "retention experience",
      "experimentation program"
    ],

    "Technical PM": [
      "system migration",
      "data pipeline",
      "integration workflow",
      "technical debt reduction",
      "scalable architecture"
    ],

    "Product Manager": [
      "user onboarding",
      "core product workflow",
      "feature adoption",
      "customer feedback system",
      "roadmap prioritization"
    ]
  };

  const behavioralByRole = {
    "AI Product Manager": [
      "Tell me about a time you had to make a product decision with incomplete or messy data.",
      "Tell me about a time you had to balance innovation with risk, trust, or user safety.",
      "Tell me about a time you worked with engineering or data science to solve an ambiguous AI/data problem.",
      "Tell me about a time you had to explain a technical AI/data tradeoff to non-technical stakeholders.",
      "Tell me about a time a data-driven product initiative did not go as planned."
    ],

    "Platform PM": [
      "Tell me about a time you built or improved a system used by multiple teams.",
      "Tell me about a time you had to align stakeholders around a shared platform or data standard.",
      "Tell me about a time you prioritized internal users over external-facing features.",
      "Tell me about a time you had to manage dependencies across multiple engineering or business teams.",
      "Tell me about a time you created structure in a messy or ambiguous platform workflow."
    ],

    "Growth PM": [
      "Tell me about a time you used experimentation to change a product decision.",
      "Tell me about a time you improved adoption, activation, retention, or conversion.",
      "Tell me about a time your experiment or growth initiative failed.",
      "Tell me about a time you had to choose between growth and user experience.",
      "Tell me about a time you used customer insights to improve a funnel."
    ],

    "Technical PM": [
      "Tell me about a time you managed a technically complex project.",
      "Tell me about a time you had to make a tradeoff between speed and technical quality.",
      "Tell me about a time you worked through a major technical dependency or blocker.",
      "Tell me about a time you translated business requirements into technical execution.",
      "Tell me about a time you had to push back on engineering or leadership using technical reasoning."
    ],

    "Product Manager": [
      "Tell me about a time you influenced stakeholders without authority.",
      "Tell me about a time a product or initiative did not go as planned.",
      "Tell me about a time you made a difficult prioritization decision.",
      "Tell me about a time you used data to change a stakeholder’s mind.",
      "Tell me about a time you led through ambiguity."
    ]
  };

  const productArea = pickRandom(companyContexts[company]);
  const roleArea = pickRandom(roleContexts[role]);

  const questionTemplates = {
    "Product Sense": [
      `How would you improve the ${productArea} for a ${company} company?`,
      `Design a ${roleArea} that helps users solve a high-friction workflow.`,
      `How would you increase adoption of a ${roleArea}?`,
      `How would you improve the first-time user experience for a ${productArea}?`,
      `Design a product experience that helps customers get value faster from a ${company} product.`,
      `What would you build to reduce friction in a ${roleArea}?`,
      `How would you redesign a ${productArea} for enterprise users?`
    ],

    "Execution": [
      `A key metric for the ${productArea} dropped by 20%. How would you investigate?`,
      `The ${roleArea} launched successfully, but adoption is lower than expected. What would you do?`,
      `Users are engaging with the ${productArea}, but satisfaction is declining. How would you diagnose the issue?`,
      `A launch is delayed because of cross-functional dependencies. How would you prioritize and communicate next steps?`,
      `Your team shipped a ${roleArea}, but business impact is unclear. What metrics would you review?`,
      `A ${company} product is seeing high sign-ups but low activation. How would you debug this?`,
      `A dashboard shows conflicting signals across adoption, retention, and satisfaction. How would you investigate?`
    ],

    "Strategy": [
      `Should a ${company} company invest in a ${roleArea} over the next 12 months?`,
      `What is the biggest threat to a ${company} company over the next 5 years?`,
      `How would you define a product strategy for a ${productArea} in a competitive market?`,
      `Should a ${company} company build, buy, or partner to launch a ${roleArea}?`,
      `How would you prioritize growth, profitability, and customer trust for a ${company} product?`,
      `How should a ${company} company use AI to create durable product advantage?`,
      `What product bets should a ${company} company avoid making right now?`
    ],

    "Behavioral": behavioralByRole[role],

    "Recruiter Screen": [
      `Why are you interested in ${role} roles at a ${company} company?`,
      `Walk me through how your background prepares you for a ${role} role.`,
      "What type of product problems do you enjoy solving most?",
      "Why are you looking for your next role?",
      "What makes you different from other PM candidates?",
      `Tell me about a product experience that best represents your readiness for ${role} roles.`,
      `How would you describe your product leadership style for a ${company} environment?`
    ]
  };

  return {
    question: pickRandom(questionTemplates[round])
  };
}

function generateQuestion() {
  const data = getInputs();

  if (!validateInputs(data)) {
    data.output.innerText =
      "Please select all fields to generate tailored interview prep.";
    return;
  }

  const { role, company, targetCompany, round, difficulty } = data;

  const questionData = buildQuestionData(role, company, round);

  const question = questionData.question;

  currentMockQuestion = question;
  currentRound = round;

  const difficultyModifiers = {
    Easy:
      "Focus on fundamentals, clear structure, and simple examples.",

    Medium:
      "Add tradeoffs, metrics, constraints, and stakeholder considerations.",

    Hard:
      "Include ambiguity, competing priorities, risks, strategy, and executive-level reasoning."
  };

  const response = `
INTERVIEW QUESTION

${question}


DIFFICULTY CALIBRATION

${difficulty}: ${difficultyModifiers[difficulty]}


MOCK INTERVIEW PREP

- Clarify the business goal before jumping into solutions
- Prioritize the highest-leverage opportunity
- Discuss tradeoffs and constraints
- Use metrics and measurable impact
- Keep your answer structured and concise
- Tailor your answer to ${targetCompany}


WHAT THE INTERVIEWER IS TESTING

For a ${role} role at a ${targetCompany} environment:
- Product judgment
- Structured thinking
- Cross-functional collaboration
- Communication clarity
- Prioritization and tradeoffs
- Customer and business impact


EXPECTED STRONG ANSWER CHARACTERISTICS

- Clear ownership and leadership
- Strong prioritization logic
- Structured communication
- Quantified impact where possible
- Good tradeoff discussion
- Executive-level clarity


FOLLOW-UP QUESTIONS

1. What metric would you track?
2. What tradeoff would you make?
3. What would you prioritize first?
4. How would you validate your decision?
5. What risks concern you most?
`;

  data.output.innerText = response;
}

function startMockInterview() {
  const data = getInputs();

  if (!validateInputs(data)) {
    data.output.innerText =
      "Please select all fields before starting mock interview mode.";
    return;
  }

  const questionData = buildQuestionData(
    data.role,
    data.company,
    data.round
  );

  currentMockQuestion = questionData.question;
  currentRound = data.round;

  const mockCard = document.getElementById("mockCard");

  mockCard.style.display = "block";

  document.getElementById("mockQuestion").innerText =
    currentMockQuestion;

  document.getElementById("mockAnswer").value = "";

  document.getElementById("feedback").innerText = "";

  mockCard.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}

function evaluateAnswer() {
  const answer = document
    .getElementById("mockAnswer")
    .value.trim();

  const feedback = document.getElementById("feedback");

  if (!answer) {
    feedback.innerText =
      "Please type an answer before asking for feedback.";
    return;
  }

  const wordCount = answer.split(/\s+/).length;

  const hasMetric =
    /%|\d+|metric|KPI|adoption|retention|conversion|revenue|cost|time/i.test(
      answer
    );

  const hasOwnership =
    /I led|I owned|I built|I created|I drove|I decided|I worked/i.test(
      answer
    );

  const hasTradeoff =
    /tradeoff|trade-off|prioritize|constraint|risk|limited|capacity|scope/i.test(
      answer
    );

  const hasLearning =
    /learned|next time|reflection|would do differently|takeaway/i.test(
      answer
    );

  let score = 0;

  let feedbackPoints = [];

  if (wordCount >= 80) {
    score += 1;

    feedbackPoints.push(
      "Good depth: your answer has enough detail to evaluate."
    );
  } else {
    feedbackPoints.push(
      "Add more detail. Strong PM answers usually need context, action, and result."
    );
  }

  if (hasMetric) {
    score += 1;

    feedbackPoints.push(
      "Good: you included measurable impact or metrics."
    );
  } else {
    feedbackPoints.push(
      "Add a metric, KPI, or quantified outcome to make the answer stronger."
    );
  }

  if (hasOwnership) {
    score += 1;

    feedbackPoints.push(
      "Good: your answer shows personal ownership."
    );
  } else {
    feedbackPoints.push(
      "Make your personal contribution clearer. Use language like 'I led,' 'I owned,' or 'I drove.'"
    );
  }

  if (hasTradeoff) {
    score += 1;

    feedbackPoints.push(
      "Good: you included tradeoffs, constraints, or prioritization."
    );
  } else {
    feedbackPoints.push(
      "Add tradeoffs or constraints. Senior PM answers should show judgment, not just activity."
    );
  }

  if (currentRound === "Behavioral") {
    if (hasLearning) {
      score += 1;

      feedbackPoints.push(
        "Good: you included reflection or learning."
      );
    } else {
      feedbackPoints.push(
        "For behavioral answers, end with what you learned or what you would do differently."
      );
    }
  }

  let rating = "Needs improvement";

  if (score >= 4) {
    rating = "Strong answer";
  } else if (score >= 2) {
    rating = "Promising, but needs sharpening";
  }

  feedback.innerText = `
MOCK INTERVIEW FEEDBACK

Question:
${currentMockQuestion}

Overall Rating:
${rating}

Feedback:
- ${feedbackPoints.join("\n- ")}

Suggested Next Step:
Rewrite your answer using this structure:
1. Context
2. Conflict or goal
3. Your specific action
4. Result with metric
5. Tradeoff or learning
`;
}

function copyOutput() {
  const output = document.getElementById("output").innerText;

  if (!output.trim()) {
    alert("Generate a question first.");
    return;
  }

  navigator.clipboard.writeText(output);

  alert("Copied to clipboard.");
}