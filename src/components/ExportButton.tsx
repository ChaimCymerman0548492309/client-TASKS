import { Button } from "@mui/material";
import type { Task } from "../types/task";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface ExportButtonProps {
  tasks: Task[];
}

export const ExportButton = ({ tasks }: ExportButtonProps) => {
  const handleExport = () => {
    // הפיכת המידע לאובייקטים עם כותרות בעברית
    const data = tasks.map((task, index) => ({
      "#": index + 1,
      כותרת: task.title,
      סטטוס: task.completed ? "✔" : "✖",
      "נוצר ע״י": task.createdBy,
      "תאריך יצירה": task.createdAt
        ? new Date(task.createdAt).toLocaleString("he-IL")
        : "",
    }));

    // המרת המידע ל־Sheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // יצירת חוברת אקסל
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "משימות");

    // שמירה כקובץ
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "tasks.xlsx");
  };

  return (
    <Button variant="outlined" onClick={handleExport}>
export Tasks to Excel    </Button>
  );
};
