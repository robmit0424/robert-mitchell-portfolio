"use client";

import { useContactModal } from "@/contexts/ContactModalContext";
import { ContactModal } from "./ContactModal";

export function GlobalContactModal() {
  const { isOpen, closeModal } = useContactModal();

  return <ContactModal isOpen={isOpen} onClose={closeModal} />;
}
