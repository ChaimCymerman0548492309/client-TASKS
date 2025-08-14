import { Button } from "@mui/material";
import type { Task } from "../types/task";
import jsPDF from "jspdf";

interface ExportButtonProps {
  tasks: Task[];
}

export const ExportButton = ({ tasks }: ExportButtonProps) => {
  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Tasks List", 14, 15);

    let y = 25;
    tasks.forEach((task, index) => {
      const line = `${index + 1}. [${task.completed ? "✔" : "✖"}] ${
        task.title
      } (by ${task.createdBy} at ${
        task.createdAt ? new Date(task.createdAt).toLocaleString() : ""
      })`;
      doc.text(line, 14, y);
      y += 10;
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
    });

    doc.save("tasks.pdf");
  };

  return (
    <Button variant="outlined" onClick={handleExport}>
      Export Tasks as PDF
    </Button>
  );
};
