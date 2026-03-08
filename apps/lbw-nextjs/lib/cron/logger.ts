import { Logger } from "next-axiom";

let logger: Logger | null = null;

function getLogger(): Logger {
  if (!logger) {
    logger = new Logger();
  }
  return logger;
}

export const log = (d: {
  message: string;
  status: number;
  level: "info" | "error" | "warning" | "debug";
  data: any;
}) => {
  const consoleFn =
    d.level === "error"
      ? console.error
      : d.level === "warning"
      ? console.warn
      : console.log;
  consoleFn(`[${d.level.toUpperCase()}] ${d.message}`, d.data);

  const l = getLogger();
  const method = d.level === "warning" ? "warn" : d.level;
  l[method](d.message, { status: d.status, ...d.data });
};

export async function flush() {
  if (logger) {
    await logger.flush();
    logger = null;
  }
}
