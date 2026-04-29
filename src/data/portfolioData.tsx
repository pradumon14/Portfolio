import { Terminal, ShieldAlert, Map, Shield, Gamepad2 } from "lucide-react";
import type { ReactNode } from "react";

/**
 * Custom type for key findings in research
 */
export interface KeyFinding {
  title: string;
  desc: string;
}

/**
 * Represents a single portfolio item, combining properties for both
 * Research papers and Projects (optional fields handle the difference).
 */
export interface PortfolioItem {
  title: string;
  description: string;
  tags?: string[];
  customBadge?: string;
  keyFindings?: KeyFinding[];   // specific to research
  problem?: string;             // specific to project
  solution?: string;            // specific to project
  highlight?: string;           // specific to project
  impact?: string;              // specific to both
  links?: {
    live?: string;
    github?: string;
  };
  icon: ReactNode;
}

/**
 * Array of research items highlighting security vulnerabilities and deep dives.
 */
export const researchItems: PortfolioItem[] = [
  {
    title: "Systemic Guardrail Evasion & System Preamble Extraction in Google's Generative AI",
    description: "I conducted a cross-modal analysis of Google's generative AI ecosystem, discovering systemic flaws in how the models process user inputs. Through a series of escalating injection techniques, I bypassed core safety filters and successfully extracted the model's highly confidential operating instructions.",
    tags: ["Prompt Injection", "Safety Filter Bypass", "Sensitive Information Disclosure"],
    customBadge: "GEMINI",
    keyFindings: [
      { title: "Safety Filter Bypasses", desc: "Discovered that the AI's pre-generation NLP filter could be bypassed using 'Input Obfuscation'—specifically, encoding malicious text prompts into binary or base64." },
      { title: "Wrapper Injection", desc: "Bypassed post-generation image safety checks by wrapping the malicious payload in a benign secondary instruction." },
      { title: "Confidential Data Extraction", desc: "Escalated the attack using structured 'Chained Command Injection' to trick the model into summarizing and base64-encoding its own hidden system prompt, leaking its internal 'Depiction Protocol'." },
      { title: "Cross-Modal Impact", desc: "Proved these input obfuscation techniques actively affected Google's Veo 3.1 video generation pipeline, highlighting a systemic architectural flaw." }
    ],
    impact: "This research demonstrated that an attacker could consistently generate policy-violating content and extract non-public security rules. Documented in a formal research paper, 'Deconstructing the Keeper,' aiding the wider AI safety community.",
    icon: <Terminal className="w-7 h-7" />
  },
  {
    title: "Zero-Click Authentication Bypass in WhatsApp",
    description: "I identified a critical logic flaw in WhatsApp's Android 'Missed Call Verification' system. This vulnerability allowed an attacker to bypass standard OTP and Two-Step Verification processes, leading to unauthorized account takeover.",
    tags: ["Authentication Bypass", "Account Takeover", "Mobile Security"],
    customBadge: "WHATSAPP",
    keyFindings: [
      { title: "Verification Confusion", desc: "The WhatsApp client failed to distinguish between an incoming verification call and an outgoing call made by the user." },
      { title: "The Exploit", desc: "By simultaneously initiating and dropping an outgoing call to WhatsApp's official verification number while logging in, the client would incorrectly validate the entry in the call log as a successful verification attempt." },
      { title: "Automation & Brute Force", desc: "Because the validation occurred locally, it bypassed server limits. An attacker could use scripts to inject fake call log entries on a rooted device to brute-force auth without the victim's SIM." }
    ],
    impact: "Exposed users to a high risk of account hijacking, particularly targets of SIM swap attacks. Formally disclosed to Meta Security, resulting in a required implementation of a fix to address the client-side flaw.",
    icon: <ShieldAlert className="w-7 h-7" />
  }
];

/**
 * Array of software development projects demonstrating technical skills.
 */
export const projects: PortfolioItem[] = [
  {
    title: "Project Naksha",
    description: "Interactive Geography for the Modern Student. Turning rote memorization into visual exploration.",
    problem: "Students struggled with static maps, and existing LLMs failed completely at generating precise spatial SVG geometry.",
    solution: "Engineered an interactive math-driven SVG engine with matrix transformations and procedural Web Audio feedback.",
    highlight: "Built a custom pixel-to-matrix calibration tool reducing a 10-hour coordinate mapping task into 30 minutes.",
    impact: "Created a highly performant, accessible educational platform without relying on expensive, paid mapping APIs.",
    tags: ["React", "TypeScript", "SVG Engine", "Web Audio API"],
    links: { live: "https://naksha10.vercel.app", github:"https://github.com/pradumon14/Naksha" },
    icon: <Map className="w-7 h-7" />
  },
  {
    title: "Trinetra Security",
    description: "A Chrome extension acting as your third eye, analyzing websites in real-time to detect zero-day phishing.",
    problem: "Phishing attacks increasingly bypass static filters, requiring intelligent, contextual DOM and network analysis.",
    solution: "Built an extension to extract structural DOM elements and network activity for asynchronous analysis via Gemini 1.5 Flash.",
    highlight: "Optimized response latency with payload truncation, Safe-Domain whitelisting, and a 3-minute analysis cache.",
    impact: "Empowers users with a proactive Bring-Your-Own-Key ML security tool boasting extreme accuracy on deceptive sites.",
    tags: ["JavaScript", "Gemini AI", "Chrome Extension"],
    links: { github: "https://github.com/Pradumon14/Trinetra" },
    icon: <Shield className="w-7 h-7" />
  },
  {
    title: "Algorithmic Tic-Tac-Toe",
    description: "An interactive playground demonstrating Game Theory and Reinforcement Learning through classic gameplay.",
    problem: "Needed a tangible, interactive mechanism to visually demonstrate complex algorithms like Minimax and Q-Learning.",
    solution: "Developed a dual-engine architecture featuring a mathematically optimal Minimax agent and an adaptive Q-Learning agent.",
    highlight: "Created a live training visualizer allowing users to tune hyperparameters (α, γ, ε) and watch the Q-Table evolve.",
    impact: "Successfully gamified ML education, providing downloadable/loadable JSON brain states for the agent.",
    tags: ["JavaScript", "Reinforcement Learning", "Game Theory"],
    links: { live: "https://tic-tac-toe-ai-mauve.vercel.app", github: "https://github.com/pradumon14/tic-tac-toe-ai" },
    icon: <Gamepad2 className="w-7 h-7" />
  }
];
