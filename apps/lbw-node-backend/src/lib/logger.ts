import { Axiom } from "@axiomhq/js";

let _axiom: Axiom | null = null;

function getAxiom(): Axiom {
  if (!_axiom) {
    _axiom = new Axiom({
      token: process.env.AXIOM_TOKEN ?? "",
      orgId: process.env.AXIOM_ORG_ID ?? "",
    });
  }
  return _axiom;
}

export const log = async (d: {
  message: string;
  status: number;
  level: "info" | "error" | "warning" | "debug";
  data: any;
}) => {
  const consoleFn =
    d.level === "error" ? console.error : d.level === "warning" ? console.warn : console.log;
  consoleFn(`[${d.level.toUpperCase()}] ${d.message}`, d.data);

  getAxiom().ingest("laybackandwin-backend", [
    { message: d.message, status: d.status, level: d.level, data: d.data },
  ]);
};
