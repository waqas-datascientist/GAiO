"use client";

import { ArrowLeft, ArrowRight, Check, LoaderCircle } from "lucide-react";
import { track } from "@vercel/analytics";
import { FormEvent, useState } from "react";
import { WarpBackground } from "@/components/ui/warp-background";

export type AssessmentPayload = {
  website: string;
  industry: string;
  market: string;
  competitors: string[];
  questions: string;
  objective: string;
  name: string;
  email: string;
};

const fields = [
  ["Business context", "Website, category, and market"],
  ["Competitive set", "Who already owns the answer"],
  ["Market questions", "What buyers need to decide"],
  ["Your details", "Where to send the next steps"],
];

export function AssessmentForm() {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [data, setData] = useState<AssessmentPayload>({ website: "", industry: "", market: "", competitors: ["", "", ""], questions: "", objective: "", name: "", email: "" });
  const update = (key: keyof AssessmentPayload, value: string) => setData((current) => ({ ...current, [key]: value }));
  const updateCompetitor = (index: number, value: string) => setData((current) => ({ ...current, competitors: current.competitors.map((item, itemIndex) => itemIndex === index ? value : item) }));
  const validate = () => {
    const next: Record<string, string> = {};
    if (step === 0 && !data.website.trim()) next.website = "Add a website or primary domain.";
    if (step === 0 && !data.industry.trim()) next.industry = "Tell us your category.";
    if (step === 0 && !data.market.trim()) next.market = "Add the market, country, or audience you want to assess.";
    if (step === 1 && !data.competitors.some((item) => item.trim())) next.competitors = "Add at least one competitor.";
    if (step === 2 && !data.questions.trim()) next.questions = "Add at least one important customer question.";
    if (step === 2 && data.questions.split("\n").filter((item) => item.trim()).length > 5) next.questions = "Use no more than five questions, one per line.";
    if (step === 2 && !data.objective.trim()) next.objective = "Tell us the outcome you want to improve.";
    if (step === 3 && !data.name.trim()) next.name = "Add your name.";
    if (step === 3 && !/^\S+@\S+\.\S+$/.test(data.email)) next.email = "Add a valid email address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  const next = () => {
    if (!validate()) return;
    if (step === 0) track("audit_started", { location: "assessment_form" });
    setStep((current) => Math.min(current + 1, 3));
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setSubmitError("");
    const form = new FormData(event.currentTarget);
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, company: form.get("company") }),
      });
      const result = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) throw new Error(result.error || "We could not save your request.");
      track("audit_submitted", { location: "assessment_form" });
      setComplete(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : "We could not save your request. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  if (complete) {
    return (
      <WarpBackground
        className="assessment-success p-[clamp(2rem,6vw,4.5rem)]"
        gridColor="color-mix(in oklch, var(--color-paper) 20%, transparent)"
        aria-live="polite"
      >
        <div className="assessment-success-copy">
          <p className="eyebrow">Signal received</p>
          <h2 className="display section-title">Your visibility audit request is in.</h2>
          <p className="lede">
            We have recorded your website, market questions, and competitive context. The next step is a focused review of the signals that matter most.
          </p>
          <a className="button button-signal" href="/book">
            Continue to a strategy call <ArrowRight size={16} />
          </a>
        </div>
      </WarpBackground>
    );
  }
  return <form className="metric-card" noValidate onSubmit={submit}>
    <div className="stepper" aria-label={`Step ${step + 1} of 4`}>
      {fields.map(([label, detail], index) => <div className={`step ${index <= step ? "is-active" : ""}`} key={label}><span>{index < step ? <Check size={14} /> : index + 1}</span><div><strong>{label}</strong><small>{detail}</small></div></div>)}
    </div>
    {step === 0 && <div className="form-fields"><label>Website or primary domain<input value={data.website} onChange={(event) => update("website", event.target.value)} placeholder="yourcompany.com" aria-invalid={Boolean(errors.website)} /></label>{errors.website && <p className="form-error">{errors.website}</p>}<label>Industry / category<input value={data.industry} onChange={(event) => update("industry", event.target.value)} placeholder="e.g. B2B SaaS, healthcare, retail" aria-invalid={Boolean(errors.industry)} /></label>{errors.industry && <p className="form-error">{errors.industry}</p>}<label>Target market or audience<input value={data.market} onChange={(event) => update("market", event.target.value)} placeholder="e.g. UK fintech buyers, global SaaS leaders" aria-invalid={Boolean(errors.market)} /></label>{errors.market && <p className="form-error">{errors.market}</p>}</div>}
    {step === 1 && <div className="form-fields"><p className="form-guidance">Add up to three competitors that already appear in the conversations you want to influence.</p>{data.competitors.map((competitor, index) => <label key={index}>Competitor {index + 1}<input value={competitor} onChange={(event) => updateCompetitor(index, event.target.value)} placeholder={index === 0 ? "Primary competitor" : "Optional competitor"} aria-invalid={Boolean(errors.competitors)} /></label>)}{errors.competitors && <p className="form-error">{errors.competitors}</p>}</div>}
    {step === 2 && <div className="form-fields"><label>Important customer questions<textarea value={data.questions} onChange={(event) => update("questions", event.target.value)} placeholder="Add up to five questions, one per line." aria-invalid={Boolean(errors.questions)} /></label>{errors.questions && <p className="form-error">{errors.questions}</p>}<label>What should improve first?<textarea value={data.objective} onChange={(event) => update("objective", event.target.value)} placeholder="Describe the visibility, trust, content, or conversion outcome that matters most." aria-invalid={Boolean(errors.objective)} /></label>{errors.objective && <p className="form-error">{errors.objective}</p>}</div>}
    {step === 3 && <div className="form-fields"><label>Your name<input value={data.name} onChange={(event) => update("name", event.target.value)} placeholder="Name" aria-invalid={Boolean(errors.name)} /></label>{errors.name && <p className="form-error">{errors.name}</p>}<label>Work email<input type="email" value={data.email} onChange={(event) => update("email", event.target.value)} placeholder="name@company.com" aria-invalid={Boolean(errors.email)} /></label>{errors.email && <p className="form-error">{errors.email}</p>}<label className="newsletter-honeypot" aria-hidden="true">Company<input name="company" type="text" tabIndex={-1} autoComplete="off" /></label><p className="form-guidance">By submitting, you agree that GAiO Engine may contact you about this audit request. Your information is not published.</p></div>}
    {submitError ? <p className="form-error" role="alert">{submitError}</p> : null}
    <div className="form-actions">{step > 0 && <button className="button button-ghost" type="button" onClick={() => setStep((current) => current - 1)}><ArrowLeft size={16} /> Back</button>}<span style={{ flex: 1 }} />{step < 3 ? <button className="button button-primary" type="button" onClick={next}>Continue <ArrowRight size={16} /></button> : <button className="button button-signal" type="submit" disabled={loading}>{loading ? <><LoaderCircle size={16} className="spin" /> Sending</> : <>Request the free audit <ArrowRight size={16} /></>}</button>}</div>
  </form>;
}
