"use client";
import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Mail, MapPin, Phone } from "lucide-react";

export default function AccordionPost({ props: post }) {
  return (
    <Accordion>
      <AccordionItem
        classNames={{ title: "text-default-400", content: "text-default-500" }}
        key="1"
        aria-label="Información de Contacto"
        title="Información de Contacto"
      >
        <div className="flex items-center space-x-2 mb-4">
          <Phone />
          <p>{post?.phone}</p>
        </div>
        {post?.email && (
          <div className="flex items-center space-x-2 mb-4">
            <Mail />
            <p>{post?.email}</p>
          </div>
        )}
        {post?.address && (
          <div className="flex items-center space-x-2 mb-4">
            <MapPin />
            <p>{post?.address}</p>
          </div>
        )}
      </AccordionItem>
      <AccordionItem
        classNames={{ title: "text-default-400", content: "text-default-500" }}
        key="2"
        aria-label="Logística"
        title="Logística"
      >
        <div className="mb-4">
          <h2>Lugar de origen: {post?.location}</h2>
          {post?.packing && <h2>Tipo de Empaque: {post?.packing}</h2>}
          {post?.units_packing && (
            <h2>Unidades por empaque: {post?.units_packing}</h2>
          )}
        </div>
      </AccordionItem>
    </Accordion>
  );
}
