import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';

import { CONTACT } from './constants';

export async function openBookingInApp() {
  await WebBrowser.openBrowserAsync(CONTACT.bookingUrl);
}

export async function openBookingExternally() {
  await Linking.openURL(CONTACT.bookingUrl);
}

export async function openWhatsApp(prefillMessage: string) {
  const url = `https://wa.me/${CONTACT.whatsappE164}?text=${encodeURIComponent(prefillMessage)}`;
  await Linking.openURL(url);
}

export async function dialHotline() {
  await Linking.openURL(`tel:${CONTACT.phoneTel}`);
}

export async function openEmail() {
  await Linking.openURL(`mailto:${CONTACT.email}`);
}
