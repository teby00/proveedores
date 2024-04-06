"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/table";

export default function TableOfProducts({ productos }) {
  return (
    <Table
      aria-label="Tabla de productos"
      className={{
        wrapper: ["max-h-[382px]", "max-w-3xl, bg-white"],
        th: [
          "bg-transparent",
          "text-default-500",
          "border-b",
          "border-divider",
        ],
      }}
    >
      <TableHeader className="bg-white">
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>DESCRIPCIÓN</TableColumn>
        <TableColumn>PRECIO</TableColumn>
      </TableHeader>
      <TableBody items={productos} className="bg-white">
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.tittle}</TableCell>
            <TableCell>{item.description}</TableCell>
            <TableCell>${item.price}</TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
