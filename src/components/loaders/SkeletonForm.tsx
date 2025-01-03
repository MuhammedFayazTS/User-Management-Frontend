import React from "react";

type SkeletonFormProps = {
  rows: number;
  fieldsPerRow: number;
  fieldWidth?: number;
  fieldHeight?: number;
};

const SkeletonForm: React.FC<SkeletonFormProps> = ({
  rows,
  fieldsPerRow,
  fieldWidth = 300,
  fieldHeight = 30,
}) => {
  return (
    <div className="space-y-6">
      {Array.from({ length: rows }, (_, rowIndex) => (
        <div key={rowIndex} className="flex gap-4">
          {Array.from({ length: fieldsPerRow }, (_, fieldIndex) => (
            <div
              key={fieldIndex}
              className="rounded-xl bg-muted/50 animate-pulse"
              style={{
                width: fieldWidth,
                height: fieldHeight,
              }}
            />
          ))}
        </div>
      ))}
      <div className="flex gap-2 mt-4">
        <div
          className="rounded-xl bg-muted/50 animate-pulse"
          style={{ width: 120, height: 50 }}
        />
        <div
          className="rounded-xl bg-muted/50 animate-pulse"
          style={{ width: 120, height: 50 }}
        />
      </div>
    </div>
  );
};

export default SkeletonForm;
