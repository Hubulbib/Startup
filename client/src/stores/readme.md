### Использование store во Vue компонентах

import { useAuthStore } from '@/stores/AuthStore';

const authStore = useAuthStore();

const user = store.user;
const isAuth = store.isAuth;

const getOutOfHere = () => store.logout();
