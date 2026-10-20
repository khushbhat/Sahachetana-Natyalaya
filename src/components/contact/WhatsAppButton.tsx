import { MessageCircle } from 'lucide-react';
import { CONTACT } from '../../config/site';

/** Builds a wa.me link: https://wa.me/<digits>?text=<message> */
export function whatsappUrl(number = CONTACT.whatsapp, message = CONTACT.whatsappMessage) {
  const digits = number.replace(/\D/g, '');
  if (!digits) return '';
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export function WhatsAppButton({ message, className = 'btn' }: { message?: string; className?: string }) {
  const url = whatsappUrl(CONTACT.whatsapp, message ?? CONTACT.whatsappMessage);
  if (!url) {
    return (
      <span className={className} aria-disabled="true" title="WhatsApp number to be added in src/config/site.ts">
        <MessageCircle size={16} aria-hidden="true" /> WhatsApp <span className="btn__note">(number to be added)</span>
      </span>
    );
  }
  return (
    <a className={className} href={url} target="_blank" rel="noreferrer">
      <MessageCircle size={16} aria-hidden="true" /> WhatsApp us
      <span className="sr-only">(opens WhatsApp in a new tab)</span>
    </a>
  );
}
