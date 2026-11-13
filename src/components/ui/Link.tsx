import Link from 'next/link';

export default function CustomLink({ href, subject, cc, body, children }: { href: string; subject?: string; cc?: string; body?: string; children: React.ReactNode }) {
  const isExternal = href.startsWith('https://') || href.startsWith('http://');
  const isInternal = href.startsWith('/') ;
  const isMailto = href.startsWith('mailto:');
  const isTel = href.startsWith('tel:');

  const mailtoHref = isMailto ? new URL(href) : undefined;
  if (mailtoHref) {
    if (subject !== undefined) mailtoHref.searchParams.set('subject', subject);
    if (cc !== undefined) mailtoHref.searchParams.set('cc', cc);
    if (body !== undefined) mailtoHref.searchParams.set('body', body);
  }

  if (isExternal) {
    return (
      <Link href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </Link>
    );
    } else if (isInternal) {
    return (
      <Link href={href}>
        {children}
      </Link>
    );
  } else if (isMailto) {
    return (
      <Link href={mailtoHref!.toString()}>
        {children}
      </Link>
    );
  } else if (isTel) {
    return (
      <Link href={href}>
        {children}
      </Link>
    );
  }
}