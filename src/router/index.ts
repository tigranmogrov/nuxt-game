import auth from './middleware/auth';
import guest from './middleware/guest';
import middlewarePipeline from '@/router/middlewarePipeline';
import HomeView from '@/views/home-view.vue';
import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

interface IContext {
  to: RouteLocationNormalized;
  from: RouteLocationNormalized;
  next: NavigationGuardNext;
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { middleware: [auth], layout: 'main' }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../views/login-view.vue'),
    meta: { middleware: [guest], layout: 'empty' }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  if (!to.meta.middleware) {
    return next();
  }
  const middleware: any = to.meta.middleware;

  const context: IContext = {
    to,
    from,
    next
  };

  return middleware[0]({
    ...context,
    next: middlewarePipeline(context, middleware, 1)
  });
});

router.afterEach((to) => {
  const docTitle: any = to.meta.title || '';
  if (docTitle) {
    document.title = `Nuxt Game ${to.meta.title}`;
  }
});
export default router;
