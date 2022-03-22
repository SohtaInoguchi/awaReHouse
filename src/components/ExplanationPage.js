import * as React from "react";
import PlanSelection from "./PlanSelection";
export default function ExplanationPage({ plan, setPlan }) {
  return (
    <div>
      <PlanSelection plan={plan} setPlan={setPlan} />
    </div>
  );
}
