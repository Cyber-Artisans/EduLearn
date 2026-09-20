import type { Category } from '../types/course'

export const mockCategories: Category[] = [
  { id: 'web-dev',     name: 'Web Development',    icon: 'FiCode',      color: 'primary',   courseCount: 42 },
  { id: 'programming', name: 'Programming',        icon: 'FiTerminal',  color: 'secondary', courseCount: 38 },
  { id: 'data-sci',    name: 'Data Science',       icon: 'FiBarChart2', color: 'info',      courseCount: 27 },
  { id: 'ai-ml',       name: 'AI & Machine Learning', icon: 'FiCpu',    color: 'accent',    courseCount: 21 },
  { id: 'ui-ux',       name: 'UI/UX Design',       icon: 'FiPenTool',   color: 'error',     courseCount: 33 },
  { id: 'cyber',       name: 'Cyber Security',     icon: 'FiShield',    color: 'success',   courseCount: 18 },
  { id: 'mobile',      name: 'Mobile Development', icon: 'FiSmartphone',color: 'warning',   courseCount: 24 },
  { id: 'business',    name: 'Business',           icon: 'FiBriefcase', color: 'neutral',   courseCount: 31 },
]