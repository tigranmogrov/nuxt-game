import { useAuthStore } from '@/stores/auth.store';
import type { NavigationGuardNext } from 'vue-router';

export default function auth({ next }: { next: NavigationGuardNext }) {
  const authStore = useAuthStore();

  if (!authStore.isLoggedIn) {
    return next({ name: 'login' });
  }
  return next();
}
