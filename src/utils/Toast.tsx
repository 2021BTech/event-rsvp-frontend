import { toast } from 'react-toastify';
import type { Id, ToastContent } from 'react-toastify';
import ToastBody from '../components/ToastBody';

type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export function showToast(
  type: ToastVariant,
  message: string,
  title?: string
): Id {
  const toastBody: ToastContent = <ToastBody title={title || capitalize(type)} message={message} />;

  return toast[type](toastBody);
}

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
