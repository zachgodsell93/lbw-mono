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
};
