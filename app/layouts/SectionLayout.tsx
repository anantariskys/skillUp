import React, { FC } from "react";

const SectionLayout: FC<{ children: React.ReactNode; title?: string }> = ({
  children,
  title,
}) => {
  return (
    <section className="w-full container py-8 space-y-4">
      <h3 className="text-2xl font-semibold">{title}</h3>
      {children}
    </section>
  );
};

export default SectionLayout;
