/** Formats a whole-naira amount as "₦300,000" (or "₦100,000 / month" with a period). */
export type Price = { amount: number; period?: "month" };

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });

export const formatPrice = ({ amount, period }: Price) => `₦${naira.format(amount)}${period ? ` / ${period}` : ""}`;
