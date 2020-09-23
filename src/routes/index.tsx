import Home from '@/pages/home'
import Article from '@/pages/article'
import Archives from '@/pages/archives'
import About from '@/pages/about'

export default [
  { path: '/article', component: Article },
  { path: '/archives', component: Archives },
  { path: '/about', component: About },
  { path: '/', component: Home },
]
