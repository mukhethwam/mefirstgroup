import React from "react";

interface PasswordStrengthProps {
  password: string;
}

const getStrength = (pw: string): { label: string; score: number; color: string } => {
  if (!pw) return { label: "", score: 0, color: "" };
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;

  if (score <= 2) return { label: "Weak", score: 1, color: "bg-red-500" };
  if (score <= 3) return { label: "Medium", score: 2, color: "bg-yellow-500" };
  return { label: "Strong", score: 3, color: "bg-green-500" };
};

const PasswordStrength = ({ password }: PasswordStrengthProps) => {
  const { label, score, color } = getStrength(password);
  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? color : "bg-muted"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs font-medium ${
        score === 1 ? "text-red-500" : score === 2 ? "text-yellow-500" : "text-green-500"
      }`}>
        {label}
      </p>
    </div>
  );
};

export default PasswordStrength;
